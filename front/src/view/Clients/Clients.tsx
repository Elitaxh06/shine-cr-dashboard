import { useEffect, useState } from "react";
import { readClients } from "../../service/clients.services";
import type { Client } from "../../types/clients.types";
import { Loader1 } from "../../components/loaders/loader1";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";

// importaciones de shadcn y lucide-react
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Plus, UserCircle, Star, Mail, Phone, Car, MessageCircle } from "lucide-react"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"



function Clients(){
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)

    const [searchTerm, setSearchTerm] = useState("")

    const getInitialData = async () => {
        try{
            const data = await readClients()
            setClients(data?.datos ?? [])
            setLoading(false)
        }catch(error){
            console.log('Error al obtener los datos', error)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }

    const getTipoBadgeVariant = (tipo: string) => {
      if (tipo === "VIP") return "default"
      return "secondary"
    }


   const fuse = new Fuse(clients ?? [], {
    keys: ["nombre", "vehiculo", "telefono", "rol_cliente_nombre"],
    threshold: 0.3,
   })

   const filteredClientsForSearch = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : clients ?? []


    // constantes para los graficos 
    const totalClients = clients.length

    const totalIngresos = clients.reduce(
      (sum, c) => sum + (c.total_gastado ?? 0),
      0
    )

    const promedioGasto =
      totalClients > 0 ? totalIngresos / totalClients : 0

    const clientesVIP = clients.filter(
      c => c.rol_cliente_nombre === "VIP"
    ).length

    const getInitials = (nombre: string) => {
        if (!nombre) return ""

        return nombre
          .trim()
          .split(" ")
          .filter(p => p.length > 0)
          .map(p => p[0])
          .join("")
          .toUpperCase()
    }


    useEffect(() => {
        getInitialData()
    }, [])

    if(loading) return <div className="pt-52"><Loader1 /></div>

    return (
  <div className="flex flex-col gap-6 p-6">

    {/* Header */}
    <div className="flex justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">
          Gestiona la base de datos de clientes
        </p>
      </div>
      <Link to="/dashboard/create-client">
        <Button className="cursor-pointer">
          <Plus  className="mr-2 h-4 w-4 " />
          Crear Cliente
        </Button>
      </Link>
    </div>

    {/* Stats Cards */}
    <div className="grid gap-4 md:grid-cols-4">

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
          <UserCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClients}</div>
          <p className="text-xs text-muted-foreground">Clientes registrados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Clientes VIP</CardTitle>
          <Star className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{clientesVIP}</div>
          <p className="text-xs text-muted-foreground">
            {totalClients > 0
              ? ((clientesVIP / totalClients) * 100).toFixed(0)
              : 0}% del total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          <Plus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₡{totalIngresos.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">De todos los clientes</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Gasto Promedio</CardTitle>
          <UserCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₡{Math.round(promedioGasto).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Por cliente</p>
        </CardContent>
      </Card>

    </div>


        <Card>
        <CardHeader>
          <CardTitle>Mejores Clientes</CardTitle>
          <CardDescription>Clientes con mayor gasto total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients
              .sort((a, b) => b.total_gastado - a.total_gastado)
              .slice(0, 5)
              .map((client, index) => (
                <div key={client.client_id} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {getInitials(client.nombre)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{client.nombre}</div>
                    <div className="text-sm text-muted-foreground">{client.total_visitas} visitas</div>
                  </div>
                  <Badge variant={getTipoBadgeVariant(client.rol_cliente_nombre)}>{client.rol_cliente_nombre}</Badge>
                  <div className="text-right">
                    <div className="font-bold">${client.total_gastado.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total gastado</div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>


    {/* Campo de búsqueda (vacío para Fuse) */}


    {/* Tabla de clientes */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Busca y filtra los clientes registrados</CardDescription>
        </CardHeader>
        <CardContent>
         
      <Card>
        <CardHeader>
        <CardTitle>Buscar clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Buscar por nombre, email o placa..."  value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
        </CardContent>
      </Card>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Visitas</TableHead>
                  <TableHead>Última Visita</TableHead>
                  <TableHead>Total Gastado</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientsForSearch.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No se encontraron clientes
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClientsForSearch.map((client) => (
                    <TableRow key={client.client_id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                              {getInitials(client.nombre)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{client.nombre}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {client.email}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {client.telefono}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Car className="h-3 w-3" />
                            {client.vehiculo}
                          </div>
                          <div className="text-xs text-muted-foreground">{client.placa}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">{client.total_visitas}</TableCell>
                      <TableCell>{client.ultima_visita}</TableCell>
                      <TableCell className="font-bold">${client.total_gastado.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getTipoBadgeVariant(client.rol_cliente_nombre)}>{client.rol_cliente_nombre}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const phoneNumber = client.telefono.replace(/[^0-9]/g, "")
                            const message = encodeURIComponent(
                              `Hola ${client.nombre}, te contactamos desde Sistema Lavacar.`,
                            )
                            window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                      </TableCell>
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


export { Clients }