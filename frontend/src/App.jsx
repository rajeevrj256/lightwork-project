import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { mergeData } from './components/features/mergedfunction.js';
import { FetchData } from './services/apis/fetch_data.js';
//import{ initialData} from './data.js';
import {addCandlestickSeries} from './components/series/candlestickseris.js';
//import { addAreaSeries } from './components/series/areaseries.js';
import {  DatePickerComponent} from './components/dates/datepicker.js';
import './assets/style/style.css';
import DropdownMenu from './components/drop_down_menu/symbol.js'
import formatDate from './hooks/formate_date.js';
import { SmaComponent } from './components/Indicator/sma.js';
import IndicatorDropdown from './components/drop_down_menu/indicatoroption.js';


export const ChartComponent = ({ data, colors,width,height,madata}) => {
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
        //add areaSeries
       // addAreaSeries(chart,data,colors);

        const maSeries=chart.addLineSeries({color:'#2962FF',lineWidth:1});
        maSeries.setData(madata)

        

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
    }, [data, colors,width,height,madata]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '100%' }}  />;
};

export default function App() {
    const[interval,setinterval]=useState(1);

    const handleIntervalChange = (interval) => {
        setinterval(interval);
    };
    const[startdate,setstartdate]=useState(null);
  //update date in startdate picked from picker calender
    const handleDateChange = (date) => {
        if (date) {
            const dateformate=date;
            setstartdate(dateformate); 
        } else {
            setstartdate(null); // Or handle null/undefined appropriately
        }
    };
    console.log('typeofstartdate',typeof startdate);

    const[option,setoption]=useState(null)
    const handleoption=(option)=>{
        if(option){
            setoption(option)
        }else{
            setoption(null);
        }
    }
    //fetching data ----assuming data fetched from backend im 1 min timeframe.
    const fetch_data=FetchData(formatDate(startdate),option?option.value:null)
 // calling mergeData function for mergeing the data.
    const mergedData = mergeData(fetch_data,interval);

    const [maData, setMaData] = useState([]);

    useEffect(() => {
        const smaData = SmaComponent(mergedData, 20);
        setMaData(smaData);
    }, [mergedData]); 
    //console.log(maData)
    

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
                    

                   
                    
                </div>
                <div className='indicator_dropdown'>
                    <IndicatorDropdown onSelectOption={handleoption}/>
                </div>
                <div className='drop_down_menu'>
                    <DropdownMenu date={formatDate(startdate)} onSelectOption={handleoption}/>
                </div>
                <div className="date-picker" >
                <DatePickerComponent startDate={startdate} setstartDate={handleDateChange} />
            </div>
                <ChartComponent data={mergedData} colors={{}} madata={maData} />
            </div>
        </div>
    );
}