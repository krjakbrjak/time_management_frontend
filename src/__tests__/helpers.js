import {
    login,
    logout
} from '../helpers/authorization';
import { isEmpty } from '../helpers/object';

describe('Helpers\' tests', () => {
    beforeEach(() => {
        if (global.fetch) {
            global.fetch.mockClear();
        }
    })
    it('login', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: async () => Promise.resolve({user: 'username'})
        }));

        const result = await login('username', 'password');

        expect(result).toEqual({
            user: 'username'
        });
    });

    it('logout', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: async () => Promise.resolve(null)
        }));

        const result = await logout();

        expect(result).toEqual(null);
    });

    it('isEmpty', async () => {
        expect(isEmpty({})).toEqual(true);
        expect(isEmpty({a:1})).toEqual(false);
        expect(isEmpty(1)).toEqual(false);
        expect(isEmpty(() => {})).toEqual(false);
    });
});
