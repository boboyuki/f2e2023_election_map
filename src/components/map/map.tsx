'use client';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { configResponsive, useResponsive } from 'ahooks/lib';
import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from 'geojson';
import { LEVEL } from '@/app/dashboard/lib/enum';
import taiwanAreaJson from '../../../public/vote-data/taiwanArea.json';
import voteDetailJson from '../../../public/vote-data/voteDetail.json';
import { Button } from '../ui/button';
import { EPoliticalPartyId } from '@/app/constants';
import { useRouter } from 'next/navigation';
const taiwanArea = JSON.parse(JSON.stringify(taiwanAreaJson));
const voteDetail = JSON.parse(JSON.stringify(voteDetailJson));
const levelMap: Record<LEVEL, string> = {
  [LEVEL.COUNTY]: '/map-data/county.json',
  [LEVEL.TOWN]: '/map-data/town.json',
  [LEVEL.VILLAGE]: '/map-data/village.json',
};
const colorMap = {
  美丁美黨: '#FF8C22',
  麥當黨: '#4299FF',
  丁丁黨: '#79D46B',
};
configResponsive({
  small: 0,
  middle: 768,
  large: 1280,
});
function getTitle(level: LEVEL, d: any) {
  if (level === LEVEL.COUNTY) {
    return d.properties?.['COUNTYNAME'];
  } else if (level === LEVEL.TOWN) {
    return d.properties?.['TOWNNAME'];
  } else if (level === LEVEL.VILLAGE) {
    return d.properties?.['VILLNAME'];
  }
  return '';
}
function getStyles(level: LEVEL) {
  return function (d: any) {
    const countyName = d.properties?.['COUNTYNAME'];
    const townName = d.properties?.['TOWNNAME'];
    const villageName = d.properties?.['VILLNAME'];
    if (level === LEVEL.COUNTY) {
      const data = voteDetail?.cities?.find(
        (item: any) => item.city === countyName,
      );
      const highestVoteCandidate = data?.candidates?.sort(
        (a: any, b: any) => b.voteRate - a.voteRate,
      )[0]?.politicalPartyName as string;
      return `fill: ${
        colorMap[highestVoteCandidate as unknown as keyof typeof colorMap]
      }; stroke: #000; stroke-width: 1px; opacity: 1; visibility: visible;`;
    }
    if (level === LEVEL.TOWN) {
      const countyId = taiwanArea.cities.find(
        (item: { name: string; id: string }) => item.name === countyName,
      )?.id;
      const data = voteDetail?.towns?.find(
        (item: any) =>
          item.id.split['-']?.[0] === countyId && item.town === townName,
      );
      const highestVoteCandidate = data?.candidates?.sort(
        (a: any, b: any) => b.voteRate - a.voteRate,
      )[0]?.politicalPartyName as string;
      return `fill: ${
        colorMap[highestVoteCandidate as unknown as keyof typeof colorMap]
      }; stroke: #000; stroke-width: 0.6px; opacity: 1; visibility: visible;`;
    }
    if (level === LEVEL.VILLAGE) {
      const countyId = taiwanArea.cities.find(
        (item: { name: string; id: string }) => item.name === countyName,
      )?.id;
      const townId = taiwanArea.towns.find(
        (item: { name: string; id: string }) =>
          item.id.split('-')?.[0] === countyId && item.name === townName,
      )?.id;
      const data = voteDetail?.villages?.find(
        (item: any) =>
          item.id.split['-']?.[0] === countyId &&
          item.id.split['-']?.[1] === townId &&
          item.village === villageName,
      );
      const highestVoteCandidate = data?.candidates?.sort(
        (a: any, b: any) => b.voteRate - a.voteRate,
      )[0]?.politicalPartyName as string;
      return `fill: ${
        colorMap[highestVoteCandidate as unknown as keyof typeof colorMap]
      }; stroke: #000; stroke-width: 0.3px; opacity: 1; visibility: visible;`;
    }
    return 'fill: #ccc; stroke: #000; stroke-width: 0.3px;';
  };
}
function getRestClassNames(level: LEVEL) {
  if (level === LEVEL.COUNTY) {
    return ['town', 'village'];
  } else if (level === LEVEL.TOWN) {
    return ['village', 'county'];
  } else if (level === LEVEL.VILLAGE) {
    return ['county', 'town'];
  }
  return [];
}

