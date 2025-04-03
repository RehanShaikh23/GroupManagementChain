"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./FormStyle.css"

function EditGroup({ groups, setGroups }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [groupName, setGroupName] = useState("")
  const [error, setError] = useState("")

  // Find the group to edit
  useEffect(() => {
    const groupId = Number.parseInt(id)
    const group = groups.find((g) => g.id === groupId)

    if (group) {
      setGroupName(group.name)
    } else {
      navigate("/manage-groups")
    }
  }, [id, groups, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!groupName.trim()) {
      setError("Group name cannot be empty")
      return
    }

    const groupId = Number.parseInt(id)

    // Check for duplicate group name (excluding current group)
    if (
      groups.some(
        (group) => group.id !== groupId && group.name.toLowerCase() === groupName.toLowerCase() && group.is_active,
      )
    ) {
      setError("Group name already exists")
      return
    }

    // Update group
    setGroups(groups.map((group) => (group.id === groupId ? { ...group, name: groupName } : group)))

    navigate("/manage-groups")
  }

  return (
    <div className="form-container">
      <h2>Edit Group</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn submit-btn">
            Update Group
          </button>
          <button type="button" className="btn cancel-btn" onClick={() => navigate("/manage-groups")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditGroup

