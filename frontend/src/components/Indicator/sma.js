export const SmaComponent= (data, malen) => {
    const smaData = [];
    for (let i = 0; i < data.length; i++) {
        if (i < malen - 1) {
            smaData.push({ time: data[i].time });  // No moving average value until enough data points
        } else {
            let sum = 0;
            for (let j = 0; j < malen; j++) {
                sum += data[i - j].close;
            }
            const maValue = sum / malen;
            smaData.push({ time: data[i].time, value: maValue });
        }
    }
    return smaData;
};
