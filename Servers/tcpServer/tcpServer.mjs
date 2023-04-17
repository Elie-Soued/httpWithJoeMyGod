import net from 'net';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();

        const method = request.split(' ')[0];
        const url = request.split(' ')[1];

        if (method == 'GET' && url == '/') {
            socket.write('HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nHello World\n');
            socket.end();
        } else {
            socket.write('HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nYou are an asshole\n');
            socket.end();
        }
    });
});

server.listen(8081, () => {
    console.log('Server listening on port 8080');
});
