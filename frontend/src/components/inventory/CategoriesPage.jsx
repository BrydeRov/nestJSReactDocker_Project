import { useEffect, useState } from 'react'
import { useApi } from '@/hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CategoriesPage() {
    const api = useApi()
    const [categories, setCategories] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState({ name: '', description: '' })

    const load = async () => {
        const data = await api.get('/categories')
        setCategories(data)
    }

    useEffect(() => { load() }, [])

    const handleCreate = async () => {
        await api.post('/categories', form)
        setForm({ name: '', description: '' })
        setShowForm(false)
        load()
    }

    const handleDelete = async (id) => {
        await api.delete(`/categories/${id}`)
        load()
    }

    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Categorías</h2>
            <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nueva categoría'}
            </Button>
        </div>

        {showForm && (
            <Card>
            <CardHeader><CardTitle>Nueva categoría</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                <Input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <Input placeholder="Descripción" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <Button onClick={handleCreate} className="w-full">Guardar</Button>
            </CardContent>
            </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(c => (
            <Card key={c.id}>
                <CardHeader>
                <CardTitle className="text-base">{c.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{c.description || 'Sin descripción'}</p>
                <p className="text-xs text-muted-foreground">{c.products?.length || 0} productos</p>
                <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDelete(c.id)}>
                    Eliminar
                </Button>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    )
}