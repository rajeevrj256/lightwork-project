import  { useState, useEffect } from 'react';

export const IndiactorFetchData = (indiactor,date, symbol) => {
    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        // Ensure that date and symbol are passed to fetchData
        const fetchData = async () => {
            try {
               console.log('indiactor in api ',indiactor)

                if (!indiactor || !date || !symbol) {
                    console.log('Indiactor or Date or symbol is undefined');
                    return; // Exit if date or symbol is not provided
                }

                const response = await fetch(`https://lightwork-project.onrender.com/csv_data/${encodeURIComponent(indiactor)}_value/${encodeURIComponent(date)}/${encodeURIComponent(symbol)}`);

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
    }, [indiactor,date, symbol]); // Add date and symbol as dependencies to useEffect

    console.log('Initial Data of indicator:', initialData);
    return initialData;
};
