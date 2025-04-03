"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./FormStyle.css"

function EditChain({ chains, groups, setChains }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState("")
  const [gstn, setGstn] = useState("")
  const [groupId, setGroupId] = useState("")
  const [error, setError] = useState("")
  const [originalGstn, setOriginalGstn] = useState("")

  // Get active groups for dropdown
  const activeGroups = groups.filter((group) => group.is_active)

  // Find the chain to edit
  useEffect(() => {
    const chainId = Number.parseInt(id)
    const chain = chains.find((c) => c.id === chainId)

    if (chain) {
      setCompany(chain.company)
      setGstn(chain.gstn)
      setOriginalGstn(chain.gstn)
      setGroupId(chain.groupId.toString())
    } else {
      navigate("/manage-chain")
    }
  }, [id, chains, navigate])

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

    const chainId = Number.parseInt(id)

    // Check for duplicate GSTN (excluding current chain)
    if (
      gstn !== originalGstn &&
      chains.some((chain) => chain.id !== chainId && chain.gstn === gstn && chain.is_active)
    ) {
      setError("GSTN already exists")
      return
    }

    if (!groupId) {
      setError("Please select a group")
      return
    }

    // Update chain
    setChains(
      chains.map((chain) =>
        chain.id === chainId
          ? {
              ...chain,
              company,
              gstn,
              groupId: Number.parseInt(groupId),
            }
          : chain,
      ),
    )

    navigate("/manage-chain")
  }

  return (
    <div className="form-container">
      <h2>Edit Chain/Company</h2>

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
            Update
          </button>
          <button type="button" className="btn cancel-btn" onClick={() => navigate("/manage-chain")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditChain

