import { Menu } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar_logo">ChargePoint Manager</div>
      
      <nav className="navbar_menu">
        <a href="#">Dashboard</a>
        <a href="#">Stations</a>
        <a href="#">Analytics</a>
        <a href="#">Support</a>
      </nav>
      
      <button className="navbar_mobile-button">
        <Menu strokeWidth={1.5} />
      </button>
    </header>
  );
}