type MapProps = {
  currentSelectArea: {
    county: string;
    town: string;
    village: string;
    politicalParty?: EPoliticalPartyId;
  };
  handleSelectArea: (
    county: string,
    town: string,
    village: string,
    politicalPartyId?: EPoliticalPartyId,
  ) => void;
};

export default function Map({ currentSelectArea, handleSelectArea }: MapProps) {
  const router = useRouter();
  const responsive = useResponsive();
  const map = useRef<SVGSVGElement>(null);
  const zoom = d3
    .zoom()
    .scaleExtent([1, 8])
    .on('zoom', function (event) {
      const { transform } = event;
      d3.select(map.current).selectAll('path').attr('transform', transform);
    });
  const [mapData, setMapData] = useState<{
    county: Feature<Geometry, GeoJsonProperties>[];
    town: Feature<Geometry, GeoJsonProperties>[];
    village: Feature<Geometry, GeoJsonProperties>[];
  }>({
    county: [],
    town: [],
    village: [],
  });
  const [level, setLevel] = useState<LEVEL>(LEVEL.COUNTY);
  const [scale, setScale] = useState<number>(5500);

  const currentMapData = useMemo(() => {
    return mapData[level];
  }, [level, mapData]);

  const setMapScaleScope = (responsive: Record<string, boolean>) => {
    if (responsive['large']) {
      setScale(9000);
    } else if (responsive['middle']) {
      setScale(7000);
    } else if (responsive['small']) {
      setScale(5500);
    }
  };

  const setNextLevel = (level: LEVEL) => {
    if (level === LEVEL.COUNTY) {
      setLevel(LEVEL.TOWN);
    } else if (level === LEVEL.TOWN) {
      setLevel(LEVEL.VILLAGE);
    }
  };

  const resetLevel = () => {
    setLevel(LEVEL.COUNTY);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMapData = async (
    level: LEVEL,
    currentSelectArea: {
      county: string;
      town: string;
      village: string;
    },
  ) => {
    const url = levelMap[level];
    if (level === LEVEL.COUNTY) {
      const mapData = (await d3.json(url)) as unknown as any;
      const geometries = topojson.feature(
        mapData,
        mapData.objects['TAIWAN'],
      ) as unknown as FeatureCollection;
      setMapData((prev) => ({
        ...prev,
        county: geometries.features,
        town: [],
        village: [],
      }));
    }
    if (level === LEVEL.TOWN) {
      const mapData = (await d3.json(url)) as unknown as any;
      const geometries = topojson.feature(
        mapData,
        mapData.objects['TAIWAN'],
      ) as unknown as FeatureCollection;
      console.log(geometries, 'geo');
      const townMapData = geometries.features.filter((item) => {
        console.log(item.properties);
        console.log(currentSelectArea.county);
        return item.properties?.['COUNTYCODE'] === currentSelectArea.county;
      });
      console.log(townMapData);
      setMapData((prev) => ({
        ...prev,
        town: townMapData,
        village: [],
      }));
    }
    if (level === LEVEL.VILLAGE) {
      const mapData = (await d3.json(url)) as unknown as any;
      const geometries = topojson.feature(
        mapData,
        mapData.objects['TAIWAN'],
      ) as unknown as FeatureCollection;
      const villageMapData = geometries.features.filter((item) => {
        return (
          item.properties?.['COUNTYCODE'] === currentSelectArea.county &&
          item.properties?.['TOWNCODE'] === currentSelectArea.town
        );
      });
      setMapData((prev) => ({
        ...prev,
        village: villageMapData,
      }));
    }
  };

  const reset = () => {
    const mapContainer = d3.select(map.current);
    const zoomTransform = mapContainer.node() as SVGSVGElement;
    resetLevel();
    handleSelectArea('', '', '');
    router.push('dashboard');
    if (map.current) {
      mapContainer
        .transition()
        .duration(750)
        .call(
          zoom.transform as any,
          d3.zoomIdentity,
          d3
            .zoomTransform(zoomTransform)
            .invert([
              map.current?.clientWidth / 2,
              map.current?.clientHeight / 2,
            ]),
        );
    }
  };

  const resetToAllPolitical = () => {
    handleSelectArea(
      currentSelectArea.county,
      currentSelectArea.town,
      currentSelectArea.village,
    );
    router.push('/dashboard');
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = async (
    mapEl: SVGSVGElement,
    level: LEVEL,
    scale: number,
    features: Feature<Geometry, GeoJsonProperties>[],
  ) => {
    if (!features.length) return;
    const width = mapEl.clientWidth;
    const height = mapEl.clientHeight;
    const mapContainer = d3
      .select(map.current)
      .attr('style', 'width: 100%; height: 100%')
      .on('click', reset);
    const projectMethod = d3.geoMercator().center([121, 24.3]).scale(scale);
    const pathGenerator = d3.geoPath().projection(projectMethod);
    const restClassNames = getRestClassNames(level);
    restClassNames.forEach((className) => {
      mapContainer.selectAll(`.${className} path`).style('opacity', '0.3');
    });
    mapContainer
      .selectAll(`.${level}`)
      .data(features)
      .join('g')
      .append('path')
      .attr('cursor', 'pointer')
      .attr('d', pathGenerator)
      .attr('style', getStyles(level))
      .on('click', function (event, d) {
        clickTransition(event, d);
        setNextLevel(level);
        handleSelectArea(
          d.properties?.['COUNTYCODE'],
          d.properties?.['TOWNCODE'] || '',
          d.properties?.['VILLCODE'] || '',
          currentSelectArea.politicalParty,
        );
      })
      .append('title')
      .text((d) => getTitle(level, d));
    router.push(
      currentSelectArea.politicalParty
        ? `dashboard?politicalPartyId=${currentSelectArea.politicalParty}`
        : 'dashboard?',
    );
    function clickTransition(event: any, d: any) {
      event.stopPropagation();
      const [[x0, y0], [x1, y1]] = pathGenerator.bounds(d);
      mapContainer
        .transition()
        .duration(750)
        .call(
          zoom.transform as any,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(
                8,
                0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height),
              ),
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, mapContainer.node()),
        );
    }
  };

  useEffect(() => {
    getMapData(level, currentSelectArea);
  }, [level, currentSelectArea]);

  useEffect(() => {
    if (map.current) {
      draw(map.current, level, scale, currentMapData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, scale, currentMapData]);

  useEffect(() => {
    responsive && setMapScaleScope(responsive);
  }, [responsive]);

  return (
    <>
      {currentSelectArea.politicalParty && (
        <Button className="absolute m-3" onClick={resetToAllPolitical}>
          看所有政黨分佈
        </Button>
      )}
      {level !== LEVEL.COUNTY && (
        <Button
          className={`absolute m-3 ${
            currentSelectArea.politicalParty ? 'mt-16' : ''
          }`}
          onClick={reset}
        >
          回全國
        </Button>
      )}
      <svg
        className="w-full h-full border-sky-100 border-2 md:border-none"
        ref={map}
      >
        {mapData.county.length &&
          mapData.county.map((item) => {
            return (
              <g
                key={item.properties?.COUNTYCODE}
                className="county"
                id={item.properties?.COUNTYNAME}
              ></g>
            );
          })}
        {mapData.town.length &&
          mapData.town.map((item) => {
            return (
              <g
                key={item.properties?.TOWNCODE}
                className="town"
                id={item.properties?.TOWNNAME}
              ></g>
            );
          })}

        {mapData.village.length &&
          mapData.village.map((item) => {
            return (
              <g
                key={item.properties?.VILLCODE}
                className="village"
                id={item.properties?.VILLNAME}
              ></g>
            );
          })}
      </svg>
    </>
  );
}
