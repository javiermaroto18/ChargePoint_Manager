import type { Charger } from '../../types';


interface Props {
  chargers: Charger[];
  selectedId?: number;
  onSelect: (charger: Charger) => void;
}

export const StationsList = ({ chargers, selectedId, onSelect }: Props) => {
  return (
    <aside className="echarge_sidebar">
      <div className="echarge_sidebar-header">
        <h2>Stations</h2>
      </div>
      <div className="echarge_list">
        {/* Si hay estaciones las muestro, sino un mensaje */}
        {chargers.length > 0 ? (
          chargers.map((charger) => (
            <div
              key={charger.objectid}
              className={`echarge_card ${selectedId === charger.objectid ? 'echarge_card--active' : ''}`}
              onClick={() => onSelect(charger)}
            >
              <div className="echarge_card-number">{charger.no}</div>
              <div className="echarge_card-content">
                <h3 className="echarge_card-title">{charger.emplazamie}</h3>
                <div className="echarge_card-meta">
                  <span className="echarge_meta-item">Dist {charger.distrito}</span>
                  <span className="echarge_meta-separator">•</span>
                  <span className="echarge_meta-item">{charger.toma} toma{charger.toma > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="echarge_empty-state">No stations found</div>
        )}
      </div>
    </aside>
  );
};