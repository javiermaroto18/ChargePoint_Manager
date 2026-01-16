import { Menu } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar_logo">EV/M</div>
      
      <nav className="navbar_menu">
        <a href="#">Platform</a>
        <a href="#">Solutions</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </nav>
      
      <button className="navbar_mobile-button">
        <Menu strokeWidth={1.5} />
      </button>
    </header>
  );
}
