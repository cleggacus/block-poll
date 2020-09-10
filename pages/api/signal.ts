import SocketIO, {EngineSocket} from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

interface NextApiResponseSocket extends NextApiResponse {
  socket: EngineSocket
};

export default (_req: NextApiRequest, res: NextApiResponseSocket) => {
  if (!res.socket.server.io) {
    const io = new SocketIO(res.socket.server)

    io.on('connection', socket => {
      socket.on('echo', mes => {
        socket.emit('echo', mes)
      });
    });

    res.socket.server.io = io;
  }
  
  res.end();
};