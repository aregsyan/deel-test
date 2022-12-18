const App = require('../../../src/app');
const TestRunner = require('../testrunner/runner');
const DB_PATH = 'tests/integration/testrunner/dbs/admin.database.sqlite3';
const DB_DIALECT = 'sqlite';

describe('Get best Client', () => {
    let app;

    beforeEach(async () => {
        app = new App();
    });

    afterEach(async () => {
        await app.close();
    })

    it('request to get the best clients with start, end and limit of 2', async () => {
        const dbConfig = {
            dialect: DB_DIALECT,
            storage: DB_PATH,
        };
        const expectedResult = [
            { id: 4, fullName: 'Ash Kethcum', paid: 2020 },
            { id: 1, fullName: 'Harry Potter', paid: 643 }
        ];
        await app.start(8001, dbConfig);
        const start = '2022-12-18T00:57:00';
        const end = '2022-12-18T17:58:00';
        const { body } = await TestRunner.request({
            query: {
                start,
                end,
            },
            app: app.server,
            method: 'get',
            url: '/admin/best-clients',

        });
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toEqual(2);
        expect(body).toEqual(expectedResult);

    });
});

