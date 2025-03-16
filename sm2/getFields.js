function getFields(objs, field) {
    if (!Array.isArray(objs)) {
        throw new Error('not a array');
    }    
    
    const result = [];
    for (const obj of objs) {
        if (typeof obj !== 'object' || obj === null) {
            throw new Error('not a object');
        }
        if (!(field in obj)) {
            throw new Error('field not in a object');
        }
        result.push(obj[field]);
    }
    return result;
}

module.exports = getFields;
