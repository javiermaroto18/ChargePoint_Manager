import { useState, useEffect } from 'react';
import type { Charger } from '../../services/types';
import { StationMap } from './StationMap';
import { StationsList } from './StationsList';
import { StationDetails } from './StationDetails';
import './ECharge.css';

function ECharge() {
  // Estados: lista de cargadores, loading, cual está seleccionado y texto de búsqueda
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCharger, setSelectedCharger] = useState<Charger | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  // Al cargar el componente, traigo los datos de la API de Valencia
  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const response = await fetch(
          'https://valencia.opendatasoft.com/api/v2/catalog/datasets/carregadors-vehicles-electrics-cargadores-vehiculos-electricos/records?limit=100'
        );
        const data = await response.json();
        const cleanData = data.records.map((r: any) => r.record.fields);
        setChargers(cleanData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChargers();
  }, []);

  // Filtro: busca por nombre de calle o número de distrito
  const filteredChargers = searchText
    ? chargers.filter(c => 
        c.emplazamie.toLowerCase().includes(searchText.toLowerCase()) || 
        c.distrito.toString().includes(searchText)
      )
    : chargers;

  // Para cerrar el panel lateral de detalles
  const handleCloseDetails = () => {
    setSelectedCharger(null);
  };

  if (loading) {
    return (
      <div className="echarge_loading">
        <div className="echarge_spinner"></div>
        <p>Cargando estaciones...</p>
      </div>
    );
  }

  return (
    <div className="echarge_dashboard">
      {/* Barra lateral con el buscador y la lista de estaciones */}
      <aside className="dashboard_sidebar">
        <div className="dashboard_sidebar-header">
          <h2 className="dashboard_title">Puntos de Carga</h2>
          <input
            type="text"
            className="dashboard_search"
            placeholder="Buscar calle o distrito..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="dashboard_list-container">
          <StationsList 
            chargers={filteredChargers} 
            selectedId={selectedCharger?.objectid}
            onSelect={setSelectedCharger}
          />
        </div>
      </aside>

      {/* Mapa en el centro */}
      <main className="dashboard_map">
        <StationMap 
          chargers={filteredChargers} 
          onSelect={setSelectedCharger} 
        />
      </main>

      {/* Panel lateral que se abre cuando selecciono un cargador */}
      <aside className={`dashboard_details ${selectedCharger ? 'open' : ''}`}>
        <div className="details_inner">
          <StationDetails 
            charger={selectedCharger} 
            onClose={handleCloseDetails} 
          />
        </div>
      </aside>
    </div>
  );
}

export default ECharge;