import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {  
    constructor(props) {
        super(props);
    }

    render() {
        let link = this.props.link ? (<Link to={this.props.link}>{this.props.label}</Link>) : (<span>{this.props.label}</span>);
        return (
            <div>
                {link}
                {this.props.children}
            </div>
        );
    }
}