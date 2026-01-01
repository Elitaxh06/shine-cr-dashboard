import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Users, DollarSign, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Progress } from "../../components/ui/progress"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import { useNavigate } from "react-router-dom"
import { readPartners, readWithIdPartner } from "../../service/partners.services"  
import type { Partner } from "../../types"
import { Loader1 } from "../../components/loaders/loader1"
import { useDispatch } from "react-redux"
import { setPartner } from "../../store"

function Part() {

  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getInitialData = async () => {
    try {
      const data = await readPartners()
    
      setPartners(data?.datos ?? [])
      setLoading(false)
      // const partnerId = data?.datos?.[0]?.socio_id
      
    } catch (error) {
      console.log("Error al obtener los datos", error)
    } finally {
      setLoading(false)
    }
  }
  const editPartner = async(id: number) =>{
    const result = await readWithIdPartner(id)

    if(result){
      dispatch(setPartner(result?.datos))
      navigate('/dashboard/edit-partner')
    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      getInitialData()

    }, 0)
  }, [])



  if (loading) {
    return (
      <div className="pt-52">
        <Loader1 />
      </div>
    )
  }

  // =============================
  //  CÁLCULOS DE NEGOCIO
  // =============================

  const totalVentas = partners.reduce((sum, s) => sum + (s.ventas_generadas ?? 0), 0)
  const totalGastos = partners.reduce((sum, s) => sum + (s.gastos_generados ?? 0), 0)
  const utilidadNeta = totalVentas - totalGastos
  const totalInversion = partners.reduce((sum, s) => sum + (s.inversion_inicial ?? 0), 0)

  const sociosConGanancias = partners.map((s) => ({
    ...s,
    ganancia: (utilidadNeta * Number(s.porcentaje_participacion)) / 100,
  }))

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  const chartData = sociosConGanancias.map((s) => ({
    nombre: s.nombre,
    ganancia: s.ganancia,
    porcentaje: Number(s.porcentaje_participacion),
  }))

  return (
    <>
    {partners.length === 0 ? (
        <h1 className="font-bold text-center text-5xl">No se pudieron cargar los socios</h1>
      ) : (
    <div className="flex flex-col gap-6 p-6">
      
     
      {/* =============================
          HEADER
      ============================== */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Socios</h1>
        <p className="text-muted-foreground">
          Distribución de ganancias y participación de socios
        </p>
      </div>

      {/* =============================
          STATS
      ============================== */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Socios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inversión Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₡{totalInversion.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Capital invertido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilidad Neta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₡{utilidadNeta.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Ganancias a distribuir</p>
          </CardContent>
        </Card>
      </div>

      {/* =============================
          GRÁFICO
      ============================== */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfica Comparativa de Ganancias</CardTitle>
          <CardDescription>
            Distribución de utilidades según porcentaje de participación
          </CardDescription>
        </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            ganancia: { label: "Ganancia", color: "hsl(var(--chart-2))" },
          }}
          className="w-full h-[300px] md:h-[350px]"
        >
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="nombre"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={0}
            textAnchor="end"
          />

          <YAxis tick={{ fontSize: 12 }} />

          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />

          <Bar
            dataKey="ganancia"
            name="Ganancia (%)"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
        </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>


      {/* =============================
          TARJETAS DE SOCIOS
      ============================== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sociosConGanancias.map((s) => (
          <Card key={s.socio_id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {getInitials(s.nombre)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{s.nombre}</CardTitle>
                  <CardDescription className="text-xs">{s.rol_nombre}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Participación</span>
                  <span className="text-2xl font-bold text-primary">
                    {s.porcentaje_participacion}%
                  </span>
                </div>

                {s.inversion_inicial > 0 && (
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">Inversión</span>
                    <span className="font-semibold">
                      ₡{s.inversion_inicial.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm pt-2 border-t">
                  <span className="font-medium">Ganancia Neta</span>
                  <span className="font-bold text-green-600">
                    ₡{s.ganancia.toLocaleString()}
                  </span>
                </div>
              </div>

              {s.inversion_inicial > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>ROI</span>
                    <span>
                      {((s.ganancia / s.inversion_inicial) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min((s.ganancia / s.inversion_inicial) * 100, 100)}
                    className="h-2"
                  />
                </div>
              )}
              <button
                onClick={() => editPartner(s.socio_id)}
                className="cursor-pointer font-semibold p-2 rounded-lg bg-black text-white hover:scale-105 transition-transform duration-100"
               >
              Editar Socio
              </button>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* =============================
          RESUMEN DETALLADO
      ============================== */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Detallado</CardTitle>
          <CardDescription>
            Cálculo automático de ganancias según utilidad neta del negocio
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 ">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">Total Ventas</div>
                <div className="text-xl font-bold text-green-600">
                  ₡{totalVentas.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Total Gastos</div>
                <div className="text-xl font-bold text-red-600">
                  ₡{totalGastos.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground">Utilidad Neta</div>
                <div className="text-xl font-bold text-primary">
                  ₡{utilidadNeta.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {sociosConGanancias.map((s) => (
                <div key={s.socio_id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(s.nombre)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{s.nombre}</div>
                      <div className="text-xs text-muted-foreground">{s.rol_nombre}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {s.porcentaje_participacion}% de ₡{utilidadNeta.toLocaleString()}
                    </div>
                    <div className="text-xl font-bold text-primary">
                      ₡{s.ganancia.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
      )}
    </>
  )
}

export { Part }
