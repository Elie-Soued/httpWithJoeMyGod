import express from 'express';

const app = express();

app.get('/', (_, res) => res.send('Hello World'));

app.listen(5000, () => console.log(`Server running on port 5000`));
