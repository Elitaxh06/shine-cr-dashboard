import { useState } from "react";
import { createExpenses } from "../../service/expense.services";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const categoriaList = [
    { id: 1, name: "Sueldos"},
    { id: 2, name: "Servicios"},
    { id: 3, name: "Mantenimiento"},
    { id: 4, name: "Marketing"},
    { id: 5, name: "Transporte"},  
    { id: 6, name: "Administracion"},
    { id: 7, name: "Alquiler"},
    { id: 8, name: "Repraciones"},
    { id: 9, name: "Insumos"},
]

const metodoList = [
    { id: 1, name: "Efectivo"},
    { id: 2, name: "Sinpe Movil"},
    { id: 3, name: "Transferencia Bancaria"},
    { id: 4, name: "Tarjeta"},
    { id: 5, name: "Puntos"},
    { id: 6, name: "Credito"},
]

const sociosList = [
    {id:4, name: "Esteban"},
    {id:5, name: "Steven"},
    {id:6, name: "Entidad Empresarial"},
    {id:7, name: "Juanjo"}
]


function CreateExpense() {
    const navigate = useNavigate()
    const [ fecha, setFecha ] = useState<string>("")
    const [ descripcion, setDescripcion ] = useState<string>("")
    const [ monto, setMonto ] = useState<number>(0)
    const [ categoria_id, setCategoria_id ] = useState<number>(0)
    const [ metodo_pago_id, setMetodo_pago_id ] = useState<number>(0)
    const [ socio_id, setSocio_id ] = useState<number>(0)

    const insertHandlerExpense = async (e: React.FormEvent) => {
        e.preventDefault()
        if(fecha == "" || monto === 0 || categoria_id === 0 || metodo_pago_id === 0 || socio_id === 0){
            Swal.fire({
                icon: "warning",
                title: "Para su información",
                text: "Debe completar todos los campos"
            })
            return
        }
        try{
            const result = await createExpenses({
                p_fecha: fecha,
                p_descripcion: descripcion,
                p_monto: monto,
                p_categoria_id: categoria_id,
                p_metodo_pago_id: metodo_pago_id,
                p_socio_id: socio_id
            })
            if(result){
                Swal.fire({
                    icon: "success",
                    title: "Operacion Exitosa",
                    text: result.resultadoTexto
                })
                setFecha("")
                setDescripcion("")
                setMonto(0)
                setCategoria_id(0)
                setMetodo_pago_id(0)
                setSocio_id(0)
            }
            navigate("/dashboard/expenses")
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
        <div className="flex flex-col items-center justify-center dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Crear Gasto</h2>
                
                <form className="flex flex-col" onSubmit={insertHandlerExpense}>

                    {/* FECHA */}
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

                    {/* DESCRIPCION */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="descripcion">
                        Descripcion (Obligatorio)*
                    </label>
                    <input
                      placeholder="Descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="descripcion"
                      type="text"
                      required
                    />


                    {/* MONTO */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="monto">
                        Monto (Obligatorio)*
                    </label>
                    <input
                      placeholder="Nombre"
                      value={monto}
                      onChange={(e) => setMonto(Number(e.target.value))}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="monto"
                      type="number"
                    />
                    
                    {/* CATEGORIA DE GASTO */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="metodo_pago_id">
                        Categoria de Gasto (Obligatorio)*
                    </label>
                    <select
                        value={categoria_id}
                        onChange={e => setCategoria_id(Number(e.target.value))}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out  duration-150"
                        id="categoria_id"
                    >
                    <option value={0}>Escoja una categoria</option>
                    {categoriaList.map((rol) => (
                        <option value={rol.id} key={rol.id}>{rol.name}</option>
                    ))}
                    </select>


                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="metodo_pago_id">
                        Metodo de Pago (Obligatorio)*
                    </label>
                    <select
                        value={metodo_pago_id}
                        onChange={e => setMetodo_pago_id(Number(e.target.value))}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out  duration-150"
                        id="metodo_pago_id"
                    >
                    <option value={0}>Escoja un metodo de pago</option>
                    {metodoList.map((rol) => (
                        <option value={rol.id} key={rol.id}>{rol.name}</option>
                    ))}
                    </select>
                    
                    {/* SOCIO */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="socio_id">
                        Socio (Obligatorio)*
                    </label>
                    <select
                        value={socio_id}
                        onChange={e => setSocio_id(Number(e.target.value))}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out  duration-150"
                        id="socio_id"
                    >
                    <option value={0}>Escoja un socio</option>
                    {sociosList.map((rol) => (
                        <option value={rol.id} key={rol.id}>{rol.name}</option>
                    ))}
                    </select>
                

                  <button
                    className="bg-linear-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out   duration-150 cursor-pointer"
                    type="submit"
                  >
                    Crear Gasto
                  </button>
                </form>
            </div>
        </div>
    )
}

export { CreateExpense }