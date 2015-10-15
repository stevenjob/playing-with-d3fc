// create some test data
var data = d3.range(60).map(function(d) {
    var prec = 6;
    var currLine = d/prec;

    return {
        range: d/10 - 6,
        x: d / prec,
        y:  d / prec ,
        xLim: d/(prec*20),
        xLimInv: -d/(prec*20),
        xLim2: (d)/(prec*36) + 0.5,
        xLimInv2: -d/(prec*36) - 0.5,
        xLim3: d/(prec*36) + 0.75,
        xLimInv3: -d/(prec*36) - 0.75,
        xLim4: d/(prec) + 1,
        xLimInv4: -d/(prec) - 1,
        yInv: -d / prec ,
        xInv: - d / prec,
        z: (((6*Math.sqrt(10))/7) + (1.5 - 0.5*Math.abs(d/(prec) +1))) - ((6*Math.sqrt(10))/14) * Math.sqrt(4 - Math.pow((Math.abs(d/(prec) + 1) - 1 ),2)),
        x2Inv: - 7 * Math.sqrt(1-(Math.pow(d/prec,2)/9)),
        q: 9 - 8 * Math.abs((d/(prec*36))+ 0.75) ,
        w: 3*Math.abs((d)/(prec*36) + 0.5) + 0.75 ,
        e: 2.25 ,
        f: (Math.abs(d / (2 * prec)) - ((3*Math.sqrt(33)-7) / 112)*Math.pow(d/prec,2) - 3)  + Math.sqrt(1 - Math.pow(Math.abs(Math.abs(d/prec) - 2) - 1, 2)),
        x2: 7 * Math.sqrt( 1 - ( Math.pow(d/prec, 2) / 9 ) )
    };
});

console.log(data);
// create a chart
var chart = fc.chart.cartesianChart(
    d3.scale.linear(),
    d3.scale.linear())
    .margin({left: 50, bottom: 20})
    .xDomain(fc.util.extent(data, ['z','x2','x2Inv', 'x']))
    .xLabel('')
    .yDomain(fc.util.extent(data, ['e','z','f', 'x', 'range']))
    .yNice()
    .xNice()
    .yOrient('left')
    .yLabel('Batman');


var lineArray = [];

// create a pair of series and some gridlines
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.x2; })
    .yValue(function(d) { return d.y; })
    .defined(function(d) { return !isNaN(d.x2Inv); })
);

lineArray.push(fc.series.line()
    .xValue(function(d) { return d.x2; })
    .yValue(function(d) { return d.xInv; })
    .defined(function(d) { return !isNaN(d.x2Inv); })
);

lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLimInv; })
    .yValue(function(d) { return d.e; })
);

lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLim; })
    .yValue(function(d) { return d.e; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLim3; })
    .yValue(function(d) { return d.q; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLimInv3; })
    .yValue(function(d) { return d.q; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLim4; })
    .yValue(function(d) { return d.z; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xInv; })
    .yValue(function(d) { return d.f; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.x; })
    .yValue(function(d) { return d.f; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLim2; })
    .yValue(function(d) { return d.w; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLimInv4; })
    .yValue(function(d) { return d.z; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.xLimInv2; })
    .yValue(function(d) { return d.w; })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.x2Inv; })
    .yValue(function(d) { return d.yInv; })
    .defined(function(d) { return !isNaN(d.x2Inv); })
);
lineArray.push(fc.series.line()
    .xValue(function(d) { return d.x2Inv; })
    .yValue(function(d) { return d.y; })
    .defined(function(d) { return !isNaN(d.x2Inv); })
);

var multi = fc.series.multi()
    .series(lineArray);

chart.plotArea(multi);

d3.select('#cartesian-chart')
    .datum(data)
    .call(chart);