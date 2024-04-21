import { IndiactorFetchData } from "../services/apis/indicator_data"
import { addlineSeries } from "../components/series/lineseries"
import { indiactormergeData } from "../components/features/indicatormergerd"
const multi_selection_indicator = async (chart, indicators, interval, date, symbol) => {
    const seriesPromises = indicators.map(async (indicator) => {
        const data = await IndiactorFetchData(indicator.value, date, symbol);
        const mergedData = indiactormergeData(data, interval);
        const color = indicator.color || 'grey';
        addlineSeries(chart, mergedData, color);
    });
    await Promise.all(seriesPromises);
};


export default multi_selection_indicator;