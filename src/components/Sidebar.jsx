import { NavLink } from "react-router-dom"
import "./Sidebar.css"

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-groups" className={({ isActive }) => (isActive ? "active" : "")}>
              Manage Groups
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-chain" className={({ isActive }) => (isActive ? "active" : "")}>
              Manage Chain
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Manage Brands
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Manage SubZones
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Manage Estimate
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Manage Invoices
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

