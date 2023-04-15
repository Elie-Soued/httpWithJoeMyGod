import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const { DBUSER, DBPASS, DBHOST, DBPORT, DBNAME } = process.env;

const pool = new Pool({
    user: DBUSER,
    password: DBPASS,
    host: DBHOST,
    port: DBPORT,
    database: DBNAME,
});

export default pool;
