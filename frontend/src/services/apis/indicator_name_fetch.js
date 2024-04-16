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
              const response = await fetch('http://127.0.0.1:5000/indicator');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
      
              // Adjust according to the actual structure of your API response
              let indicator = Array.isArray(data) ? data : data.indicator;
      
              if (!indicator || indicator.length === 0) {
                  setError("No indicator found for the given date");
                  setOptions([]);
              } else {
                  // Ensure indiactor is indeed an array
                  indicator = Array.isArray(indicator) ? indicator : [indicator];
                  const fetchedOptions = indicator.map(indicator => ({
                      value: indicator, // Assuming indicator itself is the desired value
                      label: indicator, // Assuming indicator itself is what you want to display
                  }));
                  setOptions(fetchedOptions);
              }
          } catch (error) {
              console.error('Error fetching indicator data:', error);
              setError(error.message || "An error occurred while fetching indicator");
          } finally {
              setLoading(false);
          }
      };
      
        

        fetchData();
    }, []);

    return { options, loading, error };
};

export default useFetchIndicator;
