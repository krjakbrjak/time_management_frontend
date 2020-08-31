/**
 * Menu component.
 *
 * @author Nikita Vakula <programmistov.programmist@gmail.com>
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import 'normalize.css';
import './base.css';

import css from './Menu.css';

/**
 * @description Props for {@link Menu} component.
 *
 * @typedef {Object} Menu.Props
 * @property {string} [icon=null] Menu icon
 * @property {React.node} [children=null] Children (must be of type {@link Menu})
 * is clicked.
 */
/**
 * @description Menu component.
 *
 * Represents a menu item inside a {@link Header} container.
 *
 * @param {Menu.Props} props Properties
 * @component
 */
const Menu = ({ icon, children }) => {
    const [visible, setVisible] = useState(false);
    let contentClass = css.menuContent;
    if (visible) {
        contentClass = `${contentClass} ${css.on}`;
    } else {
        contentClass = `${contentClass} ${css.off}`;
    }
    return (
        <div
            className={css.menu}
            onMouseEnter={() => { setVisible(true); }}
            onMouseLeave={() => { setVisible(false); }}
        >
            <div className={css.menuIconContainer}>
                <img
                    className={css.menuIcon}
                    src={icon}
                    alt="Icon"
                />
            </div>
            <div className={contentClass}>
                {children}
            </div>
        </div>
    );
};

Menu.propTypes = {
    icon: PropTypes.string,
    children: PropTypes.node,
};

Menu.defaultProps = {
    icon: null,
    children: null,
};

export default Menu;
