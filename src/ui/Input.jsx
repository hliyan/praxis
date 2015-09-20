import React from 'react';

var style = {
    label: {
        marginLeft: '0.5em',
        marginRight: '3em',
        fontFamily: 'sans-serif',
        color: '#bbb'
    },
    input: {
        margin: '0.5em',
        padding: '0.5em'
    }
};

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