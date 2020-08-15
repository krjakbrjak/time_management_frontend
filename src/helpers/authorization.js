/**
 * Authorization helpers.
 *
 * @file   This file defines helper function/classes to handle authorization requests.
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import { AUTH_API, SESSION_API } from './endpoints';

/**
 * @typedef {('GET'|'POST'|'DELETE')} HTTPMethods
 */

/**
 * Performs Http requests.
 *
 * @private
 * @async
 * @function httpRequest
 * @param {HTTPMethods} method HTTP method
 * @param {string} url URL
 * @param {?Object} data Data
 * @return {Promise.<?Object>}
 */
function httpRequest({ method, url, data }) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => {
            reject(new Error());
        });
        xhr.addEventListener('load', () => {
            resolve({
                response: JSON.parse(xhr.response),
                status: xhr.status,
            });
        });
        xhr.open(method, url);
        switch (method) {
        case 'POST':
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
            break;
        default:
            xhr.send();
        }
    });
}

/**
 * Wraps Http GET request.
 *
 * @private
 * @async
 * @function httpGet
 * @param {string} url URL
 * @return {Promise.<?Object>}
 */
function httpGet(url) {
    return httpRequest({ url, method: 'GET' });
}

/**
 * Wraps Http POST request.
 *
 * @private
 * @async
 * @function httpGet
 * @param {string} url URL
 * @param {Object} data Data
 * @return {Promise.<?Object>}
 */
function httpPost(url, data) {
    return httpRequest({ url, method: 'POST', data });
}

/**
 * Wraps Http DELETE request.
 *
 * @private
 * @async
 * @function httpGet
 * @param {string} url URL
 * @return {Promise.<?Object>}
 */
function httpDelete(url) {
    return httpRequest({ url, method: 'DELETE' });
}
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
    const data = await httpPost(AUTH_API, {
        username,
        password,
    })
        .catch((d) => {
            throw new Error('Login failed');
        });

    if (data.status !== 200) {
        throw new Error('Login failed');
    }
    return data.response;
}

/**
 * Logs a user out.
 *
 * @async
 * @function logout
 * @return {Promise.<Object>} Information about logged-out user.
 */
export async function logout() {
    const value = await httpDelete(AUTH_API);
    if (value.status !== 200) {
        throw new Error('Logout failed');
    }
    return value.response;
}

/**
 * Gathers session details.
 *
 * @async
 * @function getSession
 * @return {Promise.<Object|null>} Information about logged-out user on success, null otherwise.
 */
export function getSession() {
    return httpGet(SESSION_API)
        .then(async (value) => {
            if (value.status !== 200) {
                throw new Error(`${value.status}: ${value.statusText}`);
            }
            return value.response;
        })
        .catch((error) => null);
}
