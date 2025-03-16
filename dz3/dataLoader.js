const fetch = require('node-fetch');

async function loadData(url= "https://catfact.ninja/breeds") {
    let allData = [];
    let currentPage = url;

    while (currentPage) {
        const response = await fetch(currentPage);
        const jsonData = await response.json();

        allData = allData.concat(jsonData.data);

        currentPage = jsonData.next_page_url;
    }
    return allData;
}

module.exports.loadData = loadData;