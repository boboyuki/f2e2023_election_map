'use client'

import * as D3 from 'd3'
import { useEffect, useRef } from 'react'

// const DATA: { letter: string; frequency: D3.NumberValue }[] = [
const DATA = [
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 },
  // { columns: ['letter', 'frequency'] },
  // ['letter', 'frequency'],
]

export default function HorizontalBar() {
  const svgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marginTop = 30
    const marginRight = 0
    const marginBottom = 10
    const marginLeft = 30
    const width = 928
    const barHeight = 25
    const height =
      Math.ceil((DATA.length + 0.1) * barHeight) + marginTop + marginBottom
    // const height = 800

    /* create the scales */
    const x = D3.scaleLinear()
      .domain([0, D3.max(DATA, (d) => d.frequency) as number])
      .range([marginLeft, width - marginRight])
    const y = D3.scaleBand()
      .domain(D3.sort(DATA, (d) => -d.frequency).map((d) => d.letter))
      .rangeRound([marginTop, height - marginBottom])
      .padding(0.1)

    /* Create a value format */
    const format = x.tickFormat(20, '%')

    /* Create the SVG container. */
    const svg = D3.create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr(
        'style',
        'max-width: 100%; height: auto; font: 10px sans-serif; background: orange;',
      )

    /* Append a rect for each letter. */
    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll()
      .data(DATA)
      .join('rect')
      .attr('x', x(0))
      .attr('y', (d) => y(d.letter) as number)
      .attr('width', (d) => x(d.frequency) - x(0))
      .attr('height', y.bandwidth())

    /* Append a label for each letter. */
    svg
      .append('g')
      .attr('fill', 'white')
      .attr('text-anchor', 'end')
      .selectAll()
      .data(DATA)
      .join('text')
      .attr('x', (d) => x(d.frequency))
      .attr('y', (d) => (y(d.letter) as number) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('dx', -4)
      .text((d) => format(d.frequency))
      .call((text) =>
        text
          .filter((d) => x(d.frequency) - x(0) < 20) // short bars
          .attr('dx', +4)
          .attr('fill', 'black')
          .attr('text-anchor', 'start'),
      )

    /* create the axes */
    svg
      .append('g')
      .attr('transform', `translate(0, ${marginTop})`)
      .call(D3.axisTop(x).ticks(width / 80, '%'))
    // .call((g) => g.select('.domain').remove()) // 刪除 x 座標軸的底線
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft}, 0)`)
      .call(D3.axisLeft(y).tickSizeOuter(0))

    const chartNode = svg.node()
    if (svgRef.current && chartNode) {
      svgRef.current.appendChild(chartNode)
    }
  }, [])

  return <div ref={svgRef} />
}
