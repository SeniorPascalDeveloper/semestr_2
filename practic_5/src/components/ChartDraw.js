import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    }, []);

    const margin = { top: 10, bottom: 60, left: 40, right: 10 };
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    // собираем значения для шкалы Y
    const allValues = [];
    props.data.forEach(d => {
        if (props.oy[1]) allValues.push(d.values[1]);
        if (props.oy[0]) allValues.push(d.values[0]);
    });
    const safeValues = allValues.length > 0 ? allValues : props.data.map(d => d.values[1]);
    let [min, max] = d3.extent(safeValues);

    const scaleX = useMemo(() => {
        return d3.scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, boundsWidth]);
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3.scaleLinear()
            .domain([4, 10])
            .range([boundsHeight, 0]);
    }, [boundsHeight, min, max]);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        // ошибка, если ни одна галочка не стоит

        // оси
        const xAxis = d3.axisBottom(scaleX);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        // функция рисования точек
        const drawDots = (indexOY, color, offset) => {
            svg.selectAll(".dot-" + indexOY)
                .data(props.data)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + offset*8)
                .attr("cy", d => scaleY(d.values[indexOY]))
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", color);
        };

        // функция рисования столбцов
        const drawBars = (indexOY, color, offset) => {
            const band = scaleX.bandwidth();
            const barWidth = band / 2 - 4;
            svg.selectAll(".bar-" + indexOY)
                .data(props.data)
                .enter()
                .append("rect")
                .attr("x", d => scaleX(d.labelX) + offset)
                .attr("y", d => scaleY(d.values[indexOY]))
                .attr("width", barWidth)
                .attr("height", d => boundsHeight - scaleY(d.values[indexOY]))
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .style("fill", color);
        };

        // выбор типа диаграммы
        const band = scaleX.bandwidth();
        if (props.chartType === "dot") {
            if (props.oy[0]) drawDots(1, "red", 1);
            if (props.oy[1]) drawDots(0, "blue",-1);
        } else if (props.chartType === "bar") {
            if (props.oy[0]) drawBars(1, "red", band / 2);
            if (props.oy[1]) drawBars(0, "blue", 2);
        }

    }, [scaleX, scaleY, props.data, props.oy, props.chartType]);

    return (
        <svg ref={chartRef}></svg>
    );
};

export default ChartDraw;