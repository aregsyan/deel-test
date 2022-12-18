const supertest = require('supertest');

class TestRunner {
    static async request(opts) {
        const test = supertest(opts.app)[opts.method](opts.url);
        test
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Connection', 'close')
        if (opts.query) {
            test.query(opts.query);
        }
        if (opts.body) {
            test.send(opts.body);
        }
        return test;
    }
}

module.exports = TestRunner;
