// src/components/ChartDraw.js
import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';

const ChartDraw = (props) => {
  const chartRef = useRef(null);

  // Размеры SVG (получаем из стилей или из состояния)
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);

  // Отступы
  const margin = { top: 20, bottom: 60, left: 60, right: 20 };

  // Измеряем реальные размеры SVG после монтирования
  useEffect(() => {
    if (chartRef.current) {
      const svg = d3.select(chartRef.current);
      const w = parseFloat(svg.style('width')) || 800;
      const h = parseFloat(svg.style('height')) || 400;
      setWidth(w);
      setHeight(h);
    }
  }, []);

  // Вычисляем размеры области построения
  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  // Данные для оси X (категории)
  const xLabels = props.data.map(d => d.labelX);

  // Определяем индекс для оси Y (0 - минимум, 1 - максимум)
  // Если выбраны оба – рисуем два ряда точек/столбцов
  const oyIndices = [];
  if (props.oy[0]) oyIndices.push(1); // максимум (второй элемент)
  if (props.oy[1]) oyIndices.push(0); // минимум (первый элемент)

  // Вычисляем глобальный минимум и максимум для оси Y
  const allValues = props.data.flatMap(d => d.values);
  const globalMin = d3.min(allValues);
  const globalMax = d3.max(allValues);

  // Мемоизируем шкалы
  const scaleX = useMemo(() => {
    return d3.scaleBand()
      .domain(xLabels)
      .range([0, boundsWidth])
      .padding(0.2);
  }, [xLabels, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3.scaleLinear()
      .domain([globalMin * 0.9, globalMax * 1.1])
      .range([boundsHeight, 0]);
  }, [globalMin, globalMax, boundsHeight]);

  // Основной эффект для рисования графика
  useEffect(() => {
    if (!chartRef.current || props.data.length === 0) return;

    const svg = d3.select(chartRef.current);
    // Очищаем SVG перед перерисовкой
    svg.selectAll('*').remove();

    // Рисуем оси
    const xAxis = d3.axisBottom(scaleX);
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-30)');

    const yAxis = d3.axisLeft(scaleY);
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    // Для каждого индекса OY рисуем свой слой точек или столбцов
    const colors = ['blue', 'red']; // минимум – синий, максимум – красный

    oyIndices.forEach((index, i) => {
      const label = index === 0 ? 'Минимум' : 'Максимум';
      const color = colors[i];

      if (props.chartType === 'scatter') {
        // Точечная диаграмма
        svg.selectAll(`.dot-${index}`)
          .data(props.data)
          .enter()
          .append('circle')
          .attr('class', `dot-${index}`)
          .attr('r', 5)
          .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
          .attr('cy', d => scaleY(d.values[index]))
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .style('fill', color)
          .style('opacity', 0.8)
          .append('title') // всплывающая подсказка
          .text(d => `${label}: ${d.values[index]}`);
      } else if (props.chartType === 'bar') {
        // Гистограмма
        svg.selectAll(`.bar-${index}`)
          .data(props.data)
          .enter()
          .append('rect')
          .attr('class', `bar-${index}`)
          .attr('x', d => scaleX(d.labelX) + scaleX.bandwidth() / 4 * (i === 0 ? 0 : 1)) // сдвиг для двух столбцов
          .attr('y', d => scaleY(d.values[index]))
          .attr('width', scaleX.bandwidth() / 2)
          .attr('height', d => boundsHeight - scaleY(d.values[index]))
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .style('fill', color)
          .style('opacity', 0.7)
          .append('title')
          .text(d => `${label}: ${d.values[index]}`);
      }
    });

    // Добавляем легенду
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 120}, ${margin.top + 10})`);

    oyIndices.forEach((index, i) => {
      const label = index === 0 ? 'Минимум' : 'Максимум';
      const color = colors[i];
      const yPos = i * 20;
      legend.append('rect')
        .attr('x', 0)
        .attr('y', yPos)
        .attr('width', 12)
        .attr('height', 12)
        .style('fill', color);
      legend.append('text')
        .attr('x', 18)
        .attr('y', yPos + 10)
        .text(label)
        .style('font-size', '10px');
    });

  }, [props.data, scaleX, scaleY, props.oy, props.chartType, margin, height, boundsWidth, boundsHeight]);

  return (
    <svg ref={chartRef} width="800" height="400" style={{ border: '1px solid #ccc' }}></svg>
  );
};

export default ChartDraw;