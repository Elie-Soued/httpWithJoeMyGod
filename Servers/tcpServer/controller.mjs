import pool from '../dbconfig.mjs';

const getPosts = async (_, res) => {
    try {
        const dbResponse = await pool.query(`SELECT * FROM todos `);
        return dbResponse.rows;
    } catch (e) {
        console.error(Error(e));
    }
};

export { getPosts };
