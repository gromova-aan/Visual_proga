const calcStatsFromAPI = require('./calc_Stats_From_API');
const dataLoader = require('./dataLoader');

test('test1', async () => {
    const mockData = [
        {
            breed: 'Turkish Van',
            country: 'UK',
            origin: 'Natural',
            coat: 'Semi-long',
            pattern: 'Van'
        },
        {
            breed: 'York Chocolate',
            country: 'USA',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid'
        },
        {
            breed: 'Asian',
            country: 'UK',
            origin: '',
            coat: 'Short',
            pattern: 'Evenly solid'
        }   
    ];

    const fMock = jest.spyOn(dataLoader, "loadData");
    //замена оригинальной функции на mock-функцию которая возвращает промис с заранее подготовленными данными
    fMock.mockImplementation(() => Promise.resolve(mockData));
    
    let result = await calcStatsFromAPI.calcStatsFromAPI();

    expect(result).toEqual({UK: 2, USA: 1});
    expect(dataLoader.loadData).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
})