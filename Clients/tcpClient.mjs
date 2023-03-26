import { createConnection } from 'net';

//Create the sendRequest Function

const sendRequest = function (method, path, callback, body = null) {
    let response = '';
    const socket = createConnection(this.port, this.host);

    socket.on('connect', () => {
        const request_lines = [`${method} ${path} HTTP/1.1`, `Host: ${this.host}`];

        for (let header in this.headers) {
            request_lines.push(`${header} : ${this.headers[header]}`);
        }

        if (body) {
            request_lines.push(`Content-Length: ${Buffer.byteLength(body)}`);
        }

        const request = `${request_lines.join('\r\n')}\r\n\r\n${body || ''}`;

        socket.write(request);
    });

    socket.on('data', (chuck) => {
        response += chuck;
    });

    socket.on('end', () => {
        const [headers, body] = response.split('\r\n\r\n');
        const statusCode = headers.split(' ')[1];
        callback(null, {
            statusCode,
            headers,
            body,
        });
    });

    socket.on('error', (err) => {
        callback(err);
    });
};

//Create a factory function that will return  a client Object with a sendRequest function as a method

const CreateHttpClient = (port, host) => {
    const client = {};
    client.port = port;
    client.host = host;
    client.headers = { 'content-type': 'application/json' };
    client.sendRequest = sendRequest.bind(client);
    return client;
};

// Instantiate the client

const client = CreateHttpClient(5000, 'localhost');

// Send the request

client.sendRequest('GET', '/', (err, resp) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(resp.body);
});
