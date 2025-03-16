const dataLoader = require('./dataLoader');
const calc_Stats = require('./calc_Stats');

async function calcStatsFromAPI() {
    const data = await dataLoader.loadData();
    return calc_Stats.calcStats(data);
}

module.exports.calcStatsFromAPI = calcStatsFromAPI;