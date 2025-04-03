"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ManageGroup.css"

function ManageGroups({ groups, setGroups, isGroupLinkedToChain }) {
  const [filterName, setFilterName] = useState("")
  const navigate = useNavigate()

  // Filter groups based on search input
  const filteredGroups = groups.filter(
    (group) => group.name.toLowerCase().includes(filterName.toLowerCase()) && group.is_active,
  )

  // Handle group deletion (soft delete)
  const handleDelete = (id) => {
    if (isGroupLinkedToChain(id)) {
      alert("This group cannot be deleted as it is linked to one or more chains.")
      return
    }

    if (window.confirm("Are you sure you want to delete this group?")) {
      setGroups(groups.map((group) => (group.id === id ? { ...group, is_active: false } : group)))
    }
  }

  return (
    <div className="manage-groups">
      <h2>Manage Groups</h2>

      <div className="groups-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by group name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="search-input"
          />
        </div>
        <Link to="/add-group" className="btn add-btn">
          Add Group
        </Link>
      </div>

      <div className="groups-table-container">
        <table className="groups-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Group Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group) => (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>
                  <span className={`status ${group.is_active ? "active" : "inactive"}`}>
                    {group.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="actions">
                  <Link to={`/edit-group/${group.id}`} className="btn edit-btn">
                    Edit
                  </Link>
                  <button className="btn delete-btn" onClick={() => handleDelete(group.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageGroups

