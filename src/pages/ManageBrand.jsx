"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./ManageBrand.css"

function ManageBrand({ brands, chains, setBrands }) {
  const [filterName, setFilterName] = useState("")

  const filteredBrands = brands.filter(
    (brand) => brand.name.toLowerCase().includes(filterName.toLowerCase()) && brand.is_active
  )

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands(brands.map((brand) => (brand.id === id ? { ...brand, is_active: false } : brand)))
    }
  }

  return (
    <div className="manage-brands">
      <h2>Manage Brands</h2>

      <div className="brands-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by brand name..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="search-input"
          />
        </div>
        <Link to="/add-brand" className="btn add-btn">Add Brand</Link>
      </div>

      <div className="brands-table-container">
        <table className="brands-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand Name</th>
              <th>Chain</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.map((brand) => {
              const chain = chains.find((c) => c.id === brand.chainId)
              return (
                <tr key={brand.id}>
                  <td>{brand.id}</td>
                  <td>{brand.name}</td>
                  <td>{chain ? chain.company : "Unknown Chain"}</td>
                  <td>
                    <span className={`status ${brand.is_active ? "active" : "inactive"}`}>
                      {brand.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="actions">
                    <Link to={`/edit-brand/${brand.id}`} className="btn edit-btn">Edit</Link>
                    <button className="btn delete-btn" onClick={() => handleDelete(brand.id)}>
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

export default ManageBrand
