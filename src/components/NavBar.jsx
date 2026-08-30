import { Link, NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import DarkMode from './DarkMode'

function NavBar() {
  const { user, signOutUser, signIn } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="nav-shell">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-symbol">
            <i className="ri-quill-pen-line" />
          </span>
          <span>Notes<span className="font-light">Gini</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Overview
          </NavLink>
          <a href="/#features" className="nav-link">
            Features
          </a>
          <NavLink to="/note" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Workspace
          </NavLink>
        </div>

        <div className="nav-actions">
          <DarkMode />

          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded border border-[var(--border-main)] object-cover grayscale"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-[var(--bg-subtle)] border border-[var(--border-main)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)]">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <button
                type="button"
                onClick={signOutUser}
                className="btn-danger hidden sm:inline-flex"
                title="Sign out"
              >
                <i className="ri-logout-box-r-line" />
                <span>Sign out</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={signIn}
            >
              <span>Get Started</span>
              <i className="ri-arrow-right-line text-xs" />
            </button>
          )}

          <button
            type="button"
            className="icon-btn md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={menuOpen ? 'ri-close-line text-lg' : 'ri-menu-4-line text-lg'} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-drawer md:hidden">
          <Link to="/" onClick={closeMenu}>Overview</Link>
          <a href="/#features" onClick={closeMenu}>Features</a>
          <Link to="/note" onClick={closeMenu}>Workspace</Link>
          {user && (
            <button
              type="button"
              className="btn-danger mt-2 w-full justify-center"
              onClick={() => {
                signOutUser()
                closeMenu()
              }}
            >
              <i className="ri-logout-box-r-line" />
              Sign out ({user.displayName || 'Account'})
            </button>
          )}
        </div>
      )}
    </header>
  )
}

export default NavBar
