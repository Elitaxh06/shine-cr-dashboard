import { getTotalSalesThisMonth, logUniqueClientsThisMonth } from "../../utils/sale.utils.ts/sale.utils"
import { getTotalExpensesThisMonth } from "../../utils/expense.utils.ts/expense.utils"
import { readSales } from "../../service/sale.services"
import { useState, useEffect } from "react"
import { readExpenses } from "../../service/expense.services"
import type { Sale } from "../../types"
import type { Expense } from "../../types/expenses.types"
import { Link } from "react-router-dom"
import { readPartners } from "../../service/partners.services"
import type { Partner } from "../../types"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { DollarSign, TrendingDown, TrendingUp, Users } from "lucide-react"
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
    const [sales, setSales] = useState<Sale[]>([]); 
    const [expenses, setExpenses] = useState<Expense[]>([]); 
    const [socios, setSocios ] = useState<Partner[]>([]);
    useEffect(() => { 
        const fetchData = async () => 
            { const salesData = await readSales(); 
                setSales(salesData?.datos ?? []); 
                const expensesData = await readExpenses(); 
                setExpenses(expensesData?.datos ?? []); 
                const partnersData = await readPartners();
                setSocios(partnersData?.datos ?? []);
            }; 
            fetchData(); 
    }, []);


    const totalExpenses = getTotalExpensesThisMonth(expenses)
    const totalSales  = getTotalSalesThisMonth(sales)
    const utility = totalSales - totalExpenses
    const totalClients = logUniqueClientsThisMonth(sales)
    console.log(totalClients)


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

        </div>
    )

}


export { HomeData }