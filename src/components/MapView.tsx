'use client';

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useAppStore } from '@/store/useAppStore';

// Helper to generate a simulated NDVI grid matching our sample polygon bounds [78.0, 20.0] to [80.0, 21.5]
const generateNDVIGrid = () => {
  const features = [];
  const minX = 78.0;
  const maxX = 80.0;
  const minY = 20.0;
  const maxY = 21.5;
  const step = 0.05; // 0.05 degree squares

  for (let x = minX; x < maxX; x += step) {
    for (let y = minY; y < maxY; y += step) {
      // Simulate spatial coherence using math
      const val1 = Math.sin(x * 15) * Math.cos(y * 15);
      const val2 = Math.random() * 0.3;
      let ndvi = ((val1 + 1) / 2) * 0.7 + val2; // roughly 0 to 1 range
      if (ndvi > 1) ndvi = 1;
      if (ndvi < 0) ndvi = 0;

      features.push({
        type: 'Feature',
        properties: { ndviValue: ndvi },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [x, y],
            [x + step, y],
            [x + step, y + step],
            [x, y + step],
            [x, y]
          ]]
        }
      });
    }
  }

  return {
    type: 'FeatureCollection',
    features
  };
};

const INITIAL_NDVI_GRID = generateNDVIGrid();

const LayerToggleUI = React.memo(() => {
  const { mapLayers, toggleMapLayer } = useAppStore();
  return (
    <div className="absolute top-4 left-4 flex gap-2 z-10 p-1.5 rounded-lg border border-gray-200/50 bg-white/80 backdrop-blur-md shadow-sm">
      <button 
        onClick={() => toggleMapLayer('boundary')}
        className={`px-3 py-1.5 text-xs rounded transition-colors ${mapLayers.boundary ? 'bg-emerald-100 text-emerald-800 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Parcel Boundary
      </button>
      <button 
        onClick={() => toggleMapLayer('ndvi')}
        className={`px-3 py-1.5 text-xs rounded transition-colors ${mapLayers.ndvi ? 'bg-emerald-100 text-emerald-800 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        NDVI Index
      </button>
      <button 
        onClick={() => toggleMapLayer('terrain')}
        className={`px-3 py-1.5 text-xs rounded transition-colors ${mapLayers.terrain ? 'bg-emerald-100 text-emerald-800 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        Terrain
      </button>
    </div>
  );
});

const MapControlsUI = React.memo(({ mapRef }: { mapRef: React.RefObject<maplibregl.Map | null> }) => {
  const handleZoomIn = React.useCallback(() => mapRef.current?.zoomIn(), [mapRef]);
  const handleZoomOut = React.useCallback(() => mapRef.current?.zoomOut(), [mapRef]);
  
  const handleReset = React.useCallback(() => {
    mapRef.current?.flyTo({ center: [78.9629, 20.5937], zoom: 4, essential: true });
  }, [mapRef]);
  
  const handleGeolocate = React.useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        mapRef.current?.flyTo({
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 14,
          essential: true
        });
      });
    }
  }, [mapRef]);

  return (
    <div className="absolute bottom-8 right-6 flex flex-col gap-3 z-10">
      <button 
        onClick={handleGeolocate} 
        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-700"
        title="My Location"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
      </button>

      <button 
        onClick={handleReset} 
        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-700"
        title="Reset View"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      </button>

      <div className="flex flex-col bg-white rounded-full shadow-lg overflow-hidden mt-2">
        <button onClick={handleZoomIn} className="p-3 hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-700 border-b border-gray-100" title="Zoom In">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
        <button onClick={handleZoomOut} className="p-3 hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-700" title="Zoom Out">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
    </div>
  );
});

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    const initialMap = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [78.9629, 20.5937],
      zoom: 4,
      interactive: true,
      attributionControl: false,
    });

    map.current = initialMap;

    initialMap.on('load', () => {
      initialMap.addSource('sample-geojson', {
        type: 'geojson',
        data: '/sample.geojson'
      });

      initialMap.addLayer({
        id: 'sample-fill',
        type: 'fill',
        source: 'sample-geojson',
        paint: {
          'fill-color': '#22c55e',
          'fill-opacity': 0.3
        }
      });

      initialMap.addLayer({
        id: 'sample-border-glow',
        type: 'line',
        source: 'sample-geojson',
        filter: ['==', 'name', ''],
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#4ade80',
          'line-width': 8,
          'line-blur': 4,
          'line-opacity': 0.8
        }
      });

      initialMap.addLayer({
        id: 'sample-border',
        type: 'line',
        source: 'sample-geojson',
        paint: {
          'line-color': '#166534',
          'line-width': 2
        }
      });

      initialMap.on('click', 'sample-fill', (e) => {
        const feature = e.features?.[0];
        if (feature && feature.properties?.name) {
          const name = feature.properties.name;
          initialMap.setFilter('sample-border-glow', ['==', 'name', name]);
          initialMap.setPaintProperty('sample-fill', 'fill-opacity', ['case', ['==', ['get', 'name'], name], 0.5, 0.3]);
          initialMap.setPaintProperty('sample-border', 'line-width', ['case', ['==', ['get', 'name'], name], 3, 2]);
        }
      });

      // Efficient setup of NDVI layer utilizing the cached module-level grid to avoid recomputations
      initialMap.addSource('ndvi-source', {
        type: 'geojson',
        data: INITIAL_NDVI_GRID as any
      });

      initialMap.addLayer({
        id: 'ndvi-layer',
        type: 'fill',
        source: 'ndvi-source',
        layout: {
          visibility: 'none'
        },
        paint: {
          'fill-color': [
            'step',
            ['get', 'ndviValue'],
            '#ef4444', 0.3,
            '#facc15', 0.6,
            '#22c55e'
          ],
          'fill-opacity': 0.75,
          'fill-outline-color': 'rgba(255,255,255,0.1)'
        }
      }, 'sample-border');

      initialMap.on('mouseenter', 'sample-fill', () => {
        initialMap.getCanvas().style.cursor = 'pointer';
      });

      initialMap.on('mouseleave', 'sample-fill', () => {
        initialMap.getCanvas().style.cursor = '';
      });
    });

    const handleResize = () => {
      initialMap.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      initialMap.remove();
      map.current = null;
    };
  }, []);

  // Performance Optimization: Subscribe directly via Zustand outside of React component rendering lifecycle.
  // This causes MapView to perfectly bypass React DOM reconciliation updates natively when just mapping map-state visibilities, removing 100% of DOM flashes.
  useEffect(() => {
    const processState = (state: any) => {
      if (!map.current) return;
      const currentMap = map.current;
      
      const boundaryVisibility = state.mapLayers.boundary ? 'visible' : 'none';
      if (currentMap.getLayer('sample-fill')) {
        currentMap.setLayoutProperty('sample-fill', 'visibility', boundaryVisibility);
        currentMap.setLayoutProperty('sample-border', 'visibility', boundaryVisibility);
        currentMap.setLayoutProperty('sample-border-glow', 'visibility', boundaryVisibility);
      }

      if (currentMap.getLayer('ndvi-layer')) {
        currentMap.setLayoutProperty('ndvi-layer', 'visibility', state.mapLayers.ndvi ? 'visible' : 'none');
      }
    };

    // Bootstrap initial render state 
    processState(useAppStore.getState());
    
    // Hook map bindings smoothly straight to the store mutations
    const unsubscribe = useAppStore.subscribe(processState);
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full h-full relative bg-gray-50 overflow-hidden rounded-t-xl z-0">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      <LayerToggleUI />
      <MapControlsUI mapRef={map} />
    </div>
  );
}
