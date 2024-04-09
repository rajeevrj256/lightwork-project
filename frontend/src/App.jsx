import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { mergeData } from './components/features/mergedfunction.js';
import { FetchData } from './services/fetch_data.js';
//import{ initialData} from './data.js';
import {addCandlestickSeries} from './components/series/candlestickseris.js';
//import { addAreaSeries } from './series/areaseries.js';
import {  DatePickerComponent} from './components/dates/datepicker.js';
import './assets/style/style.css';


export const ChartComponent = ({ data, colors,width,height }) => {
    const chartContainerRef = useRef();
    
   

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { color: colors?.backgroundColor || 'black' },
                textColor: colors?.textColor || 'white',
            },
            grid: {
                vertLines: { color: colors?.lineColor || '#2962FF' },
                horzLines: { color: colors?.lineColor || '#2962FF' },
            },
            width:width,
            height:height,
           
            
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
            chart.applyOptions({ 
                width: chartContainerRef.current.offsetWidth,
                height: chartContainerRef.current.offsetHeight, 
            });
            
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
            
        };
    }, [data, colors,width,height]);
    console.log(width);
    console.log(height);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }}  />;
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
    const[startdate,setstartdate]=useState(null);
    const handleDateChange = (date) => {
        setstartdate(date);
    };
    console.log(startdate);
   
    // calling mergeData function for mergeing the data.

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div>
                    <button onClick={() => handleIntervalChange(2)}>2 min</button>
                    <button onClick={() => handleIntervalChange(3)}>3 min</button>
                    <button onClick={() => handleIntervalChange(4)}>4 min</button>
                    <button onClick={() => handleIntervalChange(5)}>5 min</button>
                    <button onClick={() => handleIntervalChange(10)}>10 min</button>
                    <button onClick={() => handleIntervalChange(15)}>15 min</button>
                    <button onClick={() => handleIntervalChange(20)}>20 min</button>
                   
                    
                </div>
                <div className="date-picker" >
                <DatePickerComponent startDate={startdate} setstartDate={setstartdate} />
            </div>
                <ChartComponent data={mergedData} colors={{}}  />
            </div>
        </div>
    );
}