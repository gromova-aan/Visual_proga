const statsModule = require('./statsModule');

async function run() {
    try {
        let result = await statsModule.getStats();

        console.log("Статистика:");
        console.log(result);
    } catch(error) {
        console.error("Ошибка:", error.message);
    }
}

run();