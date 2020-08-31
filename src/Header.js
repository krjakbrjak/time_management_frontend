/**
 * Header component.
 *
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import React from 'react';

import Menu from './Menu';

import 'normalize.css';
import './base.css';
import css from './Header.css';

/**
 * @description Props for {@link Header} component.
 *
 * @typedef {Object} Header.Props
 * @property {Menu} [children=null] Children (must be of type {@link Menu})
 * is clicked.
 */
/**
 * @description Header component.
 *
 * Displays information and menus of the application.
 *
 * @param {Header.Props} props Properties
 * @component
 */
const Header = ({ children }) => (
    <div className={css.header}>
        <img className={css.headerIcon} src="/assets/img_header_logo.png" alt="Time manager" />
        <div className={css.container}>
            {children}
        </div>
    </div>
);

Header.propTypes = {
    children: (props, propName, componentName) => {
        const prop = props[propName];

        const error = null;
        React.Children.forEach(prop, (child) => {
            if (child.type !== Menu) {
                throw new Error(`${componentName} can have children of type Menu only!`);
                // error = new Error(`${componentName} can have children of type Menu only!`);
            }
        });
        return error;
    },
};

Header.defaultProps = {
    children: null,
};

export default Header;
