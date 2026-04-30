import { useState, useEffect } from "react";
import LoginCard from "./components/auth/LogInCard";
import Layout from "@/components/dashboard/layout";
import PipelinesCard from "./components/dashboard/PipelinesCard";
import ServerHealthCard from "./components/dashboard/ServerHealthCard";
import ContainersCard from "./components/dashboard/ContainersCard";
import AlertsCard from "./components/dashboard/AlertsCard";
import ProductsPage from "./components/inventory/ProductsPage";
import CategoriesPage from "./components/inventory/CategoriesPage";
import SuppliersPage from "./components/inventory/SuppliersPage";
import MovementsPage from "./components/inventory/MovementsPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    setUser(null)
  }

  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
        credentials: 'include'
      })
      if (!res.ok) { setUser(null); return }
      const data = await res.json()
      setUser(data)
    } catch(error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { checkAuth() }, [])
  if (loading) return <div>Loading...</div>
  if (!user) return <LoginCard onLogin={checkAuth} />

  const renderPage = () => {
    switch(activePage) {
      case 'dashboard':
        return (
          <div className="flex flex-wrap justify-center gap-5 w-full">
            <PipelinesCard />
            <ServerHealthCard />
            <ContainersCard />
            <AlertsCard />
          </div>
        )
      case 'products':    return <ProductsPage />
      case 'categories':  return <CategoriesPage />
      case 'suppliers':   return <SuppliersPage />
      case 'movements':   return <MovementsPage />
      default:            return null
    }
  }

  return (
    <Layout user={user} handleLogout={handleLogout} onNavigate={setActivePage} activePage={activePage}>
      {renderPage()}
    </Layout>
  )
}