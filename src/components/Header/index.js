import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      {/* Navigation */}
      <nav className={`header-nav ${isMenuOpen ? 'show' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Jobs
            </Link>
          </li>
          <li>
            <button type="button" className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default withRouter(Header)
