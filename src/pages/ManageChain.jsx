"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./ManageChain.css"

function ManageChain({ chains, groups, setChains, isChainLinkedToBrand }) {
  const [filterName, setFilterName] = useState("")

  // Filter chains based on search input
  const filteredChains = chains.filter(
    (chain) => chain.company.toLowerCase().includes(filterName.toLowerCase()) && chain.is_active,
  )

  // Handle chain deletion (soft delete)
  const handleDelete = (id) => {
    if (isChainLinkedToBrand(id)) {
      alert("This chain cannot be deleted as it is linked to one or more brands.")
      return
    }

    if (window.confirm("Are you sure you want to delete this chain?")) {
      setChains(chains.map((chain) => (chain.id === id ? { ...chain, is_active: false } : chain)))
    }
  }

  return (
    <div className="manage-chain">
      <h2>Manage Chains</h2>

      <div className="chains-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by company name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="search-input"
          />
        </div>
        <Link to="/add-chain" className="btn add-btn">
          Add Chain
        </Link>
      </div>

      <div className="chains-table-container">
        <table className="chains-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Group</th>
              <th>GSTN</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredChains.map((chain) => {
              const group = groups.find((g) => g.id === chain.groupId)
              return (
                <tr key={chain.id}>
                  <td>{chain.id}</td>
                  <td>{chain.company}</td>
                  <td>{group ? group.name : "Unknown Group"}</td>
                  <td>{chain.gstn}</td>
                  <td>
                    <span className={`status ${chain.is_active ? "active" : "inactive"}`}>
                      {chain.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="actions">
                    <Link to={`/edit-chain/${chain.id}`} className="btn edit-btn">
                      Edit
                    </Link>
                    <button className="btn delete-btn" onClick={() => handleDelete(chain.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageChain

