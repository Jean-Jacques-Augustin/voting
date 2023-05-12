import React from "react";
import {TextField} from "@mui/material";


const CustomTextField = ({label, name, value, error, helperText, onChange, ...props}) => {
    const handleChange = (event) => {
        if (onChange) {
            onChange({
                target: {
                    name: event.target.name, value: event.target.value,
                },
            });
        }
    };

    return (<TextField
        fullWidth={true}
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        error={!!error}
        helperText={helperText}
        {...props}
    />);
};

export default CustomTextField;