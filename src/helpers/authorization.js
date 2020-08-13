/**
 * Authorization helpers.
 *
 * @file   This file defines helper function/classes to handle authorization requests.
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import { AUTH_API, SESSION_API } from './endpoints';

/**
 * Authorizes a user.
 *
 * @async
 * @function login
 * @param {string} username Username.
 * @param {string} password Plaintext password.
 * @return {Promise.<Object>} Information about logged-in user.
 */
export async function login({ username, password }) {
    const data = await fetch(AUTH_API, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (data.status !== 200) {
        throw new Error('Login failed');
    }
    return data.json();
}

/**
 * Logs a user out.
 *
 * @async
 * @function logout
 * @return {Promise.<Object>} Information about logged-out user.
 */
export async function logout() {
    const value = await fetch(AUTH_API, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (value.status !== 200) {
        throw new Error('Logout failed');
    }
    return value.json();
}

/**
 * Gathers session details.
 *
 * @async
 * @function getSession
 * @return {Promise.<Object|null>} Information about logged-out user on success, null otherwise.
 */
export function getSession() {
    return fetch(SESSION_API)
        .then(async (value) => {
            if (value.status !== 200) {
                throw new Error(`${value.status}: ${value.statusText}`);
            }
            return value.json();
        })
        .catch((error) => null);
}
