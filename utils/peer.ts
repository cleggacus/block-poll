import Connection from './connection';
import SetupConnection from './setupConnection';
import Message from '../interfaces/message';
import ID from './id';

export default class Peer {
  id: ID;
  optimalTable: ID[];
  
  private handleOnMessages: {
    event: string,
    fn: ((data: any) => any)
  }[];

  table: ({
    id: ID,
    connection: Connection | null
  } | null)[];

  constructor(lengthBytes = 2){
    this.table = Array.apply(null, Array(lengthBytes * 8)) as null[];
    this.id = new ID(lengthBytes);
    this.optimalTable = this.getOptimalTable();
    this.handleOnMessages = [];
  }

  joinNetwork(){
    const setup = new SetupConnection(this.id, true);
    setup.listen()
      .then(() => setup.requestTableIds(this.optimalTable))
      .then(table => setup.requestTable(table))
  }

  sendMessage(event: string, message: Message){
    if(message.to){
      const closestNode = this.closestNode(new ID(message.to));

      if(closestNode >= 0)
        return this.table[closestNode]?.connection?.sendMessage(event, message);
    }

    return '';
  }

  on(event: string, fn: (data: Message) => any){
    let eventPos = -1;

    for(let i = 0; i < this.handleOnMessages.length; i++){
      if(this.handleOnMessages[i].event == event){
        eventPos = i;
        break;
      }
    }

    if(eventPos == -1){
      this.handleOnMessages.push({
        event: (event),
        fn: fn
      });
    }else{
      this.handleOnMessages[eventPos] = {
        event: event,
        fn: fn
      }
    }

    for(let i = 0; i < this.table.length; i++){
      if(this.table[i]?.connection){
        this.table[i]?.connection?.on(event, (message: Message) => {
          if(!message.data.to || message.data.to == this.id.toString()){
            fn(message);
          }else{
            const closestNode = this.closestNode(message.data.to);
            if(closestNode >= 0){
              this.table[closestNode]?.connection?.sendMessage(event, message);
            }else{
              this.sendMessage('notFound', {
                session: message.session,
                to: message.from,
                from: this.id.toString(),
                data: {}
              })
            }
          }
        });
      }
    }
  }

  onConnect(){
    
  }

  closestNode(id: ID){
    let closest = -1;
    let distance = this.id.xor(id);

    for(let i = 0; i < this.table.length; i++){
      if(this.table[i]?.connection){
        const newDistance = this.table[i]?.id.xor(id);

        if(newDistance?.lt(distance)){
          distance = newDistance;
          closest = i;
        }
      }
    }

    return closest;
  }

  private getOptimalTable(){
    const size = this.id.getSize() * 8;
    let ids = [];

    for(let i = 0; i < size; i++){
      const distance = Math.pow(2, i);
      ids.push(this.id.xor(distance.toString(16)));
    }

    return ids;
  }
}