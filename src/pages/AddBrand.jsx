"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AddBrand.css"

function AddBrand({ brands, setBrands, chains }) {
  const [name, setName] = useState("")
  const [chainId, setChainId] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBrand = {
      id: brands.length ? brands[brands.length - 1].id + 1 : 1,
      name,
      chainId: parseInt(chainId),
      is_active: true,
    }

    setBrands([...brands, newBrand])
    navigate("/manage-brands")
  }

  return (
    <div className="add-brand">
      <h2>Add Brand</h2>
      <form onSubmit={handleSubmit} className="brand-form">
        <div className="form-group">
          <label>Brand Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Select Chain</label>
          <select value={chainId} onChange={(e) => setChainId(e.target.value)} required>
            <option value="">-- Select Chain --</option>
            {chains
              .filter((chain) => chain.is_active)
              .map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.company}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" className="btn submit-btn">Add Brand</button>
      </form>
    </div>
  )
}

export default AddBrand
