import React, { useState } from 'react';
import Select from 'react-select';
import useFetchIndicator from '../../services/apis/indicator_name_fetch';

function IndicatorDropdown({ onSelectOption }) {
    // Fetching options using the custom hook
    const { options, loading, error } = useFetchIndicator();

    const [selectedOption, setSelectedOption] = useState([]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="indicator_menu" style={{ margin: 2, width: 180 }}>
            <Select
                value={selectedOption}
                onChange={(option) => {
                    setSelectedOption(option);  // Update the local state
                    onSelectOption(option);     // Call the callback function with the selected option
                }}
                options={options}
                isSearchable
               
                noOptionsMessage={() => "No indicators found"}
                placeholder="Select Indicators"
            />
        </div>
    );
}

export default IndicatorDropdown;
