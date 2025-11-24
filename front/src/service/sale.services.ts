import Swal from 'sweetalert2';
import axios from 'axios';

import type { ApiResponseSales } from '../types';

export const readSales = async (): Promise<ApiResponseSales | null> => {
    try{
        const { data } = await axios.get<ApiResponseSales>(
            import.meta.env.VITE_API_READ_SALES_URL,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
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

