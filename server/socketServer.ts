import http from "http";
import socket from "socket.io";

export default (server: http.Server) => {
  const io = socket(server);
  let waitingConnection = '';
  
  io.on("connection", socket => {
    socket.on('findSocket', () => {
      if(waitingConnection){
        socket.emit('foundSocket', waitingConnection);
        socket.to(waitingConnection).emit('foundSocket', socket.id);
        waitingConnection = "";
      }else
        waitingConnection = socket.id;
    });

    socket.on('sendOffer', (data:{ id:string, offer:any}) => {
      socket.to(data.id).emit('getOffer', data.offer);
    });
  
    socket.on('sendCandidate', (data:{id: string, candidate: any}) => {
      socket.to(data.id).emit('getCandidate', data.candidate);
    });
  });
}