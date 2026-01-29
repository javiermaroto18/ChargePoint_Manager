import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Charger } from '../../services/types';
import { Zap, Info, BatteryCharging, Ticket, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { ReservationModal } from './ReservationModal';
import { reservationService } from '../../services/reservationService';

interface Props {
  charger: Charger | null;
  onClose?: () => void;
}

export const StationDetails = ({ charger, onClose }: Props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [availableSpots, setAvailableSpots] = useState<number>(0);
  const [isFull, setIsFull] = useState(false);

  /**
   * Recalcula la disponibilidad del cargador
   * USANDO el servicio de reservas para obtener el count actual
   */
  useEffect(() => {
    if (charger) {
      calculateAvailability();
    }
  }, [charger]);

  const calculateAvailability = () => {
    if (!charger) return;

    // Traigo las reservas activas para este cargador
    const activeReservations = reservationService.getActiveCountForCharger(charger.objectid);

    // Calculo cuántas tomas siguen disponibles
    const realAvailable = charger.toma - activeReservations;

    setAvailableSpots(realAvailable > 0 ? realAvailable : 0);
    setIsFull(realAvailable <= 0);
  };

  const handleReservationSuccess = () => {
    if (!charger) return;

    // Actualizo la disponibilidad y cierro el modal
    calculateAvailability();
    setShowModal(false);

    // Mostrar confirmación al usuario
    alert('¡Reserva confirmada correctamente!');
  };

  if (!charger) {
    return (
      <div className="echarge_empty-details">
        <Zap size={48} strokeWidth={1} color="#cbd5e1" />
        <p>Selecciona un punto en el mapa</p>
      </div>
    );
  }

  return (
    <>
      <section className="echarge_details-panel">
        <div className="details_sticky_header">
          <h3>Info del punto</h3>
          <button className="btn-close-panel" onClick={onClose} title="Cerrar panel">
            <X size={20} />
          </button>
        </div>
        
        <div className="details_scrollable_content">
          <div className="details_hero">
            <h2 className="details-title">{charger.emplazamie}</h2>
            
            {/* LOGICA DE ESTADO: Operativo vs Completo */}
            {isFull ? (
              <span className="details_badge full">
                <AlertCircle size={14} style={{ marginRight: 4 }} /> Completo
              </span>
            ) : (
              <span className="details_badge">
                <CheckCircle2 size={14} style={{ marginRight: 4 }} /> Operativo
              </span>
            )}
          </div>

          {/* Botones de Acción */}
          <div className="details_actions">
            {/* BOTÓN RESERVAR: Cambia según si está lleno */}
            <button 
              className="btn-action primary" 
              onClick={() => setShowModal(true)}
              disabled={isFull}
              style={{ opacity: isFull ? 0.5 : 1, cursor: isFull ? 'not-allowed' : 'pointer' }}
            >
              <Ticket size={18} /> 
              <span>{isFull ? 'Sin plazas' : 'Reservar'}</span>
            </button>

            <button 
              className="btn-action secondary"
              onClick={() => navigate('/support#support-form', { 
                state: { 
                  charger: charger.emplazamie,
                  chargerAddress: charger.emplazamie,
                  district: charger.distrito
                } 
              })}
            >
              <Info size={18} /> <span>Reportar</span>
            </button>
          </div>

          <div className="details_divider" />

          <div className="details_grid">
            <div className="detail-card">
              <div className="detail-icon blue"><Zap size={20} /></div>
              <span className="detail-label">Distrito</span>
              <span className="detail-value">{charger.distrito}</span>
            </div>
            
            <div className="detail-card">
              <div className="detail-icon yellow"><BatteryCharging size={20} /></div>
              <span className="detail-label">Potencia</span>
              <span className="detail-value">{charger.potenc_ia}</span>
            </div>

            {/* Mostramos las tomas REALES disponibles (API - Reservas) */}
            <div className="detail-card">
              <div className="detail-icon green"><CheckCircle2 size={20} /></div>
              <span className="detail-label">Disponibles</span>
              <span className="detail-value" style={{ color: isFull ? '#dc2626' : 'inherit' }}>
                {availableSpots} / {charger.toma}
              </span>
            </div>

            <div className="detail-card">
              <div className="detail-icon gray"><Info size={20} /></div>
              <span className="detail-label">Tipo Carga</span>
              <span className="detail-value">{charger.tipo_carga || 'Estándar'}</span>
            </div>
          </div>

          {charger.observacio && (
            <div className="details_observation">
              <h4>Información adicional</h4>
              <p>{charger.observacio}</p>
            </div>
          )}
        </div>
      </section>

      {/* Renderizamos el Modal si está activo */}
      {showModal && (
        <ReservationModal 
          charger={charger} 
          onClose={() => setShowModal(false)}
          onConfirm={handleReservationSuccess}
        />
      )}
    </>
  );
};