import  { useState, useEffect } from 'react';

export const FetchData = () => {
    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
    //assuming that date formate in data is in timestramp;
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/csv_data');
            const apiData = await response.json();
            
           //handling with NaN data value.
           const filteredData = apiData.filter(item => !isNaN(item.time));
           //sorted data in asc order.
           const sortedData = filteredData.sort((a, b) => a.time - b.time);
            setInitialData(sortedData);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

   
    console.log('Initial Data:', initialData);
    return initialData;

};


