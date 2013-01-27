
            var margin = {top: 20, right: 115, bottom: 140, left: 40},
                margin2 = {top: 310, right: 115, bottom: 70, left: 40},
                width = 750 - margin.left - margin.right,
                height = 450 - margin.top - margin.bottom,
                height2 = 450 - margin2.top - margin2.bottom;


            var x = d3.scale.linear().range([10, width + 10]),
                x2 = d3.scale.linear().range([10, width + 10]),
                x3 = d3.scale.linear().range([10, width + 10]);

            var y = d3.scale.linear().range([height, 0]),
                y2 = d3.scale.linear().range([height2, 0]),
                y3 = d3.scale.linear().range([height, 0]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(6),
                xAxis2 = d3.svg.axis().scale(x2).orient("bottom").ticks(6);

            var yAxis = d3.svg.axis().scale(y).orient("left").ticks(8),
                yAxis2 = d3.svg.axis().scale(y3).orient("right").ticks(8);


            var brush = d3.svg.brush()
            .x(x2)
            .on("brush", brush);

            var line = d3.svg.line()
            .interpolate("linear")
            .x(function(d) { return x(d.time); })
            .y(function(d) { return y(d.voltage); });


            var line2 = d3.svg.line()
            .interpolate("linear")
            .x(function(d) { return x2(d.time); })
            .y(function(d) { return y2(d.voltage); });

            var line3 = d3.svg.line()
            .interpolate("linear")
            .x(function(d) { return x3(d.time); })
            .y(function(d) { return y3(d.current); });

            var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

            var focus = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var context = svg.append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

            var neuronList = [];
            var neuronData = null;
            var neuronMeta = null;

            /*
            d3.select(".metaData")
            .selectAll("p")
            .data([1])
            .enter().append("p")
            .attr("align","center")
            .text(neuronList[0].links[1]);
            */

            var toplist = d3.select("ul");

            toplist.selectAll("li")
            .data(neuronList)
            .enter().append("li")
            .text(function(d) { return d.links[0]; })
            .on("click", newNeuron);

            function newNeuron(d) {
                neuronData = ('{{ STATIC_URL }}data/ModelVolt.tsv');
                /*neuronMeta = (d.links);*/

                focus.select(".line").remove();
                focus.select(".line3").remove();
                focus.select("g").remove();
                focus.select(".y.axis").remove();

                context.select(".brush").remove();
                context.select(".line2").remove();
                context.select(".x.axis").remove();

                d3.select(".metaData")
                .selectAll("p").remove();

                d3.select(".metaData")
                .selectAll("p")
                .data([1])
                .enter().append("p")
                .attr("align","center")
                .text(d.links[1]);

                draw();
            }


            draw();

            function draw() {
                d3.tsv(neuronData, function(error, data) {
                       data.forEach(function(d) {
                                    d.time = +d.time;
                                    d.voltage = +d.voltage;
                                    d.current = +d.current;
                                    });

                       x.domain(d3.extent(data, function(d) { return d.time; }));
                       y.domain(d3.extent(data, function(d) { return d.voltage; }));


                       x2.domain(x.domain());
                       y2.domain(y.domain());

                       x3.domain(x2.domain());
                       y3.domain(d3.extent(data, function(d) { return d.current; }));



                       focus.append("path")
                       .datum(data)
                       .attr("clip-path", "url(#clip)")
                       .attr("class", "line")
                       .attr("d", line);


                       focus.append("g")
                       .attr("class", "y axis")
                       .attr("transform", "translate(-5,0)")
                       .call(yAxis)
                       .append("text")
                       .attr("transform", "rotate(-90)")
                       .attr("y", 6)
                       .attr("dy", ".71em")
                       .style("text-anchor", "end")
                       .text("voltage (mV)");

                       d3.select("input").on("change", change);

                       var sortTimeout = setTimeout(function() {
                                                    d3.select("input").property("checked", true).each(change);
                                                    }, 1000000000);

                       function change() {

                       clearTimeout(sortTimeout);


                       if (this.checked == true) {
                            focus.append("path")
                            .datum(data)
                            .attr("clip-path", "url(#clip)")
                            .attr("class", "line3")
                            .attr("d", line3);

                            focus.append("g")
                            .attr("class", "y axis")
                            .attr("transform", "translate(" + (width+20) + "," + 0 + ")")
                            .call(yAxis2)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", -25)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text("current (pA)");
                       }

                       if (this.checked == false)
                            focus.select(".line3").remove();
                            focus.select(".y.axis").remove();

                            focus.append("g")
                            .attr("class", "y axis")
                            .attr("transform", "translate(-5,0)")
                            .call(yAxis)
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", 6)
                            .attr("dy", ".71em")
                            .style("text-anchor", "end")
                            .text("voltage (mV)");

                       }

                       context.append("path")
                       .datum(data)
                       .attr("class", "line2")
                       .attr("d", line2);


                       context.append("g")
                       .attr("class", "x axis")
                       .attr("transform", "translate(0," + height2 + ")")
                       .call(xAxis2)
                       .append("text")
                       .attr("class", "label")
                       .attr("x", width / 2)
                       .attr("y", 50)
                       .style("text-anchor", "end")
                       .text("time");

                       context.append("g")
                       .attr("class", "x brush")
                       .call(brush)
                       .selectAll("rect")
                       .attr("y", -10)
                       .attr("height", height2 + 7);



                       });
            }

            function brush() {
                x.domain(brush.empty() ? x2.domain() : brush.extent());
                focus.select("path").attr("d", line);
                focus.select(".x.axis").call(xAxis);


            }
