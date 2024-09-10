import { useState, useEffect } from "react";

const useFetchSymbols = (date) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!date) {
            setOptions([]);
            setError("No date provided");
            return;
        }

        const fetchData = async () => {
          setLoading(true);
          setError(null); // Reset error state on new fetch
          try {
              const response = await fetch(`https://lightwork-project.onrender.com/symbol/date=${encodeURIComponent(date)}`);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
      
              // Adjust according to the actual structure of your API response
              let symbols = Array.isArray(data) ? data : data.symbols;
      
              if (!symbols || symbols.length === 0) {
                  setError("No symbols found for the given date");
                  setOptions(["No symbols Found on this dates in server"]);
              } else {
                  // Ensure symbols is indeed an array
                  symbols = Array.isArray(symbols) ? symbols : [symbols];
                  const fetchedOptions = symbols.map(symbol => ({
                      value: symbol, // Assuming symbol itself is the desired value
                      label: symbol, // Assuming symbol itself is what you want to display
                  }));
                  setOptions(fetchedOptions);
              }
          } catch (error) {
              console.error('Error fetching symbol data:', error);
              setError(error.message || "An error occurred while fetching symbols");
          } finally {
              setLoading(false);
          }
      };
      
        

        fetchData();
    }, [date]);

    return { options, loading, error };
};

export default useFetchSymbols;
