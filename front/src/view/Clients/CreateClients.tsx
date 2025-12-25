import { useState } from "react";
import { createClient } from "../../service/clients.services";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const clientRolList = [
    {id: 1, name: "Regular"},
    {id: 2, name: "Frecuente"},
    {id: 3, name: "VIP"},
]

function CreateClient() {
    const navigate = useNavigate()
    const [ nombre, setNombre ] = useState<string>("")
    const [ email, setEmail ] = useState<string>("")
    const [ telefono, setTelefono ] = useState<string>("")
    const [ vehiculo, setVehiculo ] = useState<string>("")
    const [ placa, setPlaca ] = useState<string>("")
    const [ rol_id, setRol_id ] = useState<number>(0)

    const insertClientHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if(nombre ===  "" || vehiculo === "" || rol_id === 0){
            Swal.fire({
                icon: "warning",
                title: "Para su informacion",
                text: "Debe completar todos los campos"
            })
            return
        }
    try{
        const result = await createClient({
            p_nombre: nombre,
            p_email: email,
            p_telefono: telefono,
            p_vehiculo: vehiculo,
            p_placa: placa,
            p_rol_cliente_id: rol_id
        })
        if(result){
            Swal.fire({
                icon: "success",
                title: "Operacion Exitosa",
                text: result.resultadoTexto
            })
            setNombre("")
            setEmail("")
            setTelefono("")
            setVehiculo("")
            setPlaca("")
            setRol_id(0)    
            navigate("/dashboard/clients")
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
        <div className="flex flex-col items-center justify-center dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Crear Cliente</h2>
                
                <form className="flex flex-col" onSubmit={insertClientHandler}>
                    {/* Nombre del cliente */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="nombre">
                        Nombre (Obligatorio)*
                    </label>
                    <input
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="nombre"
                      type="text"
                    />

                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="email">
                        Email      
                    </label>
                    <input
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="email"
                      type="mail"
                      required
                    />
                    

                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="telefono">
                        Telefono      
                    </label>
                    <input
                      placeholder="Telefono"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="telefono"
                      type="tel"
                    />

                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="vehiculo">
                        Vehiculo (Obligatorio)*  
                    </label>
                    <input
                      placeholder="Vehiculo (Marca y Puertas)"
                      value={vehiculo}
                      onChange={(e) => setVehiculo(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="vehiculo"
                      type="text"
                    />


                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="placa">
                        Placa     
                    </label>
                    <input
                      placeholder="Placa"
                      value={placa}
                      onChange={(e) => setPlaca(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="placa"
                      type="text"
                    />




                    {/* ROL DEL CLIENTE */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="rol_id">
                        Rol del Cliente (Obligatorio)*
                    </label>
                    <select
                        value={rol_id}
                        onChange={e => setRol_id(Number(e.target.value))}

                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out  duration-150"
                        id="venta"
                    >
                    <option value={0}>Escoja un rol del cliente</option>
                    {clientRolList.map((rol) => (
                        <option value={rol.id} key={rol.id}>{rol.name}</option>
                    ))}
                    </select>
                

                  <button
                    className="bg-linear-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out   duration-150 cursor-pointer"
                    type="submit"
                  >
                    Crear Cliente
                  </button>
                </form>
            </div>
        </div>
    )

}



export { CreateClient }
