import { Link } from "react-router-dom"
import "./Header.css"

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Invoice</h1>
        <span className="section-title">| Manage Chain Section</span>
      </div>
      <div className="header-right">
        <span className="user-greeting">Hi User</span>
        <Link to="/" className="logout-link">
          Logout
        </Link>
      </div>
    </header>
  )
}

export default Header

