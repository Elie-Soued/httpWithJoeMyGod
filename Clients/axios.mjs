/** To run the file open your terminal and run node axios.mjs
 * You can only run one command at a time.
 * If you run the command as is you will get all the todos.
 * To get the todo with id 1, comment out the first command and uncomment the second command.
 */

import axios from 'axios';

const URLTodos = 'https://jsonplaceholder.typicode.com/todos/';
const URLPosts = 'https://jsonplaceholder.typicode.com/posts/';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

const doRequest = async (method, url, body) => {
    try {
        const response = await axios({
            method,
            url,
            headers,
            body,
        });
        console.log(response.data);
    } catch (error) {
        console.log(error, 'DB might be out of sync');
    }
};

// Get all todos
//---------------
doRequest('GET', URLTodos);

// Get  the todo with id 1
//---------------------------
// doRequest('GET', `${URLTodos}/1`);

// Create a new Todo
//-------------------
// doRequest('POST', URLPosts, {
//     title: 'foo5',
//     body: 'bar5',
//     userId: 1,
// });

// Updating the todo with id 1
//----------------------------
// doRequest('PUT', `${URLPosts}/1`, {
//     title: 'Joe',
//     body: 'est un ouf',
//     userId: 1,
// });

// Deleting the todo with id 1
//----------------------------
// doRequest('DELETE', `${URLPosts}/1`);
