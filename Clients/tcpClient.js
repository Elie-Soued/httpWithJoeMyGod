const net = require('net');

function createHTTPClient(host, port = 80) {
    const client = Object.create(createHTTPClient.prototype);
    client.host = host;
    client.port = port;
    client.headers = {};
    client.body = null;
    return client;
}

createHTTPClient.prototype.sendRequest = function (method, path, headers = {}, body = null, callback) {
    const socket = net.createConnection(this.port, this.host);
    const allHeaders = Object.assign({}, this.headers, headers);
    socket.on('connect', () => {
        const request_lines = [`${method} ${path} HTTP/1.1`, `Host: ${this.host}`];
        for (let header in allHeaders) {
            request_lines.push(`${header}: ${allHeaders[header]}`);
        }
        if (body) {
            request_lines.push(`Content-Length: ${Buffer.byteLength(body)}`);
        }
        const request = `${request_lines.join('\r\n')}\r\n\r\n${body || ''}`;
        socket.write(request);
    });
    let response = '';
    socket.on('data', (chunk) => {
        response += chunk.toString();
    });
    socket.on('end', () => {
        const [allHeaders, body] = response.split('\r\n\r\n');
        const status_code = parseInt(allHeaders.split(' ')[1]);
        const headers = {};
        allHeaders.split('\r\n').forEach((line) => {
            const [name, value] = line.split(': ');
            headers[name] = value;
        });
        callback(null, {
            status: status_code,
            headers: headers,
            body: body,
        });
    });
    socket.on('error', (err) => {
        callback(err);
    });
};

const client = createHTTPClient('localhost', 5000);
client.headers['Content-Type'] = 'application/json';

client.sendRequest('GET', '/', null, null, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(res.status);
    console.log(res.body);
});
