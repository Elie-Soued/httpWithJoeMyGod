const axios = require('axios');

const getResponse = async () => {
    try {
        const response = await axios('http://localhost:5000/');
        console.log(response.data);
    } catch (error) {
        console.log(error, 'someting happened');
    }
};

getResponse();
