/** To run the file open your terminal and run node axios.mjs
 * You can only run one command at a time.
 * If you run the command as is you will get all the todos.
 * To get the todo with id 1, comment out the first command and uncomment the second command.
 */

import axios from 'axios';

const URLTodos = 'http://localhost:5000/posts';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
};

const doRequest = async (method, url, data) => {
    try {
        const response = await axios({
            method,
            url,
            headers,
            data,
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
// doRequest('GET', `${URLTodos}/277`);

// Create a new Todo
//-------------------
// doRequest('POST', URLTodos, {
//     todo: 'fils de ouf',
// });

// Updating the todo with id 1
//----------------------------
// doRequest('PUT', `${URLTodos}/277`, {
//     todo: 'fils de ouf updated',
// });

// Deleting the todo with id 1
//----------------------------
// doRequest('DELETE', `${URLTodos}/266`);
