import http from 'http';
import next from 'next';
import express from 'express';
import socketServer from './socketServer';

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const expressApp = express();
    const server = http.createServer(expressApp);

    expressApp.get('*', (req, res) => handle(req, res));
    socketServer(server);

    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })