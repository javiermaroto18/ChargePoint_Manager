import { Zap, TrendingUp, LayoutDashboard } from 'lucide-react';
import './Features.css';

export default function Features() {
  const features = [
    {
      icon: <Zap strokeWidth={1.5} className="features_icon" />,
      title: "Real-time Optimization",
      description: "Dynamic load balancing ensures maximum efficiency across your entire charging network without overloading the grid."
    },
    {
      icon: <TrendingUp strokeWidth={1.5} className="features_icon" />,
      title: "Predictive Analytics",
      description: "Advanced algorithms forecast usage patterns, helping you scale infrastructure precisely where and when it's needed."
    },
    {
      icon: <LayoutDashboard strokeWidth={1.5} className="features_icon" />,
      title: "Unified Dashboard",
      description: "Control every aspect of your fleet and station operations from a single, beautifully designed interface."
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
