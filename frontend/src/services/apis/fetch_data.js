import  { useState, useEffect } from 'react';

export const FetchData = (date, symbol) => {
    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        // Ensure that date and symbol are passed to fetchData
        const fetchData = async () => {
            try {
                console.log('chart date', date);
                console.log('chart symbol', symbol);

                if (!date || !symbol) {
                    console.log('Date or symbol is undefined');
                    return; // Exit if date or symbol is not provided
                }

                const response = await fetch(`http://127.0.0.1:5000/csv_data/${encodeURIComponent(date)}/${encodeURIComponent(symbol)}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const apiData = await response.json();
                
                // Handling with NaN data value.
                const filteredData = apiData.filter(item => !isNaN(item.time));

                // Sorting data in ascending order.
                const sortedData = filteredData.sort((a, b) => a.time - b.time);

                setInitialData(sortedData);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [date, symbol]); // Add date and symbol as dependencies to useEffect

    console.log('Initial Data:', initialData);
    return initialData;
};
