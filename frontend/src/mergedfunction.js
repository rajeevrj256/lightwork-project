



export const mergeData = (data,interval) => {
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
                time: new Date(datapoint.time * 1000).getTime(),  // time should in timestamps.
                open: datapoint.open,
                high: datapoint.high,
                low: datapoint.low,
                close: datapoint.close,
            };
        } else {
            currentInterval.high = Math.max(currentInterval.high, datapoint.high); 
            currentInterval.low = Math.min(currentInterval.low, datapoint.low);
            currentInterval.close = datapoint.close;
        }
    });

    if (currentInterval) {
        mergedData.push(currentInterval);
    }

    return mergedData;
};