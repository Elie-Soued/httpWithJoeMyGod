import net from 'net';
import router from './route.mjs';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();
        const url = request.split(' ')[1];
        console.log('do I get heress :>> ');
        router(request, url, socket);
    });
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
