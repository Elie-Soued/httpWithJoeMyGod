import pool from './dbconfig.mjs';

const getPosts = async (_, res) => {
    try {
        const dbResponse = await pool.query(`SELECT * FROM todos `);
        res.json({
            code: 200,
            message: 'success',
            data: dbResponse.rows,
        });
    } catch (e) {
        console.error(Error(e));
        res.status(500);
    }
};

const createPost = async (req, res) => {
    const { todo } = req.body;

    try {
        const queryString = 'INSERT INTO "todos" (todo) VALUES ($1);';

        const dbResponse = await pool.query(queryString, [todo]);

        res.json({
            code: 200,
            message: 'inserted todo correctly',
            data: dbResponse.rows[0],
        });
    } catch (e) {
        res.status(500).json({
            code: 500,
            message: 'Error trying to insert a new todo',
        });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;
    try {
        const queryString = `UPDATE "todos" SET todo=$1 WHERE id=${id}`;
        const dbResponse = await pool.query(queryString, [todo]);
        res.json({
            code: 200,
            message: 'updated todo correctly',
            data: dbResponse.rows[0],
        });
    } catch (e) {
        res.status(500).json({
            code: 500,
            message: 'Error trying to update a todo',
        });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const queryString = 'DELETE FROM "todos" WHERE id=$1';
        const dbResponse = await pool.query(queryString, [id]);
        res.json({
            code: 200,
            message: 'deleted todo correctly',
            data: dbResponse.rows,
        });
    } catch (e) {
        console.error(Error(e));
        res.status(500);
    }
};

const getPostById = async (req, res) => {
    try {
        const dbResponse = await pool.query(`SELECT * FROM todos WHERE id = ${req.params.id} `);
        res.json({
            code: 200,
            message: 'success',
            data: dbResponse.rows,
        });
    } catch (e) {
        console.error(Error(e));
        res.status(500);
    }
};

export { getPosts, createPost, updatePost, deletePost, getPostById };
