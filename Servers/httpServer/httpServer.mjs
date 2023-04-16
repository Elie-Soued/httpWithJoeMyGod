import http from 'http';
import router from './route.mjs';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;
const hostname = 'localhost';
const server = http.createServer(router);

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}`);
});
