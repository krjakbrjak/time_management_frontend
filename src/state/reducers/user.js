/**
 * User reducer.
 *
 * @file   This file defines redux reducer managing users state.
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import { LOGIN, LOGOUT } from '../actions/user';

/**
 * Action type describing {@link user} actions.
 * @typedef {Object} UserAction
 * @property {string} type - Action: [{@link LOGIN}, {@link LOGOUT}].
 * @property {string} username - Username of a logged-in user (mandatory only for {@link LOGIN}).
 */

/**
 * Receives/handles all user login/logout actions.
 *
 * @function user
 * @param {Object} state Current state.
 * @param {UserAction} action Action object.
 * @return {Object} The state after processing an action.
 */
export default function user(state = {}, action) {
    switch (action.type) {
    case LOGIN:
        return {
            username: action.username,
        };
    case LOGOUT:
    default:
        return {};
    }
}
