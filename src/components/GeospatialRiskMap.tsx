import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup, LayersControl, LayerGroup, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_RECORDS, ArsenicRecord } from '@/src/types';

const { BaseLayer, Overlay } = LayersControl;

// Fix for default markers in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getRiskColor = (conc: number) => {
  if (conc < 10) return '#22c55e'; // Safe
  if (conc <= 50) return '#eab308'; // Moderate
  return '#ef4444'; // High
};

const WB_BOUNDS: L.LatLngBoundsExpression = [
  [21.5, 85.5], // Southwest
  [27.3, 90.0]  // Northeast
];

const WB_CENTER: L.LatLngExpression = [22.9868, 87.8550];

// Mock Soil Data (Large rectangles representing regional soil clusters)
const SOIL_ZONES: { bounds: L.LatLngBoundsExpression, color: string, type: string }[] = [
  { bounds: [[23, 87], [24, 88]], color: '#78350f', type: 'Alluvial (High Retention)' },
  { bounds: [[22, 88], [23, 89]], color: '#451a03', type: 'Laterite (Acidic)' },
  { bounds: [[24, 88], [25, 89]], color: '#92400e', type: 'Clayey (Silt Cluster)' },
];

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  userLocation: [number, number] | null;
}

function LocationMarker({ onLocationSelect, userLocation }: MapProps) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
      map.flyTo(e.latlng, 13);
    },
  });

  useEffect(() => {
    if (userLocation) {
      map.flyTo(userLocation, 12);
    }
  }, [userLocation, map]);

  return null;
}

export default function GeospatialRiskMap({ onLocationSelect, userLocation }: MapProps) {
  const [records] = useState<ArsenicRecord[]>(MOCK_RECORDS);

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={WB_CENTER} 
        zoom={7} 
        style={{ width: '100%', height: '100%' }}
        maxBounds={WB_BOUNDS}
        minZoom={7}
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <LayersControl position="topright">
          <BaseLayer checked name="Topographic (3D Relief)">
            <TileLayer
              attribution='&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a>'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Dark Aesthetics">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>

          <Overlay checked name="Risk Proximity Zones (Tri-Zonal)">
            <LayerGroup>
              {records.map(record => (
                <React.Fragment key={`zone-${record.id}`}>
                  {/* Outer Safety Buffer (Green) */}
                  <Circle
                    center={[record.lat, record.lng]}
                    radius={15000}
                    pathOptions={{
                      fillColor: '#10B981',
                      fillOpacity: 0.1,
                      color: '#10B981',
                      weight: 1,
                      dashArray: '5, 5'
                    }}
                  />
                  {/* Moderate Risk Zone (Orange) */}
                  <Circle
                    center={[record.lat, record.lng]}
                    radius={8000}
                    pathOptions={{
                      fillColor: '#F59E0B',
                      fillOpacity: 0.2,
                      color: '#F59E0B',
                      weight: 1
                    }}
                  />
                  {/* Critical Hot Zone (Red) */}
                  <Circle
                    center={[record.lat, record.lng]}
                    radius={3000}
                    pathOptions={{
                      fillColor: '#EF4444',
                      fillOpacity: 0.4,
                      color: '#EF4444',
                      weight: 2
                    }}
                  />
                </React.Fragment>
              ))}
            </LayerGroup>
          </Overlay>

          <Overlay checked name="Sampling Points & Monitoring">
            <LayerGroup>
              {records.map(record => (
                <Circle
                  key={record.id}
                  center={[record.lat, record.lng]}
                  radius={800}
                  eventHandlers={{
                    click: (e) => {
                      L.DomEvent.stopPropagation(e);
                      onLocationSelect(record.lat, record.lng);
                    },
                    mouseover: (e) => {
                      const layer = e.target;
                      layer.setStyle({
                        fillColor: '#3B82F6',
                        weight: 4
                      });
                    },
                    mouseout: (e) => {
                      const layer = e.target;
                      layer.setStyle({
                        fillColor: 'white',
                        weight: 2
                      });
                    },
                  }}
                  pathOptions={{
                    fillColor: 'white',
                    fillOpacity: 1,
                    color: '#334155',
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="font-sans p-1">
                      <h3 className="font-bold text-slate-800 text-sm">{record.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                         <div className={`w-2 h-2 rounded-full ${record.concentration > 50 ? 'bg-red-500' : 'bg-yellow-500'}`} />
                         <span className="text-xs font-bold">{record.concentration} µg/L</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">Source: {record.source}</p>
                      {record.bioremediation && (
                        <div className="mt-2 pt-2 border-t border-slate-100 italic text-[10px] text-green-600">
                          Nearest Remediation: {record.bioremediation.plantType} ({record.bioremediation.distance}km)
                        </div>
                      )}
                    </div>
                  </Popup>
                </Circle>
              ))}
            </LayerGroup>
          </Overlay>

          <Overlay name="Bioremediation Facilities">
            <LayerGroup>
              {records.filter(r => r.bioremediation).map(record => (
                <Circle
                  key={`bio-${record.id}`}
                  center={[
                    record.lat + 0.015, 
                    record.lng + 0.015
                  ]}
                  radius={1200}
                  pathOptions={{
                    fillColor: '#10B981',
                    fillOpacity: 0.8,
                    color: 'white',
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="text-xs">
                      <p className="font-bold">Remediation Hub: {record.bioremediation?.plantType}</p>
                      <p className="text-slate-500">Target Zone: {record.name}</p>
                    </div>
                  </Popup>
                </Circle>
              ))}
            </LayerGroup>
          </Overlay>
        </LayersControl>

        <LocationMarker onLocationSelect={onLocationSelect} userLocation={userLocation} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-[1000] card bg-slate-950/80 backdrop-blur-md p-4 flex flex-col gap-2 pointer-events-none border-sleek-border shadow-2xl">
        <h4 className="text-[9px] font-bold uppercase tracking-widest text-sleek-muted">Proximity Legend</h4>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-red-500 bg-red-500/20" />
          <span className="text-[10px]">Hot Zone (Critical)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-orange-500 bg-orange-500/20" />
          <span className="text-[10px]">Moderate Reach</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-green-500 border-dashed bg-green-500/10" />
          <span className="text-[10px]">Safety Buffer Zone</span>
        </div>
      </div>
    </div>
  );
}
