import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from './helpers/object';
import { logout } from './helpers/authorization';
import { LOGOUT } from './state/actions/user';

import 'normalize.css';
import './base.css';

const Content = () => {
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();

    if (isEmpty(globalState.user)) {
        return null;
    }
    return (
        <input
            type="button"
            onClick={() => logout()
                .then(() => {
                    dispatch({ type: LOGOUT });
                })}
            value="Logout"
        />
    );
};

export default Content;
