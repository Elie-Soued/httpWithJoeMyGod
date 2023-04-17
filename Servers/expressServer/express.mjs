import express from 'express';
import router from './route.mjs';
import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_, res) => {
    res.json({
        code: 200,
        message: 'success',
        data: 'Hello World!',
    });
});

app.use((_, res) => {
    res.json({
        code: 401,
        message: 'unauthorized',
        data: 'Beddeh nikak ya zaber!',
    });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
