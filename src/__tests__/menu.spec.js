import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';
import Header from '../Header';
import Menu from '../Menu';
import store from '../state/store';

describe('<Menu />', () => {
    beforeEach(() => {
    });

    afterEach(() => {
    });

    it('<LoginStatus />', () => {
        let wrapper;

        act(() => {
            wrapper = mount(
                <Provider store={store}>
                    <Header>
                        <Menu />
                    </Header>
                </Provider>,
            );
        });

        expect(wrapper.find('.menuContent').hasClass('off')).toBe(true);
        expect(wrapper.find('.menuContent').hasClass('on')).toBe(false);
        wrapper.find('.menu').simulate('mouseenter');
        expect(wrapper.find('.menuContent').hasClass('off')).toBe(false);
        expect(wrapper.find('.menuContent').hasClass('on')).toBe(true);
    });
});
