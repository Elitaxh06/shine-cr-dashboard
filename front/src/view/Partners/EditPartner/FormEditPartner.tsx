import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { updateTotalPartner } from "../../../service/partners.services"

import Swal from "sweetalert2"
import { useSelector } from "react-redux"

const RolesPartners = [
  { value: 1,
    name: "Administrador"
  },
  {
    value: 2,
    name: "Inversionista"
  },
  {
    value: 3,
    name: "Lavador"
  },
  {
    value: 4,
    name: "Marketing"
  },
  {
    value: 5,
    name: "Entidad Empresarial"
  }
]

function FormEditPartner(){
    const navigate = useNavigate()
    const [nombre, setNombre ] = useState("")
    const [porcentaje_participacion, setPorcentajeParticipacion ] = useState(1)
    const [email, setEmail ] = useState("")
    const [telefono, setTelefono ] = useState("")
    const [inversion_inicial, setInversionInicial ] = useState(1)
    const [ganancia_neta, setGananciaNeta ] = useState(1)
    const [rol_id, setRolId ] = useState(1)
    const [ventas_generadas, setVentasGeneradas ] = useState(1)
    const [gastos_generados, setGastosGenerados ] = useState(1)

                                                                  // este socios viene del partnerSlice en el initialState ahi lo nombramos asi
    const partnerForEdit = useSelector((state: any) => state.datosPartnerRedux?.socios?.[0])

    const onchangeNombre = (e: any) => setNombre(e.target.value)
    const onchangePorcentajeParticipacion = (e: any) => setPorcentajeParticipacion(Number(e.target.value.trim()))
    const onchangeEmail = (e: any) => setEmail(e.target.value)
    const onchangeTelefono = (e: any) => setTelefono(e.target.value)
    const onchangeInversionInicial = (e: any) => setInversionInicial(Number(e.target.value.trim()))
    const onchangeGananciaNeta = (e: any) => setGananciaNeta(Number(e.target.value.trim()))
    const onchangeRolId = (e: any) => setRolId(Number(e.target.value.trim()))
    const onchangeVentasGeneradas = (e: any) => setVentasGeneradas(Number(e.target.value.trim()))
    const onchangeGastosGenerados = (e: any) => setGastosGenerados(Number(e.target.value.trim()))


    const savePartner = async (e: any) => {
        e.preventDefault()
        try{
          // robust validation: allow numeric fields to be 0 but reject empty / invalid inputs
          const trimmedNombre = String(nombre ?? '').trim()
          const trimmedEmail = String(email ?? '').trim()
          const telefonoStr = String(telefono ?? '').trim()
          const isValidNumero = (val: number) => typeof val === 'number' && Number.isFinite(val) && val >= 0

          if(
            trimmedNombre.length === 0 ||
            trimmedEmail.length === 0 ||
            !/^\d{8}$/.test(telefonoStr) ||
            !isValidNumero(porcentaje_participacion) ||
            !isValidNumero(inversion_inicial) ||
            !isValidNumero(ganancia_neta) ||
            !isValidNumero(ventas_generadas) ||
            !isValidNumero(gastos_generados)
          ){
                Swal.fire({
                    icon: "warning",
                    title: "Error al guardar",
                    text: "Por favor revise los datos ingresados",
                    confirmButtonText: 'Aceptar'
                })

                return
            }else{
              const idRecibido = Number(partnerForEdit.socio_id)
              const result = await updateTotalPartner({
                p_socio_id: idRecibido,
                p_nombre: nombre,
                p_porcentaje_participacion: porcentaje_participacion,
                p_email: email,
                p_telefono: telefono,
                p_inversion_inicial: inversion_inicial,
                p_ganancia_neta: ganancia_neta,
                p_rol_id: rol_id,
                p_ventas_generadas: ventas_generadas,                
                p_gastos_generados: gastos_generados
            })  
            if(result){
                navigate('/dashboard/partners')
            }
          }            
        }catch(error){
            Swal.fire({
                icon: "error",
                title: "Para su informacion",
                text: "Error al actualizar el socio"
            })
        }
    }

    const initialData = () => {
        if(partnerForEdit){
            setNombre(partnerForEdit.nombre)
            setPorcentajeParticipacion(partnerForEdit.porcentaje_participacion)
            setEmail(partnerForEdit.email)
            setTelefono(partnerForEdit.telefono)
            setInversionInicial(partnerForEdit.inversion_inicial)
            setGananciaNeta(partnerForEdit.ganancia_neta)
            // convert to number and fallback to current state default (2) when missing
            setRolId(Number(partnerForEdit.rol_id ?? 1))
            setVentasGeneradas(partnerForEdit.ventas_generadas)
            setGastosGenerados(partnerForEdit.gastos_generados)
        }
    }

    useEffect(() => {
        initialData()
    }, [partnerForEdit])
    return (
        <>
            <form
                onSubmit={savePartner}
                className="flex flex-col gap-4 border border-slate-300 rounded-lg w-full max-w-xl p-6 shadow-md bg-white"
            >
              <h2 className="text-xl font-bold text-center text-sky-600">
                Edita tu negocio
              </h2>

              <label className="font-semibold">Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={onchangeNombre}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <label className="font-semibold">Porcentaje de participación *</label>
              <input
                type="number"
                name="porcentaje_participacion"
                value={porcentaje_participacion}
                onChange={onchangePorcentajeParticipacion}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <label className="font-semibold">Email *</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onchangeEmail}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <label className="font-semibold">Teléfono *</label>
              <input
                type="text"
                name="telefono"
                value={telefono}
                onChange={onchangeTelefono}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <label className="font-semibold">Inversión inicial *</label>
              <input
                type="number"
                name="inversion_inicial"
                value={inversion_inicial}
                onChange={onchangeInversionInicial}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <label className="font-semibold">Ganancia neta *</label>
              <input
                type="number"
                name="ganancia_neta"
                value={ganancia_neta}
                onChange={onchangeGananciaNeta}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <label className="font-semibold">Rol *</label>
              <select
                name="rol_id"
                value={rol_id}
                onChange={onchangeRolId}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                {RolesPartners.map((role) => (
                  <option key={role.value} value={role.value}>{role.name}</option>
                ))}
              </select>

              <label className="font-semibold">Ventas generadas *</label>
              <input
                type="number"
                name="ventas_generadas"
                value={ventas_generadas}
                onChange={onchangeVentasGeneradas}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <label className="font-semibold">Gastos generados *</label>
              <input
                type="number"
                name="gastos_generados"
                value={gastos_generados}
                onChange={onchangeGastosGenerados}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
      
              <button
                type="submit"
                className="bg-sky-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-400 transition cursor-pointer"
              >
                Guardar
              </button>
            </form>
        
        </>
    )
}   

export { FormEditPartner }