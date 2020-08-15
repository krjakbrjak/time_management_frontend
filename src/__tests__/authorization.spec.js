import React from 'react';
import { Provider } from 'react-redux';

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import sinon from 'sinon';

import Login from '../Login';
import store from '../state/store';
import { login } from '../helpers/authorization';

describe('<Login />', () => {
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

    it('Clicking the Login button', done => {
        const {container} = render(
            <Provider store={store}>
                <Login login={login}/>
            </Provider>
        );

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
            status: 200,
            json: async () => Promise.resolve({user: 'admin'})
        }));

        fireEvent.change(screen.getByTestId('username'), {
            target: {
                value: 'admin'
            }
        });
        fireEvent.change(screen.getByTestId('password'), {
            target: {
                value: 'password'
            }
        });

        fireEvent.click(screen.getByTestId('login'));
        requests[0].respond(200, null, JSON.stringify({ user: 'username' }));

        setTimeout(() => {
            expect(container.querySelector('[data-testid=password]')).toBeNull();
            done();
        }, 0);

    });
});
