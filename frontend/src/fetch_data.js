import  { useState, useEffect } from 'react';

export const FetchData = () => {
    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/csv_data');
            const apiData = await response.json();
            const formattedData = convertToInitialData(apiData);
            setInitialData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const convertToInitialData = (apiData) => {
        // Convert the API data to the desired format
        return apiData.map(item => ({
            time: Date.parse(item.Date), // Assuming Date is in a suitable format, convert it to a timestamp
            open: parseFloat(item.Open),
            high: parseFloat(item.High),
            low: parseFloat(item.Low),
            close: parseFloat(item.Close)
        }));
    };
    return initialData;

};


