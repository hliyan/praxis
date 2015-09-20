import React from 'react';
import Menu from './Menu';
import MenuBarHeader from './MenuBarHeader';

export default class MenuBar extends React.Component {  
    constructor(props) {
        super(props);
    }

    /**
     * recursively constructs a menu item and its child menus (if the exist), 
     * rending only those items that the current session has permission to access
     */
    renderMenu(item, renderedItems) {
        let visible = (!item.permission || (this.props.session && (item.permission in this.props.session.permissions)));
        if (!visible)
            return;
        let renderedChildren = [];
        if (item.children) {
            item.children.forEach(child => {
                this.renderMenu(child, renderedChildren);
            });
        }
        renderedItems.push((<Menu key={item.label} label={item.label} link={item.link || ''}>{renderedChildren}</Menu>));
    }

    render() {
        let visibleMenu = [];
        this.props.items.forEach(item => {
            this.renderMenu(item, visibleMenu);
        });

        return (
            <div>
                <MenuBarHeader logo="logo.png" label="Praxis" link="dashboard" />
                {visibleMenu}
            </div>
        );
    }
}