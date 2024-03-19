export const addAreaSeries = (chart, data, colors) => {
    // areaseries use time and value only .
    const lineData = data.map(datapoint => ({
        time: datapoint.time,
        value: (datapoint.close + datapoint.open) / 2,
    }));
    const areaSeries = chart.addAreaSeries({
        lastValueVisible: false,
        crosshairMarkerVisible: true,
        lineColor: 'transparent',
        topColor: colors?.areaTopColor || '#2962FF',
        bottomColor: colors?.areaBottomColor || 'rgba(41, 98, 255, 0.28)',
    });
    //set the lineData into areaseries.
    areaSeries.setData(lineData);
    
    return areaSeries;
};
