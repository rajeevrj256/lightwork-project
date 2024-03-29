import  { useState, useEffect } from 'react';

export const FetchData = () => {
    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/csv_data');
            const apiData = await response.json();
            const formattedData = convertToInitialData(apiData);
            const sortedData = formattedData.sort((a, b) => a.time - b.time);
            setInitialData(sortedData);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

    const convertToInitialData = (apiData) => {
        // Convert the API data to the desired format
        const formatteddata= apiData.map(item => ({
            time: Date.parse(item.Date), // Assuming Date is in a suitable format, convert it to a timestamp
            open: parseFloat(item.Open),
            high: parseFloat(item.High),
            low: parseFloat(item.Low),
            close: parseFloat(item.Close)
        }));
        const filteredData = formatteddata.filter(item => !isNaN(item.time));

        return filteredData;
    };
    return initialData;

};


