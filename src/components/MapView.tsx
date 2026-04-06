'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';

// --- NDVI Grid Generator ---
const generateNDVIGrid = () => {
  const features: any[] = [];
  const step = 0.08;
  for (let x = 78.0; x < 80.0; x += step) {
    for (let y = 20.0; y < 21.5; y += step) {
      const val = ((Math.sin(x * 12) * Math.cos(y * 12)) + 1) / 2;
      features.push({
        type: 'Feature',
        properties: { ndviValue: val },
        geometry: {
          type: 'Polygon',
          coordinates: [[[x, y],[x+step,y],[x+step,y+step],[x,y+step],[x,y]]]
        }
      });
    }
  }
  return { type: 'FeatureCollection', features };
};

const NDVI_GRID = generateNDVIGrid();

// --- Layer Toggle UI ---
const LayerToggleUI = React.memo(() => {
  const { mapLayers, toggleMapLayer } = useAppStore();
  const layers = [
    { key: 'boundary', label: 'Boundary' },
    { key: 'ndvi', label: 'NDVI Layer' },
    { key: 'terrain', label: 'Terrain' },
  ] as const;

  return (
    <div className="absolute top-4 right-4 z-[1000] w-52 p-4 rounded-2xl bg-white/95 shadow-2xl border border-gray-100 backdrop-blur-md flex flex-col gap-1">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Map Layers</p>
      {layers.map(({ key, label }) => (
        <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <button
            onClick={() => toggleMapLayer(key)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${mapLayers[key] ? 'bg-emerald-500' : 'bg-gray-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${mapLayers[key] ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </button>
        </div>
      ))}
    </div>
  );
});
LayerToggleUI.displayName = 'LayerToggleUI';

// --- Main MapView using vanilla Leaflet ---
export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<{ boundary?: any; ndvi?: any }>({});
  const { mapLayers } = useAppStore();
  const [ready, setReady] = useState(false);

  // Initialize map once on mount
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    // Dynamically import to avoid SSR
    import('leaflet').then((L) => {
      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const map = L.map(mapContainerRef.current!, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: false,
      });

      // OSM Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Load boundary GeoJSON
      fetch('/sample.geojson')
        .then(r => r.json())
        .then(data => {
          const boundaryLayer = L.geoJSON(data, {
            style: {
              color: '#16a34a',
              weight: 2,
              fillColor: '#22c55e',
              fillOpacity: 0.25,
            },
            onEachFeature: (feature, layer) => {
              layer.on('click', () => {
                (layer as any).setStyle({ color: '#4ade80', weight: 4, fillOpacity: 0.5 });
              });
            }
          });
          layersRef.current.boundary = boundaryLayer;
          if (useAppStore.getState().mapLayers.boundary) {
            boundaryLayer.addTo(map);
          }
        });

      // NDVI layer
      const ndviLayer = L.geoJSON(NDVI_GRID as any, {
        style: (feature) => {
          const v = feature?.properties?.ndviValue ?? 0;
          const color = v >= 0.6 ? '#22c55e' : v >= 0.3 ? '#facc15' : '#ef4444';
          return { fillColor: color, fillOpacity: 0.7, color: 'transparent', weight: 0 };
        }
      });
      layersRef.current.ndvi = ndviLayer;
      if (useAppStore.getState().mapLayers.ndvi) {
        ndviLayer.addTo(map);
      }

      setTimeout(() => {
        map.invalidateSize();
        setReady(true);
      }, 300);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync layer visibility to Zustand state
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const { boundary, ndvi } = layersRef.current;
    if (boundary) {
      if (mapLayers.boundary) map.addLayer(boundary);
      else map.removeLayer(boundary);
    }
    if (ndvi) {
      if (mapLayers.ndvi) map.addLayer(ndvi);
      else map.removeLayer(ndvi);
    }
  }, [mapLayers]);

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleReset = () => mapRef.current?.flyTo([20.5937, 78.9629], 5);
  const handleLocate = () => {
    navigator.geolocation?.getCurrentPosition(pos => {
      mapRef.current?.flyTo([pos.coords.latitude, pos.coords.longitude], 14);
    });
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Map container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Loading shimmer */}
      {!ready && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-100">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Loading Map...</p>
          </div>
        </div>
      )}

      {/* Floating Layer Panel */}
      <LayerToggleUI />

      {/* Map Controls */}
      <div className="absolute bottom-8 right-6 z-[1000] flex flex-col items-center gap-3">
        <button onClick={handleLocate} title="My Location"
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors text-gray-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
        </button>
        <button onClick={handleReset} title="Reset View"
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors text-gray-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        </button>
        <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
          <button onClick={handleZoomIn} title="Zoom In"
            className="p-3 hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button onClick={handleZoomOut} title="Zoom Out"
            className="p-3 hover:bg-gray-50 transition-colors text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
