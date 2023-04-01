/** To run the file open your terminal and run node httpCient.mjs
 * You can only run one command at a time.
 * If you run the command as is you will create a post.
 * To get all todos , comment out the first command and uncomment the second command.
 */

import http from 'http';

//Generic function to do a request
const doRequest = (options, postData) => {
    const req = http.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    if (postData) {
        req.write(postData);
    }
    req.end();
};

// Create a post
//---------------
const postData = JSON.stringify({
    title: 'foo5',
    body: 'bar5',
    userId: 1,
});

const optionsToCreateAPost = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
    },
};

doRequest(optionsToCreateAPost, postData);

// Get all todos
//---------------

const optionsToGetAllTodos = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/todos/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
};

// doRequest(optionsToGetAllTodos);

// Updating the todo with id 1
//----------------------------
const optionsUpdateTodoId1 = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/todos/1',
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
};

const updateData = JSON.stringify({
    title: 'Pilex',
    body: 'laFlex',
    userId: 1,
});

//doRequest(optionsUpdateTodoId1, updateData);

// Delete the todo with id 2
//----------------------------
const optionsDeleteTodoId2 = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/todos/2',
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
};

// doRequest(optionsDeleteTodoId2);
