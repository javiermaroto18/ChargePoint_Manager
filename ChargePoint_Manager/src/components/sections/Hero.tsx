import './Hero.css';

export default function Hero() {
  return (
    <main className="hero">
      <div className="hero_container">
        <h1 className="hero_title">
          The Future of<br />Charging, Managed.
        </h1>
        
        <p className="hero_description">
          Seamless infrastructure for the next generation of electric mobility. Intelligent, scalable, and effortlessly clean.
        </p>
        
        <div className="hero_form">
          <div className="hero_input-wrapper">
            <label className="hero_label" htmlFor="email">Email address</label>
            <input 
              className="hero_input" 
              id="email" 
              name="email" 
              placeholder="email@company.com" 
              type="email" 
            />
          </div>
          <button className="hero_button">
            Join
          </button>
        </div>
        
        <div className="hero_trust">
          <span className="hero_trust-text">Trusted by forward thinkers</span>
        </div>
      </div>
    </main>
  );
}
