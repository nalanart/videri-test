import { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';

import { getDayFromUnixTimestamp } from '../../utils/openWeatherMap';

import { Box, Typography } from '@mui/material';

const WeeklyForecastChart = ({ data, height }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const dayRef = useRef();
  const weatherRef = useRef();
  const highRef = useRef();
  const lowRef = useRef();
  const containerRef = useRef();

  const [width, setWidth] = useState();

  useEffect(() => {
    handleResize();
    // could use a debouncer to prevent too many redrawings of the chart while resizing
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    wipeGraph();
    if (data) drawGraph();
  }, [data, width]);

  const handleResize = () => {
    const styles = window.getComputedStyle(containerRef.current);
    setWidth(
      containerRef.current.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight)
    );
  };

  const drawGraph = () => {
    const dailyForecastArray = data.daily;
    const minTempArray = Array.from(dailyForecastArray, (day) => day.temp.min);
    const maxTempArray = Array.from(dailyForecastArray, (day) => day.temp.max);
    const r = 4;

    const yMin = d3.min(minTempArray);
    const yMax = d3.max(maxTempArray);

    const svg = d3
      .select(svgRef.current)
      .attr('height', height)
      .attr('width', width);

    const tooltip = d3.select(tooltipRef.current);
    const tooltipDay = d3.select(dayRef.current);
    const tooltipDesc = d3.select(weatherRef.current);
    const tooltipHigh = d3.select(highRef.current);
    const tooltipLow = d3.select(lowRef.current);

    const xScale = d3.scaleLinear().domain([0, 7]).range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([yMin - 5, yMax + 5])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(8)
      .tickFormat((d, i) => getDayFromUnixTimestamp(data.daily[i].dt));

    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g').call(xAxis).attr('transform', `translate(0, ${height})`);
    svg.append('g').call(yAxis);

    drawCircles(minTempArray);
    drawCircles(maxTempArray);

    drawLine(minTempArray, 'blue');
    drawLine(maxTempArray, 'red');

    drawLegend();

    function handleMouseOver(d, i) {
      const index = this.dataset.index;
      const dayData = dailyForecastArray[index];

      d3.select(this)
        .attr('fill', 'orange')
        .attr('r', r * 1.5);

      tooltip
        .style('display', 'block')
        .style('transform', `translate(${xScale(index)}px, ${yScale(i)}px)`);

      tooltipDay.text(getDayFromUnixTimestamp(dayData.dt));
      tooltipDesc.text(dayData.weather[0].main);
      tooltipHigh.text(`Hi: ${dayData.temp.max} °C`);
      tooltipLow.text(`Lo: ${dayData.temp.min} °C`);
    }

    function handleMouseOut(d, i) {
      d3.select(this).attr('fill', 'black').attr('r', r);
      tooltip.style('display', 'none');
    }

    function drawLine(data, color) {
      svg
        .selectAll('.line')
        .data([data])
        .join('path')
        .attr('d', (d) => line(d))
        .attr('fill', 'none')
        .attr('stroke', color);
    }

    function drawCircles(data) {
      svg
        .selectAll('.circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', (d) => yScale(d))
        .attr('r', r)
        .attr('data-index', (d, i) => i)
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
    }

    function drawLegend() {
      svg
        .append('circle')
        .attr('cx', 20)
        .attr('cy', height - 50)
        .attr('r', 6)
        .style('fill', 'red');
      svg
        .append('circle')
        .attr('cx', 20)
        .attr('cy', height - 20)
        .attr('r', 6)
        .style('fill', 'blue');
      svg
        .append('text')
        .attr('x', 30)
        .attr('y', height - 50)
        .text('High Temperature')
        .attr('alignment-baseline', 'middle');
      svg
        .append('text')
        .attr('x', 30)
        .attr('y', height - 20)
        .text('Low Temperature')
        .attr('alignment-baseline', 'middle');
    }
  };

  const wipeGraph = () => {
    d3.select(svgRef.current).selectAll('*').remove();
  };

  return (
    <Box sx={{ px: 2, mb: 5, position: 'relative' }} ref={containerRef}>
      <Box
        ref={tooltipRef}
        sx={{
          display: 'none',
          position: 'absolute',
          backgroundColor: '#efefef',
          padding: 1,
          borderRadius: 1,
        }}
      >
        <Typography ref={dayRef}></Typography>
        <Typography ref={weatherRef}></Typography>
        <Typography ref={highRef}></Typography>
        <Typography ref={lowRef}></Typography>
      </Box>
      <svg ref={svgRef} style={{ overflow: 'visible' }} />
    </Box>
  );
};

export default WeeklyForecastChart;
