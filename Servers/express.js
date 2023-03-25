const express = require('express');
const cors = require('cors');

//Constants declarations
const app = express();
const port = 5000;

//Use Body Parser to format the body´s reponse
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => res.send('Hello World'));

//Starting a server and make it listen to a specific port
app.listen(port, () => console.log(`Server running on port${port}`));
