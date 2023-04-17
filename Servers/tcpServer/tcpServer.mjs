import net from 'net';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const request = data.toString();

        const method = request.split(' ')[0];
        const url = request.split(' ')[1];
        const body = request.split('\r\n\r\n')[1];

        if (url === '/') {
            if (method === 'GET') {
                socket.write('HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nHello World\n');
                socket.end();
            }

            if (method === 'POST') {
                socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n${body}\n`);
                socket.end();
            }
        } else {
            socket.write('HTTP/1.1 401 OK\r\nContent-Type: text/plain\r\n\r\nYou are an asshole\n');
            socket.end();
        }
    });
});

server.listen(8081, () => {
    console.log('Server listening on port 8081');
});
