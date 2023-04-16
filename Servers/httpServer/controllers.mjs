import pool from '../dbconfig.mjs';

const getPosts = async (_, res) => {
    try {
        const dbResponse = await pool.query(`SELECT * FROM todos `);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                code: 200,
                message: 'success',
                data: dbResponse.rows,
            })
        );
    } catch (e) {
        console.error(Error(e));
        res.writeHead(500);
        res.end();
    }
};

const getPostById = async (req, res) => {
    const id = req.url.split('/')[2];

    try {
        const dbResponse = await pool.query(`SELECT * FROM todos WHERE id = ${id} `);

        res.write(
            JSON.stringify({
                code: 200,
                message: 'success',
                data: dbResponse.rows,
            })
        );
        res.end();
    } catch (e) {
        console.error(Error(e));
    }
};

const createPost = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { todo } = JSON.parse(body);

        try {
            const queryString = 'INSERT INTO "todos" (todo) VALUES ($1);';

            const dbResponse = await pool.query(queryString, [todo]);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    code: 200,
                    message: 'inserted todo correctly',
                    data: dbResponse.rows[0],
                })
            );
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    code: 500,
                    message: 'Error trying to insert a new todo',
                })
            );
        }
    });
};

const updatePost = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const id = req.url.split('/')[2];
        const { todo } = JSON.parse(body);

        try {
            const queryString = `UPDATE "todos" SET todo=$1 WHERE id=${id}`;
            const dbResponse = await pool.query(queryString, [todo]);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    code: 200,
                    message: 'updated todo correctly',
                    data: dbResponse.rows[0],
                })
            );
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(
                JSON.stringify({
                    code: 500,
                    message: 'Error trying to update a todo',
                })
            );
        }
    });
};

const deletePost = async (req, res) => {
    const id = req.url.split('/')[2];
    try {
        const queryString = 'DELETE FROM "todos" WHERE id=$1';
        const dbResponse = await pool.query(queryString, [id]);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                code: 200,
                message: 'deleted todo correctly',
                data: dbResponse.rows,
            })
        );
    } catch (e) {
        console.error(Error(e));
        res.writeHead(500);
        res.end();
    }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
