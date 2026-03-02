import { getTotalSalesThisMonth, logUniqueClientsThisMonth } from "../../utils/sale.utils.ts/sale.utils"
// import { getTotalExpensesThisMonth } from "../../utils/expense.utils.ts/expense.utils"
import { readSales } from "../../service/sale.services"
import { useState, useEffect } from "react"
import { readExpenses } from "../../service/expense.services"
import type { Sale } from "../../types"
import type { Expense } from "../../types/expenses.types"
import { Link } from "react-router-dom"
import { readPartners } from "../../service/partners.services"
import type { Partner } from "../../types"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { DollarSign, TrendingDown, TrendingUp, Users, CalendarIcon } from "lucide-react"

// import {
//   Bar,
//   BarChart,
//   Line,
//   LineChart,
//   ResponsiveContainer, 
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   Tooltip,
// } from "recharts"


function HomeData() {
    const expensesAndSalesToday = new Date()
    const [year, setYear] = useState(expensesAndSalesToday.getFullYear())
    const [month, setMonth] = useState(expensesAndSalesToday.getMonth() + 1)

    const [sales, setSales] = useState<Sale[]>([]); 
    const [expenses, setExpenses] = useState<Expense[]>([]); 
    const [socios, setSocios ] = useState<Partner[]>([]);
    
    useEffect(() => { 
        const fetchData = async () => {
            // const today = new Date();
            // const year = today.getFullYear();
            // const month = today.getMonth() + 1; // 1‑12 para la API

            const salesData = await readSales(year, month);
            setSales(salesData?.datos ?? []); 

            const expensesData = await readExpenses(year, month);
            setExpenses(expensesData?.datos ?? []); 

            const partnersData = await readPartners();
            setSocios(partnersData?.datos ?? []);
        }; 
        fetchData(); 
    }, [year, month]);

    const totalExpenses = expenses.reduce((acc, expense) => {
      return acc + expense.monto
    }, 0)
    const totalSales  = sales.reduce((acc, sales) => {
      return acc + sales.monto
    }, 0)
    const utility = totalSales - totalExpenses
    const totalClients = logUniqueClientsThisMonth(sales)

    // estados y cálculos para depuración
    console.log('sales state', sales)
    // console.log('expenses state', expenses)
    // console.log('socios state', socios)
    // console.log('ventas este mes', totalSales, 'gastos este mes', totalExpenses, 'clientes únicos', totalClients)

    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Resumen general del negocio</p>
            </div>
            <Link to="/dashboard/partners">
                <button className="bg-blue-400 hover:bg-blue-600 hover:scale-110 transition-transform duration-100 text-white px-4 py-2 rounded cursor-pointer">
                    Explorar
                </button>
            </Link>
            <div className="flex items-center justify-start">
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="month"
                  onChange={(e) => {
                    const [y, m] = e.target.value.split("-")
                    setYear(Number(y))
                    setMonth(Number(m))
                  }}
                  value={`${year}-${month.toString().padStart(2, '0')}`}
                  className="pl-10 pr-3 py-2 h-10 border rounded-md bg-white text-sm shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₡{totalSales}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₡{totalExpenses}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilidad Neta</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₡{utility.toFixed(2)}</div>

                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Clientes Atendidos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalClients.length}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
                <CardHeader>
                  <CardTitle>Distribución de Ganancias</CardTitle>
                  <CardDescription>Ganancia de cada socio según porcentaje de participación</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {socios.map((socio) => {
                      const ganancia = (utility * socio.porcentaje_participacion) / 100
                      return (
                        <div key={socio.nombre} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">{socio.nombre}</div>
                              <div className="text-xs text-muted-foreground">{socio.rol_nombre}</div>
                            </div>
                            <div className="text-lg font-bold text-primary">{socio.porcentaje_participacion}%</div>
                          </div>
                          <div className="text-2xl font-bold">₡{ganancia.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Ganancia este mes</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
            </Card>

            {/* debug: render raw sales */}
            {sales.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Ventas (raw)</CardTitle>
                </CardHeader>
                <CardContent>
                  {sales.map(s => (
                    <div key={s.venta_id} className="py-1 border-b">
                      {s.cliente_nombre} - ₡{s.monto} - {s.fecha}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

        </div>
    )
}

export { HomeData }
