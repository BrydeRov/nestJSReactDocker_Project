// hooks/usePolling.js
import { useState, useEffect } from 'react'

export function usePolling(url, interval = 5000) {
  const [data, setData]   = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, { credentials: 'include' })
        setData(await res.json())
      } catch (e) {
        setError(e)
      }
    }

    fetchData()
    const id = setInterval(fetchData, interval)
    return () => clearInterval(id)
  }, [url, interval])

  return { data, error }
}