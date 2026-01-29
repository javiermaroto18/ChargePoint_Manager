import { useState } from 'react';
import { X, CreditCard, Lock, Clock } from 'lucide-react';
import type { Charger } from '../../services/types';
import { reservationService } from '../../services/reservationService';
import './ECharge.css';

interface Props {
  charger: Charger;
  onClose: () => void;
  onConfirm: () => void;
}

export const ReservationModal = ({ charger, onClose, onConfirm }: Props) => {
  // Estado del modal y duración seleccionada
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<number>(30);
  const [cardNumber, setCardNumber] = useState('');

  const price = reservationService.calculatePrice(duration);

  // Maneja el envío del formulario (crea la reserva)
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulamos latencia de red
    setTimeout(() => {
      // Guardamos la reserva en localStorage
      reservationService.create(charger, duration);

      setLoading(false);
      onConfirm(); // Notificamos al padre que se completó
    }, 1500);
  };

  return (
    <div className="echarge_modal-overlay">
      <div className="echarge_modal">
        {/* Header */}
        <div className="modal_header">
          <h3 className="modal_title">Configurar Reserva</h3>
          <button className="btn-close-panel" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form className="modal_body" onSubmit={handlePayment}>
          {/* Selector para elegir cuántos minutos quiero cargar */}
          <div className="time_selector_container">
            <label className="section_label">
              <Clock size={16} style={{ marginRight: 8 }} />
              Tiempo de carga
            </label>
            <div className="time_options">
              {[15, 30, 45, 60, 120].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  className={`time_btn ${duration === minutes ? 'active' : ''}`}
                  onClick={() => setDuration(minutes)}
                >
                  {minutes >= 60 ? `${Math.floor(minutes / 60)}h` : `${minutes}m`}
                </button>
              ))}
            </div>
          </div>

          {/* Resumen de qué voy a pagar */}
          <div className="reservation_summary">
            <div className="summary_row">
              <span>Punto de carga:</span>
              <strong>{charger.emplazamie}</strong>
            </div>
            <div className="summary_row">
              <span>Distrito:</span>
              <span>{charger.distrito}</span>
            </div>
            <div className="summary_row">
              <span>Duración:</span>
              <span>{duration} minutos</span>
            </div>
            <div className="summary_row total">
              <span>Total a pagar</span>
              <span>{price.toFixed(2)}€</span>
            </div>
          </div>

          {/* Formulario simulado de tarjeta */}
          <div className="stripe_fake_form">
            <div className="form_group">
              <label>Información de tarjeta</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  className="stripe_input" 
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
                <CreditCard size={18} style={{ position: 'absolute', right: 10, top: 12, color: '#94a3b8' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
              <Lock size={12} /> Pagos seguros encriptados con SSL
            </div>

            <button type="submit" className="btn-pay" disabled={loading || cardNumber.length < 10}>
              {loading ? 'Procesando...' : `Pagar ${price.toFixed(2)}€`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};