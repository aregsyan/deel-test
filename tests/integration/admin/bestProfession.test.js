const App = require('../../../src/app');
const TestRunner = require('../testrunner/runner');
const DB_PATH = 'tests/integration/testrunner/dbs/admin.database.sqlite3';
const DB_DIALECT = 'sqlite';

describe('Get best Profession', () => {
    let app;

    beforeEach(async () => {
        app = new App();
    });

    afterEach(async () => {
        await app.close();
    })

    it('request to get the best profession using start and end', async () => {
        const dbConfig = {
            dialect: DB_DIALECT,
            storage: DB_PATH,
        };
        const expectedResult = {profession: 'Programmer'};
        await app.start(7001, dbConfig);
        const start = '2022-12-18T00:57:00';
        const end = '2022-12-18T17:58:00';
        const { body } = await TestRunner.request({
            query: {
                start,
                end,
            },
            app: app.server,
            method: 'get',
            url: '/admin/best-profession',

        });
        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual(expectedResult);

    });
});

