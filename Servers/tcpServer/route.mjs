import { getPosts } from './controller.mjs';

const router = async (request, url, socket) => {
    // First Route
    if (url === '/posts') {
        let body = '';
        let response = 'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nThese are the todos\n';
        const posts = await getPosts();
        posts.forEach((post) => {
            body += `id: ${post.id} todo: ${post.todo}\r\n`;
        });
        const contentLength = `Content-Length: ${Buffer.byteLength(body)}`;
        response = response + contentLength + '\r\n\r\n' + body;
        socket.write(response);
        socket.end();
    } else if (url === '/') {
        const response =
            'HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nYou are running a server using only the net module\n';
        socket.write(response);
        socket.write(request);
        socket.write(url);
        socket.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default router;
