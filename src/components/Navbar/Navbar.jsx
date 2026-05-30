import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const menuItems = [
  {
    label: 'Chi siamo',
    path: '/chi-siamo',
    children: [
      { label: 'Il Presidente', path: '/chi-siamo/presidente' },
      { label: 'La Giunta Esecutiva', path: '/chi-siamo/giunta-esecutiva' },
      { label: 'La Direzione Nazionale', path: '/chi-siamo/direzione-nazionale' },
    ],
  },
  {
    label: 'Servizi',
    path: '/servizi',
    children: [
      { label: 'Servizi di patronato', path: '/servizi/patronato' },
      { label: 'Intermediazione del lavoro', url: 'https://www.uidd.it/uidd/intermediazione-al-lavoro/' },
      { label: 'Associazione CeART', url: 'https://www.associazioneceart.it/' },
      { label: 'Servizi CAF', path: '/servizi/caf' },
      { label: 'Formazione professionale', url: 'https://www.usacademy.it/' },
      { label: 'Lavoro domestico', url: 'https://www.uidd.it/uidd/lavoro-domestico/' },
      { label: 'CAA', url: 'https://www.caauipa.it/' },
    ],
  },
  { label: 'Convenzioni', path: '/convenzioni' },
  { label: 'Apri una sede', path: '/apri-una-sede' },
  { label: 'CCNL', path: '/ccnl' },
  { label: 'Tesseramento', path: '/tesseramento' },
  { label: 'Sedi', path: '/sedi' },
  {
    label: 'Contatti',
    path: '/contatti',
    children: [
      { label: 'Dove siamo', path: '/contatti/dove-siamo' },
    ],
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <header className="navbar">
      <div className="container navbar__inner">

      <Link to="/" className="navbar__logo">
  <img src={require('../../assets/logo.png')} alt="UIPA Logo" className="navbar__logo-img" />
</Link>

        <button
          className={menuOpen ? 'navbar__hamburger open' : 'navbar__hamburger'}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Apri menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={menuOpen ? 'navbar__menu open' : 'navbar__menu'}>
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="navbar__item"
              onMouseEnter={() => item.children && setOpenDropdown(idx)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? 'navbar__link active' : 'navbar__link'}
              >
                {item.label} {item.children && '▾'}
              </NavLink>

              {item.children && openDropdown === idx && (
                <div className="navbar__dropdown">
                  {item.children.map((child, cidx) => {
                    if (child.url) {
                      return (
                          <a
                          key={cidx}
                          href={child.url}
                          className="navbar__dropdown-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label} ↗
                        </a>
                      );
                    }
                    return (
                      <NavLink
                        key={cidx}
                        to={child.path}
                        className="navbar__dropdown-link"
                        onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}
                      >
                        {child.label}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>

      </div>
    </header>
  );
};

export default Navbar;
