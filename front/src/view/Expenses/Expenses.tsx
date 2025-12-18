import { useEffect, useState } from "react";
import type { Expense } from "../../types/expenses.types";
import { readExpenses } from "../../service/expense.services";
import { Loader1 } from "../../components/loaders/loader1";
import Fuse from "fuse.js"

// importaciones de shadcn
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Label } from "../../components/ui/label"
// import { Textarea } from "../../components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../components/ui/dialog"
import {TrendingDown, Calendar, AlertCircle } from "lucide-react"
import { Badge } from "../../components/ui/badge"



function Expenses() {
    const [expenses, setExpenses ] = useState<Expense[]>([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState('')

    const fuse = new Fuse(expenses, {
      keys: ["categoria_nombre", "descripcion"],
      threshold: 0.3,
    })

    const filteredExpenses = search ? fuse.search(search).map((result) => result.item) : expenses
    

    const getInitialData = async () => {
        try{
            const data = await readExpenses()
            setExpenses(data?.datos ?? [])
            setLoading(false)
        }catch(error){
            console.log('Error al obtener los datos', {error: error})
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getInitialData()
    }, [])

    if(loading){
        return <div className="pt-52"><Loader1 /></div>
    }

    // operaciones prar ver los datos
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.monto, 0)
    const averageExpenses = totalExpenses / expenses.length

    // operacion para ver los gastos del dia
    const today = new Date().toISOString().split('T')[0]
    const expenseToday = expenses.filter(expense => expense.fecha === today)

    const expensesByCategory = expenses.reduce((acc, expense) => {
        const category = expense.categoria_nombre
        if(category in acc){
            acc[category].push(expense)
        }else{
            acc[category] = [expense]
        }
        return acc
      }, {} as Record<string, Expense[]>)


    return (
<section className="flex flex-col gap-6 p-6">

  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Gastos</h1>
      <p className="text-muted-foreground">Resumen de gastos registrados</p>
    </div>
  </div>

  {/* Stats Cards */}
  <div className="grid gap-4 md:grid-cols-3">
    {/* Total Gastos */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Gastos</CardTitle>
        <TrendingDown className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ₡{totalExpenses.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">{expenses.length} gastos registrados</p>
      </CardContent>
    </Card>

    {/* Promedio por gasto */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Promedio por Gasto</CardTitle>
        <TrendingDown className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          ₡{expenses.length > 0 ? Math.round(averageExpenses) : 0}
        </div>
        <p className="text-xs text-muted-foreground">Basado en todos los gastos</p>
      </CardContent>
    </Card>

    {/* Gastos hoy */}
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Gastos Hoy</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{expenseToday.length}</div>
        <p className="text-xs text-muted-foreground">Realizados el día de hoy</p>
      </CardContent>
    </Card>
  </div>

  {/* Gastos por categoría */}
  <Card>
    <CardHeader>
      <CardTitle>Gastos por Categoría</CardTitle>
      <CardDescription>Distribución de gastos por tipo</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {Object.entries(expensesByCategory).map(([cat, items]) => (
          <div key={cat} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{cat}</span>
            </div>
            <span className="font-bold">
              ₡{items.reduce((sum, e) => sum + e.monto, 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>

  {/* Historial de gastos (solo lista) */}
  <Card>
    <CardHeader>
      <CardTitle>Historial de Gastos</CardTitle>
      <CardDescription>Listado de todos los gastos registrados</CardDescription>
    </CardHeader>
    <div className="px-4 pb-4">
      <input
        type="text"
        placeholder="Buscar gasto..."
        className="border p-2 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>


    <CardContent>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Método Pago</TableHead>
              <TableHead>Socio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No hay gastos registrados
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((expense) => (
                <TableRow key={expense.gastos_id}>
                  <TableCell>{expense.fecha}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{expense.categoria_nombre}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{expense.descripcion}</TableCell>
                  <TableCell className="font-semibold text-red-600">
                    ₡{expense.monto.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{expense.metodo_pago}</Badge>
                  </TableCell>
                  <TableCell>{expense.socio_nombre}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>

</section>
    )

}

export { Expenses }