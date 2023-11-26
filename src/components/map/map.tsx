'use client';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { useEffect, useRef, useState } from 'react';
import { FeatureCollection } from 'geojson';
import { LEVEL } from '@/app/dashboard/lib/enum';
const levelMap: Record<LEVEL, string> = {
  [LEVEL.COUNTY]: '/map-data/counties.json',
  [LEVEL.TOWN]: '/map-data/towns.json',
  [LEVEL.VILLAGE]: '/map-data/villages.json',
};
export default function Map() {
  const [level, setLevel] = useState<LEVEL>(LEVEL.TOWN);
  const map = useRef<SVGSVGElement>(null);
  const zoomHandler = (event: any) => {
    const { transform } = event;
    d3.select(map.current)
      .select('g')
      .attr('transform', transform)
      .attr('stroke-width', 1 / transform.k);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = async (level: LEVEL) => {
    const zoom = d3.zoom().scaleExtent([1, 4]).on('zoom', zoomHandler);
    const mapContainer = d3.select(map.current);
    mapContainer.call(zoom as any);
    const g = mapContainer.append('g');
    const projectMethod = d3.geoMercator().center([121, 24]).scale(8400);
    const pathGenerator = d3.geoPath().projection(projectMethod);
    const url = levelMap[level];
    const mapData = (await d3.json(url)) as any;
    const geometries = topojson.feature(
      mapData,
      mapData.objects['TAIWAN'],
    ) as unknown as FeatureCollection;
    g.append('path');
    const paths = g.selectAll('path').data(geometries.features);
    paths
      .enter()
      .append('path')
      .attr('d', pathGenerator)
      .attr('style', 'fill: #ccc; stroke: #fff; stroke-width: 1px;')
      .append('title')
      .text((d) => d.properties?.['COUNTYNAME']);
  };

  useEffect(() => {
    draw(level);
  }, [level, draw]);
  return <svg className="w-full h-full" ref={map}></svg>;
}
