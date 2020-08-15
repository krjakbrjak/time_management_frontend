import React from 'react';
import { Provider } from 'react-redux';

import {
    render,
    screen,
    fireEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';

import Login from '../Login';
import store from '../state/store';
import { login } from '../helpers/authorization';

describe('<Login />', () => {
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

        setTimeout(() => {
            expect(container.querySelector('[data-testid=password]')).toBeNull();
            done();
        }, 0);

    });
});
