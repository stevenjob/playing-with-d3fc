function searchQuery(name) {




    return null;
}

function YQLQuery(query, callback) {
    this.query = query;
    this.callback = callback || function(){};
    this.fetch = function() {

        if (!this.query || !this.callback) {
            throw new Error('YQLQuery.fetch(): Parameters may be undefined');
        }

        var scriptEl = document.createElement('script'),
            uid = 'yql' + +new Date(),
            encodedQuery = encodeURIComponent(this.query.toLowerCase()),
            instance = this;

        YQLQuery[uid] = function(json) {
            instance.callback(json);
            delete YQLQuery[uid];
            document.body.removeChild(scriptEl);
        };

        scriptEl.src = 'http://query.yahooapis.com/v1/public/yql?q='
            + encodedQuery + '&format=json&callback=YQLQuery.' + uid;
        document.body.appendChild(scriptEl);

    };
}


// Construct your query:
var query = "select * from finance.scrape.trend where url='http://www.datatables.org/yahoo/finance/finance.scrape.trend.xml' limit 1";
res = y.query('select * from html(3,1) where url="http://finance.yahoo.com/q?s='+name+'" and xpath="//td[@class=\'yfnc_tabledata1\']//strong"').results;
var out = '';
if(res.toString().indexOf('down')!==-1){
    out = '-'
}
var value = res.strong.toString().replace(/\(|\)|%/g,'');
//response.object = <value>{out}{value}</value>;


// Define your callback:
var callback = function(data) {
    console.log(data);
    var post = data.query.results.item;
    alert(post.title);
};

// Instantiate with the query:
var firstFeedItem = new YQLQuery(query, callback);

// If you're ready then go:
firstFeedItem.fetch(); // Go!!