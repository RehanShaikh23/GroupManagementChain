"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Dashboard.css"

function Dashboard({ groups, chains }) {
  const [filterGroup, setFilterGroup] = useState("")

  // Filter chains based on selected group
  const filteredChains = filterGroup
    ? chains.filter((chain) => {
        const group = groups.find((g) => g.id === chain.groupId)
        return group && group.name === filterGroup && chain.is_active
      })
    : chains.filter((chain) => chain.is_active)

  // Count active groups and chains
  const activeGroups = groups.filter((group) => group.is_active).length
  const activeChains = chains.filter((chain) => chain.is_active).length

  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <div className="stat-card groups-card">
          <h3>Total Groups</h3>
          <p>{activeGroups}</p>
        </div>
        <div className="stat-card chains-card">
          <h3>Total Chains</h3>
          <p>{activeChains}</p>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/add-chain" className="btn add-btn">
          Add Company
        </Link>
      </div>

      <div className="dashboard-content">
        <div className="chains-table-container">
          <table className="chains-table">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Group Name</th>
                <th>Company</th>
                <th>GSTN</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredChains.map((chain, index) => {
                const group = groups.find((g) => g.id === chain.groupId)
                return (
                  <tr key={chain.id}>
                    <td>{index + 1}</td>
                    <td>{group ? group.name : "Unknown Group"}</td>
                    <td>{chain.company}</td>
                    <td>{chain.gstn}</td>
                    <td>
                      <Link to={`/edit-chain/${chain.id}`} className="btn edit-btn">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <Link to="/manage-chain" className="btn delete-btn">
                        Delete
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="filter-section">
          <h3>Filter by Group</h3>
          <div className="filter-links">
            {groups
              .filter((group) => group.is_active)
              .map((group) => (
                <button
                  key={group.id}
                  className={`filter-link ${filterGroup === group.name ? "active" : ""}`}
                  onClick={() => setFilterGroup(group.name === filterGroup ? "" : group.name)}
                >
                  {group.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

