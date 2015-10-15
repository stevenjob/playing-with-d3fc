var i = 0;

d3.csv('prem15-16.csv')
    .row(function(d) {
        var dateArray = d.Date.split("/");
        return {
            date: new Date(dateArray[2],dateArray[1],dateArray[0]),
            goals : parseInt(d.FTHG) + parseInt(d.FTAG)
        };
    })
    .get(function(error, rows) { renderChart(rows); });

function renderChart(data) {


    var chart = fc.chart.cartesianChart(d3.scale.linear(),
        d3.scale.linear())
        .xDomain(fc.util.extent(data, 'date'))
        .yDomain(fc.util.extent(data, 'goals'));

    console.log();
    var area = fc.series.line()
        .yValue(function(d) { return d.date; })
        .xValue(function(d) { return d.goals; });

    chart.plotArea(area);



    d3.select('#time-series')
        .datum(data)
        .call(chart);
}