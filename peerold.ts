import Connection from './connection';
import crypto from 'crypto';
import ID from './id';
// import Message, { ReqTypes, Status } from '../interfaces/message';

export default class Peer {
  id: ID;
  optimalTable: ID[];
  setupCount: number;

  table: ({
    id: ID,
    connection: Connection | null
  } | null)[];

  connections: {
    id: ID,
    connection: Connection | null
  }[];

  constructor(lengthBytes = 2){
    this.table = Array.apply(null, Array(lengthBytes * 8)) as null[];
    this.connections = [];
    this.id = new ID(lengthBytes);
    this.optimalTable = this.getOptimalTable();
    this.setupCount = 0;
  }

  joinNetwork(n = true){
    const connection = new Connection();
    connection.on('id', id => {
      if(n) this.createTable(connection, id);
    
      connection.on('getNodeTable', message => {
        if(n){
          for(let i = 0; i < message.data.ids.length; i++){
            const nodeId = new ID(message.data.ids[i]);
            const length = message.data.ids.length - i;

            let returnNode = null;
  
            if(nodeId.toString('bin').substr(0, length) == this.id.toString('bin').substr(0, length))
              returnNode = this.id.toString();
  
            connection.sendMessage('gotNodeTable', {
              to: id,
              from: this.id.toString(),
              data: {
                id: returnNode,
                position: i
              }
            })
          }
        }else{
        }
      })
    });

    connection.on('requestConnection', message => {
      if(message.to == this.id.toString()){
        const newConnection = new Connection();
        newConnection.connectNetwork(connection, this.id, new ID(message.from), message.data.connId);

        newConnection.onOpen(() => {
          console.log('open');
          console.log(this.table);
        });
      }
    })
    
    connection.onOpen(() => {
      console.log('open');
      this.joinNetwork(false);
      connection.sendMessage('id', this.id.toString());
    });

    connection.connectSocket(n);
  }
    
  sendMessage(event: string, message: any){
    if(message.to == this.id.toString()){
      console.log('cant send message to self');
      return;
    }

    const nn = this.nearestNode(message.to);

    if(nn < 0){
      console.log('cant send message to unknown user');
    }else{
      this.table[nn]?.connection?.sendMessage(event, message);
    }
  }

  private onMessage(event: string, message: any){
    if(message.to == this.id.toString()){
      // me
      console.log(event, message);
      return;
    }

    const nn = this.nearestNode(message.to);

    if(nn < 0){
      this.sendMessage('notFound', {
        id: message.id,
        to: message.from,
        from: this.id.toString(),
      });
    }else{
      this.sendMessage('getNearest', message);
    }
  }

  // private getNearest(message: any){
  //   const nn = this.nearestNode(message.to);

  //   if(nn < 0)
  //     this.sendMessage('gotNearest', {
  //       to: message.from,
  //       from: this.id.toString(),
  //     });
  //   else
  //     this.sendMessage('getNearest', message);
  // }

  private nearestNode(id: string | ID){
    if(typeof id == 'string')
      id = new ID(id);

    let nearest = -1;
    let distance = this.id.xor(id);

    for(let i = 0; i < this.table.length; i++){
      if(!this.table[i]?.id)
        continue;

      const newDistance = this.table[i]?.id.xor(id);
        
      if(newDistance?.lt(distance)){
        nearest = i;
        distance = newDistance;
      }
    }

    return nearest;
  }

  private createTable(connection: Connection, to: string){
    connection.on('gotNodeTable', (message) => {
      this.setupCount ++;

      if(message.data.id){
        // node found
        this.table[message.data.position] = {
          id: new ID(message.data.id),
          connection: null
        };
      }else{
        // no node found
        this.table[message.data.position] = null;
      }
      
      if(this.setupCount >= this.optimalTable.length){
        console.log(this.table);
        this.connectTable(connection);
      }
    });

    connection.sendMessage('getNodeTable', {
      to: to,
      from: this.id.toString(),
      data: {
        ids: this.optimalTable.map(id => id.toString())
      }
    })
  }

  private connectTable(connection: Connection){
    for(let i = 0; i < this.table.length; i++){
      if(this.table[i] && !this.table[i]?.connection){
        const newConnection = new Connection();
        const connId = crypto.randomBytes(4).toString('hex');
        newConnection.connectNetwork(connection, this.id, this.table[i]?.id!, connId);
    
        newConnection.onOpen(() => {
          console.log('open');
          console.log(this.table);
        });

        connection.sendMessage('requestConnection', {
          to: this.table[i]?.id!.toString(),
          from: this.id.toString(),
          data: {
            connId: connId
          }
        })
      }
    }
    console.log(1)
  }

  private getOptimalTable(){
    const size = this.id.toString('bin').length;
    let ids = [];

    for(let i = 0; i < size; i++){
      const distance = Math.pow(2, i);
      ids.push(this.id.xor(distance.toString(16)));
    }

    return ids;
  }
}