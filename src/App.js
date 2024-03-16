import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

export const ChartComponent = ({ data, colors }) => {
    const chartContainerRef = useRef();
    const [chartData, setChartData] = useState(data);

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: colors?.backgroundColor || 'white' },
                textColor: colors?.textColor || 'black',
            },
            grid: {
                vertLines: { color: colors?.lineColor || '#2962FF' },
                horzLines: { color: colors?.lineColor || '#2962FF' },
            },
            width: 1000,
            height: 450,
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        candlestickSeries.setData(chartData);

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

        chart.timeScale().applyOptions({
            borderColor: '#71649C',
            barSpacing: 10,
        });

        const lineData = chartData.map(datapoint => ({
            time: datapoint.time,
            value: (datapoint.close + datapoint.open) / 2,
        }));
        const areaSeries = chart.addAreaSeries({
            lastValueVisible: false,
            crosshairMarkerVisible:true,
            lineColor: 'transparent',
            topColor: colors?.areaTopColor || '#2962FF',
            bottomColor: colors?.areaBottomColor || 'rgba(41, 98, 255, 0.28)',
        });
        areaSeries.setData(lineData);

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [chartData, colors]);

    return <div ref={chartContainerRef} />;
};

const initialData = [
    // Data for 1-minute interval
    {"time": 1622503860, "open": 102, "high": 108, "low": 98, "close": 105},
    {"time": 1622503920, "open": 105, "high": 110, "low": 100, "close": 107},
    {"time": 1622503980, "open": 107, "high": 112, "low": 102, "close": 105},
    {"time": 1622504040, "open": 110, "high": 115, "low": 105, "close": 112},
    // Add more 1-minute data points...
   
    // Data for 5-minute interval
    {"time": 1622504100, "open": 100, "high": 110, "low": 95, "close": 105},
    {"time": 1622504400, "open": 105, "high": 115, "low": 100, "close": 110},
    {"time": 1622504700, "open": 110, "high": 120, "low": 105, "close": 115},
    {"time": 1622505000, "open": 115, "high": 125, "low": 110, "close": 120},
    // Add more 5-minute data points...

    // Data for 10-minute interval
    {"time": 1623286800, "open": 100, "high": 115, "low": 90, "close": 90},
    {"time": 1623287400, "open": 110, "high": 125, "low": 95, "close": 120},
    {"time": 1623288000, "open": 120, "high": 135, "low": 100, "close": 105},
    {"time": 1623288600, "open": 130, "high": 145, "low": 110, "close": 140},
    // Add more 10-minute data points...

    // Data for 1-hour interval
    {"time":1623375000, "open": 100, "high": 120, "low": 80, "close": 90},
    {"time": 1623378600, "open": 110, "high": 130, "low": 90, "close": 120},
    {"time": 1623382200, "open": 120, "high": 140, "low": 100, "close": 130},
    {"time": 1623385800, "open": 130, "high": 150, "low": 110, "close": 140},
    // Add more 1-hour data points...

    // Data for other time frames...
];


export default function App() {
    const [selectedInterval, setSelectedInterval] = useState(1);

    const handleIntervalChange = (interval) => {
        setSelectedInterval(interval);
    };

    const filteredData = initialData.filter((item) => {
        return item.time >= Date.now() - (selectedInterval * 60 * 1000);
    });

    return (
        <div>
            <button onClick={() => handleIntervalChange(1)}>1 min</button>
            <button onClick={() => handleIntervalChange(5)}>5 min</button>
            <button onClick={() => handleIntervalChange(10)}>10 min</button>
            <button onClick={() => handleIntervalChange(60)}>1 hr</button>
            
            <ChartComponent data={filteredData} colors={{}} />
        </div>
    );
}
