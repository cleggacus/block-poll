import Connection from './connection';
import ID from './id';
import Message, { ReqTypes, Status } from '../interfaces/message';

export default class Peer {
  id: ID;
  optimalTable: ID[];
  table: {
    id: ID,
    connection: Connection
  }[];

  constructor(lengthBytes = 2){
    this.table = [];
    this.id = new ID(lengthBytes);
    this.optimalTable = this.getOptimalTable();
  }

  joinNetwork(n = true){
    const connection = new Connection();
    
    connection.onOpen(() => {
      console.log('open');

      this.joinNetwork(false);

      connection.onMessage(res => {
        if(!res.to || res.to == this.id.toString('hex')){
          switch(res.reqType){
            case ReqTypes.findNodes:
              this.reqFindNodes(res, connection);
              break;
            default:
              console.log("request type not found");
              break;
          }
        }else{
          const cn = this.closestNode(Buffer.from(res.to, 'hex'));

          if(cn != -1)
            this.table[cn].connection.sendMessage(res);
        }
      });

      if(n){
        connection.sendMessage({
          from: this.id.toString('hex'),
          to: '',
          reqType: ReqTypes.findNodes,
          status: Status.Finding,
          mes: this.optimalTable.map(val => val.toString('hex'))
        });
      }
    });

    connection.connect(n);
  }

  private reqFindNodes(res: Message, connection: Connection){
    if(res.status == Status.Found){
      console.log('Found')
      this.table = res.mes;
    }else if(res.status == Status.Finding){
      connection.sendMessage({
        from: this.id.toString('hex'),
        to: '',
        reqType: ReqTypes.findNodes,
        status: Status.Found,
        mes: []
      });

      for(let i = 0; i < res.mes.length; i++){
        const cn = this.closestNode(Buffer.from(res.mes[i], 'hex'));
        if(cn == -1){
          //me
        }else{
          this.table[cn].connection.sendMessage({
            from: this.id.toString('hex'),
            to: '',
            reqType: ReqTypes.findNodes,
            status: Status.Finding,
            mes: this.optimalTable.map(val => val.toString('hex'))
          });
        }
      }
    }
  }

  private closestNode(id: ID | Buffer){
    let closestIndex = -1;
    let distance = this.id.xor(id);

    for(let i = 0; i< this.table.length; i++){
      const newDistance = this.table[i].id.xor(id);

      if(newDistance < distance){
        distance = newDistance;
        closestIndex = i;
      }
    }

    return closestIndex;
  }

  private getOptimalTable(){
    const sizeBytes = this.id.getSize();
    let ids = [];

    for(let i = 0; i < sizeBytes; i++){
      for(let j = 0; j < 8; j++){
        const distance = Buffer.alloc(sizeBytes);
        distance[sizeBytes-1-i] |= (1 << j);
        ids.push(this.id.xor(distance));
      }
    }

    return ids;
  }
}