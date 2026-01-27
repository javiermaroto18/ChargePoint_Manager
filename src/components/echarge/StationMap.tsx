import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import type { Charger } from '../../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


// Configuro el icono de los marcadores
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export const StationMap = ({ chargers, onSelect }: { chargers: Charger[], onSelect: (c: Charger) => void }) => (
  <MapContainer center={[39.4699, -0.3763]} zoom={13} style={{ height: '100%', width: '100%' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {chargers.map((c) => (
      <Marker 
        key={c.objectid} 
        position={[c.geo_point_2d.lat, c.geo_point_2d.lon]}
        eventHandlers={{ click: () => onSelect(c) }}
      >
        <Tooltip direction="top" offset={[0, -40]}>
          <strong>{c.emplazamie}</strong>
        </Tooltip>
      </Marker>
    ))}
  </MapContainer>
);