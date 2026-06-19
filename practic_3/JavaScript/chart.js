function createArrGraph(data, key) {

    const groupObj = d3.group(data, d => d[key]);

    let arrGraph = [];

    for (let entry of groupObj) {

        const values = entry[1].map(d => d["Рейтинг"]);
        const minMax = d3.extent(values);

        arrGraph.push({
            labelX: entry[0],
            min: minMax[0],
            max: minMax[1]
        });
    }

    return arrGraph;
}

function drawGraph(data, dataForm) {

    const keyX = dataForm.ox;
    const oyOptions = dataForm.oy;
    const chartType = dataForm.type;

    let arrGraph = createArrGraph(data, keyX);

    if (keyX === "Год") {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const attr = {
        width: 800,
        height: 500,
        marginX: 50,
        marginY: 50
    };

    const [scX, scY] = createAxis(svg, arrGraph, attr, oyOptions);

    if (oyOptions.includes("max")) {
        drawByType(svg, arrGraph, scX, scY, attr,
            "max", chartType, "red", +1);
    }

    if (oyOptions.includes("min")) {
        drawByType(svg, arrGraph, scX, scY, 
            attr, "min", chartType, "blue",-1);
    }
}

function createAxis(svg, data, attr, oyOptions) {

    let values = [];

    const hasMin = oyOptions.includes("min");
    const hasMax = oyOptions.includes("max");

    if (hasMin) {
        values.push(...data.map(d => d.min));
    }

    if (hasMax) {
        values.push(...data.map(d => d.max));
    }
    
    if (values.length === 0) {
        values.push(...data.map(d => d.min));
        values.push(...data.map(d => d.max));
    }

    const min = d3.min(values);
    const max = d3.max(values);

    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr.width - 2 * attr.marginX])
        .padding(0.2);

    const scaleY = d3.scaleLinear()
        .domain([min * 0.97, max * 1.01])
        .range([attr.height - 2 * attr.marginY, 0]);

    svg.append("g")
        .attr(
            "transform",
            `translate(${attr.marginX},${attr.height - attr.marginY})`
        )
        .call(d3.axisBottom(scaleX))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr(
            "transform",
            `translate(${attr.marginX},${attr.marginY})`
        )
        .call(d3.axisLeft(scaleY));

    return [scaleX, scaleY];
}

function drawByType(svg, data, scaleX, scaleY, attr, mode, chartType, color, offset) {

    if (chartType === "dot") {
        drawDots(svg, data, scaleX, scaleY, attr, mode, color, offset);
    }

    if (chartType === "bar") {
        drawBars(svg, data, scaleX, scaleY, attr, mode, color, offset);
    }

    if (chartType === "graph") {
        drawLine(svg, data, scaleX, scaleY, attr, mode, color);
    }
}

function drawBars(svg, data, scaleX, scaleY, attr, mode, color, offset) {

    const band = scaleX.bandwidth();
    const barWidth = band / 2 - 4;

    svg.selectAll("." + mode)
        .data(data)
        .enter()
        .append("rect")
        .attr(
            "x",
            d => scaleX(d.labelX) + (offset === -1 ? 2 : band / 2)
        )
        .attr("y", d => scaleY(d[mode]))
        .attr("width", barWidth)
        .attr(
            "height",
            d => attr.height - 2 * attr.marginY - scaleY(d[mode])
        )
        .attr(
            "transform",
            `translate(${attr.marginX},${attr.marginY})`
        )
        .style("fill", color);
}

function drawDots(svg, data, scaleX, scaleY, attr, mode, color, offset) {
    const band = scaleX.bandwidth();

    svg.selectAll("." + mode)
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr(
            "cx",
            d => scaleX(d.labelX) + band / 2 + offset * 8
        )
        .attr("cy", d => scaleY(d[mode]))
        .attr(
            "transform",
            `translate(${attr.marginX},${attr.marginY})`
        )
        .style("fill", color);
}

function drawLine(svg, data, scaleX, scaleY, attr, mode, color) {
    const band = scaleX.bandwidth();

    const line = d3.line()
        .x(d => scaleX(d.labelX) + band / 2)
        .y(d => scaleY(d[mode]))
        .curve(d3.curveMonotoneX);
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr(
            "transform",
            `translate(${attr.marginX},${attr.marginY})`
        );
}