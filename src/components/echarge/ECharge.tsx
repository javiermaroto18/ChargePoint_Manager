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
        <p>Loading stations...</p>
      </div>
    );
  }

  return (
    <div className="echarge_app">
      {/* Header */}
      <header className="echarge_header">
        <div className="echarge_header-top">
          <span className="echarge_subtitle">Live network</span>
          <div className="echarge_count">
            {filteredChargers.length} stations
          </div>
        </div>
        <input
          id="echarge_search"
          name="search"
          className="echarge_search"
          type="text"
          placeholder="Search by location or district..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </header>

      {/* Contenedor principal con dos áreas de scroll independientes */}
      <div className="echarge_main-container">
        {/* Mapa con su propio scroll (aunque mapa no scroll, su contenedor sí) */}
        <div className="echarge_map-wrapper">
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
                      <p>District: {charger.distrito}</p>
                      <p>Outlets: {charger.toma}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Contenedor derecho con sidebar y detalles, cada uno con su scroll */}
        <div className="echarge_right-panel">
          {/* Lista lateral - scroll independiente */}
          <aside className="echarge_sidebar">
            <div className="echarge_sidebar-header">
              <h2>Stations</h2>
            </div>
            <div className="echarge_list">
              {filteredChargers.length > 0 ? (
                filteredChargers.map((charger) => (
                  <div
                    key={charger.objectid}
                    className={`echarge_card ${selectedCharger?.objectid === charger.objectid ? 'echarge_card--active' : ''}`}
                    onClick={() => setSelectedCharger(charger)}
                  >
                    <div className="echarge_card-number">{charger.no}</div>
                    <div className="echarge_card-content">
                      <h3 className="echarge_card-title">{charger.emplazamie}</h3>
                      <div className="echarge_card-meta">
                        <span className="echarge_meta-item">District {charger.distrito}</span>
                        <span className="echarge_meta-separator">•</span>
                        <span className="echarge_meta-item">{charger.toma} outlet{charger.toma > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="echarge_empty-state">No stations found</div>
              )}
            </div>
          </aside>

          {/* Detalles del cargador - scroll independiente */}
          <section className="echarge_details">
            {selectedCharger ? (
              <div className="echarge_details-content">
                <h2 className="echarge_details-title">{selectedCharger.emplazamie}</h2>
                <div className="echarge_details-grid">
                  <div className="echarge_detail-item">
                    <span className="echarge_detail-label">District</span>
                    <span className="echarge_detail-value">{selectedCharger.distrito}</span>
                  </div>
                  <div className="echarge_detail-item">
                    <span className="echarge_detail-label">Outlets</span>
                    <span className="echarge_detail-value">{selectedCharger.toma}</span>
                  </div>
                  <div className="echarge_detail-item">
                    <span className="echarge_detail-label">Price</span>
                    <span className="echarge_detail-value">{selectedCharger.precio_iv}</span>
                  </div>
                  <div className="echarge_detail-item">
                    <span className="echarge_detail-label">Power</span>
                    <span className="echarge_detail-value">{selectedCharger.potenc_ia}</span>
                  </div>
                  <div className="echarge_detail-item">
                    <span className="echarge_detail-label">Connector</span>
                    <span className="echarge_detail-value">{selectedCharger.conector}</span>
                  </div>
                  <div className="echarge_detail-item">
                    <span className="echarge_detail-label">Charge Type</span>
                    <span className="echarge_detail-value">{selectedCharger.tipo_carga}</span>
                  </div>
                </div>
                {selectedCharger.observacio && (
                  <div className="echarge_observation">
                    <p>{selectedCharger.observacio}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="echarge_empty-details">
                <p>Select a station to view details</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ECharge;
