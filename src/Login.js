/**
 * Login component.
 *
 * @file Defines login component.
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty } from './helpers/object';
import { LOGIN } from './state/actions/user';

import 'normalize.css';
import './base.css';
import loginCss from './Login.css';

/**
 * @description Args for {@link Login.login} callback.
 *
 * @typedef {Object} Login.args
 * @property {string} username Username
 * @property {string} passwerd Password
 */
/**
 * @async
 * @callback Login.login
 * @param {Login.args} args Args.
 * @return {Promise.<Object>} Information about logged-in user.
 */
/**
 * @description Props for {@link Login} component.
 *
 * @typedef {Object} Login.Props
 * @property {Login.login} [login=false] A callback to log the user in.
 */
/**
 * @description Login screen.
 *
 * @param {Login.Props} props Properties
 * @component
 * @example
 * <Login login={() => {}} />
 */
const Login = ({ login }) => {
    // Local state: keeps username and password
    const [values, setValues] = useState({});
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function submit(event) {
        // This is required to avoid default HTML <form/>'s behavior
        event.preventDefault();

        login(values)
            .then((data) => {
                dispatch({ type: LOGIN, username: values.username });
            })
            .catch((error) => {
            });
    }

    function handleChange(event) {
        event.persist();
        setValues((data) => ({ ...data, [event.target.id]: event.target.value }));
    }

    if (!isEmpty(user)) {
        return null;
    }

    return (
        <form onSubmit={submit}>
            <div className={loginCss.containerOuter}>
                <div className={loginCss.containerInner}>
                    <label htmlFor="username">Username:</label>
                    <input
                        onChange={handleChange}
                        data-testid="username"
                        type="text"
                        id="username"
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        onChange={handleChange}
                        data-testid="password"
                        type="password"
                        id="password"
                        required
                    />
                    <input
                        className={loginCss.btn}
                        data-testid="login"
                        type="submit"
                        value="Login"
                    />
                </div>
            </div>
        </form>
    );
};

Login.propTypes = {
    /**
     * Function that logs the user in.
     */
    login: PropTypes.func.isRequired,
};

export default Login;
