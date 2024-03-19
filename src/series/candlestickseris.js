

export const addCandlestickSeries = (chart, data, colors) => {
    const candlestickSeries = chart.addCandlestickSeries({
        upColor: colors.upColor || '#26a69a',
        downColor: colors.downColor || '#ef5350',
        // Other candlestick series options...
    });
    candlestickSeries.setData(data);

    //apply options for customize the candlestick colors or visible.

    candlestickSeries.applyOptions({
        wickUpColor: 'rgb(54, 116, 217)',
        upColor: 'rgb(54, 116, 217)',
        wickDownColor: 'rgb(225, 50, 85)',
        downColor: 'rgb(225, 50, 85)',
        borderVisible: false,
    });

    candlestickSeries.priceScale().applyOptions({
        autoScale: false,
        scaleMargins: {
            top: 0.1,
            bottom: 0.2,
        },
    });

    return candlestickSeries;
};
