import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MovementsPage() {
    const api = useApi()
    const [movements, setMovements] = useState([])
    const [products, setProducts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ type: 'in', quantity: '', productId: '', notes: '' })

    const load = async () => {
        const [m, p] = await Promise.all([
        api.get('/movements'),
        api.get('/products'),
        ])
        setMovements(m)
        setProducts(p)
    }

    useEffect(() => { load() }, [])

    const handleCreate = async () => {
        await api.post('/movements', {
        type: form.type,
        quantity: parseInt(form.quantity),
        productId: parseInt(form.productId),
        notes: form.notes,
        })
        setForm({ type: 'in', quantity: '', productId: '', notes: '' })
        setShowForm(false)
        load()
    }

    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Movimientos</h2>
            <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nuevo movimiento'}
            </Button>
        </div>

        {showForm && (
            <Card>
            <CardHeader><CardTitle>Registrar movimiento</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <select
                className="border rounded px-3 py-2 bg-background text-foreground"
                value={form.type}
                onChange={e => setForm({...form, type: e.target.value})}
                >
                <option value="in">Entrada</option>
                <option value="out">Salida</option>
                </select>
                <select
                className="border rounded px-3 py-2 bg-background text-foreground"
                value={form.productId}
                onChange={e => setForm({...form, productId: e.target.value})}
                >
                <option value="">Selecciona producto</option>
                {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (stock: {p.stock})</option>
                ))}
                </select>
                <Input placeholder="Cantidad" type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
                <Input placeholder="Notas (opcional)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
                <Button onClick={handleCreate} className="col-span-2">Registrar</Button>
            </CardContent>
            </Card>
        )}

        <div className="space-y-2">
            {movements.map(m => (
            <Card key={m.id}>
                <CardContent className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                    <Badge variant={m.type === 'in' ? 'default' : 'destructive'}>
                    {m.type === 'in' ? '↑ Entrada' : '↓ Salida'}
                    </Badge>
                    <div>
                    <p className="font-medium">{m.product?.name}</p>
                    {m.notes && <p className="text-xs text-muted-foreground">{m.notes}</p>}
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-lg">{m.quantity} uds</p>
                    <p className="text-xs text-muted-foreground">
                    {new Date(m.createdAt).toLocaleDateString('es-MX', {
                        day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                    </p>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    )
}