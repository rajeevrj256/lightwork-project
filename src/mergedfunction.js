



export const mergeData = (data,interval) => {
    const mergedData = [];
    let currentInterval = null;
    
    data.forEach((datapoint, index) => {
        if (index % interval === 0) {
            if (currentInterval) {
                mergedData.push(currentInterval);
            }
            currentInterval = {
                time: new Date(datapoint.time * 1000).getTime(),
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