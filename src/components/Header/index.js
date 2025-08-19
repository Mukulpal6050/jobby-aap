import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
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

      {/* Navigation */}
      <nav className="header-nav">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
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
