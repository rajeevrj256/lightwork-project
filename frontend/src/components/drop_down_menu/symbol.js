// DropdownMenu.js
import React from 'react';
import Select from "react-select";
import useFetchSymbols from '../../services/apis/symbol_fetch'; 

function DropdownMenu({ date ,onSelectOption}) {
    const { options } = useFetchSymbols(date);
    const [selectedOption, setSelectedOption] = React.useState(null);
    console.log(options)
    console.log('Selected Option:', selectedOption);
   

    return (
        <div className="drop_down_menu" style={{ margin: 2, width: 180 }}>
            <Select
                value={selectedOption}
                onChange={(option) => {
                    setSelectedOption(option);
                    onSelectOption(option);  // Call the callback function passed from App.js
                }}
                options={options}
                isSearchable
                
                noOptionsMessage={() => "Not found"}
                placeholder="Select Symbol"
            />
        </div>
    );
}

export default DropdownMenu;
