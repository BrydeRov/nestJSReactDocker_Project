import Page from "@/components/dashboard/layout";
import { useState, createContext, useEffect } from "react";
import LoginCard from "./components/auth/LogInCard";

const AuthContext = createContext()

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch user data from the backend    
    const res = fetch(`${import.meta.env.BACKEND_URL}/users/profile`, {
      credentials: 'include' // Include cookies for authentication
    })
    if(!res.ok){
      setUser(null);
      setLoading(false);
      return;
    }
    
    const data = res.json();
    setUser(data);
    setLoading(false);
  },[])

  if(loading) return <div>Loading...</div>

  if(!user) return <LoginCard/>

  return(
    <div>
      You are logged in!
    </div>
  )
}
