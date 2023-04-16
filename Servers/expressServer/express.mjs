import express from 'express';
import router from './route.mjs';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/posts', router);

app.get('/', (_, res) => res.send('We are running an express server'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
