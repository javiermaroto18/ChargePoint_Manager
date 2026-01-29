// Página donde veo mis reservas activas, historial y gastos

import { useState, useEffect } from 'react';
import { reservationService, type Reservation } from '../../services/reservationService';
import { Calendar, CreditCard, TrendingUp, MapPin, Zap } from 'lucide-react';
import mockReservations from '../../services/mockReservations.json';
import './Reservations.css';

export default function ReservationsPage() {
  // Guardo las reservas y las estadísticas de gasto
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stats, setStats] = useState({ week: 0, month: 0, year: 0 });

  // Cargar reservas y estadísticas al montar, y actualizar cada minuto
  useEffect(() => {
    const loadData = () => {
      // Traigo mis reservas del localStorage
      const localReservations = reservationService.getAll();
      // Las mezclo con los datos de ejemplo para mostrar en el historial
      const allReservations = [...localReservations, ...(mockReservations as Reservation[])];
      allReservations.sort((a, b) => b.startTime - a.startTime);
      setReservations(allReservations);
      // Calculo mis gastos totales
      const currentStats = reservationService.getStats();
      setStats(currentStats);
    };

    loadData();

    // Auto-actualizar cada minuto para reflejar cambios en tiempos
    const interval = setInterval(loadData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Separar reservas activas y completadas
  const activeReservations = reservations.filter((r) => r.status === 'active');
  const pastReservations = reservations.filter((r) => r.status !== 'active');

  return (
    <div className="res_container">
      {/* Cabecera */}
      <header className="res_header">
        <h1>Mi Actividad</h1>
        <p>Gestiona tus reservas y controla tus gastos de carga.</p>
      </header>

      {/* Tarjetas de estadísticas de gasto */}
      <section className="res_stats_grid">
        <StatsCard
          label="Esta Semana"
          value={stats.week}
          icon={<TrendingUp size={20} />}
          color="blue"
        />
        <StatsCard
          label="Este Mes"
          value={stats.month}
          icon={<Calendar size={20} />}
          color="indigo"
        />
        <StatsCard
          label="Total Anual"
          value={stats.year}
          icon={<CreditCard size={20} />}
          color="emerald"
        />
      </section>

      {/* Mostrar las cargas que están en curso */}
      {activeReservations.length > 0 && (
        <section className="res_section">
          <h2 className="section_title">
            En curso <span className="pulse_dot"></span>
          </h2>
          <div className="active_grid">
            {activeReservations.map((reservation) => (
              <ActiveReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </div>
        </section>
      )}

      {/* Historial de todas mis cargas anteriores */}
      <section className="res_section">
        <h2 className="section_title">Historial reciente</h2>
        <div className="history_list">
          {pastReservations.length > 0 ? (
            pastReservations.map((reservation) => (
              <div key={reservation.id} className="history_item">
                <div className="h_icon">
                  <Zap size={18} />
                </div>
                <div className="h_info">
                  <h4>{reservation.stationName}</h4>
                  <span>
                    {new Date(reservation.startTime).toLocaleDateString()} •{' '}
                    {reservation.durationMinutes} min
                  </span>
                </div>
                <div className="h_price">
                  {reservation.status === 'completed' ? (
                    <span className="badge_completed">Completado</span>
                  ) : (
                    <span className="badge_cancelled">Cancelado</span>
                  )}
                  <strong>-{reservation.price.toFixed(2)}€</strong>
                </div>
              </div>
            ))
          ) : (
            <p className="empty_text">No tienes historial de reservas.</p>
          )}
        </div>
      </section>
    </div>
  );
}

// Tarjeta que muestra estadísticas (icono, etiqueta y valor)
const StatsCard = ({ label, value, icon, color }: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'indigo' | 'emerald';
}) => (
  <div className={`stat_card color-${color}`}>
    <div className="stat_icon">{icon}</div>
    <div>
      <span className="stat_label">{label}</span>
      <h3 className="stat_value">{value.toFixed(2)}€</h3>
    </div>
  </div>
);

/**
 * COMPONENTE: Tarjeta de reserva activa
 *
 * Muestra:
 * - Nombre del punto de carga
 * - Distrito
 * - Barra de progreso visual (% completado)
 * - Tiempo restante en minutos
 * - Horario de inicio y fin
 */
const ActiveReservationCard = ({ reservation }: { reservation: Reservation }) => {
  // Calcular porcentaje de progreso
  const progressPercent = Math.min(
    100,
    Math.max(0, ((Date.now() - reservation.startTime) / (reservation.durationMinutes * 60 * 1000)) * 100)
  );

  // Calcular minutos restantes
  const timeLeftMinutes = Math.max(0, Math.ceil((reservation.endTime - Date.now()) / 60000));

  return (
    <div className="active_card">
      <div className="ac_header">
        <div className="ac_badge">Activo</div>
        <span className="ac_timer">{timeLeftMinutes} min restantes</span>
      </div>

      <h3 className="ac_title">{reservation.stationName}</h3>

      <div className="ac_location">
        <MapPin size={14} />
        {reservation.district}
      </div>

      {/* BARRA DE PROGRESO */}
      <div className="progress_container">
        <div className="progress_bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      {/* HORARIOS */}
      <div className="ac_meta">
        <span>
          Inicio: {new Date(reservation.startTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <span>
          Fin: {new Date(reservation.endTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};
