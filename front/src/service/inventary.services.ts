import axios from "axios"
import type { ApiResponseInventary } from "../types/invetary.types"
import Swal from "sweetalert2"
import  { inventoryRoutes } from "../ambientes/ambientes"


export const readInventary = async ():Promise<ApiResponseInventary | null> => {
    try{
        const { data } = await axios.get<ApiResponseInventary>(
            inventoryRoutes.read_inventory,
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


export type ObjectToInsertProduct = {
    p_nombre: string,
    p_stock: number,
    p_stock_minimo: number,
    p_precio_decimal: number,
    p_categoria_inventario_id: number
}

export const createProduct = async ({
    p_nombre,
    p_stock,
    p_stock_minimo,
    p_precio_decimal,
    p_categoria_inventario_id
}: ObjectToInsertProduct):Promise<ApiResponseInventary | null> => {
    try{
        const { data } = await axios.post<ApiResponseInventary>(
            inventoryRoutes.create_product,
            {
                p_nombre,
                p_stock,
                p_stock_minimo,
                p_precio_decimal,    
                p_categoria_inventario_id
            },
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

