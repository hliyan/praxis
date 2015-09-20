import React from 'react';
import Styles from './Styles';

var style = Styles.get('input');

/**
 * USAGE:
 * <Input schema={userSchema} value={user.username} fieldName={username} onChange={handleChange} />
 */
export default class Input extends React.Component {  
    constructor(props) {
        super(props);
        this.state = { style: style };

        this._onChange = (e) => {
            if (this.props.onChange)
                this.props.onChange(e.target.value);
        };
    }

    render() {
        let entityName = this.props.schema.name.singular;
        let fieldName = this.props.fieldName;
        let fieldSchema = this.props.schema.fields[fieldName];
        let id = entityName + '.' + fieldName;
        return (
            <div>
                <label style={this.state.style.label}>{fieldSchema.label}</label> 
                <input style={this.state.style.input} id={id} type={fieldSchema.type} value={this.props.value} onChange={this._onChange} />
            </div>
        );
    }
}