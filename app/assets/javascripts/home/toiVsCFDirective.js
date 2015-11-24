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
        var chartPaddingLeft = 100;
        var paddingRight = 130;
        var bottomPadding = 125;
        var pathClass = "path";
        var xScale, xScaleLinear, yScaleLeft, yScaleRight, xAxisGen, xAxisLinearGen, yAxisGenLeft, yAxisGenRight, mainLine, averageLine;

        var d3 = $window.d3;
        var rawSvg = elem.find('svg');
        var svg = d3.select(rawSvg[0]);

        var transition = 1500;
        var primaryColor = "#000000"
        var secondaryColor = "#C60C30";

        scope.$watchCollection(playersExp, function(newVal, oldVal){
          if(newVal != oldVal) {
            update(newVal);
          }
        });

        scope.$watchCollection(teamExp, function(newVal, oldVal){
          if(newVal != oldVal) {
            primaryColor = newVal[0].primary_color
            secondaryColor = newVal[0].secondary_color

            updateAvgLine(newVal);
            updateColorScheme();
          }
        });

        // scope.$watchGroup(["players", "team_stats"],function(newValues) {
        //   console.log(newValues);
        //   console.log(newValues);
        //   newValues array contains the current values of the watch expressions
        //   with the indexes matching those of the watchExpression array
        //   i.e.
        //   newValues[0] -> $scope.foo
        //   and
        //   newValues[1] -> $scope.bar
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
                        return (d.cf_per * 0.95);
                      }),
                      d3.max(data, function (d) {
                      return (d.cf_per * 1.05);
                    })])
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
            .attr("transform", "translate(" + (chartPaddingLeft - yAxisPaddingLeft) + ",275)")
            .call(xAxisGen)
            .selectAll("text")
            .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)" );

          svg.append("svg:g")
            .attr("class", "y axis-left")
            .attr("transform", "translate(" + chartPaddingLeft + ",0)")
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
            .attr("stroke", secondaryColor)
            .attr("fill", secondaryColor)
            .attr("transform", "translate(" + (rawSvg[0].clientWidth - 95) + ",0)")
            .call(yAxisGenRight);

          svg.append("text")
            .attr("class", "y label title-right")
            .attr("text-anchor", "end")
            .attr("dy", ".75em")
            .attr("fill", secondaryColor)
            .attr("transform", "translate(" + (rawSvg[0].clientWidth - 55) + ",200) rotate(90)")
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
              return chartPaddingLeft - yAxisPaddingLeft;
            })
            .attr("height", function(d) {
              return rawSvg.attr("height") - bottomPadding - yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("width", xScale.rangeBand())
            .attr("fill", primaryColor);

          bar.exit().remove();

          // Bar Label
          svg.select("#bars").selectAll("text")
            .data(data)
           .enter().append("text")
            .attr("class", "bar-label")
            .attr("text-anchor", "middle")
            .attr("dy", "1em")
            .style("font-size","" + (xScale.rangeBand()/3) + "px")
            .style("fill","white")
            .attr("x", function(d) { return xScale(d.name) + (chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand()/2); })
            .attr("y", function(d) { return yScaleLeft((d.toi / d.gp / 60).toFixed(2)); })
            .text(function(d) { return ((d.toi / d.gp / 60).toFixed(2)); });

          // Line Chart
          svg.append("g").attr("id", "lines").append("svg:path")
            .attr({
              d: mainLine(data),
              "stroke": secondaryColor,
              "stroke-width": 2,
              "fill": "none",
              "class": pathClass,
              "transform": "translate(" + ((chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand() / 2)) + ",0)"
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
            .attr('stroke', secondaryColor)
            .attr('stroke-width', '2')
            .attr("transform", "translate(" + ((chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand() / 2)) + ",0)")
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
            .attr("stroke", secondaryColor)
            .attr("transform", "translate(" + (chartPaddingLeft - yAxisPaddingLeft) + "," + yScaleRight(selectedTeamDataToPlot[0].cf_per) + ")")
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
            .attr("transform", "translate(" + chartPaddingLeft + ",0)")
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
              return chartPaddingLeft - yAxisPaddingLeft;
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
            .attr("width", xScale.rangeBand())

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
              return chartPaddingLeft - yAxisPaddingLeft;
            })
            .attr("height", function(d) {
              return rawSvg.attr("height") - bottomPadding - yScaleLeft(d.toi / d.gp / 60);
            })
            .attr("width", xScale.rangeBand())

          rect.exit().remove();

          // Bar Label
          var barLabels = svg.select("#bars").selectAll(".bar-label")
            .data(data);

          barLabels.enter().append("text")
            .attr("class", "bar-label")
            .attr("text-anchor", "middle")
            .attr("dy", "1em")
            .style("font-size","" + (xScale.rangeBand()/3) + "px")
            .style("fill","white")
            .attr("x", function(d) { return xScale(d.name) + (chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand()/2); })
            .attr("y", function(d) { return yScaleLeft((d.toi / d.gp / 60).toFixed(2)); })
            .text(function(d) { return ((d.toi / d.gp / 60).toFixed(2)); });

          barLabels
            .transition()
            .duration(transition)
            .attr("text-anchor", "middle")
            .attr("dy", "1em")
            .style("font-size","" + (xScale.rangeBand()/3) + "px")
            .style("fill","white")
            .attr("x", function(d) { return xScale(d.name) + (chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand()/2); })
            .attr("y", function(d) { return yScaleLeft((d.toi / d.gp / 60).toFixed(2)); })
            .text(function(d) { return ((d.toi / d.gp / 60).toFixed(2)); });

          barLabels.exit().remove();

          // Line Chart
          svg.select("#lines").select("." + pathClass)
            .transition()
            .duration(transition)
            .attr("d", mainLine(data))
            .attr("stroke-width", 2)
            .attr("transform", "translate(" + ((chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand() / 2)) + ",0)");

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
            .attr('stroke-width', '2')
            .attr("transform", "translate(" + ((chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand() / 2)) + ",0)")
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

          circles
            .transition()
            .duration(transition)
            .attr('cx', function(d) { return xScale(d.name); })
            .attr('cy', function(d) { return yScaleRight(d.cf_per); })
            .attr('r', 4)
            .attr('fill', 'white')
            .attr('stroke-width', '2')
            .attr("transform", "translate(" + ((chartPaddingLeft - yAxisPaddingLeft) + (xScale.rangeBand() / 2)) + ",0)")

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
            .on('mouseover', averageLineTip.show)
            .on('mouseout', averageLineTip.hide)
            .attr("stroke", secondaryColor)
            .transition()
            .duration(1500)
            .attr("transform", "translate(" + (chartPaddingLeft - yAxisPaddingLeft) + "," + yScaleRight(data[0].cf_per) + ")")
            .call(xAxisLinearGen)
        }

        function updateColorScheme() {
          svg = d3.select("#bar-chart").select('svg')

          svg.selectAll("rect")
            .attr("fill", primaryColor);

          svg.selectAll(".datapoint")
            .attr('stroke', secondaryColor)

          svg.select(".y.axis-right")
            .attr("stroke", secondaryColor)
            .attr("fill", secondaryColor)

          svg.select(".y.label.title-right")
            .attr("fill", secondaryColor)

          svg.select("#lines").select("path")
            .attr("stroke", secondaryColor)
        }

        drawBarAndLineChart(selectedPlayerDataToPlot);

      }
    };
  });
