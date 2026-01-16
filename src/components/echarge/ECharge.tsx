import { useState } from 'react';
import './ECharge.css';

type Station = {
  id: string;
  name: string;
  city: string;
  status: string;
  chargers: number;
  distance: string;
  price: string;
};

const stations: Station[] = [
  {
    id: 'st01',
    name: 'EcoCharge Station 1',
    city: 'San Francisco',
    status: 'Disponible',
    chargers: 26,
    distance: '150 m',
    price: '0.12€/kWh',
  },
  {
    id: 'st02',
    name: 'Bay EV Hub',
    city: 'San Francisco',
    status: 'Ocupado',
    chargers: 14,
    distance: '680 m',
    price: '0.18€/kWh',
  },
  {
    id: 'st03',
    name: 'Harbor FastCharge',
    city: 'Oakland',
    status: 'Mantenimiento',
    chargers: 9,
    distance: '1.3 km',
    price: '0.15€/kWh',
  },
  {
    id: 'st04',
    name: 'Marina Supercharge',
    city: 'San Francisco',
    status: 'Disponible',
    chargers: 18,
    distance: '2.1 km',
    price: '0.14€/kWh',
  },
];

function getBadgeClass(status: string) {
  if (status === 'Disponible') return 'echarge_badge echarge_badge--available';
  if (status === 'Ocupado') return 'echarge_badge echarge_badge--busy';
  return 'echarge_badge echarge_badge--maintenance';
}

function ECharge() {
  const [selectedStation, setSelectedStation] = useState(stations[0]);
  const [searchText, setSearchText] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [filterStatus, setFilterStatus] = useState('Todos');

  // Filtrar estaciones según búsqueda y filtro
  let filteredStations = stations;
  
  if (searchText) {
    filteredStations = stations.filter(station => 
      station.name.toLowerCase().includes(searchText.toLowerCase()) ||
      station.city.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
  if (filterStatus !== 'Todos') {
    filteredStations = filteredStations.filter(station => station.status === filterStatus);
  }

  // Contar estaciones por estado
  const availableCount = stations.filter(s => s.status === 'Disponible').length;
  const busyCount = stations.filter(s => s.status === 'Ocupado').length;
  const maintenanceCount = stations.filter(s => s.status === 'Mantenimiento').length;

  return (
    <div className="echarge_app">
      {/* Barra lateral */}
      <aside className={showSidebar ? 'echarge_sidebar' : 'echarge_sidebar echarge_sidebar--hidden'}>
        <div className="echarge_sidebar-header">
          <h1 className="echarge_brand">
            <span className="echarge_brand-icon">⚡</span>
            E-Charge
          </h1>
          <button 
            className="echarge_sidebar-close"
            onClick={() => setShowSidebar(false)}
          >
            ×
          </button>
        </div>

        <div className="echarge_sidebar-list">
          <h2 className="echarge_section-title">Estaciones ({filteredStations.length})</h2>
          {filteredStations.map((station) => (
            <div
              key={station.id}
              className="echarge_card"
              onClick={() => setSelectedStation(station)}
            >
              <div className="echarge_card-head">
                <div>
                  <div className="echarge_card-title">{station.name}</div>
                  <div className="echarge_card-meta">{station.city} - {station.distance}</div>
                </div>
                <span className={getBadgeClass(station.status)}>{station.status}</span>
              </div>
              <div className="echarge_card-meta">
                <span>{station.chargers} cargadores</span>
                <span>{station.price}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="echarge_main">
        {/* Cabecera con búsqueda */}
        <div className="echarge_header">
          <button
            className="echarge_icon-button"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            ☰
          </button>
          
          <input
            className="echarge_search-input"
            type="text"
            placeholder="Buscar estaciones..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="echarge_stats">
            <span>Disponibles: {availableCount}</span>
            <span>Ocupadas: {busyCount}</span>
            <span>Mantenimiento: {maintenanceCount}</span>
          </div>
        </div>

        {/* Filtros */}
        <div className="echarge_filters">
          <button 
            className={filterStatus === 'Todos' ? 'echarge_filter-chip echarge_filter-chip--active' : 'echarge_filter-chip'}
            onClick={() => setFilterStatus('Todos')}
          >
            Todos
          </button>
          <button 
            className={filterStatus === 'Disponible' ? 'echarge_filter-chip echarge_filter-chip--active' : 'echarge_filter-chip'}
            onClick={() => setFilterStatus('Disponible')}
          >
            Disponible
          </button>
          <button 
            className={filterStatus === 'Ocupado' ? 'echarge_filter-chip echarge_filter-chip--active' : 'echarge_filter-chip'}
            onClick={() => setFilterStatus('Ocupado')}
          >
            Ocupado
          </button>
          <button 
            className={filterStatus === 'Mantenimiento' ? 'echarge_filter-chip echarge_filter-chip--active' : 'echarge_filter-chip'}
            onClick={() => setFilterStatus('Mantenimiento')}
          >
            Mantenimiento
          </button>
        </div>

        {/* Detalles de la estación seleccionada */}
        <div className="echarge_content">
          {filteredStations.length === 0 ? (
            <div className="echarge_empty-state">
              No se encontraron estaciones
            </div>
          ) : (
            <div className="echarge_details">
              <div className="echarge_details-body">
                <div className="echarge_details-head">
                  <div>
                    <h2 className="echarge_card-title">{selectedStation.name}</h2>
                    <p className="echarge_card-meta">{selectedStation.city} - {selectedStation.distance}</p>
                  </div>
                  <span className={getBadgeClass(selectedStation.status)}>{selectedStation.status}</span>
                </div>

                <div className="echarge_details-meta">
                  <div>
                    <div className="echarge_chip-label">Cargadores</div>
                    <div className="echarge_chip-value">{selectedStation.chargers}</div>
                  </div>
                  <div>
                    <div className="echarge_chip-label">Precio</div>
                    <div className="echarge_chip-value">{selectedStation.price}</div>
                  </div>
                  <div>
                    <div className="echarge_chip-label">Distancia</div>
                    <div className="echarge_chip-value">{selectedStation.distance}</div>
                  </div>
                  <div>
                    <div className="echarge_chip-label">Ciudad</div>
                    <div className="echarge_chip-value">{selectedStation.city}</div>
                  </div>
                </div>

                <div className="echarge_actions">
                  <button 
                    className="echarge_button-primary"
                    disabled={selectedStation.status === 'Mantenimiento'}
                  >
                    {selectedStation.status === 'Mantenimiento' ? 'No disponible' : 'Iniciar carga'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ECharge;
