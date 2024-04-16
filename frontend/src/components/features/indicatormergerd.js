



export const indiactormergeData = (data,interval) => {
    //empty array--> data should be sorted in this array after modification by intervals.
    
    const mergedData = [];
    let currentInterval = null;
    
    data.forEach((datapoint, index) => {

        //interval should be 2 min,3min,4min,etc.
        //bydefault interval is 1 min.

        if (index % interval === 0) {
            if (currentInterval) {
                mergedData.push(currentInterval);
            }
            currentInterval = {
                time: datapoint.time,  // time should in timestamps.
                value: datapoint.value
            };
        } 
    });

    if (currentInterval) {
        mergedData.push(currentInterval);
    }

    return mergedData;
};