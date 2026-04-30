import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SuppliersPage() {
    const api = useApi()
    const [suppliers, setSuppliers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })

    const load = async () => {
        const data = await api.get('/suppliers')
        setSuppliers(data)
    }

    useEffect(() => { load() }, [])

    const handleCreate = async () => {
        await api.post('/suppliers', form)
        setForm({ name: '', email: '', phone: '', company: '' })
        setShowForm(false)
        load()
    }

    const handleDelete = async (id) => {
        await api.delete(`/suppliers/${id}`)
        load()
    }

    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Proveedores</h2>
            <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nuevo proveedor'}
            </Button>
        </div>

        {showForm && (
            <Card>
            <CardHeader><CardTitle>Nuevo proveedor</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <Input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <Input placeholder="Teléfono" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <Input placeholder="Empresa" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                <Button onClick={handleCreate} className="col-span-2">Guardar</Button>
            </CardContent>
            </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map(s => (
            <Card key={s.id}>
                <CardHeader>
                <CardTitle className="text-base">{s.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                <p className="text-sm text-muted-foreground">{s.company}</p>
                <p className="text-sm">{s.email}</p>
                <p className="text-sm text-muted-foreground">{s.phone}</p>
                <p className="text-xs text-muted-foreground">{s.products?.length || 0} productos</p>
                <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => handleDelete(s.id)}>
                    Eliminar
                </Button>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    )
}