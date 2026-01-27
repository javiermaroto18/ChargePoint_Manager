import type { Charger } from '../../types';
import { MapPin, Zap, Info, BatteryCharging, Navigation, CheckCircle2, X } from 'lucide-react';

interface Props {
  charger: Charger | null;
  onClose?: () => void;
}

export const StationDetails = ({ charger, onClose }: Props) => {
  // Si no hay nada seleccionado, muestro un mensaje
  if (!charger) {
    return (
      <div className="echarge_empty-details">
        <MapPin size={48} strokeWidth={1} color="#cbd5e1" />
        <p>Selecciona un punto en el mapa</p>
      </div>
    );
  }

  return (
    <section className="echarge_details-panel">
      {/* Cabecera con el botón de cerrar */}
      <div className="details_sticky_header">
        <h3>Info del punto</h3>
        <button className="btn-close-panel" onClick={onClose} title="Cerrar panel">
          <X size={20} />
        </button>
      </div>
      
      {/* Contenido con scroll */}
      <div className="details_scrollable_content">
        
        {/* Título y badge de estado */}
        <div className="details_hero">
          <h2 className="details-title">{charger.emplazamie}</h2>
          <span className="details_badge">
            <CheckCircle2 size={14} style={{ marginRight: 4 }} /> Operativo
          </span>
        </div>

        {/* Botones para navegar o reportar problemas */}
        <div className="details_actions">
          <button className="btn-action primary">
            <Navigation size={18} /> <span>Navegar</span>
          </button>
          <button className="btn-action secondary">
            <Info size={18} /> <span>Reportar</span>
          </button>
        </div>

        <div className="details_divider" />

        {/* Grid con las tarjetas de información */}
        <div className="details_grid">
          {/* Distrito */}
          <div className="detail-card">
            <div className="detail-icon blue"><MapPin size={20} /></div>
            <span className="detail-label">Distrito</span>
            <span className="detail-value">{charger.distrito}</span>
          </div>
          {/* Potencia */}
          <div className="detail-card">
            <div className="detail-icon yellow"><Zap size={20} /></div>
            <span className="detail-label">Potencia</span>
            <span className="detail-value">{charger.potenc_ia}</span>
          </div>
          {/* Tomas disponibles */}
          <div className="detail-card">
            <div className="detail-icon green"><BatteryCharging size={20} /></div>
            <span className="detail-label">Tomas</span>
            <span className="detail-value">{charger.toma} puntos</span>
          </div>
          {/* Tipo de carga */}
          <div className="detail-card">
            <div className="detail-icon gray"><Info size={20} /></div>
            <span className="detail-label">Tipo Carga</span>
            <span className="detail-value">{charger.tipo_carga || 'Estándar'}</span>
          </div>
        </div>

        {/* Si hay observaciones, las muestro */}
        {charger.observacio && (
          <div className="details_observation">
            <h4>Información adicional</h4>
            <p>{charger.observacio}</p>
          </div>
        )}
      </div>
    </section>
  );
};