const fetch = require('node-fetch');

async function getDataFromAPI(url = "https://dummyjson.com/recipes") {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Ошибка ответа HTTP');
    }

    const data = await response.json();
    return data;
}

module.exports.getDataFromAPI = getDataFromAPI;