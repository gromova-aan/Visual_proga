const calc_Stats_From_API = require('./calc_Stats_From_API');

async function run() {
    try {
        let result = await calc_Stats_From_API.calcStatsFromAPI();

        console.log("Статистика по странам:");
        console.log(result);
    } catch (error) {
        console.error("Ошибка при выполнении caclStatsFromAPI", error.message);
    }
}

run();