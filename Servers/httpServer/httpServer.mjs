import http from 'http';

const PORT = 5050;
const hostname = 'localhost';
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        if (req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('200 Hello World!');
        }
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                console.log(body);
            });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end();
        }
    } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('401 Ayre fik!');
    }
});

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}`);
});
