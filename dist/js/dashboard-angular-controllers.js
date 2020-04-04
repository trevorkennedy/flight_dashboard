function find_max(data, val) {
    var max = 0;
    for (var i = 0; i < data.length; i++) {
        if ( data[i][val] > max) max = data[i][val];
    }
    return max;
}

function find_max_both(data, val1, val2) {
    var max1 = find_max(data, val1);
    var max2 = find_max(data, val2);
    return max1 > max2 ? max1 : max2;
}

function count_if(data, col, val) {
    var count = 0;
    for (var i = 0; i < data.length; i++) {
        if ( data[i][col] === val) count++;
    }
    return count;
}

function subset(data, col, val) {
    return data.filter(function (el) {
        return el[col] === val;
    });  
}

function select_column(data, col) {
    var vals = []
    for (var i = 0; i < data.length; i++) {
        vals.push(data[i][col]);
    }
    return vals;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function get_date(value) { 
    return moment(value, "MM/DD/YYYY h:mm");
}

app.config(["$locationProvider", function($locationProvider) {
  $locationProvider.html5Mode(false);
}]);
    
app.controller('FooterController', ['$scope', function($scope) {
    $scope.date = new Date();
    $scope.version = '2.3.0';
}]);

app.controller('DayController', ['$scope', '$stateParams', function($scope, $stateParams) {
    
    $scope.headersFormats = { 
        day: 'D MMMM YYYY', 
        hour: 'HH', 
    };
    $scope.columnsFormatters = {
        'from': function(from) {
            return from !== undefined ? from.format('HH:mm') : undefined;
        },
        'to': function(to) {
            return to !== undefined ? to.format('HH:mm') : undefined;
        },
        'model.data': function(data) {
            return data;
        }
    };
    
    // Load CSV file
    var file = 'data/day_' + $stateParams.view + '.csv';
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      download: true,
      skipEmptyLines: true,
      complete: function(results) {
    
        var all = results.data;
        var planned = all.length;
        var actual = count_if(results.data, 'Flown', 'y');
        
        var ye = subset(all, 'Country', 'ye');
        var iq = subset(all, 'Country', 'iq');
        var af = subset(all, 'Country', 'af');
        
        var data = [ 
            [ye.length, iq.length, af.length], // Actual
            [count_if(ye, 'Flown', 'y'), count_if(iq, 'Flown', 'y'), count_if(af, 'Flown', 'y')] // Planned
        ];
        
        var platforms = select_column(all, 'Platform').filter(onlyUnique);
        var platform_data =  [
            {"key": "Planned", "color": "#d67777", "values": []},
            {"key": "Actual", "color": "#4f99b4", "values": []}
        ];
        
        for (row in platforms) {
            var platform = platforms[row];
            var flown = subset(all, 'Flown', 'y');
            platform_data[0]['values'].push({ "label" : platform, "value" : count_if(all, 'Platform', platform) }) // Planned
            platform_data[1]['values'].push({ "label" : platform, "value" : count_if(flown, 'Platform', platform) }) // Actual
        }
        
        $scope.all = all;
        $scope.horizontal_data = platform_data;
        $scope.horizontal_margin = {top: 30, right: 20, bottom: 50, left: 175};
        $scope.total_planned = planned;
        $scope.total_actual = actual;
        $scope.data = data;
        $scope.total_percent = actual / planned * 100;
        $scope.labels = ['Yemen', 'Iraq/Syria', 'Afghanistan'];
        $scope.series = ['Planned', 'Actual'];
        $scope.active = true;
        $scope.colors = [ { fillColor: '#9FC5F8' }, { fillColor: '#C20808' } ];
        $scope.active_tab = $stateParams.tab;
        
        var g_data = $stateParams.view === 'hours' ? hours_day_gantt_data : sorties_day_gantt_data;
        var from_date = $stateParams.view === 'hours' ? hours_day_gantt_date : sorties_day_gantt_date;
        $scope.from_date = from_date;
        $scope.to_date = $scope.from_date.setHours(23, 59, 0);
        
        $scope.headersFormats = { 
            day: 'D MMMM YYYY', 
            hour: 'HH', 
        };
        
        $scope.columnsFormatters = {
            'from': function(from) {
                return from !== undefined ? from.format('HH:mm') : undefined;
            },
            'to': function(to) {
                return to !== undefined ? to.format('HH:mm') : undefined;
            },
            'model.data': function(data) {
                return data.indexOf("|") > 0 ? data.replace("af|", "").replace("ye|", "").replace("iq|", "") : '';
            }
        };

        var tmp = [];
        for (var i in g_data) {
            if (g_data[i].data.substring(0, 2) === $stateParams.tab) {
                tmp.push(g_data[i]);
            }
        }
        $scope.gantt_data = tmp;
        
        nv.addGraph(function() {
            var chart = nv.models.multiBarHorizontalChart()
                .x(function(d) { return d.label })
                .y(function(d) { return d.value })
                .margin({top: 0, right: 20, bottom: 20, left: 100})
                .showValues(false)
                .tooltips(true)
                .showControls(false);
                
            chart.yAxis.tickFormat(d3.format(',.0f'));
            
            d3.select('#chart svg')
                .attr("width", '100%')
                .datum($scope.horizontal_data)
                .transition().duration(500)
                .call(chart);

            nv.utils.windowResize(chart.update);
            return chart;
        });
        
      }
    });
    
}]);

