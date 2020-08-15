import sinon from 'sinon';

import {
    login,
    logout
} from '../helpers/authorization';
import { isEmpty } from '../helpers/object';

describe('Helpers', () => {
    let xhr = null;
    let requests = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = (xhr) => {
            requests.push(xhr);
        };
    });

    afterEach(() => {
        xhr.restore();
    });

    it('login', async (done) => {
        login('username', 'password')
            .then((result) => {
                expect(requests.length).toEqual(1);
                expect(result).toEqual({
                    user: 'username'
                });
                done();
            });
        requests[0].respond(200, null, JSON.stringify({ user: 'username' }));
    });

    it('logout', async (done) => {
        const result = logout()
            .then((result) => {
                expect(requests.length).toEqual(1);
                expect(result).toEqual(null);
                done();
            });
        requests[0].respond(200, null, JSON.stringify(null));
    });

    it('isEmpty', async () => {
        expect(isEmpty({})).toEqual(true);
        expect(isEmpty({a:1})).toEqual(false);
        expect(isEmpty(1)).toEqual(false);
        expect(isEmpty(() => {})).toEqual(false);
    });
});
