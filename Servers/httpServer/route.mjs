import { getPosts, getPostById, createPost, updatePost, deletePost } from './controllers.mjs';

const router = (req, res) => {
    // First Route
    if (req.url === '/posts') {
        if (req.method === 'GET') {
            getPosts(req, res);
        }
        if (req.method === 'POST') {
            createPost(req, res);
        }
        // Second Route
    } else if (req.url.match(/\/posts\/\d+/)) {
        if (req.method === 'GET') {
            getPostById(req, res);
        }

        if (req.method === 'PUT') {
            updatePost(req, res);
        }

        if (req.method === 'DELETE') {
            deletePost(req, res);
        }
        // Third Route
    } else if (req.url === '/') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('We are running an http server');
            res.end();
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default router;
