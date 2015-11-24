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
        var yAxisPaddingLeft = 70;
        var chartPaddingLefft = 100;
        var paddingRight = 130;
        var bottomPadding = 125;
        var pathClass = "path";
        var xScale, xScaleLinear, yScaleLeft, yScaleRight, xAxisGen, xAxisLinearGen, yAxisGenLeft, yAxisGenRight, mainLine, averageLine;

        var d3 = $window.d3;
        var rawSvg = elem.find('svg');
        var svg = d3.select(rawSvg[0]);

        var transition = 1500;


        scope.$watchCollection(playersExp, function(newVal, oldVal){
          if(newVal != oldVal) {
            update(newVal);
          }
        });

        scope.$watchCollection(teamExp, function(newVal, oldVal){
          if(newVal != oldVal) {
            updateAvgLine(newVal);
          }
        });

        // scope.$watchGroup(["players", "team_stats"],function(newValues) {
        //   console.log(newValues);
        //   // console.log(newValues);
        //   // newValues array contains the current values of the watch expressions
        //   // with the indexes matching those of the watchExpression array
        //   // i.e.
        //   // newValues[0] -> $scope.foo
        //   // and
        //   // newValues[1] -> $scope.bar
        // });

        function setChartParameters(data){
          xScale = d3.scale.ordinal()
                    .domain(data.map(function(d){ return d.name; }))
                    .rangeRoundBands([yAxisPaddingLeft + 5, (rawSvg[0].clientWidth - paddingRight)], 0.1);
          xScaleLinear = d3.scale.ordinal()
                    .rangeRoundBands([yAxisPaddingLeft + 5, (rawSvg[0].clientWidth - paddingRight)], 0.1);
          yScaleLeft = d3.scale.linear()
                    .domain([0, d3.max(data, function (d) {
                      return (d.toi / d.gp / 60);
                    })])
                    .range([rawSvg.attr("height") - bottomPadding, 0]);
          yScaleRight = d3.scale.linear()
                    .domain([
                      d3.min(data, function (d) {
                        return (d.cf_per);
                      }) * 0.95,
                      d3.max(data, function (d) {
                      return (d.cf_per);
                    }) * 1.05 ])
                    .range([rawSvg.attr("height") - bottomPadding, 0]);
          xAxisGen = d3.svg.axis()
                      .scale(xScale)
                      .orient("bottom")
                      .ticks(data.length - 1);
          xAxisLinearGen = d3.svg.axis()
                      .scale(xScaleLinear)
                      .orient("bottom")
                      .tickSize(0);
          yAxisGenLeft = d3.svg.axis()
                      .scale(yScaleLeft)
                      .orient("left")
                      .ticks(5);
          yAxisGenRight = d3.svg.axis()
                      .scale(yScaleRight)
                      .orient("right")
                      .ticks(5);
          mainLine = d3.svg.line()
                      .x(function (d) {
                        return xScale(d.name);
                      })
                      .y(function (d) {
                        return yScaleRight(d.cf_per);
                      });
          averageLine = d3.svg.line()
                      .x(function (d) {
                        return xScale(d.name);
                      })
                      .y(function (d) {
                        return yScaleRight(d.cf_per);
                      });
        }

        function drawBarAndLineChart(data) {

          setChartParameters(data);

          // Axis + Labels
          svg.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + (chartPaddingLefft - yAxisPaddingLeft) + ",275)")
            .call(xAxisGen)
            .selectAll("text")
            .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );

          svg.append("svg:g")
            .attr("class", "y axis-left")
            .attr("transform", "translate(" + chartPaddingLefft + ",0)")
            .call(yAxisGenLeft);

          svg.append("text")
            .attr("class", "left y label")
            .attr("text-anchor", "end")
            .attr("x", -85)
            .attr("y", 60)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Time on Ice (minutes)");

          svg.append("svg:g")
            .attr("class", "y axis-right")
            .attr("transform", "translate(" + (rawSvg[0].clientWidth - 95) + ",0)")
            .call(yAxisGenRight);

          svg.append("text")
            .attr("class", "y label title-right")
            .attr("text-anchor", "end")
            .attr("dy", ".75em")
            .attr("transform", "translate(" + (rawSvg[0].clientWidth - 55) + ",165) rotate(90)")
            .text("Corsi For Percentage (CF%)");

          // Bar Chart
          var nsvg = d3.select("#bar-chart").select('svg')
                      .append("g")
                      .attr("id", "bars")

          var bar = nsvg.selectAll("#bars")
                      .data(data);

          bar.enter().append("rect")
            .attr("transform",function(d,i){
              return "translate(" + xScale(d.name) + ", 0)";
            })
            .attr("y", function(d) {
              return yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("x", function(d,i){
              return chartPaddingLefft - yAxisPaddingLeft;
            })
            .attr("height", function(d) {
              return rawSvg.attr("height") - bottomPadding - yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("width", xScale.rangeBand());

          bar.exit().remove();

          // Bar Label
          svg.select("#bars").selectAll("text")
            .data(data)
           .enter().append("text")
            .attr("class", "bar-label")
            .attr("text-anchor", "middle")
            .attr("dy", "1em")
            .style("font-size","10px")
            .style("fill","white")
            .attr("x", function(d) { return xScale(d.name) + xScale.rangeBand() + 14; })
            .attr("y", function(d) { return yScaleLeft((d.toi / d.gp / 60).toFixed(2)); })
            .text(function(d) { return ((d.toi / d.gp / 60).toFixed(2)); });

          // Line Chart
          svg.append("g").attr("id", "lines").append("svg:path")
            .attr({
              d: mainLine(data),
              "stroke": "red",
              "stroke-width": 2,
              "fill": "none",
              "class": pathClass,
              "transform": "translate(" + rawSvg[0].clientWidth/23 + ",0)"
            });


          // - Circles on Line Chart
          var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([0, 0])
                    .html(function(d) {
                      return (d.cf_per + "%");
                    });
          svg.call(tip);

          var circles = svg.selectAll(".dot")
            .data(data);

          circles
            .enter().append("circle")
            .attr('class', 'datapoint')
            .attr('cx', function(d) { return xScale(d.name); })
            .attr('cy', function(d) { return yScaleRight(d.cf_per); })
            .attr('r', 4)
            .attr('fill', 'white')
            .attr('stroke', 'red')
            .attr('stroke-width', '2')
            .attr("transform", "translate(" + (rawSvg[0].clientWidth / 23 ) + ",0)")
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

          circles
            .exit().remove();

          // Average Line
          var averageLineTip = d3.tip()
                    .attr('class', 'd3-avg-line-tip')
                    .offset([-rawSvg.attr("height")/7, rawSvg[0].clientWidth/3.5])
                    .html(function() {
                      return ("Team CF Average: " + selectedTeamDataToPlot[0].cf_per + "%");
                    });
          svg.call(averageLineTip);

          svg.append("svg:g")
            .attr("class", "x average-line")
            .attr("transform", "translate(" + (chartPaddingLefft - yAxisPaddingLeft) + "," + yScaleRight(selectedTeamDataToPlot[0].cf_per) + ")")
            .call(xAxisLinearGen)
            .on('mouseover', averageLineTip.show)
            .on('mouseout', averageLineTip.hide);
        }

        function update(data) {

          setChartParameters(data);

          // Axis
          svg.selectAll(".y.axis-left")
            .transition()
            .duration(transition)
            .attr("transform", "translate(" + chartPaddingLefft + ",0)")
            .call(yAxisGenLeft);

          svg.selectAll(".y.axis-right")
            .transition()
            .duration(transition)
            .attr("transform", "translate(" + (rawSvg[0].clientWidth - 95) + ",0)")
            .call(yAxisGenRight);

          svg.selectAll(".x.axis")
            .call(xAxisGen)
            .selectAll("text")
            .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );

          // Bar Chart
          var rect = svg.select("#bars").selectAll("rect")
            .data(data);

          rect.enter().append("rect")
            .attr("transform",function(d,i){
              return "translate("+xScale(d.name)+", 0)";
            })
            .attr("x", function(d){
              return chartPaddingLefft - yAxisPaddingLeft;
            })
            .attr("y", function(d) {
              return yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("height", 0)
            .transition()
            .duration(transition)
            .attr("height", function(d) {
              return rawSvg.attr("height") - bottomPadding - yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("width", xScale.rangeBand());

          rect
            .transition()
            .duration(transition)
            .attr("transform",function(d,i){
              return "translate("+xScale(d.name)+", 0)";
            })
            .attr("y", function(d) {
              return yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("x", function(d){
              return chartPaddingLefft - yAxisPaddingLeft;
            })
            .attr("height", function(d) {
              return rawSvg.attr("height") - bottomPadding - yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("width", xScale.rangeBand());

          rect.exit().remove();

          var barLabels = svg.select("#bars").selectAll(".bar-label")
            .data(data);

          barLabels.enter().append("text")
            .attr("class", "bar-label")
            .attr("text-anchor", "middle")
            .attr("dy", "1em")
            .style("font-size","10px")
            .style("fill","white")
            .attr("x", function(d) { return xScale(d.name) + xScale.rangeBand()/2; })
            .attr("y", function(d) { return yScaleLeft((d.toi / d.gp / 60).toFixed(2)); })
            .text(function(d) { return ((d.toi / d.gp / 60).toFixed(2)); });

          barLabels
            .transition()
            .duration(transition)
            .attr("text-anchor", "middle")
            .attr("dy", "1em")
            .style("font-size","10px")
            .style("fill","white")
            .attr("x", function(d) { return xScale(d.name) + xScale.rangeBand() + 14; })
            .attr("y", function(d) { return yScaleLeft((d.toi / d.gp / 60).toFixed(2)); })
            .text(function(d) { return ((d.toi / d.gp / 60).toFixed(2)); });

          barLabels.exit().remove();

          // Line Chart
          svg.select("#lines").select("." + pathClass)
            .transition()
            .duration(transition)
            .attr("d", mainLine(data))
            .attr("stroke-width", 2);

          var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([0, 0])
                    .html(function(d) {
                      return (d.cf_per + "%");
                    });
          svg.call(tip);

          var circles = svg.selectAll(".datapoint")
            .data(data);

          circles
            .enter().append("circle")
            .attr('class', 'datapoint')
            .attr('cx', function(d) { return xScale(d.name); })
            .attr('cy', function(d) { return yScaleRight(d.cf_per); })
            .attr('r', 4)
            .attr('fill', 'white')
            .attr('stroke', 'red')
            .attr('stroke-width', '2')
            .attr("transform", "translate(" + (rawSvg[0].clientWidth / 23 ) + ",0)")
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

          circles
            .transition()
            .duration(transition)
            .attr('cx', function(d) { return xScale(d.name); })
            .attr('cy', function(d) { return yScaleRight(d.cf_per); })
            .attr('r', 4)
            .attr('fill', 'white')
            .attr('stroke', 'red')
            .attr('stroke-width', '2')
            .attr("transform", "translate(" + (rawSvg[0].clientWidth / 23 ) + ",0)");

          circles
            .exit().remove();
        }

        function updateAvgLine(data) {
          var averageLineTip = d3.tip()
            .attr('class', 'd3-avg-line-tip')
            .offset([-rawSvg.attr("height")/7, rawSvg[0].clientWidth/3.5])
            .html(function() {
              return ("Team CF Average: " + data[0].cf_per + "%");
            });

          svg.call(averageLineTip);

          svg.select(".x.average-line")
            .attr("transform", "translate(" + (chartPaddingLefft - yAxisPaddingLeft) + "," + yScaleRight(data[0].cf_per) + ")")
            .call(xAxisLinearGen)
            .on('mouseover', averageLineTip.show)
            .on('mouseout', averageLineTip.hide);
        }

        drawBarAndLineChart(selectedPlayerDataToPlot);

      }
    };
  });
