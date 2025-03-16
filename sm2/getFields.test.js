const getFields = require('./getFields');

test('верный возврат массива', () => {
    const objs = [
        {id: 1, name: "Kirill"},
        {id: 2, name: "Nastya"},
        {id: 3, name: "Ilya"},
        {id: 4, name: "Dima"}
    ];

    const field = "name";
    const result = getFields(objs, field);
    expect(result).toEqual(["Kirill", "Nastya", "Ilya", "Dima"]);
});

test('не верный возврат массива', () => {
    const objs = [
        {id: 1, name: "Kirill"},
        {id: 2, name: "Nastya"},
        {id: 3}
    ];

    const field = "name";
    expect(() => getFields(objs, field)).toThrowError('field not in a object');
})
