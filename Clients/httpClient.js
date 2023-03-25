const http = require('http');

const options = {
    hostname: 'localhost',
    port: 5000,
    method: 'GET',
};

const req = http.request(options, (res) => {
    let response = '';
    res.on('data', (data) => {
        response += data.toString();
    });

    res.on('close', () => {
        console.log('this is the response on close', response);
    });
});

req.on('error', (error) => {
    console.error(`Error: ${error}`);
});

req.end();
