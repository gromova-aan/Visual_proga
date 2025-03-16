const orderBy = require('./orderBy');

describe('orderBy func', () => {
    test('sort array by one property', () => {
        const input = [
            {name: 'Kirill', age: 19},
            {name: 'Nastya', age: 20},
            {name: "Alexandr", age: 17}
        ];
        
        const result = orderBy(input, ['age']);
        
        expect(result).toEqual([
            {name: "Alexandr", age: 17},
            {name: 'Kirill', age: 19},
            {name: 'Nastya', age: 20}
        ]);
    });

    test('sort array by two property', () => {
        const input = [
            {name: 'Nastya', age: 20},
            {name: 'Kirill', age: 19},
            {name: "Alexandr", age: 17},
            {name: 'Kirill', age: 16}
        ];

        const result = orderBy(input, ['name', 'age']);

        expect(result).toEqual([
            {name: "Alexandr", age: 17},
            {name: 'Kirill', age: 16},
            {name: 'Kirill', age: 19},
            {name: 'Nastya', age: 20}
        ]);
    });

    test('error not array of objects', () => {
        expect(() => orderBy([1, 2, 3], ['age'])).toThrow('not a array of objects');
    });

    test('error not array of strings', () => {
        const input = [{name: 'Kirill', age: 19}];
        expect(() => orderBy(input, [1, 2, 3])).toThrow('not a array of strings');
    });

    test('error missing propertys', () => {
        const input = [
            {name: "Alexandr", age: 17},
            {name: 'Kirill'}
        ]

        expect(() => orderBy(input, ['age'])).toThrow('property "age" is missing');
    });
});