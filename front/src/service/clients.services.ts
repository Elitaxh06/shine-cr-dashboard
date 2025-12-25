import Swal from "sweetalert2";
import type{ ApiResponseClients } from "../types/clients.types";
import axios from "axios";


export const readClients = async (): Promise<ApiResponseClients | null> => {
    try{
        const { data } = await axios.get(
            import.meta.env.VITE_API_READ_CLIENTS_URL,
            {
                headers:{
                    "Content-Type": "application/json",
                }
            }
        ) 

        if(data.resultadoTipo === 'error' || data.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "info",
                title: "Para su información",
                text: data.resultadoTexto
            })
        }
        if(data.resultadoTipo === 'success'){
            return data
        }   

        return null
    }catch(error: any){
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
    }
    return null
}

type InserClientData = {
    p_nombre: string,
    p_email: string,
    p_telefono: string,
    p_vehiculo: string,
    p_placa: string,
    p_rol_cliente_id: number    
}
export const createClient = async ({
    p_nombre,
    p_email,
    p_telefono,
    p_vehiculo,
    p_placa,
    p_rol_cliente_id

} : InserClientData): Promise<ApiResponseClients | null> => {
    try{
        const { data } = await axios.post<ApiResponseClients>(
            import.meta.env.VITE_API_CREATE_CLIENTS_URL,
            {
                p_nombre,
                p_email,
                p_telefono,
                p_vehiculo,
                p_placa,
                p_rol_cliente_id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )

        if(data.resultadoTipo === 'error' || data.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "info",
                title: "Para su información",
                text: data.resultadoTexto
            })
            return null
        }
        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Operacion Exitosa",
                text: "El cliente ha sido creado"
            })
            return data
        }
        return null
    }catch(error: any) {
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })
        return null
    }
}