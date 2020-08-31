/**
 * App component.
 *
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login, getSession } from './helpers/authorization';
import Login from './Login';
import Content from './Content';
import Header from './Header';
import Menu from './Menu';
import LoginStatus from './LoginStatus';
import { LOGIN, LOGOUT } from './state/actions/user';
import { isEmpty } from './helpers/object';

import 'normalize.css';
import './base.css';

/**
 * Defines App component.
 * @component
 */
const App = () => {
    const globalState = useSelector((state) => state);
    // Shows if the component has been mounted.
    const [mounted, setMounted] = useState(false);
    // Shows if the component was fully initialized,
    // if all the checks have been performed (i.e. user
    // status/etc.).
    const [init, setInit] = useState(false);
    const dispatch = useDispatch();

    const session = async () => {
        const res = await getSession();
        if (res) {
            dispatch({
                type: LOGIN,
                username: res.username,
            });
        } else {
            dispatch({
                type: LOGOUT,
            });
        }

        // At this point the copmponent can be displayed
        setInit(true);
    };

    useEffect(() => {
        if (!mounted) {
            session();
            setMounted(true);
        }
    });

    if (!init) {
        // TODO: Show user that the app is being initialized.
        return null;
    }

    let content = null;
    if (isEmpty(globalState.user)) {
        content = <Login login={login} />;
    } else {
        content = <Content />;
    }

    return (
        <div>
            <Header>
                <Menu>
                    <LoginStatus isLoggedIn={!isEmpty(globalState.user)} />
                </Menu>
            </Header>
            {content}
        </div>
    );
};

export default App;
