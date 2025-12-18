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