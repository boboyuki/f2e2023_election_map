'use client';

import * as D3 from 'd3';
import { useEffect, useRef } from 'react';
import { EPoliticalPartyId, POLITICAL_PARTY_COLOR } from '@/app/constants';
import {
  ALL_POLITICAL_PARTY_VOTE_CITIES,
  ALL_POLITICAL_PARTY_VOTE_CITIES_DATA,
  ALL_POLITICAL_PARTY_VOTE_TOWNS,
  ALL_POLITICAL_PARTY_VOTE_TOWNS_DATA,
  ALL_POLITICAL_PARTY_VOTE_VILLAGES,
  ALL_POLITICAL_PARTY_VOTE_VILLAGES_DATA,
  VOTE_CITIES,
} from './vote-bar.constant';
import { IVoteArea } from './vote-bar.type';

function rightRoundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  return (
    'M' +
    x +
    ',' +
    y +
    'h' +
    (width - radius) +
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    radius +
    ',' +
    radius +
    'v' +
    (height - 2 * radius) +
    'a' +
    radius +
    ',' +
    radius +
    ' 0 0 1 ' +
    -radius +
    ',' +
    radius +
    'h' +
    (radius - width) +
    'z'
  );
}

export const VoteBar = ({
  politicalPartyId,
  cityId,
  townId,
}: {
  politicalPartyId?: EPoliticalPartyId;
  cityId?: string;
  townId?: string;
}) => {
  const svgRef = useRef<HTMLDivElement>(null);
  // 政黨顏色
  const politicalPartyColor = politicalPartyId
    ? POLITICAL_PARTY_COLOR[politicalPartyId]
    : '#FFF';
  // 所有城市投票資料
  const voteCities: IVoteArea[] = politicalPartyId
    ? ALL_POLITICAL_PARTY_VOTE_CITIES_DATA[politicalPartyId].map((city) => ({
        id: city.id,
        candidate: city.candidate,
        area: city.city,
      }))
    : [];
  // 該城市中的鄉鎮區投票資料
  const voteTowns: IVoteArea[] =
    politicalPartyId && cityId
      ? ALL_POLITICAL_PARTY_VOTE_TOWNS_DATA[politicalPartyId]
          .filter((voteTown) => voteTown.id.includes(cityId))
          .map((town) => ({
            id: town.id,
            candidate: town.candidate,
            area: town.town,
          }))
      : [];
  // 該城市鄉鎮區中的村里投票資料
  const voteVillages: IVoteArea[] =
    politicalPartyId && townId
      ? ALL_POLITICAL_PARTY_VOTE_VILLAGES_DATA[politicalPartyId]
          .filter((voteVillage) =>
            voteVillage.id.split('-').join('').includes(townId),
          )
          .map((village) => ({
            id: village.id,
            candidate: village.candidate,
            area: village.village,
          }))
      : [];
  // 選定城市 or 鄉鎮區之投票資料
  const voteAreas = townId ? voteVillages : cityId ? voteTowns : voteCities;

  useEffect(() => {
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 10;
    const marginLeft = 60;
    const width = 928;
    const barHeight = voteAreas?.length > 50 ? 25 : 40;
    // const barHeight = 25
    const height =
      Math.ceil(
        ((voteAreas.length
          ? voteAreas.length
          : ALL_POLITICAL_PARTY_VOTE_CITIES.length) +
          0.1) *
          barHeight,
      ) +
      marginTop +
      marginBottom;

    /* Create the SVG container. */
    const svg = D3.create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')
      .attr('id', 'vote-rate-chart');

    /* 產生單一政黨的長條圖 */
    const generateVoteBarById = () => {
      /* create the scales */
      const x = D3.scaleLinear()
        .domain([0, 100])
        // .domain([
        //   0,
        //   D3.max(voteCities, (d) => d.candidate?.voteRate) as number,
        // ])
        .range([marginLeft, width - marginRight]);
      const y = D3.scaleBand()
        .domain(D3.map(voteAreas, (d) => d.area))
        .rangeRound([marginTop, height - marginBottom])
        .padding(0.1);

      /* Append a rect for each candidate in each city. */
      svg
        .append('g')
        .attr('fill', 'white')
        .selectAll()
        .data(voteAreas)
        // .data(voteCities)
        .join('rect')
        .attr('x', x(0))
        .attr('y', (d) => y(d.area) as number)
        .attr('width', (d) => x(100) - x(0))
        .attr('height', y.bandwidth() * 0.5)
        .attr('transform', 'translate(0, 8)');
      // .attr('rx', 8)
      // .attr('ry', 8)
      svg
        .append('g')
        .attr('fill', politicalPartyColor)
        .selectAll()
        .data(voteAreas)
        .join('rect')
        .attr('x', x(0))
        .attr('y', (d) => y(d.area) as number)
        .attr('width', (d) => x(d.candidate?.voteRate || 0) - x(0))
        .attr('height', y.bandwidth() * 0.5)
        .attr('transform', 'translate(0, 8)');
      // .attr('rx', '5')
      // .attr('ry', '5')

      /* Append a label for each candidate's vote rate. */
      // svg
      //   .append('g')
      //   .attr('fill', 'white')
      //   .attr('text-anchor', 'end')
      //   .selectAll()
      //   .data(voteAreas)
      //   .join('text')
      //   .attr('x', (d) => x(d.candidate?.voteRate || 0))
      //   .attr('y', (d) => (y(d.area) as number) + y.bandwidth() / 2)
      //   .attr('dy', '0.35em')
      //   .attr('dx', -4)
      //   .text((d) => (d.candidate?.voteRate ? `${d.candidate.voteRate}%` : 0))
      //   .call((text) =>
      //     text
      //       .filter((d) => x(d.candidate?.voteRate || 0) - x(0) < 20) // short bars
      //       .attr('dx', +4)
      //       .attr('fill', 'black')
      //       .attr('text-anchor', 'start'),
      //   )

      /* create the axes */
      //  X 軸
      // svg
      //   .append('g')
      //   .attr('transform', `translate(0, ${marginTop})`)
      //   .call(D3.axisTop(x).tickFormat((d) => `${d}%`))
      //   .call((g) => g.select('.domain').remove()) // 刪除 x 座標軸的底線
      svg
        .append('g')
        .attr('transform', `translate(${marginLeft}, 0)`)
        .attr('color', 'white')
        .call(D3.axisLeft(y).tickSizeOuter(0))
        .style('font-size', '16px')
        .call((g) => g.select('.domain').remove()) // 刪除 y 座標軸的縱線
        .call((g) => g.selectAll('line').remove()); // 刪除 y 座標軸的底線
    };

    /* 產生所有政黨的長條圖 */
    const generateAllPoliticalPartyVoteBar = () => {
      const voteCities = VOTE_CITIES.map((city) => ({
        id: city.id,
        candidate: city.candidate,
        area: city.city,
      }));

      const voteTowns = cityId
        ? ALL_POLITICAL_PARTY_VOTE_TOWNS.filter((voteTown) =>
            voteTown.id.includes(cityId),
          ).map((town) => ({
            id: town.id,
            candidate: town.candidates,
            area: town.town,
          }))
        : [];

      const voteVillages = townId
        ? ALL_POLITICAL_PARTY_VOTE_VILLAGES.filter((voteVillage) =>
            voteVillage.id.split('-').join('').includes(townId),
          ).map((village) => ({
            id: village.id,
            candidate: village.candidates,
            area: village.village,
          }))
        : [];

      const voteAreas = townId ? voteVillages : cityId ? voteTowns : voteCities;

      /* create the scales */
      const x = D3.scaleLinear()
        .domain([0, 100])
        // .domain([
        //   0,
        //   D3.max(voteCities, (d) => d.candidate?.voteRate) as number,
        // ])
        .range([marginLeft, width - marginRight]);
      const y = D3.scaleBand()
        .domain(D3.map(voteAreas, (d) => d.area))
        .rangeRound([marginTop, height - marginBottom])
        .padding(0.1);
      // .arguments('font-size', '20px')

      /* Append a rect for each candidate in each city. */
      /* 民進黨 */
      svg
        .append('g')
        .attr('fill', POLITICAL_PARTY_COLOR[EPoliticalPartyId.DPP])
        .selectAll()
        .data(voteAreas)
        .join('rect')
        .attr('x', x(0))
        .attr('y', (d) => y(d.area) as number)
        .attr('width', (d) => x(d.candidate[0]?.voteRate || 0) - x(0))
        .attr('height', y.bandwidth() * 0.5)
        .attr('transform', 'translate(0, 8)');
      // .attr('rx', '5')
      // .attr('ry', '5')
      /* 國民黨 */
      svg
        .append('g')
        .attr('fill', POLITICAL_PARTY_COLOR[EPoliticalPartyId.KMT])
        .selectAll()
        .data(voteAreas)
        .join('rect')
        .attr('x', (d) => x(d.candidate[0].voteRate))
        .attr('y', (d) => y(d.area) as number)
        .attr(
          'width',
          (d) =>
            x(100) -
            (x(d.candidate[2].voteRate + d.candidate[0].voteRate) + x(0)),
        )
        .attr('height', y.bandwidth() * 0.5)
        .attr('transform', 'translate(0, 8)');
      // .attr('rx', '5')
      // .attr('ry', '5')
      /* 親民黨 */
      svg
        .append('g')
        .attr('fill', POLITICAL_PARTY_COLOR[EPoliticalPartyId.PFP])
        .selectAll()
        .data(voteAreas)
        .join('rect')
        .attr('x', (d) => x(100) - x(d.candidate[2].voteRate))
        .attr('y', (d) => y(d.area) as number)
        .attr('width', (d) => x(d.candidate[2].voteRate))
        .attr('height', y.bandwidth() * 0.5)
        .attr('transform', 'translate(0, 8)');

      /* Append a label for each candidate's vote rate. */
      // svg
      //   .append('g')
      //   .attr('fill', 'white')
      //   .attr('text-anchor', 'end')
      //   .selectAll()
      //   .data(voteCities)
      //   .join('text')
      //   .attr('x', (d) => x(d.candidate?.voteRate || 0))
      //   .attr('y', (d) => (y(d.city) as number) + y.bandwidth() / 2)
      //   .attr('dy', '0.35em')
      //   .attr('dx', -4)
      //   .text((d) => (d.candidate?.voteRate ? `${d.candidate.voteRate}%` : 0))
      //   .call((text) =>
      //     text
      //       .filter((d) => x(d.candidate?.voteRate || 0) - x(0) < 20) // short bars
      //       .attr('dx', +4)
      //       .attr('fill', 'black')
      //       .attr('text-anchor', 'start'),
      //   )

      /* create the axes */
      //  X 軸
      // svg
      //   .append('g')
      //   .attr('transform', `translate(0, ${marginTop})`)
      //   .call(D3.axisTop(x).tickFormat((d) => `${d}%`))
      //   .call((g) => g.select('.domain').remove()) // 刪除 x 座標軸的底線
      svg
        .append('g')
        .attr('transform', `translate(${marginLeft}, 0)`)
        .attr('color', 'white')
        .call(D3.axisLeft(y).tickSizeOuter(0))
        .style('font-size', '16px')
        .call((g) => g.select('.domain').remove()) // 刪除 y 座標軸的縱線
        .call((g) => g.selectAll('line').remove()); // 刪除 y 座標軸的底線
    };

    politicalPartyId
      ? generateVoteBarById()
      : generateAllPoliticalPartyVoteBar();

    const chartNode = svg.node();
    if (svgRef.current && chartNode) {
      svgRef.current.appendChild(chartNode);
    }

    return () => {
      if (chartNode) {
        const voteRateChartSvg = document.getElementById('vote-rate-chart');
        voteRateChartSvg?.parentElement?.removeChild(chartNode);
      }
    };
  }, [voteAreas, politicalPartyColor, politicalPartyId, cityId, townId]);

  return <div ref={svgRef} />;
};
