import Swal from 'sweetalert2';
import axios from 'axios';

import type { ApiResponsePartners } from '../types';

export const readPartners = async (): Promise<ApiResponsePartners | null>  => {
    try{
        const { data } = await axios.get<ApiResponsePartners>(
        import.meta.env.VITE_API_READ_PARTNERS_URL,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    if(data.resultadoTipo === 'error' || data.resultadoTipo === 'warning'){
        Swal.fire({
            icon: "info",
            title: "Para su informacion",
            text: data.resultadoTexto
        })
        return null
    }
    console.log(data)
    return data
        
    }catch(error){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al obtener los datos"
        })
        console.log('Error al obtener los datos', error)
        return null
    }
}
