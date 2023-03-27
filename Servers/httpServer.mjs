import { createServer } from 'node:http';

// Create a local server to receive data from
const server = createServer((_, res) => {
    res.end('Hello World from httpServer.mjs!');
});

server.listen(5000);
