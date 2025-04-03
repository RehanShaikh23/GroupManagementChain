"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./FormStyle.css"

function AddGroup({ groups, setGroups }) {
  const [groupName, setGroupName] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    
    if (!groupName.trim()) {
      setError("Group name cannot be empty")
      return
    }

    
    if (groups.some((group) => group.name.toLowerCase() === groupName.toLowerCase() && group.is_active)) {
      setError("Group name already exists")
      return
    }

    
    const newGroup = {
      id: Math.max(0, ...groups.map((g) => g.id)) + 1,
      name: groupName,
      is_active: true,
    }

    setGroups([...groups, newGroup])
    navigate("/manage-groups")
  }

  return (
    <div className="form-container">
      <h2>Add Group</h2>

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
            Add Group
          </button>
          <button type="button" className="btn cancel-btn" onClick={() => navigate("/manage-groups")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddGroup

