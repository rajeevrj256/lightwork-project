// DropdownMenu.js
import React from 'react';
import Select from "react-select";
import useFetchSymbols from '../../services/apis/symbol_fetch'; 

function DropdownMenu({ date }) {
    const { options } = useFetchSymbols(date);
    const [selectedOption, setSelectedOption] = React.useState(null);
    console.log(options)
   

    return (
        <div className="drop_down_menu" style={{ margin: 20, width: 200 }}>
            <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isSearchable
                isMulti
                noOptionsMessage={() => "Not found"}
                placeholder="Select Symbol"
            />
        </div>
    );
}

export default DropdownMenu;
