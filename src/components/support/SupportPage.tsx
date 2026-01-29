// Página de soporte con preguntas frecuentes y formulario de contacto

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Mail, Phone, Clock, AlertCircle, Check } from 'lucide-react';
import './Support.css';

export default function SupportPage() {
  // Veo si vengo desde reportar un cargador
  const location = useLocation();
  const chargerReport = location.state as { charger: string; chargerAddress: string; district: string } | null;

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: chargerReport ? 'charger' : 'general',
    message: chargerReport 
      ? `Problema reportado en: ${chargerReport.charger} (${chargerReport.district})\n\nDetalles del problema:\n`
      : '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Si vengo desde reportar, scroll al formulario
  useEffect(() => {
    if (location.hash === '#support-form') {
      const element = document.getElementById('support-form');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const faqs = [
    {
      question: '¿Cómo hago una reserva de carga?',
      answer:
        'Ve a la sección "Stations", selecciona un punto de carga en el mapa, haz clic en "Reservar" y elige el tiempo de carga que necesites. Luego completa el pago con tu tarjeta.',
    },
    {
      question: '¿Puedo cancelar una reserva?',
      answer:
        'Sí, puedes cancelar cualquier reserva activa. Al cancelar, se te reembolsará el dinero completo. Las cancelaciones se reflejan inmediatamente en tu historial.',
    },
    {
      question: '¿Cuál es el sistema de precios?',
      answer:
        'Tenemos una tarifa de desbloqueo de 1€ más 0.20€ por minuto. Por ejemplo: 30 minutos = 1€ + 6€ = 7€ total.',
    },
    {
      question: '¿Qué pasa si expira mi reserva?',
      answer:
        'Cuando se cumpla el tiempo, la reserva cambiará automáticamente a "Completada" y aparecerá en tu historial. No hay penalizaciones por tiempo adicional.',
    },
    {
      question: '¿Puedo ver mis gastos históricos?',
      answer:
        'Sí, en la pestaña "Mis Reservas" puedes ver tus estadísticas de gasto (semana, mes, año) y el historial completo de todas tus cargas.',
    },
    {
      question: '¿Qué hago si un cargador está defectuoso?',
      answer:
        'Desde la información del punto, usa el botón "Reportar" para notificarnos. También puedes contactarnos a través de este formulario de soporte.',
    },
  ];

  const handleFAQToggle = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulamos envío (sin hacer nada real)
    console.log('Formulario de soporte enviado:', formData);

    // Mostrar confirmación
    setSubmitted(true);

    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setFormData({ name: '', email: '', category: 'general', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="support_container">
      {/* ENCABEZADO */}
      <header className="support_header">
        <h1>Centro de Soporte</h1>
        <p>Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas o contacta con nuestro equipo.</p>
      </header>

      {/* SECCIÓN: FAQ */}
      <section className="support_section">
        <div className="section_header">
          <h2>Preguntas Frecuentes</h2>
        </div>

        <div className="faq_list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq_item">
              <button className="faq_question" onClick={() => handleFAQToggle(index)}>
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`faq_icon ${expandedFAQ === index ? 'expanded' : ''}`}
                />
              </button>

              {expandedFAQ === index && <div className="faq_answer">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN: CONTACTO RÁPIDO */}
      <section className="support_section">
        <div className="section_header">
          <h2>Información de Contacto</h2>
        </div>

        <div className="contact_grid">
          <div className="contact_card">
            <Mail size={24} />
            <h3>Email</h3>
            <p>support@chargepoint.com</p>
            <small>Respuesta en 24 horas</small>
          </div>

          <div className="contact_card">
            <Phone size={24} />
            <h3>Teléfono</h3>
            <p>+34 900 123 456</p>
            <small>Lun-Vie 9:00-18:00</small>
          </div>

          <div className="contact_card">
            <Clock size={24} />
            <h3>Horario</h3>
            <p>De lunes a viernes</p>
            <small>9:00 - 18:00 (GMT+1)</small>
          </div>
        </div>
      </section>

      {/* SECCIÓN: FORMULARIO DE CONTACTO */}
      <section className="support_section" id="support-form">
        <div className="section_header">
          <h2>{chargerReport ? 'Reportar Problema en Cargador' : 'Envíanos tu consulta'}</h2>
          <p>
            {chargerReport 
              ? `Cuéntanos qué problema encontraste en ${chargerReport.charger}`
              : 'Cuéntanos qué necesitas y nos pondremos en contacto lo antes posible'}
          </p>
        </div>

        {submitted ? (
          <div className="form_success">
            <Check size={32} />
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactar. Te responderemos pronto.</p>
          </div>
        ) : (
          <form className="support_form" onSubmit={handleFormSubmit}>
            <div className="form_group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
              >
                <option value="general">Consulta General</option>
                <option value="technical">Problema Técnico</option>
                <option value="billing">Facturación</option>
                <option value="charger">Problema con Cargador</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div className="form_group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Cuéntanos qué necesitas..."
                rows={5}
                value={formData.message}
                onChange={handleFormChange}
                required
              />
            </div>

            <button type="submit" className="btn_submit">
              Enviar Consulta
            </button>
          </form>
        )}
      </section>

      {/* SECCIÓN: INFORMACIÓN ADICIONAL */}
      <section className="support_section info_section">
        <div className="info_card">
          <AlertCircle size={20} />
          <div>
            <h4>Reportar un Cargador Defectuoso</h4>
            <p>
              Si encuentras un cargador con problemas, usa el botón "Reportar" en la ficha del
              punto de carga. Nuestro equipo técnico lo revisará en breve.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
