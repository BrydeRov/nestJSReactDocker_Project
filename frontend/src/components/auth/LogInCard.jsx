import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FaGoogle, FaApple } from 'react-icons/fa'

export default function LoginCard({ onLogin }) {
  const [view, setView] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  
  const handleSubmit = async () => {
    const url =
      view === 'login'
        ? `${API_URL}/auth/login`
        : `${API_URL}/auth/register`

    const body =
      view === 'login'
        ? { email, password }
        : { name, email, password }

    if (!email || !password) {
      setMessage('Por favor completa todos los campos')
      return
    }
    if (view === 'register' && !name) {
      setMessage('Por favor ingresa tu nombre')
      return
    }

    console.log('Enviando datos:', body)
    try{
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'   // ← close here, no .then()
      }).then(async response => {
        const data = await response.json()
        console.log('Respuesta del servidor:', response)
        if (!response.ok) {
          setMessage(data.message || 'Error')
          return
        }
        if (view === 'login') {
          setToken(data.access_token)
          setMessage('Login exitoso ✅')
          onLogin()
        } else {
          setMessage('Registro exitoso ✅ Ahora inicia sesión')
          setView('login')
        }
      })
    }catch (error) {
      console.log(error)
      setMessage('Error de red o servidor')
    }
  }

  if (token) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Bienvenido 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Tu token JWT:</p>
            <textarea
              readOnly
              value={token}
              className="w-full h-24 p-2 text-xs rounded-md border bg-muted"
            />
            <Button onClick={() => { setToken(''); setMessage('') }}>
              Cerrar sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl mb-5">
            {view === 'login' ? 'Log In' : 'Register'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Social Buttons */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="flex gap-2 items-center justify-center">
              <FaGoogle /> Continuar con Google
            </Button>
            <Button variant="outline" className="flex gap-2 items-center justify-center">
              <FaApple /> Continuar con Apple
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">o</span>
            <Separator className="flex-1" />
          </div>

          {view === 'register' && (
            <Input
              placeholder="Nombre"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}

          <Input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {message && (
            <p className={`text-sm ${message.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <Button onClick={handleSubmit} className="w-full">
            {view === 'login' ? 'Entrar' : 'Registrarse'}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            {view === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <span
              className="text-primary cursor-pointer ml-1"
              onClick={() => {
                setView(view === 'login' ? 'register' : 'login')
                setMessage('')
              }}
            >
              {view === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
