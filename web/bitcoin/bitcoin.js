var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://api.bitcoinaverage.com/history/GBP/per_minute_24h_global_average_sliding_window.csv", false);
xmlHttp.send(null);
var splittedResponse = xmlHttp.responseText.split("\n");

splittedResponse.shift();

var formatDate = function (dateStr) {
    return new Date(dateStr);
};

var data = splittedResponse.map(function (line) {
    return line.trim().split(",");
})
    .slice(0, 150)
    .map(function (line) {
        return {
            close: parseFloat(line[58]),
            date: formatDate(line[0]),
            high: parseFloat(line[58]),
            low: parseFloat(line[58]),
            open: parseFloat(line[58]),
            volume: parseFloat(line[58]),
        }
    });

var chart = fc.chart.linearTimeSeries()
    .xDomain(fc.util.extent(data, 'date'))
    .yDomain(fc.util.extent(data, 'high'));

var gridlines = fc.annotation.gridline();

var point = fc.series.point()
    .xScale(chart.xScale())
    .yScale(chart.yScale());

var line = fc.series.line()
    .xScale(chart.xScale())
    .yScale(chart.yScale());

var multi = fc.series.multi()
    .series([gridlines, point, line]);
chart.plotArea(multi);

d3.select('#chart')
    .append('svg')
    .style({
        height: '900px',
        width: '100%'
    })
    .datum(data)
    .call(chart);
