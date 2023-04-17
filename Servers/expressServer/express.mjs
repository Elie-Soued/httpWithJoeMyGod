import express from 'express';

const PORT = 5000;

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

app.post('/', (req, res) => {
    res.json({
        code: 200,
        message: 'success',
        data: req.body,
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
