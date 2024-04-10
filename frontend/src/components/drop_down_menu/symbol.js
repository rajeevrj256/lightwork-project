import Select from "react-select";
import React, { useState } from 'react';

function DropdownMenu() {
 const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "NIFTY50", label: "Nifty50" },
    { value: "BANKNIFTY", label: "Banknifty" },
    { value: "Midcap", label: "Midcap" }
  ];

  return (
    <div
    className="drop_down_menu" 
    style={{margin:20,width:200}}>
      <Select 
      defaultValue={selectedOption}
      placeholder="Symbol"
      onChange={setSelectedOption}
      options={options}
      isSearchable
      isMulti
      noOptionsMessage={()=>"Not found"}

      style={{
          clearIndicator:()=>({
              color:"red"
            }),
            
        }}
        />
    </div>
  );
}

export default DropdownMenu;
