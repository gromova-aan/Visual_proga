const dataLoader = require('./dataLoader');

async function getStats() {
    const data = await dataLoader.getDataFromAPI();
    const recipes = data.recipes;
    let stats = {};
 
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if (stats[ingredient]) {
                stats[ingredient]++;
            } else {
                stats[ingredient] = 1;
            }
            
        })
    });
    return stats;
}

module.exports.getStats = getStats;