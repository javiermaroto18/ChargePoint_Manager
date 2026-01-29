import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar_logo">
        ChargePoint Manager
      </Link>
      
      <nav className="navbar_menu">
        <Link to="/stations">Stations</Link>
        <Link to="/reservations">Mis Reservas</Link>
        <Link to="/support">Support</Link>
      </nav>
      
      <button className="navbar_mobile-button">
        <Menu strokeWidth={1.5} />
      </button>
    </header>
  );
}
