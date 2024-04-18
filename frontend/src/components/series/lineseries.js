export const addlineSeries =(chart ,data,color)=>{
    const lineData = data.map(datapoint => ({
        time: datapoint.time,
        value:datapoint.value
    }));
    const lineseries=chart.addLineSeries({
        
    })
    lineseries.setData(lineData)
    lineseries.applyOptions({
    color:color,
    })
    
    console.log('lineseries color',color)

}