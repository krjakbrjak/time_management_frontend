/**
 * LoginStatus component.
 *
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { logout } from './helpers/authorization';
import { LOGOUT } from './state/actions/user';

import 'normalize.css';
import './base.css';
import css from './LoginStatus.css';

/**
 * @description Props for {@link LoginStatus} component.
 *
 * @typedef {Object} LoginStatus.Props
 * @property {bool} [isLoggedIn=false] Flag showing if some user is logged in
 * @property {React.node} [children=null] Children (must be of type {@link Menu})
 * is clicked.
 */
/**
 * @description LoginStatus component.
 *
 * Displays information about current user and the button to log
 * the user out. Returns null if no user is logged in.
 *
 * @param {LoginStatus.Props} props Properties
 * @component
 */
const LoginStatus = ({ isLoggedIn, children }) => {
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className={css.status}>
            {children}
            <button
                className={css.logout}
                type="button"
                onClick={() => logout()
                    .then(() => {
                        dispatch({ type: LOGOUT });
                    })}
            >
                Logout
            </button>
        </div>
    );
};

LoginStatus.propTypes = {
    isLoggedIn: PropTypes.bool,
    children: PropTypes.node,
};

LoginStatus.defaultProps = {
    isLoggedIn: false,
    children: null,
};

export default LoginStatus;
