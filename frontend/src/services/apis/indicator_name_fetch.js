import { useState, useEffect } from "react";

const useFetchIndicator = () => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new fetch
            try {
                const response = await fetch('https://lightwork-project.onrender.com/indicator');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
        
                // Process the response based on the structure you indicated
                // Assuming each object key under 'Indicator_name' and 'color' corresponds to an index of an array entry
                const indicators = Object.keys(data.Indicator_name).map(key => ({
                   
                    indicatorName: data.Indicator_name[key],
                    color: data.color[key]
                }));
        
                if (!indicators || indicators.length === 0) {
                    setError("No indicators found");
                    setOptions([]);
                } else {
                    // Transform the indicators into a suitable format for rendering in a component
                    const fetchedOptions = indicators.map(indicator => ({
                        value: indicator.indicatorName, // Value to be sent when an option is selected
                        label: `${indicator.indicatorName} (${indicator.color})` ,// Label to be displayed in the dropdown
                        color:indicator.color
                    }));
                    setOptions(fetchedOptions);
                }
            } catch (error) {
                console.error('Error fetching indicator data:', error);
                setError(error.message || "An error occurred while fetching indicators");
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    return { options, loading, error };
};

export default useFetchIndicator;
