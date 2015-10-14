var data = fc.data.random.financial()(50);


var chart = fc.chart.linearTimeSeries()
    .xDomain(fc.util.extent(data, 'date'))
    .yDomain(fc.util.extent(data, ['high', 'low']));

var gridlines = fc.annotation.gridline();
var candlestick = fc.series.candlestick();

var multi = fc.series.multi()
    .series([gridlines, candlestick]);
chart.plotArea(multi);

d3.select('#chart')
    .append('svg')
    .style({
        height: '250px',
        width: '600px'
    })
    .datum(data)
    .call(chart);