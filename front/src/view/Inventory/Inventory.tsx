import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "../../components/ui/input"
import { Dialog } from "@radix-ui/react-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Search, Package, AlertTriangle, TrendingUp } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { readInventary } from "../../service/inventary.services"
import type { Inventary } from "../../types/invetary.types"
import { Loader1 } from "../../components/loaders/loader1"
import { Link } from "react-router-dom"
import Fuse from "fuse.js"
import TrashIcon from "../../components/svg-icons/Trash"

function Inventory() {
    const [products, setProducts] = useState<Inventary[]>([])
    const [loading, setLoading] = useState(true)
    

    // filtros por ahora en un futuro se va a usar una libreria
    const [search, setSearch] = useState("")
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterStock, setFilterStock] = useState("all")

    const fuse = new Fuse(products, {
      keys: ["nombre", "categoria_nombre"],
      threshold: 0.3
    })

    // const filteredProductsForSearch = search ? fuse.search(search).map((result) => result.item) : products


    const getInitialData = async () => {
        try{
            const data = await readInventary()
            setProducts(data?.datos ?? [])
            setLoading(false)
        }catch(error){
            console.log('Error al obtener los datos', {error: error})
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

    // categorías automáticas desde los datos
    const categorias = [...new Set(products.map((p) => p.categoria_nombre))]

    // productos con bajo stock
    const lowStockItems = products.filter((p) => p.stock <= p.stock_minimo)

    // valor total del inventario
    const totalValue = products.reduce((sum, p) => sum + p.stock * p.precio, 0)

    // aplicar filtros
    const filteredProductsForSearch = products.filter((item) => {
      
      const fuseResults = fuse.search(search).map((r) => r.item);
      const matchesSearch = search === "" || fuseResults.includes(item);


      const matchesCategory = filterCategory === "all" || item.categoria_nombre === filterCategory
      const matchesStock =
        filterStock === "all" ||
        (filterStock === "bajo" && item.stock <= item.stock_minimo) ||
        (filterStock === "normal" && item.stock > item.stock_minimo)

      return matchesSearch && matchesCategory && matchesStock
    })



  const handleDeleteProduct = () => {
      getInitialData()
  }

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
          <p className="text-muted-foreground">Los productos del lavacar</p>
        </div>
        <Dialog>
          <Link to="/dashboard/create-product" className="cursor-pointer">
            <Button className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Venta
            </Button>
          </Link>
        </Dialog>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{lowStockItems.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₡{totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* ALERTA STOCK BAJO */}
      {lowStockItems.length > 0 && (
        <Card className="border-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-500">
              <AlertTriangle className="h-5 w-5" />
              Alerta de Stock Bajo
            </CardTitle>
            <CardDescription>Los siguientes productos necesitan reabastecimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map((item) => (
                <div key={item.producto_id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <span className="font-medium">{item.nombre}</span>
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    {item.stock} {item.stock <= 1 ? "unidad" : "unidades"} (mín: {item.stock_minimo})
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* BUSQUEDA + FILTROS */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          <CardDescription>Busca y filtra los productos del inventario</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            
            {/* BUSCADOR */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* CATEGORÍAS */}
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* STOCK */}
            <Select value={filterStock} onValueChange={setFilterStock}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="bajo">Stock Bajo</SelectItem>
                <SelectItem value="normal">Stock Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* TABLA */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Precio Unit.</TableHead>
                  <TableHead>Valor Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProductsForSearch.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No se encontraron productos
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProductsForSearch.map((item) => {
                    const stockPercentage = (item.stock / item.stock_minimo) * 100
                    const isLow = item.stock <= item.stock_minimo

                    return (
                      <TableRow key={item.producto_id}>
                        <TableCell className="font-medium">{item.nombre}</TableCell>

                        <TableCell>
                          <Badge variant="outline">{item.categoria_nombre}</Badge>
                        </TableCell>

                        <TableCell>
                          {item.stock} {item.stock <= 1 ? "unidad" : "unidades"}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={Math.min(stockPercentage, 100)} className="w-16 h-2" />
                            {isLow && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                          </div>
                        </TableCell>

                        <TableCell>₡{item.precio}</TableCell>

                        <TableCell className="font-semibold">
                          ₡{(item.stock * item.precio).toLocaleString()}
                          
                        </TableCell>

                        <TableCell>
                            <TrashIcon 
                                id={item.producto_id}
                                onDelete={handleDeleteProduct}
                                nameToDelete="product"
                            />
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>
    </div>
  )

}


export { Inventory }