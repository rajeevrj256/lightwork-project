import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from 'react-icons/fa';

const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
        <div className='input-group'>
            <input type='text' className='form-control custom-input' value={value} onClick={onClick} ref={ref} readOnly />
            <div className='input-group-text'>
                <FaCalendarAlt />
            </div>
        </div>
    );
});

export const DatePickerComponent = ({ startDate, setstartDate }) => {
    const handleDateChange = (date) => {
        
        setstartDate(date); // Update the dateFetch variable in the parent component (App)
    };
    
    return (
        <label className='date-picker-container'>
            <DatePicker selected={startDate} 
            onChange={handleDateChange} 
            customInput={<CustomInput />}  
            
             
             />
        </label>
    );
};
