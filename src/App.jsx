"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Dashboard from "./pages/DashBoard"
import ManageGroups from "./pages/ManageGroup"
import AddGroup from "./pages/AddGroup"
import EditGroup from "./pages/EditGroup"
import ManageChain from "./pages/ManageChain"
import AddChain from "./pages/AddChain"
import EditChain from "./pages/EditChain"
import ManageBrand from "./pages/ManageBrand"
import AddBrand from "./pages/AddBrand"
import "./App.css"

function App() {
 
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups")
    return savedGroups
      ? JSON.parse(savedGroups)
      : [
          { id: 1, name: "Persian Darbar", is_active: true },
          { id: 2, name: "Mumbai Darbar", is_active: true },
          { id: 3, name: "Chennai Darbar", is_active: true },
        ]
  })

  const [chains, setChains] = useState(() => {
    const savedChains = localStorage.getItem("chains")
    return savedChains
      ? JSON.parse(savedChains)
      : [
          { id: 1, company: "Delta Tech pvt ltd", gstn: "22AAAAA0000A1Z5", groupId: 1, is_active: true },
          { id: 2, company: "NeelInfo", gstn: "23AAAAA0001A1Z5", groupId: 2, is_active: true },
          { id: 3, company: "Parekh solutions", gstn: "23AAAAB0000A1Z5", groupId: 1, is_active: true },
          { id: 4, company: "Muccian Infotech", gstn: "25AAABA0000A2Z5", groupId: 2, is_active: true },
          { id: 5, company: "Neeta Infotech Pvt", gstn: "26AAABB0000A1Z5", groupId: 2, is_active: true },
        ]
  })


  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups))
  }, [groups])

  useEffect(() => {
    localStorage.setItem("chains", JSON.stringify(chains))
  }, [chains])

 
  const isChainLinkedToBrand = (chainId) => {
  
    return [1, 3].includes(chainId)
  }

 
  const isGroupLinkedToChain = (groupId) => {
    return chains.some((chain) => chain.groupId === groupId && chain.is_active)
  }

  const [brands, setBrands] = useState(() => {
    const savedBrands = localStorage.getItem("brands")
    return savedBrands
      ? JSON.parse(savedBrands)
      : [
          { id: 1, name: "BrandX", chainId: 1, is_active: true },
          { id: 2, name: "BrandY", chainId: 3, is_active: true },
        ]
  })
  
  useEffect(() => {
    localStorage.setItem("brands", JSON.stringify(brands))
  }, [brands])
  

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="content">
          <Sidebar />
          <main className="main-content">
            <Routes>
            <Route path="/" element={<Dashboard groups={groups} chains={chains} brands={brands} />} />

              <Route
                path="/manage-groups"
                element={
                  <ManageGroups groups={groups} setGroups={setGroups} isGroupLinkedToChain={isGroupLinkedToChain} />
                }
              />
              <Route path="/add-group" element={<AddGroup groups={groups} setGroups={setGroups} />} />
              <Route path="/edit-group/:id" element={<EditGroup groups={groups} setGroups={setGroups} />} />
              <Route
                path="/manage-chain"
                element={
                  <ManageChain
                    chains={chains}
                    groups={groups}
                    setChains={setChains}
                    isChainLinkedToBrand={isChainLinkedToBrand}
                  />
                }
              />
              <Route path="/add-chain" element={<AddChain chains={chains} groups={groups} setChains={setChains} />} />
              <Route
                path="/edit-chain/:id"
                element={<EditChain chains={chains} groups={groups} setChains={setChains} />}
              />
              
              <Route path="/manage-brands" element={<ManageBrand brands={brands} chains={chains} setBrands={setBrands} />}/>


              <Route path="/add-brand" element={<AddBrand brands={brands} chains={chains} setBrands={setBrands} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

