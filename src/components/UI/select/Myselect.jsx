import React from 'react';

const Myselect = ({option, defualtValue, value, onChange}) => {
    return (
        <select
        value={value}
        onChange={event => onChange(event.target.value)}
        >
            <option disabled={true} value="">{defualtValue}</option>
            {option.map(option => 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
                )}
        </select>
    );
};

export default Myselect;
