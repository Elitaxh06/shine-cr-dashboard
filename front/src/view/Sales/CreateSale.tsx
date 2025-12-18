import { useState } from "react";

import { createSale } from "../../service/sale.services";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const partnersList = [
    { id: 4, name: "Esteban"},
    { id: 5, name: "Steven"},
    { id: 6, name: "Juanjo"}
]

const methodPayList = [
    { id: 1, name: "Efectivo"},
    { id: 2, name: "Sinpe Movil"},
    { id: 3, name: "Transferencia Bancaria"},
    { id: 4, name: "Tarjeta"},
    { id: 4, name: "Puntos"},
    { id: 4, name: "Credito"},
]

const serviciosList = [
    {id:1, name: "Basico"},
    {id:2, name: "Completo"},
    {id:3, name: "Premium"},
]

const clietesList = [
    { id: 1, name: "Grettel"},
]

const priceSaleList = [
    { id: 1, name: "Básico", price: 7000},
    { id: 2, name: "Completo", price: 10000},
    { id: 3, name: "Premium", price: 15000},
]


function CreateSale(){
    const navigate = useNavigate()
    const [fecha, setFecha] = useState<string>("")
    const [cliente_id, setCliente_id] = useState<number>(0)
    const [servicio_id, setServicio_id] = useState<number>(0)
    const [monto, setMonto] = useState<number>(0)
    const [metodo_pago_id, setMetodo_pago_id] = useState<number>(0)
    const [socios, setSocios] = useState<number[]>([])


    const insertSaleHandler = async (e: React.FormEvent) => {
        e.preventDefault()

        if(fecha === "" || cliente_id === 0 || servicio_id === 0 || monto === 0 || metodo_pago_id === 0){
            Swal.fire({
                icon: "warning",
                title: "Para su informacion",
                text: "Debe completar todos los campos"
            })
            return
        }

        try{
            const result = await createSale({
                p_fecha: fecha,
                p_cliente_id: cliente_id,
                p_servicio_id: servicio_id,
                p_monto: monto,
                p_metodo_pago_id: metodo_pago_id,
                p_socios: socios
            })

            

            if(result){
                Swal.fire({
                    icon: "success",
                    title: "Operacion Exitosa",
                    text: result.resultadoTexto
                })
                setFecha("")
                setCliente_id(0)
                setServicio_id(0)
                setMonto(0)
                setMetodo_pago_id(0)
                setSocios([])
                navigate("/sales")
            }
        }catch(error){
            if (error instanceof Error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error inesperado"
                });
                console.error("Error al insertar el negocio:", error);
            }
        }
    }


    return (
<section> 
    {/* // <!-- From Uiverse.io by themrsami -->  */}
<div className="flex flex-col items-center justify-center dark">
  <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
    <form className="flex flex-col" onSubmit={insertSaleHandler}>
        <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="fecha">
            Fecha      
        </label>
        <input
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
          id="fecha"
          type="date"
        />


        {/* VENTAS */}
        <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="venta">
            Ventas
        </label>
        <select
            value={monto}
            onChange={e => setMonto(Number(e.target.value))}
            
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out duration-150"
            id="venta"
        >
        <option value={0}>Escoja una venta</option>
        {priceSaleList.map((priceSale) => (
            <option value={priceSale.price} key={priceSale.id}>{priceSale.name} - ₡{priceSale.price}</option>
        ))}
        </select>

        {/* SERVICIOS */}
        <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="venta">
            Servicio
        </label>
        <select
            value={servicio_id}
            onChange={e => setServicio_id(Number(e.target.value))}
            
            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring0     focus:ring-blue-500 transition ease-in-out duration-150"
            id="venta"
        >
        <option value={0}>Escoja un servicio</option>
        {serviciosList.map((services) => (
            <option value={services.id} key={services.id}>{services.name}</option>
        ))}
        </select>

        {/* METODOS DE PAGO */}
        <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="pago">
            Metodo de Pago
        </label>
        <select
            value={metodo_pago_id}
            onChange={(e) => setMetodo_pago_id(Number(e.target.value))}
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1focus:ring-blue-500    transition ease-in-out duration-150"
          id="pago"
        >
          <option value={0}>Escoja un metodo de pago</option>
          {methodPayList.map((method) => (
              <option value={method.id} key={method.id}>{method.name}</option>
          ))}
        </select>

          {/* SOCIOS */}
        <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="socios">
            Socios
        </label>
        <p className="text-sm mb-2 text-gray-200 cursor-pointer">
          Mantén presionado Ctrl (Cmd en Mac) para seleccionar varios socios
        </p>
        <select
            multiple
          value={socios.map(String)}
          onChange={(e)=>{
            const selected = Array.from(e.target.selectedOptions).map(
                option => Number(option.value)
            )
            setSocios(selected)
          }}
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1focus:ring-blue-500  transition ease-in-out duration-150"
          id="socios"
        >
          <option value={0}>Escoja uno o varios socios</option>
          {partnersList.map((part) => (
              <option value={part.id.toString()} key={part.id}>{part.name}</option>
          ))} 
        </select>

          {/* CLIENTES */}
        <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="cliente">
            Clientes
        </label>
        <select
            value={cliente_id}
            onChange={(e) => setCliente_id(Number(e.target.value))}
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1focus:ring-blue-500    transition ease-in-out duration-150"
          id="cliente"
        >
          <option value={0}>Escoja un cliente</option>
          {clietesList.map((cli) => (
              <option value={cli.id} key={cli.id}>{cli.name}</option>
          ))}
        </select>

      <button
        className="bg-linear-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
        type="submit"
      >
        Crear Venta
      </button>
    </form>
  </div>
    </div>
</section>
)
}

export { CreateSale }