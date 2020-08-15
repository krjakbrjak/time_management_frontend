/**
 * App store.
 *
 * @file   This file defines redux store for the app.
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import { createStore } from 'redux';

import reducer from './reducers/index';

const store = createStore(reducer);

export default store;
