import { Link, NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import DarkMode from './DarkMode'

function NavBar() {
  const { user, signOutUser, signIn } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header sticky top-0 z-50">
      <nav className="nav-shell">
        <Link to="/" className="brand" onClick={closeMenu}><span className="brand-symbol">N</span> notesgini</Link>
        <div className="nav-links">
          <NavLink to="/" end className="nav-link">Overview</NavLink>
          <a href="/#how-it-works" className="nav-link">How it works</a>
          <NavLink to="/note" className="nav-link">My notes</NavLink>
        </div>
        <div className="nav-actions">
          <DarkMode />
          {!user && <button type="button" className="btn-primary" onClick={signIn}>Get started <i className="ri-arrow-right-up-line" /></button>}
          <button type="button" className={`nav-toggle ${user ? '' : 'md:hidden'}`} aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} /></button>
        </div>
      </nav>
      {menuOpen && <div className={`mobile-menu ${user ? 'account-menu' : ''}`}><Link to="/" onClick={closeMenu}>Overview</Link><a href="/#how-it-works" onClick={closeMenu}>How it works</a><Link to="/note" onClick={closeMenu}>My notes</Link>{user && <button type="button" className="btn-danger mt-2" onClick={signOutUser}>Sign out</button>}</div>}
    </header>
  )
}

export default NavBar
