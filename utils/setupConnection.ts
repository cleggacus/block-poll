import Connection from './connection';
import ID from './id';

export default class SetupConnection {
  private id: ID;
  private connectionId: ID | null;
  private connection: Connection;
  private newPeer: boolean;
  private tableCount: number;
  private tempTable: (ID | null)[];

  constructor(id: ID, newPeer: boolean){
    this.newPeer = newPeer;
    this.connection = new Connection();
    this.connectionId = null;
    this.tableCount = 0;
    this.tempTable = [];
    this.id = id;
  }
  
  listen(){
    return new Promise((resolve) => {
      this.connection.onOpen(() => {
        this.swapIds();
        this.requestTableIdsListen();
        this.requestTableListen();
        resolve();
      });
  
      this.connection.connectSocket(this.newPeer);
    })
  }
  
  swapIds(){
    this.connection.on('id', message => this.connectionId = message.data.id);
    this.connection.sendMessage('id', {
      from: this.id.toString(),
      data: {
        id: this.id.toString()
      }
    })
  }

  requestTableIdsListen(){
    if(this.newPeer){
      this.connection.on('requestIdsTable', message => {
        for(let i = 0; i < message.data.optimalTable.length; i++){
          const nodeId = new ID(message.data.optimalTable[i]);
          const length = message.data.optimalTable.length - i;

          let returnNode = null; 

          if(nodeId.toString('bin').substr(0, length) == this.id.toString('bin').substr(0, length))
            returnNode = this.id.toString();
  
          this.connection.sendMessage('tableIdsResponse', {
            session: message.session,
            from: this.id.toString(),
            data: {
              id: returnNode,
              i: i
            }
          })
        }
      })
    }
  }

  requestTableListen(){
    if(this.newPeer){
      this.connection.on('requestConnection', message => {
        if(message.to == this.id.toString() && this.connectionId && message.session){
          const connection = new Connection();

          connection.connectNetwork(
            this.connection,
            this.id,
            this.connectionId,
            message.session
          );

          this.connection.sendMessage('connectionResponse', {
            session: message.session,
            from: this.id.toString(),
            data: {}
          });
        }
      })
    }else{
      
    }
  }

  requestTableIds(optimalTable: ID[]): Promise<(ID | null)[]>{
    return new Promise((resolve) => {
      this.tempTable = Array.apply(null, Array(optimalTable.length)) as null[];

      this.connection.sendMessage('requestIdsTable', {
        from: this.id.toString(),
        data: {
          optimalTable: optimalTable.map(id => id.toString())
        }
      });

      this.connection.on('tableIdsResponse', message => {
        this.tableCount++;

        this.tempTable[message.data.i] = message.data.id;
        
        if(this.tableCount >= optimalTable.length)
          resolve(this.tempTable);
      })
    });
  }

  requestTable(table: (ID | null)[]){
    let newTable = table.map(id => {
      if(id){
        return {
          id: id,
          connection: new Connection()
        }
      }else{
        return null
      }
    });

    let sessions: {
      session: string,
      i: number
    }[] = [];
    
    for(let i = 0; i < table.length; i++){
      if(table[i]){
        const session = this.connection.sendMessage('requestConnection', {
          to: table[i]?.toString(),
          from: this.id.toString(),
          data: {}
        });
        
        sessions.push({
          session: session,
          i: i
        });
      }
    }
    
    this.connection.on('connectionResponse', message => {
      for(let i = 0; i < sessions.length; i++){
        if(sessions[i].session == message.session && this.connectionId){
          newTable[sessions[i].i]?.connection.connectNetwork(
            this.connection,
            this.id,
            this.connectionId,
            sessions[i].session
          );

          break;
        }
      }
    })
  }
}