import { useState, createContext, useEffect } from "react";
import LoginCard from "./components/auth/LogInCard";
import Layout from "@/components/dashboard/layout";
import PipelinesCard from "./components/dashboard/PipelinesCard";
import ServerHealthCard from "./components/dashboard/ServerHealthCard";
import ContainersCard from "./components/dashboard/ContainersCard";
import AlertsPanel from "./components/dashboard/AlertsCard";
import AlertsCard from "./components/dashboard/AlertsCard";

const AuthContext = createContext()

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    setUser(null)
  }

   const checkAuth = async () => {  // ← must be async
    // console.log('checkAuth')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/profile`, {
        credentials: 'include'
      })

      if (!res.ok) {
        console.log('not ok')
        setUser(null)
        return
      }

      const data = await res.json()
      setUser(data)
      // console.log('Data CHeckAUth: ',data)
    } catch(error) {
      console.log(error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { checkAuth() }, [])
  if(loading) return <div>Loading...</div>

  if (!user) return <LoginCard onLogin={checkAuth} />

  return(
    <Layout user={user} handleLogout={handleLogout}>
      
      <div className="flex flex-wrap justify-center gap-5">
        <PipelinesCard/>
        <ServerHealthCard/>
        <ContainersCard/>
        <AlertsCard/>
      </div>
    </Layout>
  )
}
