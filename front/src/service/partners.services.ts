import Swal from 'sweetalert2';
import axios from 'axios';
import { partnerRoutes } from '../ambientes/ambientes';
import type { ApiResponsePartners } from '../types';

export const readPartners = async (): Promise<ApiResponsePartners | null>  => {
    try{
        const { data } = await axios.get<ApiResponsePartners>(
        partnerRoutes.read_partners,
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


type UpdateTotalParams = {
    p_socio_id: number,
    p_nombre: string,
    p_porcentaje_participacion: number,
    p_email: string,
    p_telefono: string,
    p_inversion_inicial: number,
    p_ganancia_neta: number,
    p_rol_id: number,
    p_ventas_generadas: number,
    p_gastos_generados: number
}

export const updateTotalPartner = async (params: UpdateTotalParams): Promise<ApiResponsePartners | null | undefined> => {
    try{
        const { data } = await axios.put<ApiResponsePartners>(
            partnerRoutes.read_partners + params.p_socio_id,
            {
                p_socio_id: params.p_socio_id,
                p_nombre: params.p_nombre,
                p_porcentaje_participacion: params.p_porcentaje_participacion,
                p_email: params.p_email,
                p_telefono: params.p_telefono,
                p_inversion_inicial: params.p_inversion_inicial,
                p_ganancia_neta: params.p_ganancia_neta,
                p_rol_id: params.p_rol_id,
                p_ventas_generadas: params.p_ventas_generadas,
                p_gastos_generados: params.p_gastos_generados
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if(data.resultadoTipo === 'error' || data.resultadoTipo === 'warning'){
            Swal.fire({
                icon: "error",
                title: "Para su informacion",
                text: 'Hubo un error inesperado al actualizar el socio'
            })
        }

        if(data.resultadoTipo === 'success'){
            Swal.fire({
                icon: "success",
                title: "Operacion Exitosa",
                text: "El socio ha sido actualizado"
            })
            return data
        }

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


export const readWithIdPartner = async(socioId: number):Promise<ApiResponsePartners | null> => {
    try{
        const { data } = await axios.get<ApiResponsePartners>(
            partnerRoutes.read_partner_by_id + socioId,
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