import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function RiskMap({
  locations,
  selectedLocation,
  onSelectLocation,
  activeLayer = 'dark',
  onTriggerAlert,
  liveWeather = null
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const tileLayerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on India's central coordinates
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: false, // We provide custom controls
        attributionControl: false
      });

      const cartoKey = import.meta.env.VITE_CARTO_API_KEY || 'cb1_3hfl_1_a75355ccc285bca781ca509d';

      // Dark Mode Tile Layer: Using authenticated CARTO Basemaps with official ?key= parameter
      const initialLayer = L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${cartoKey}`,
        {
          subdomains: 'abcd',
          maxZoom: 19
        }
      );

      initialLayer.addTo(map);
      tileLayerRef.current = initialLayer;

      // Attribution
      L.control.attribution({ position: 'bottomright' })
        .addAttribution('&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors')
        .addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when activeLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const cartoKey = import.meta.env.VITE_CARTO_API_KEY || 'cb1_3hfl_1_a75355ccc285bca781ca509d';

    if (activeLayer === 'satellite') {
      // Esri World Imagery (Satellite) - Free, no watermark, no key required
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 18 }
      ).addTo(mapInstanceRef.current);

    } else if (activeLayer === 'terrain') {
      // OpenTopoMap (Terrain) - Free, open topographic contours
      tileLayerRef.current = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        {
          subdomains: 'abc',
          maxZoom: 17
        }
      ).addTo(mapInstanceRef.current);

    } else {
      // Default Dark Mode: Authenticated CARTO Dark Matter with ?key= parameter
      tileLayerRef.current = L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${cartoKey}`,
        {
          subdomains: 'abcd',
          maxZoom: 19
        }
      ).addTo(mapInstanceRef.current);
    }

  }, [activeLayer]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    locations.forEach((loc) => {
      let colorClass = '#10b981'; // green
      let pingColor = 'rgba(16, 185, 129, 0.4)';
      let labelBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

      if (loc.riskLevel === 'CRITICAL') {
        colorClass = '#ef4444';
        pingColor = 'rgba(239, 68, 68, 0.6)';
        labelBg = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      } else if (loc.riskLevel === 'HIGH') {
        colorClass = '#f97316';
        pingColor = 'rgba(249, 115, 22, 0.5)';
        labelBg = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      } else if (loc.riskLevel === 'MODERATE') {
        colorClass = '#f59e0b';
        pingColor = 'rgba(245, 158, 11, 0.4)';
        labelBg = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      }

      const isSelected = selectedLocation && selectedLocation.id === loc.id;
      const rainVal = (isSelected && liveWeather) ? (liveWeather.derived?.dailyRainfall ?? loc.rainfall24h) : loc.rainfall24h;
      const moistureVal = (isSelected && liveWeather) ? (liveWeather.derived?.soilMoisturePercent ?? loc.soilMoisture) : loc.soilMoisture;
      const isLiveActive = isSelected && liveWeather;

      // Custom pulsing SVG DivIcon
      const customIcon = L.divIcon({
        className: 'custom-risk-marker',
        html: `
          <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 34px; height: 34px; border-radius: 9999px; background-color: ${pingColor}; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 22px; height: 22px; border-radius: 9999px; background: #0f172a; border: 3px solid ${colorClass}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px ${colorClass};">
              <div style="width: 8px; height: 8px; border-radius: 9999px; background-color: ${colorClass};"></div>
            </div>
            ${isSelected ? `<div style="position: absolute; width: 44px; height: 44px; border: 2px dashed ${colorClass}; border-radius: 9999px; animation: spin 6s linear infinite;"></div>` : ''}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon });

      // Rich HTML popup content
      const popupHtml = `
        <div style="min-width: 260px; font-family: Outfit, Inter, sans-serif; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px; margin-bottom: 8px;">
            <span style="font-size: 11px; font-family: monospace; color: #94a3b8; text-transform: uppercase;">${loc.id}</span>
            <span style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 9999px; background-color: ${colorClass}25; color: ${colorClass}; border: 1px solid ${colorClass}50;">
              ${loc.riskLevel} (${loc.riskScore}%)
            </span>
          </div>

          <h4 style="font-size: 14px; font-weight: 700; color: #ffffff; margin: 0 0 4px 0;">${loc.name}</h4>
          <p style="font-size: 11px; color: #94a3b8; margin: 0 0 8px 0;">${loc.state} • ${loc.elevation}</p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: rgba(15,23,42,0.6); padding: 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); font-size: 11px; margin-bottom: 8px;">
            <div>
              <span style="color: #64748b; font-size: 10px; display: block;">🌧️ 24h Rain ${isLiveActive ? '<span style="color: #06b6d4; font-size: 9px;">(Live API)</span>' : ''}</span>
              <strong style="color: #f8fafc; font-family: monospace;">${rainVal} mm</strong>
            </div>
            <div>
              <span style="color: #64748b; font-size: 10px; display: block;">💧 Moisture ${isLiveActive ? '<span style="color: #3b82f6; font-size: 9px;">(0-1cm)</span>' : ''}</span>
              <strong style="color: #f8fafc; font-family: monospace;">${moistureVal}%</strong>
            </div>
            <div>
              <span style="color: #64748b; font-size: 10px; display: block;">⛰️ Slope</span>
              <strong style="color: #f8fafc; font-family: monospace;">${loc.slopeAngle}°</strong>
            </div>
            <div>
              <span style="color: #64748b; font-size: 10px; display: block;">⚡ Displacement</span>
              <strong style="color: #f8fafc; font-family: monospace;">${loc.inclinometerDisplacement} mm</strong>
            </div>
          </div>

          <p style="font-size: 11px; color: #cbd5e1; margin: 0 0 10px 0; line-height: 1.4;">${loc.details}</p>

          <button
            id="popup-btn-${loc.id}"
            style="width: 100%; padding: 6px 12px; background: ${loc.riskLevel === 'CRITICAL' ? '#ef4444' : '#0284c7'}; color: #ffffff; border: none; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;"
          >
            🚨 Emergency Alert Action
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectLocation(loc);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${loc.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onTriggerAlert) onTriggerAlert(loc);
          };
        }
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [locations, selectedLocation, liveWeather]);

  // Pan to selected location
  useEffect(() => {
    if (selectedLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [selectedLocation.lat, selectedLocation.lng],
        11,
        { duration: 1.5 }
      );
    }
  }, [selectedLocation]);

  return (
    <div className="relative w-full h-full min-h-[550px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <div ref={mapContainerRef} className="w-full h-full min-h-[550px]" />
    </div>
  );
}
