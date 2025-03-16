function orderBy(array, properties) {
    if (!Array.isArray(array) || !array.every(item => typeof item === 'object' && item !== null)) {
        throw new Error('not a array of objects');
    }
    if (!Array.isArray(properties) || !properties.every(prop => typeof prop === 'string')) {
        throw new Error('not a array of strings');        
    }    
    
    return array.slice().sort((a, b) => {
        for (prop of properties) {
            if (!(prop in a) || !(prop in b)) {
                throw new Error(`property "${prop}" is missing`);
            }
            
            if (a[prop] < b[prop]) return -1;
            if (a[prop] > b[prop]) return 1;
        }
        return 0;
    });
}

module.exports = orderBy;