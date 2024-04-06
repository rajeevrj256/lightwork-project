import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { mergeData } from './mergedfunction.js';
import { FetchData } from './fetch_data.js';
//import{ initialData} from './data.js';
import {addCandlestickSeries} from './series/candlestickseris.js';
//import { addAreaSeries } from './series/areaseries.js';

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
         
        //add candle stick series 
        addCandlestickSeries(chart,data,colors);
        // add areaSeries
        //addAreaSeries(chart,data,colors);

        

        chart.timeScale().applyOptions({
            borderColor: '#71649C',
            barSpacing: 10,
            lockVisibleTimeRangeOnResize:true,
            timeVisible:true,
            rightOffset:6,
            
        });
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

export default function App() {
    const[interval,setinterval]=useState(1);
    const handleIntervalChange = (interval) => {
        setinterval(interval);
    };
    //fetching data ----assuming data fetched from backend im 1 min timeframe.
    const fetch_data=FetchData()
    const mergedData = mergeData(fetch_data,interval);
    console.log(fetch_data);
    // calling mergeData function for mergeing the data.

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