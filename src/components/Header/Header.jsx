import { useState, useEffect } from 'react'
import { navigation } from '../../data/navigation.js'
import './Header.css'

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="nav__brand">
            <span className="nav__logo">🌩️</span>
            <span className="nav__title">eCloudWorx</span>
          </div>

          <ul className="nav__menu">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="nav__link"
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="btn btn--primary btn--sm">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header