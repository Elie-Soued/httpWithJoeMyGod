/** To run the file open your terminal and run node tcpCient.mjs
 * You can only run one command at a time.
 * If you run the command as is you will get all the todos.
 * To create a post , comment out the first command and uncomment the second command.
 */

import { createConnection } from 'net';

//Create the sendRequest Function
const sendRequest = function (method, path, callback, body = null) {
    let response = '';
    const socket = createConnection(this.port, this.host);

    socket.on('connect', () => {
        const request_lines = [`${method} ${path} HTTP/1.1`, `Host: ${this.host}`, 'Connection: close'];

        for (let header in this.headers) {
            request_lines.push(`${header} : ${this.headers[header]}`);
        }

        if (body) {
            request_lines.push(`Content-Length: ${Buffer.byteLength(body)}`);
        }

        const request = `${request_lines.join('\r\n')}\r\n\r\n${body || ''}`;

        socket.write(request);
    });

    socket.on('data', (chunk) => {
        response += chunk;
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

//Create a factory function that will return  a client Object
// with a sendRequest function as a method
const CreateHttpClient = (port, host) => {
    const client = {};
    client.port = port;
    client.host = host;
    client.headers = { 'content-type': 'application/json' };
    client.sendRequest = sendRequest.bind(client);
    return client;
};

// Instantiate the client
const client = CreateHttpClient(80, 'jsonplaceholder.typicode.com');

// Get all todos
//----------------

// client.sendRequest('GET', '/todos/', (err, resp) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(resp.body);
// });

// Create a post
//---------------

client.sendRequest(
    'POST',
    '/posts/',
    (err, resp) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(resp.body);
    },
    JSON.stringify({
        title: 'foo5',
        body: 'bar5',
        userId: 1,
    })
);

// Updating the todo with id 1
//----------------------------

// client.sendRequest(
//     'PUT',
//     '/todos/',
//     (err, resp) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(resp.body);
//     },
//     JSON.stringify({
//         title: 'salut',
//         body: 'Je suis un fils de ouf',
//         userId: 1,
//     })
// );

// Get todo with id 1
//----------------

// client.sendRequest(
//     'GET',
//     '/todos/1',
//     (err, resp) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(resp.body);
//     },
//     null
// );
