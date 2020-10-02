import http from "http";
import socket from "socket.io";

export default (server: http.Server) => {
  const io = socket(server);
  let waitingConnection: string[] = [];
  
  io.on("connection", socket => {
    socket.on('findSocket', (n: boolean) => {
      if(waitingConnection.length && n){
        socket.emit('foundSocket', waitingConnection[0]);
        socket.to(waitingConnection[0]).emit('foundSocket', socket.id);
        waitingConnection.shift();
      }else waitingConnection.push(socket.id);
    });

    socket.on('sendOffer', (data:{ id:string, offer:any}) => {
      socket.to(data.id).emit('getOffer', data.offer);
    });
  
    socket.on('sendCandidate', (data:{id: string, candidate: any}) => {
      socket.to(data.id).emit('getCandidate', data.candidate);
    });
  });
}