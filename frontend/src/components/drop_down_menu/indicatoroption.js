import React, { useState } from 'react';
import Select from 'react-select';

function IndicatorDropdown({ onSelectOption }) {
    // Options for the dropdown, each option needs a value and a label
    const options = [
        { value: 'SMA', label: 'Simple Moving Average (SMA)' },
        { value: 'BB', label: 'Bollinger Bands (BB)' },
        { value: 'EMA', label: 'Exponential Moving Average (EMA)' },
        { value: 'RACD', label: 'Relative Average Cost Difference (RACD)' }  // Assuming RACD, replace with correct acronym if different
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="indicator_menu" style={{ margin: 20, width: 200 }}>
            <Select
                value={selectedOption}
                onChange={(option) => {
                    setSelectedOption(option);
                    onSelectOption(option);  // Call the callback function passed from the parent component
                }}
                options={options}
                isSearchable
                isMulti
                noOptionsMessage={() => "Not found"}
                placeholder="Select Indicator"
            />
        </div>
    );
}

export default IndicatorDropdown;
