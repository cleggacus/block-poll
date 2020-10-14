import socketIOClient, {Socket} from 'socket.io-client';
import Message from '../interfaces/message'; 
import ID from './id';

export default class Connection {
  private channel: RTCDataChannel;
  private connection: RTCPeerConnection;
  private socket: typeof Socket;
  private isOpen: boolean;
  private handleOnMessages: {
    event: string,
    fn: ((data: any) => any)
  }[];
  
  private handleChannelOpen: (() => any) | null;
  private handleChannelClose: (() => any) | null;
  isInit: boolean;

  constructor(){
    this.socket = socketIOClient('ws://localhost:3000');
    this.isInit = false;
    this.isOpen = true;
    this.channel = new RTCPeerConnection().createDataChannel('send');
    this.connection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [<string>process.env.turnUrl],
          username: process.env.turnUsername,
          credential: process.env.turnCredential
        },
        {
          urls: [<string>process.env.stunUrl]
        },
      ]
    });

    this.handleChannelOpen = null;
    this.handleChannelClose = null;
    this.handleOnMessages = [];
  }

  on(event: string, fn: (data: Message) => any, overide = true){
    if(overide){
      let eventPos = -1;
  
      for(let i = 0; i < this.handleOnMessages.length; i++){
        if(this.handleOnMessages[i].event == event){
          eventPos = i;
          break;
        }
      }
  
      if(eventPos == -1){
        this.handleOnMessages.push({
          event: event,
          fn: fn
        });
      }else{
        this.handleOnMessages[eventPos] = {
          event: event,
          fn: fn
        }
      }
    }else{
      this.handleOnMessages.push({
        event: event,
        fn: fn
      });
    }

    this.channel.onmessage = (message) => {
      const data = JSON.parse(message.data);
      
      for(let i = 0; i < this.handleOnMessages.length; i++){
        if(data.event == this.handleOnMessages[i].event){
          this.handleOnMessages[i].fn(data.message);
        }
      }
    }
  }

  onOpen(handleChannelOpen: () => any){
    this.handleChannelOpen = handleChannelOpen;
    this.channel.onopen = this.handleChannelOpen;
  }

  onClose(handleChannelClose: () => any){
    this.handleChannelClose = handleChannelClose;
    this.channel.onclose = this.handleChannelClose;
  }

  private onConnect(socketID: string){
    this.isInit = this.socket.id > socketID;

    if(this.isInit){
      this.channel = this.connection.createDataChannel('send');

      this.channel.onopen = this.handleChannelOpen;
      this.channel.onclose = this.handleChannelClose;

      this.channel.onmessage = (message) => {
        const data = JSON.parse(message.data);
        
        for(let i = 0; i < this.handleOnMessages.length; i++){
          if(data.event == this.handleOnMessages[i].event){
            this.handleOnMessages[i].fn(data.message);
          }
        }
      }

      this.connection.createOffer().then(offer => {
        this.connection.setLocalDescription(offer);
        this.socket.emit('sendOffer', {
          id: socketID,
          offer: offer
        });
      }).catch(err => {
        console.log(err);
      });
  
      this.socket.on('getOffer', (offer:any) => {
        if(this.channel.readyState != 'open')
          this.connection.setRemoteDescription(offer);
      })

    }else{
      this.connection.ondatachannel = e => {
        this.channel = e.channel;
        
        this.channel.onopen = this.handleChannelOpen;
        this.channel.onclose = this.handleChannelClose;

        this.channel.onmessage = (message) => {
          const data = JSON.parse(message.data);
          
          for(let i = 0; i < this.handleOnMessages.length; i++){
            if(data.event == this.handleOnMessages[i].event){
              this.handleOnMessages[i].fn(data.message);
            }
          }
        }
      };

      this.socket.on('getOffer', (offer: any) => {
        if(this.channel.readyState != 'open'){
          this.connection.setRemoteDescription(offer)
          .then(() => this.connection.createAnswer())
          .then((answer:any) => {
            this.connection.setLocalDescription(answer);
            this.socket.emit('sendOffer', {
              id: socketID,
              offer: answer
            })
          }).catch(err => {
            console.log(err);
          });
        }
      });
    }
  
    this.connection.onicecandidate = e => {
      if(e.candidate){
        this.socket.emit('sendCandidate', {
          id: socketID,
          candidate: e.candidate
        });
      }
    }

    this.socket.on('getCandidate', (candidate:any)=> {
      if(this.channel.readyState != 'open')
        this.connection.addIceCandidate(candidate);
      
    });
  }

  connectSocket(newPeer = true, socketID?: string){
    if(socketID){
      this.onConnect(socketID);
    }else{
      this.socket.on('foundSocket', (socketID: string) => {
        if(this.isOpen){
          this.onConnect(socketID);
          this.isOpen = false;
        }
      });
  
      this.socket.emit('findSocket', newPeer);
    }
  }

  connectNetwork(connection: Connection, me: ID, them: ID, sessionId: string){
    connection.on('testEvent', message => {
      if(message.session == sessionId){
        console.log(sessionId);
      }
    }, false);

    connection.sendMessage('testEvent', {
      session: sessionId,
      to: them.toString(),
      from: me.toString(),
      data: {}
    })
  }
    
  sendMessage(event: string, message: Message){
    if(!message.session)
      message.session = (new ID(4)).toString()

    this.channel.send(JSON.stringify({
      event: event,
      message: message
    }));

    return message.session;
  }
}