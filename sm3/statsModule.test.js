const statsModule = require('./statsModule');
const dataLoader = require('./dataLoader');

test('test1', async () => {
    const mockData = {
        recipes: [
            {
                id: 1,
                name: 'Pasta',
                ingredients: ['pasta', 'tomato', 'cheese'],
            },
            {
                id: 2,
                name: 'Salad',
                ingredients: ['lettuce', 'tomato', 'cucumber', 'cheese'],
            },
        ],
    };

    const fMock = jest.spyOn(dataLoader, "getDataFromAPI");
    fMock.mockImplementation(() => Promise.resolve(mockData));

    let result = await statsModule.getStats();

    const expectedStats = {
        pasta: 1,
        cheese: 2,
        lettuce: 1,
        tomato: 2,
        cucumber: 1,
    };

    expect(result).toEqual(expectedStats);

    jest.restoreAllMocks();
})