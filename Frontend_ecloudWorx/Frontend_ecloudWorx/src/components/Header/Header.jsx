// import { useState, useEffect } from 'react'
// import { navigation } from '../../data/navigation.js'
// import './Header.css'

// const Header = ({ isScrolled }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const handleSmoothScroll = (e, href) => {
//     e.preventDefault()
//     if (href.startsWith('#')) {
//       const element = document.querySelector(href)
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth', block: 'start' })
//       }
//     }
//     setIsMobileMenuOpen(false)
//   }

//   return (
//     <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
//       <div className="container">
//         <nav className="nav">
//           <div className="nav__brand">
//             <span className="nav__logo">🌩️</span>
//             <span className="nav__title">eCloudWorx</span>
//           </div>

//           <ul className="nav__menu">
//             {navigation.map((item) => (
//               <li key={item.name}>
//                 <a
//                   href={item.href}
//                   className="nav__link"
//                   onClick={(e) => handleSmoothScroll(e, item.href)}
//                 >
//                   {item.name}
//                 </a>
//               </li>
//             ))}
//             <li>
//               <a href="#" className="btn btn--primary btn--sm">
//                 Sign Up
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   )
// }

// export default Header

// src/components/Header.jsx
import { useState, useEffect } from 'react'
import { navigation } from '../../data/navigation.js'
import './Header.css'

const Header = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSmoothScroll = (e, href) => {
    // Only prevent default for in-page anchors so we can smooth-scroll.
    if (href && href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // close mobile menu for all links
    setIsMobileMenuOpen(false)
  }

  const isExternal = (href) => {
    return typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'))
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
                {isExternal(item.href) ? (
                  // external link: let browser handle navigation (open in new tab)
                  <a
                    href={item.href}
                    className="nav__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  // internal link or anchor: keep smooth-scroll behavior
                  <a
                    href={item.href}
                    className="nav__link"
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a href="#" className="btn btn--primary btn--sm" onClick={() => setIsMobileMenuOpen(false)}>
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
