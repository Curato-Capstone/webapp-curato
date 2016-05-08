import React, { Component } from 'react';
import Radium from 'radium';

import { primaryColor, secondaryColor } from 'utils/colors';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

@Radium
export default class Select extends Component {
    static defaultProps = {};
    props: {
        options      : Array<string>,
        value        : string,
        onChange     : () => void,
        placeholder? : string
    };
    state: void;

    render() {
        const { options, onChange, value, placeholder, ...other } = this.props;
        return (
            <div>
                <SelectField
                    value={value}
                    onChange={(e) => onChange(e.target.textContent)}
                    placerholder={placeholder}
                    fullWidth
                    underlineStyle={{ borderColor: primaryColor }}
                    underlineFocusStyle={{ borderColor: primaryColor }}
                    floatingLabelStyle={{ color: secondaryColor }}
                    {...other}
                >
                    {options.map((option) =>
                        <MenuItem key={option} value={option} primaryText={option} />
                    )}
                </SelectField>
            </div>
        );
    }
}
