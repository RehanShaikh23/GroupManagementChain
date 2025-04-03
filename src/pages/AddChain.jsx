"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./FormStyle.css"

function AddChain({ chains, groups, setChains }) {
  const [company, setCompany] = useState("")
  const [gstn, setGstn] = useState("")
  const [groupId, setGroupId] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Get active groups for dropdown
  const activeGroups = groups.filter((group) => group.is_active)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!company.trim()) {
      setError("Company name cannot be empty")
      return
    }

    if (!gstn.trim()) {
      setError("GSTN cannot be empty")
      return
    }

    // Basic GSTN validation (format: 22AAAAA0000A1Z5)
    const gstnRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}[A-Z\d]{1}$/
    if (!gstnRegex.test(gstn)) {
      setError("Invalid GSTN format")
      return
    }

    // Check for duplicate GSTN
    if (chains.some((chain) => chain.gstn === gstn && chain.is_active)) {
      setError("GSTN already exists")
      return
    }

    if (!groupId) {
      setError("Please select a group")
      return
    }

    // Add new chain
    const newChain = {
      id: Math.max(0, ...chains.map((c) => c.id)) + 1,
      company,
      gstn,
      groupId: Number.parseInt(groupId),
      is_active: true,
    }

    setChains([...chains, newChain])
    navigate("/manage-chain")
  }

  return (
    <div className="form-container">
      <h2>Add Chain/Company</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Enter Company Name:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter Company Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gstn">Enter GSTN:</label>
          <input
            type="text"
            id="gstn"
            value={gstn}
            onChange={(e) => setGstn(e.target.value)}
            placeholder="Enter GST Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="group">Select Group:</label>
          <select id="group" value={groupId} onChange={(e) => setGroupId(e.target.value)}>
            <option value="">Select a group</option>
            {activeGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn submit-btn">
            Add Company
          </button>
          <button type="button" className="btn cancel-btn" onClick={() => navigate("/manage-chain")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddChain

