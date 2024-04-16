export const addlineSeries =(chart ,data,color)=>{
    const lineData = data.map(datapoint => ({
        time: datapoint.time,
        value:datapoint.value
    }));
    const lineseries=chart.addLineSeries({
        lineColor: 'transparent',
    })
    lineseries.setData(lineData)

}