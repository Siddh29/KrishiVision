'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '@/store/useAppStore';
import type { Map } from 'leaflet';

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
        properties: { ndviValue: ndvi, name: `grid-${x}-${y}` },
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
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[1000] w-48 sm:w-56 p-3 sm:p-4 rounded-xl border border-gray-200/50 bg-white/90 backdrop-blur-md shadow-xl flex flex-col pointer-events-auto">
      <h3 className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Map Layers</h3>
      
      <div className="flex items-center justify-between w-full py-1.5 sm:py-2 border-b border-gray-100/50">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Boundary</span>
        <button 
          onClick={() => toggleMapLayer('boundary')}
          className={`relative inline-flex h-4 sm:h-5 w-8 sm:w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${mapLayers.boundary ? 'bg-emerald-500' : 'bg-gray-200'}`}
        >
          <span className={`pointer-events-none inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${mapLayers.boundary ? 'translate-x-4 sm:translate-x-4' : 'translate-x-0.5'}`} />
        </button>
      </div>

      <div className="flex items-center justify-between w-full py-1.5 sm:py-2 border-b border-gray-100/50">
        <span className="text-xs sm:text-sm font-medium text-gray-700">NDVI Layer</span>
        <button 
          onClick={() => toggleMapLayer('ndvi')}
          className={`relative inline-flex h-4 sm:h-5 w-8 sm:w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${mapLayers.ndvi ? 'bg-emerald-500' : 'bg-gray-200'}`}
        >
          <span className={`pointer-events-none inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${mapLayers.ndvi ? 'translate-x-4 sm:translate-x-4' : 'translate-x-0.5'}`} />
        </button>
      </div>

      <div className="flex items-center justify-between w-full py-1.5 sm:py-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Terrain</span>
        <button 
          onClick={() => toggleMapLayer('terrain')}
          className={`relative inline-flex h-4 sm:h-5 w-8 sm:w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${mapLayers.terrain ? 'bg-emerald-500' : 'bg-gray-200'}`}
        >
          <span className={`pointer-events-none inline-block h-3 sm:h-4 w-3 sm:w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${mapLayers.terrain ? 'translate-x-4 sm:translate-x-4' : 'translate-x-0.5'}`} />
        </button>
      </div>
    </div>
  );
});

const MapControlsUI = React.memo(({ map }: { map: Map | null }) => {
  const handleZoomIn = React.useCallback(() => map?.zoomIn(), [map]);
  const handleZoomOut = React.useCallback(() => map?.zoomOut(), [map]);
  
  const handleReset = React.useCallback(() => {
    map?.flyTo([20.5937, 78.9629], 4);
  }, [map]);
  
  const handleGeolocate = React.useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        map?.flyTo([position.coords.latitude, position.coords.longitude], 14);
      });
    }
  }, [map]);

  return (
    <div className="absolute bottom-8 right-6 flex flex-col gap-3 z-[1000]">
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
  const [map, setMap] = useState<Map | null>(null);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const { mapLayers } = useAppStore();
  const [selectedParcel, setSelectedParcel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Trigger loading fade out when map instance resolves
  useEffect(() => {
    if (map) {
      const timer = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [map]);

  useEffect(() => {
    fetch('/sample.geojson')
      .then(res => res.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.error("Could not load sample.geojson", err));
  }, []);

  const getStyleForNDVI = (feature: any) => {
    const ndvi = feature.properties.ndviValue;
    let color = '#ef4444'; // Red < 0.3
    if (ndvi >= 0.6) color = '#22c55e'; // Green
    else if (ndvi >= 0.3) color = '#facc15'; // Yellow

    return {
      fillColor: color,
      fillOpacity: 0.75,
      color: 'rgba(255,255,255,0.1)',
      weight: 1
    };
  };

  const getStyleForBoundary = (feature: any) => {
    const isSelected = selectedParcel === feature.properties?.name;
    return {
      fillColor: '#22c55e',
      fillOpacity: isSelected ? 0.5 : 0.3,
      color: isSelected ? '#4ade80' : '#166534', // Green border
      weight: isSelected ? 4 : 2,                 // Thicker when selected
      className: 'transition-all duration-300'
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        if (feature.properties?.name) {
          setSelectedParcel(feature.properties.name);
        }
      },
      mouseover: (e: any) => {
        e.target.setStyle({ weight: 3 });
      },
      mouseout: (e: any) => {
        const isSelected = selectedParcel === feature.properties?.name;
        e.target.setStyle({ weight: isSelected ? 4 : 2 });
      }
    });
  };

  return (
    <div className="w-full h-full relative bg-zinc-100 overflow-hidden z-0">
      
      {/* High-end Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-white/70 backdrop-blur-md transition-opacity duration-500">
          <div className="flex flex-col items-center gap-4 p-6 sm:p-8 rounded-3xl bg-white/90 shadow-2xl border border-gray-100/50">
             <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-4 border-emerald-500 border-t-emerald-100 animate-spin" />
             <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">Initializing Layout</p>
          </div>
        </div>
      )}

      <MapContainer 
        center={[20.5937, 78.9629]} 
        zoom={4} 
        zoomControl={false}
        className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {mapLayers.ndvi && (
          <GeoJSON 
            data={INITIAL_NDVI_GRID as any} 
            style={getStyleForNDVI} 
          />
        )}

        {mapLayers.boundary && geoJsonData && (
          <GeoJSON 
            data={geoJsonData} 
            style={getStyleForBoundary} 
            onEachFeature={onEachFeature}
            key={selectedParcel || 'unselected'} // Trigger re-render of styles cleanly alongside interaction
          />
        )}
      </MapContainer>
      
      {/* UI Overlays */}
      <LayerToggleUI />
      <MapControlsUI map={map} />
    </div>
  );
}
