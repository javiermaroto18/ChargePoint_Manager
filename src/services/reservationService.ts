// Servicio para gestionar las reservas de carga
// Guarda todo en localStorage y calcula precios

import type { Charger } from './types';

export interface Reservation {
  id: string;
  chargerId: number;
  stationName: string;
  address: string;
  startTime: number;
  durationMinutes: number;
  endTime: number;
  price: number;
  status: 'active' | 'completed' | 'cancelled';
  district: string;
}

const STORAGE_KEY = 'echarge_reservations_v2';

// Tarifa: 1€ de desbloqueo + 0.20€ por minuto
const UNLOCK_FEE = 1.0;
const PRICE_PER_MINUTE = 0.2;

export const reservationService = {
  // Calcula el precio: desbloqueo + tiempo
  calculatePrice: (minutes: number): number => {
    return UNLOCK_FEE + minutes * PRICE_PER_MINUTE;
  },

  // Marca como completadas las reservas que ya han expirado
  updateExpiredReservations: (): void => {
    const data = localStorage.getItem(STORAGE_KEY);
    let reservations: Reservation[] = data ? JSON.parse(data) : [];
    const now = Date.now();
    let hasChanges = false;

    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i].status === 'active' && now > reservations[i].endTime) {
        reservations[i].status = 'completed';
        hasChanges = true;
      }
    }

    if (hasChanges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    }
  },

  // Obtiene todas las reservas, ordenadas por más reciente primero
  getAll: (): Reservation[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    const reservations: Reservation[] = data ? JSON.parse(data) : [];
    return reservations.sort((a, b) => b.startTime - a.startTime);
  },

  // Crea una nueva reserva y la guarda en localStorage
  create: (charger: Charger, minutes: number): Reservation => {
    const now = Date.now();
    const price = reservationService.calculatePrice(minutes);

    // Crear la nueva reserva con todos los datos
    const newReservation: Reservation = {
      id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      chargerId: charger.objectid,
      stationName: charger.emplazamie,
      address: charger.emplazamie,
      district: charger.distrito.toString(),
      startTime: now,
      durationMinutes: minutes,
      endTime: now + minutes * 60 * 1000,
      price: parseFloat(price.toFixed(2)),
      status: 'active',
    };

    // Obtener reservas previas y agregar la nueva al inicio
    const current = reservationService.getAll();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newReservation, ...current]));
    return newReservation;
  },

  // Cuenta cuántas reservas activas hay en un cargador
  getActiveCountForCharger: (chargerId: number): number => {
    const all = reservationService.getAll();
    return all.filter((r) => r.chargerId === chargerId && r.status === 'active').length;
  },

  // Calcula cuanto he gastado en carga esta semana, mes y año
  getStats: () => {
    const all = reservationService.getAll();
    const now = new Date();

    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Suma los precios de las reservas completadas
    const sumPrice = (items: Reservation[]): number =>
      items
        .filter((r) => r.status === 'completed')
        .reduce((acc, curr) => acc + curr.price, 0);

    return {
      week: parseFloat(sumPrice(all.filter((r) => r.startTime >= oneWeekAgo.getTime())).toFixed(2)),
      month: parseFloat(sumPrice(all.filter((r) => r.startTime >= startOfMonth.getTime())).toFixed(2)),
      year: parseFloat(sumPrice(all.filter((r) => r.startTime >= startOfYear.getTime())).toFixed(2)),
    };
  },
};
