const BASE_URL = import.meta.env.VITE_BACKEND_URL

export function useApi() {
  const request = async (method, path, body = null) => {
    const options = {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }
    if (body) options.body = JSON.stringify(body)
    const res = await fetch(`${BASE_URL}${path}`, options)
    if (!res.ok) throw new Error(`Error ${res.status}`)
    return res.json()
  }

  return {
    get:    (path)        => request('GET', path),
    post:   (path, body)  => request('POST', path, body),
    put:    (path, body)  => request('PUT', path, body),
    delete: (path)        => request('DELETE', path),
  }
}