import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import { GeoJSON } from "ol/format";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Stroke, Style } from "ol/style";

useGeographic();

export function Application() {
  const osmLayer = new TileLayer({ source: new OSM() });
  const municipalityLayer = new VectorLayer({
    source: new VectorSource({
      url: `/KW-eksamen25/geojson/Fylker Norge.geojson`,
      format: new GeoJSON(),
    }),
    style: new Style({
      stroke: new Stroke({
        color: "blue",
        width: 2,
      }),
    }),
  });

  const map = new Map({
    view: new View({ center: [10.8, 59.9], zoom: 8 }),
    layers: [osmLayer, municipalityLayer],
  });

  const mapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => map.setTarget(mapRef.current!), []);
  return <div ref={mapRef}></div>;
}
