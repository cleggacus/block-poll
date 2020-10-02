import socketIOClient, {Socket} from 'socket.io-client';
import Message from '../interfaces/message'; 

export default class Connection {
  private channel: RTCDataChannel;
  private connection: RTCPeerConnection;
  private socket: typeof Socket;
  private isOpen: boolean;
  private handleOnMessage: ((data: Message) => any) | null;
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
      ],
      iceTransportPolicy: 'relay'
    });

    this.handleChannelOpen = null;
    this.handleChannelClose = null;
    this.handleOnMessage = null;
  }

  onMessage(handleOnMessage: (data: Message) => any){
    this.handleOnMessage = handleOnMessage;

    this.channel.onmessage = (stuff) => {
      const data: Message = JSON.parse(stuff.data);

      if(this.handleOnMessage)
        this.handleOnMessage(data);
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

    this.channel.onmessage = (stuff) => {
      const data: Message = JSON.parse(stuff.data);
      if(this.handleOnMessage)
        this.handleOnMessage(data);
    }
  }

  connect(n = true, socketID?: string){
    if(socketID){
      this.onConnect(socketID);
    }else{
      this.socket.on('foundSocket', (socketID: string) => {
        if(this.isOpen){
          this.onConnect(socketID);
          this.isOpen = false;
        }
      });
  
      this.socket.emit('findSocket', n);
    }
  }
    
  sendMessage(message: Message){
    this.channel.send(JSON.stringify(message));
  }
}