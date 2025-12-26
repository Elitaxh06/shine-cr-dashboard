import Swal from 'sweetalert2';
import axios from 'axios';
import { saleRoutes } from '../ambientes/ambientes';
import type { ApiResponseSales } from '../types';

export const readSales = async (): Promise<ApiResponseSales | null> => {
    try{
        const { data } = await axios.get<ApiResponseSales>(
            saleRoutes.read_sales,
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

export type ObjectSale = {
    p_fecha : string,
    p_cliente_id : number,
    p_servicio_id : number,
    p_monto : number,
    p_metodo_pago_id : number,
    p_socios : number[]
}
export const createSale = async ({
    p_fecha,
    p_cliente_id,
    p_servicio_id,
    p_monto,
    p_metodo_pago_id,
    p_socios    
}: ObjectSale): Promise<ApiResponseSales | null> => {
    try{
        const { data } = await axios.post<ApiResponseSales>(
            saleRoutes.create_sale,
            {
                p_fecha,
                p_cliente_id,
                p_servicio_id,
                p_monto,
                p_metodo_pago_id,
                p_socios
            },
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
        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Operacion Exitosa",
                text: "La venta ha sido creada"
            })
            return data
        }

        return null
    }catch(error){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al obtener los datos"
        })
        return null
    } 

}


export const deleteSale = async (id: number): Promise<ApiResponseSales | null> => {
    try{
        const { data } = await axios.delete<ApiResponseSales>(
            saleRoutes.delete_sale + id,
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
        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Operacion Exitosa",
                text: "La venta ha sido eliminada"
            })
            return data
        }

        return null
    }catch(error){
        Swal.fire({
            icon: "error",
            title: "Para su informacion",
            text: "Error al obtener los datos"
        })
        return null
    }
}

