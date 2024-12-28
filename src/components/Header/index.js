import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="logo-img"
          alt="website logo"
        />
      </Link>
      <ul className="header">
        <Link to="/" className="nav-link">
          <li>
            <p className="text">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="nav-link">
          <li>
            <p className="text">jobs</p>
          </li>
        </Link>
      </ul>
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
