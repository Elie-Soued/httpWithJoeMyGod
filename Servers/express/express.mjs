import express from 'express';
import dotenv from 'dotenv';
import router from './route.mjs';

dotenv.config();
const { PORT } = process.env;
console.log(PORT);

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/posts', router);

app.get('/', (_, res) => res.send('We are running an express server'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
