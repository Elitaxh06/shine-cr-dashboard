import { readSales } from "../../service/sale.services"
import { useEffect, useState } from "react"
import type { Sale, ApiResponseSales } from "../../types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"


import { Plus, Search, DollarSign, Calendar } from "lucide-react"


function Sales(){
    const [sales, setSales] = useState<Sale[] | null>([])
    // const [salesResponse, setSalesResponse] = useState<ApiResponseSales | null>(null)
    const [loading, setLoading] = useState(true)
     const [filterService, setFilterService] = useState("all")
     const [searchTerm, setSearchTerm] = useState("")

    const getInitialData = async () => {
        try{
            const data = await readSales()
            // setSalesResponse(data)
            setSales(data?.datos ?? [])
            setLoading(false)
        }catch(error){
            console.log('Error al obtener los datos', error)
        }finally{
            setLoading(false)
        }
    }
    

    const filteredSales = (sales ?? []).filter((sale) => {
    const matchesSearch =
    sale.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.servicio_nombre.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesService =
    filterService === "all" || sale.servicio_nombre === filterService;

  return matchesSearch && matchesService;
});


    const totalSales = (sales ?? []).reduce((sum, sale) => sum + sale.monto, 0);


    useEffect(() => {
        getInitialData()
    }, [])
    
    if(loading){
        return <div>Cargando...</div>
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Ventas</h1>
                <p className="text-muted-foreground">Gestiona y registra las ventas del negocio</p>
              </div>
                <Dialog >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Venta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Venta</DialogTitle>
              <DialogDescription>Completa los datos del servicio realizado</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Input
                  id="cliente"
                  placeholder="Nombre del cliente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servicio">Servicio</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monto">Monto</Label>
                <Input
                  id="monto"
                  type="number"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metodoPago">Método de Pago</Label>
                
                  
              </div>
              <div className="space-y-2">
                <Label htmlFor="socio">Socio Encargado</Label>
                
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">
                Cancelar
              </Button>
              <Button >Registrar Venta</Button>
            </div>
          </DialogContent>
        </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₡{totalSales?.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">{filteredSales?.length} ventas registradas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Promedio por Venta</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                        ₡{filteredSales.length > 0 ? Math.round(totalSales / filteredSales.length) : 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Basado en ventas filtradas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₡{filteredSales.filter((s) => s.fecha === new Date().toISOString().split("T")[0]).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Servicios realizados hoy</p>
                  </CardContent>
                </Card>
            </div>

            <Card>
        <CardHeader>
          <CardTitle>Historial de Ventas</CardTitle>
          <CardDescription>Busca y filtra las ventas registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente o servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            
            </div>
          </div>

          <div className="rounded-md border ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Método Pago</TableHead>
                  <TableHead>Socio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-black">
                      No se encontraron ventas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.venta_id} className="">
                      <TableCell className="w-20">{new Date(sale.fecha).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium w-20">{sale.cliente_nombre}</TableCell>
                      <TableCell className="w-20">{sale.servicio_nombre}</TableCell>
                      <TableCell className="font-semibold w-20">₡{sale.monto}</TableCell>
                      <TableCell className="w-20">
                        <button className="p-2 border-2 rounded-md w-16 h-8 flex items-center justify-center text-black cursor-sw-resize">
                            {sale.metodo_pago}
                        </button>
                        
                      </TableCell>
                      <TableCell className="flex items-center w-20">{sale.socios_participantes}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


        </div>
    )
}

export { Sales }