app.controller('YearController', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.knob_value_ye = $stateParams.view === 'hours' ? hours_year_value_ye : sorties_year_value_ye;
    $scope.knob_value_iq = $stateParams.view === 'hours' ? hours_year_value_iq : sorties_year_value_iq;
    $scope.knob_value_af = $stateParams.view === 'hours' ? hours_year_value_af : sorties_year_value_af;
    $scope.table_data = $stateParams.view === 'hours' ? hours_year_table_data : sorties_year_table_data;
    $scope.line_data = $stateParams.view === 'hours' ? hours_year_line_data : sorties_year_line_data;
    
    $scope.max_ye = find_max_both($scope.table_data, 'ye_actual', 'ye_planned');
    $scope.max_iq = find_max_both($scope.table_data, 'iq_actual', 'iq_planned');
    $scope.max_af = find_max_both($scope.table_data, 'af_actual', 'af_planned');
    
    $scope.knob_options = {
      skin: {
        type: 'tron',
        width: 5,
        color: '#494B52',
        spaceWidth: 3
      },
      subText: {
        enabled: true,
        text: 'As Planned',
        color: '#494B52',
        font: 'auto'
      },
      barColor: '#494B52',
      trackWidth: 30,
      barWidth: 30,
      textColor: '#494B52',
      readOnly: true,
      unit: "%"
    };
    
    $scope.labels = ["Apr 2014", "May 2014", "Jun 2014", "Jul 2014", "Aug 2014", "Sep 2014", "Oct 2014", "Nov 2014", "Dec 2014", "Jan 2015", "Feb 2015", "Mar 2015", 
                     "Apr 2015", "May 2015", "Jun 2015", "Jul 2015", "Aug 2015", "Sep 2015", "Oct 2015", "Nov 2015", "Dec 2015", "Jan 2016", "Feb 2016", "Mar 2016"];
    $scope.series = ['Yemen', 'Iraq/Syria', 'Afghanistan'];
    $scope.colors = [ {fillColor: 'rgba(220,220,220, 0)', strokeColor: 'rgba(148,159,177, 1)', pointHighlightFill: "rgba(148,159,177, 1)"}, 
                      {fillColor: 'rgba(220,220,220, 0)', strokeColor: 'rgba(60,141,255, 1)', pointHighlightFill: "rgba(60,141,255, 1)"}, 
                      {fillColor: 'rgba(220,220,220, 0)', strokeColor: 'rgba(100,100,0, 1)', pointHighlightFill: "rgba(100,100,0, 1)"}];
}]);

app.controller('OutageController', ['$scope', '$stateParams', function($scope, $stateParams) {

}]);