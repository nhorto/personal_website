import { NavLink } from 'react-router-dom';
import signatureImg from '../assets/Nicholas-Horton-white-high-res.png';
import '../styles/components/Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <img className="signature" src={signatureImg} alt="Signature" />
          <span className="divider">|</span>
          <span style={{ color: 'var(--muted)', fontSize: 18 }}>Data Scientist</span>
        </div>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
          <NavLink to="/About" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Projects
          </NavLink>
          <NavLink to="/Projects" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}