import './Hero.css';

export default function Hero() {
  return (
    <main className="hero">
      <div className="hero_container">
        <h1 className="hero_title">
          El Futuro de la<br />Carga Eléctrica
        </h1>
        
        <p className="hero_description">
          Gestiona y reserva puntos de carga para tu vehículo eléctrico en Valencia. Rápido, fácil y transparente.
        </p>
        
        <div className="hero_form">
          <div className="hero_input-wrapper">
            <label className="hero_label" htmlFor="email">Correo electrónico</label>
            <input 
              className="hero_input" 
              id="email" 
              name="email" 
              placeholder="tu@email.com" 
              type="email" 
            />
          </div>
          <button className="hero_button">
            Comenzar
          </button>
        </div>
        
        <div className="hero_trust">
          <span className="hero_trust-text">Movilidad sostenible al alcance de todos</span>
        </div>
      </div>
    </main>
  );
}
