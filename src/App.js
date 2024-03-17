import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

export const ChartComponent = ({ data, colors }) => {
    const chartContainerRef = useRef();
   

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
            height: 400,
        });
         
        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        candlestickSeries.setData(data);

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
            lockVisibleTimeRangeOnResize:true,
            timeVisible:true,
            rightOffset:6,
        });
        

        const lineData = data.map(datapoint => ({
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
    }, [data, colors]);

    return <div ref={chartContainerRef} />;
};

const initialData = [
    // Data for 1-minute interval
    {"time": 1622503860, "open": 102, "high": 108, "low": 98, "close": 105}, // Bullish
    {"time": 1622503920, "open": 105, "high": 110, "low": 100, "close": 107}, // Bullish
    {"time": 1622503980, "open": 107, "high": 112, "low": 102, "close": 105}, // Bearish
    {"time": 1622504040, "open": 110, "high": 115, "low": 105, "close": 112}, // Bullish
    {"time": 1622504100, "open": 105, "high": 115, "low": 105, "close": 112}, // Bearish
    {"time": 1622504160, "open": 112, "high": 120, "low": 110, "close": 115}, // Bullish
    {"time": 1622504220, "open": 115, "high": 122, "low": 112, "close": 118}, // Bullish
    {"time": 1622504280, "open": 118, "high": 125, "low": 115, "close": 122}, // Bearish
    {"time": 1622504340, "open": 122, "high": 128, "low": 118, "close": 125}, // Bullish
    {"time": 1622504400, "open": 125, "high": 130, "low": 120, "close": 128}, // Bearish
    {"time": 1622504460, "open": 128, "high": 135, "low": 125, "close": 132}, // Bullish
    {"time": 1622504520, "open": 132, "high": 138, "low": 128, "close": 135}, // Bearish
    {"time": 1622504580, "open": 135, "high": 140, "low": 130, "close": 138}, // Bullish
    {"time": 1622504640, "open": 138, "high": 145, "low": 135, "close": 142}, // Bearish
    {"time": 1622504700, "open": 142, "high": 148, "low": 138, "close": 145}, // Bullish
    {"time": 1622504760, "open": 145, "high": 150, "low": 140, "close": 148}, // Bullish
    {"time": 1622504820, "open": 148, "high": 155, "low": 145, "close": 152}, // Bearish
    {"time": 1622504880, "open": 152, "high": 158, "low": 148, "close": 155}, // Bullish
    {"time": 1622504940, "open": 155, "high": 160, "low": 150, "close": 158}, // Bearish
    {"time": 1622505000, "open": 158, "high": 165, "low": 155, "close": 162}, // Bullish
    {"time": 1622505060, "open": 162, "high": 168, "low": 158, "close": 165}, // Bearish
    {"time": 1622505120, "open": 165, "high": 170, "low": 160, "close": 168}, // Bullish
    {"time": 1622505180, "open": 168, "high": 175, "low": 165, "close": 172}, // Bullish
    {"time": 1622505240, "open": 172, "high": 178, "low": 168, "close": 175}, // Bearish
    {"time": 1622505300, "open": 175, "high": 180, "low": 170, "close": 178}, // Bullish
    {"time": 1622505360, "open": 178, "high": 185, "low": 175, "close": 182}, // Bearish
    {"time": 1622505420, "open": 182, "high": 188, "low": 178, "close": 185}, // Bullish
    {"time": 1622505480, "open": 185, "high": 190, "low": 180, "close": 188}, // Bearish
    {"time": 1622505540, "open": 188, "high": 195, "low": 185, "close": 192}, // Bullish
    {"time": 1622505600, "open": 192, "high": 198, "low": 188, "close": 195}, // Bearish
    {"time": 1622505660, "open": 195, "high": 200, "low": 190, "close": 198}, // Bullish
    {"time": 1622505720, "open": 198, "high": 205, "low": 195, "close": 202}, // Bullish
    {"time": 1622505780, "open": 202, "high": 208, "low": 198, "close": 205}, // Bearish
    {"time": 1622505840, "open": 205, "high": 210, "low": 200, "close": 208}, // Bull
]

const mergeData = (data,interval) => {
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

export default function App() {
    const[interval,setinterval]=useState(1);
    const handleIntervalChange = (interval) => {
        setinterval(interval);
    };

    const mergedData = mergeData(initialData,interval);

    return (
        <div>
            <button onClick={() => handleIntervalChange(2)}>2 min</button>
            <button onClick={() => handleIntervalChange(3)}>3 min</button>
            <button onClick={() => handleIntervalChange(4)}>4 min</button>
            <button onClick={() => handleIntervalChange(5)}>5 min</button>
            <button onClick={() => handleIntervalChange(10)}>10 min</button>
            <button onClick={() => handleIntervalChange(15)}>15 min</button>
            <button onClick={() => handleIntervalChange(20)}>20 min</button>
            <button onClick={() => handleIntervalChange(60)}>1Hr</button>
            <button onClick={() => handleIntervalChange(120)}>2Hr</button>
            <button onClick={() => handleIntervalChange(180)}>3Hr</button>
            <ChartComponent data={mergedData} colors={{}} />
        </div>
    );
}
