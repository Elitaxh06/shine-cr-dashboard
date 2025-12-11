import axios from "axios"
import type { ApiResponseInventary } from "../types/invetary.types"
import Swal from "sweetalert2"

export const readInventary = async ():Promise<ApiResponseInventary | null> => {
    try{
        const { data } = await axios.get<ApiResponseInventary>(
            import.meta.env.VITE_API_READ_PRODUCT_INVETARY_URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )

        if(data.resultadoTipo === 'error' || data.resultadoTipo === 'warning'){
            Swal.fire({
                icon:"info",
                titleText: "Para su información",
                text: data.resultadoTexto
            })
        }

        if(data.resultadoTipo === 'success'){
            return data
        }

        return null
    }catch(error){
        console.log('Error al obtener los datos', {error: error})
        Swal.fire({
            icon:"error",
            titleText: "Para su información",
            text: "Error al obtener los datos"
        })
        return null
    }
}
