import { request } from 'http';

const options = {
    method: 'GET',
    hostname: 'localhost',
    port: 5000,
};

const req = request(options, (res) => {
    let response = '';

    res.on('data', (chunk) => {
        response += chunk;
    });

    res.on('close', () => {
        console.log(response);
    });

    res.on('error', (err) => {
        console.log(err);
    });
});

req.end();
