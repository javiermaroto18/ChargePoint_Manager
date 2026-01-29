import { Zap, TrendingUp, LayoutDashboard } from 'lucide-react';
import './Features.css';

export default function Features() {
  const features = [
    {
      icon: <Zap strokeWidth={1.5} className="features_icon" />,
      title: "Reservas en Tiempo Real",
      description: "Consulta la disponibilidad de los puntos de carga y reserva tu plaza al instante. Sin esperas, sin complicaciones."
    },
    {
      icon: <TrendingUp strokeWidth={1.5} className="features_icon" />,
      title: "Control de Gastos",
      description: "Visualiza tus estadísticas de consumo por semana, mes y año. Mantén un registro completo de todas tus cargas."
    },
    {
      icon: <LayoutDashboard strokeWidth={1.5} className="features_icon" />,
      title: "Gestión Centralizada",
      description: "Accede a toda la red de cargadores de Valencia desde una única interfaz intuitiva y fácil de usar."
    }
  ];

  return (
    <section className="features">
      <div className="features_grid">
        {features.map((feature, index) => (
          <div key={index} className="features_item">
            <div className="features_icon-wrapper">
              {feature.icon}
            </div>
            <h3 className="features_title">{feature.title}</h3>
            <p className="features_description">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
