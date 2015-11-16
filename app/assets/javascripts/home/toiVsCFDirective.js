angular.module('hockeyStats')
  .directive("barChart", function($parse, $window) {
    return{
      restrict: "EA",
      template: "<svg width='100%' height='400'></svg>",
      link: function(scope, elem, attrs){
        var playersExp = $parse(attrs.chartData);
        var teamExp = $parse(attrs.teamData);

        var selectedPlayerDataToPlot = playersExp(scope);
        var selectedTeamDataToPlot = teamExp(scope);
        var padding = 100;
        var pathClass="path";
        var xScale, yScale, xAxisGen, yAxisGen, lineFun;

        var d3 = $window.d3;
        var rawSvg=elem.find('svg');
        var svg = d3.select(rawSvg[0]);

        scope.$watchCollection(playersExp, function(newVal, oldVal){
          selectedPlayerDataToPlot=newVal;
          // console.log(selectedPlayerDataToPlot);
          // redrawBarChart();
        });

        function setChartParameters(){
          xScale = d3.scale.ordinal()
                    .domain(selectedPlayerDataToPlot.map(function(d){ return d.name; }))
                    // .rangeRoundBands([0, rawSvg[0].clientWidth], .1);
                    .rangeRoundBands([padding + 5, rawSvg[0].clientWidth], .1);
          // xScaleLinear = d3.scale.linear()
          //           .domain(selectedPlayerDataToPlot.map(function(d){ return d.name; }))
          //           // .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length - 1].hour])
          //           .range([padding + 5, rawSvg[0].clientWidth - padding]);
          yScaleLeft = d3.scale.linear()
                    .domain([0, d3.max(selectedPlayerDataToPlot, function (d) {
                      return (d.toi / d.gp / 60);
                    })])
                    .range([rawSvg.attr("height") - padding, 0]);
          yScaleRight = d3.scale.linear()
                    .domain([
                      d3.min(selectedPlayerDataToPlot, function (d) {
                        return (d.cf_per);
                      }) * 0.95,
                      d3.max(selectedPlayerDataToPlot, function (d) {
                      return (d.cf_per);
                    }) * 1.05 ])
                    .range([rawSvg.attr("height") - padding, 0]);
          xAxisGen = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(selectedPlayerDataToPlot.length - 1);
          yAxisGenLeft = d3.svg.axis()
                      .scale(yScaleLeft)
                      .orient("left")
                      .ticks(5);
          yAxisGenRight = d3.svg.axis()
                      .scale(yScaleRight)
                      .orient("right")
                      .ticks(5);
          lineFun = d3.svg.line()
                      .x(function (d) {
                        return xScale(d.name);
                      })
                      .y(function (d) {
                        return yScaleRight(d.cf_per);
                      })
          averageLine = d3.svg.line()
                      .x(function (d) {
                        return xScale(d.name);
                      })
                      .y(function (d) {
                        return yScaleRight(d.cf_per);
                      })
        }

        function drawBarChart() {

          setChartParameters();

          nsvg = d3.select("#bar-chart").select('svg')
          var bar = nsvg.selectAll("g")
                      .data(selectedPlayerDataToPlot)
                    .enter()
                      .append("g")
                      .attr("transform",function(d,i){
                        return "translate("+xScale(d.name)+", 0)";
                      });

          bar.append("rect")
            .attr("y", function(d) {
              return yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("x", function(d){
              return xScale.rangeBand() - rawSvg[0].clientWidth / 29
            })
            .attr("height", function(d) {
              return rawSvg.attr("height") -padding - yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("width", xScale.rangeBand());

          svg.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0,300)")
            .call(xAxisGen)//;
            .selectAll("text")
            .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );

          svg.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(100,0)")
            .call(yAxisGenLeft);

          svg.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (rawSvg[0].clientWidth - 20) + ",0)")
            .call(yAxisGenRight);

          svg.append("svg:path")
            .attr({
              d: lineFun(selectedPlayerDataToPlot),
              "stroke": "red",
              "stroke-width": 2,
              "fill": "none",
              "class": pathClass,
              "transform": "translate(" + rawSvg[0].clientWidth/55 + ",0)"
            });

          svg.append("svg:path")
            .attr({
              d: averageLine(selectedTeamDataToPlot),
              "stroke": "red",
              "stroke-width": 1,
              "fill": "none",
              "class": pathClass,
              "transform": "translate(" + rawSvg[0].clientWidth/55 + ",0)"
            });
        }

        drawBarChart();
      }
    }
  })
