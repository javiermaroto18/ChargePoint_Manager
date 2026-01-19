import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './ECharge.css';

// Fix para los iconos de Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Tipos para la API de Valencia
type Charger = {
  objectid: number;
  no: number;
  distrito: number;
  emplazamie: string;
  toma: number;
  precio_iv: string;
  potenc_ia: string;
  observacio: string;
  conector: string;
  tipo_carga: string;
  geo_point_2d: {
    lon: number;
    lat: number;
  };
};

function ECharge() {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharger, setSelectedCharger] = useState<Charger | null>(null);
  const [searchText, setSearchText] = useState('');

  // Consumir API de Valencia
  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const response = await fetch(
          'https://valencia.opendatasoft.com/api/v2/catalog/datasets/carregadors-vehicles-electrics-cargadores-vehiculos-electricos/records?limit=100'
        );
        const data = await response.json();
        const chargersData = data.records.map((record: any) => record.record.fields);
        setChargers(chargersData);
        if (chargersData.length > 0) {
          setSelectedCharger(chargersData[0]);
        }
      } catch (error) {
        console.error('Error al cargar cargadores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChargers();
  }, []);

  // Filtrar cargadores por búsqueda
  const filteredChargers = searchText
    ? chargers.filter(charger =>
        charger.emplazamie.toLowerCase().includes(searchText.toLowerCase()) ||
        charger.distrito.toString().includes(searchText)
      )
    : chargers;

  if (loading) {
    return (
      <div className="echarge_loading">
        <div className="echarge_spinner"></div>
        <p>Cargando cargadores de Valencia...</p>
      </div>
    );
  }

  return (
    <div className="echarge_app">
      {/* Header */}
      <header className="echarge_header">
        <h1 className="echarge_title">
          <span className="echarge_icon">⚡</span>
          Cargadores Valencia
        </h1>
        <input
          className="echarge_search"
          type="text"
          placeholder="Buscar por dirección o distrito..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="echarge_count">
          Total: <strong>{filteredChargers.length}</strong> cargadores
        </div>
      </header>

      {/* Contenedor principal */}
      <div className="echarge_container">
        {/* Mapa */}
        <div className="echarge_map">
          <MapContainer
            center={[39.4699, -0.3763]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredChargers.map((charger) => (
              <Marker
                key={charger.objectid}
                position={[charger.geo_point_2d.lat, charger.geo_point_2d.lon]}
                eventHandlers={{
                  click: () => setSelectedCharger(charger),
                }}
              >
                <Popup>
                  <div>
                    <strong>{charger.emplazamie}</strong>
                    <p>Distrito: {charger.distrito}</p>
                    <p>Tomas: {charger.toma}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Lista lateral */}
        <aside className="echarge_sidebar">
          <div className="echarge_list">
            {filteredChargers.map((charger) => (
              <div
                key={charger.objectid}
                className={`echarge_card ${selectedCharger?.objectid === charger.objectid ? 'echarge_card--active' : ''}`}
                onClick={() => setSelectedCharger(charger)}
              >
                <div className="echarge_card-header">
                  <span className="echarge_badge">Nº {charger.no}</span>
                  <span className="echarge_district">Distrito {charger.distrito}</span>
                </div>
                <h3 className="echarge_card-title">{charger.emplazamie}</h3>
                <div className="echarge_card-info">
                  <span>🔌 {charger.toma} toma{charger.toma > 1 ? 's' : ''}</span>
                  <span>💰 {charger.precio_iv}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Detalles del cargador seleccionado */}
      {selectedCharger && (
        <div className="echarge_details">
          <div className="echarge_details-content">
            <h2>{selectedCharger.emplazamie}</h2>
            <div className="echarge_details-grid">
              <div className="echarge_detail-item">
                <span className="echarge_detail-label">Distrito</span>
                <span className="echarge_detail-value">{selectedCharger.distrito}</span>
              </div>
              <div className="echarge_detail-item">
                <span className="echarge_detail-label">Tomas</span>
                <span className="echarge_detail-value">{selectedCharger.toma}</span>
              </div>
              <div className="echarge_detail-item">
                <span className="echarge_detail-label">Precio</span>
                <span className="echarge_detail-value">{selectedCharger.precio_iv}</span>
              </div>
              <div className="echarge_detail-item">
                <span className="echarge_detail-label">Potencia</span>
                <span className="echarge_detail-value">{selectedCharger.potenc_ia}</span>
              </div>
              <div className="echarge_detail-item">
                <span className="echarge_detail-label">Conector</span>
                <span className="echarge_detail-value">{selectedCharger.conector}</span>
              </div>
              <div className="echarge_detail-item">
                <span className="echarge_detail-label">Tipo de carga</span>
                <span className="echarge_detail-value">{selectedCharger.tipo_carga}</span>
              </div>
            </div>
            {selectedCharger.observacio && (
              <div className="echarge_observation">
                <strong>Observaciones:</strong> {selectedCharger.observacio}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ECharge;
