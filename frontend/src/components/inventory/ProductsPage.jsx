import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductsPage() {
    const api = useApi()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ name: '', price: '', stock: '', minStock: '10' })

    const load = async () => {
        try {
        const data = await api.get('/products')
        setProducts(data)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => { load() }, [])

    const handleCreate = async () => {
        await api.post('/products', {
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        minStock: parseInt(form.minStock),
        })
        setForm({ name: '', price: '', stock: '', minStock: '10' })
        setShowForm(false)
        load()
    }

    const handleDelete = async (id) => {
        await api.delete(`/products/${id}`)
        load()
    }

    if (loading) return <div className="p-4">Cargando productos...</div>

    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Productos</h2>
            <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nuevo producto'}
            </Button>
        </div>

        {showForm && (
            <Card>
            <CardHeader><CardTitle>Nuevo producto</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <Input placeholder="Precio" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                <Input placeholder="Stock inicial" type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
                <Input placeholder="Stock mínimo" type="number" value={form.minStock} onChange={e => setForm({...form, minStock: e.target.value})} />
                <Button onClick={handleCreate} className="col-span-2">Guardar</Button>
            </CardContent>
            </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => (
            <Card key={p.id} className={p.stock <= p.minStock ? 'border-destructive' : ''}>
                <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    {p.stock <= p.minStock && (
                    <Badge variant="destructive">Stock bajo</Badge>
                    )}
                </div>
                </CardHeader>
                <CardContent className="space-y-1">
                <p className="text-2xl font-bold">${p.price}</p>
                <p className="text-sm text-muted-foreground">
                    Stock: <span className={p.stock <= p.minStock ? 'text-destructive font-bold' : 'font-bold'}>{p.stock}</span> / min: {p.minStock}
                </p>
                {p.category && <p className="text-xs text-muted-foreground">Categoría: {p.category.name}</p>}
                {p.supplier && <p className="text-xs text-muted-foreground">Proveedor: {p.supplier.name}</p>}
                <Button variant="destructive" size="sm" className="w-full mt-2" onClick={() => handleDelete(p.id)}>
                    Eliminar
                </Button>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    )
}