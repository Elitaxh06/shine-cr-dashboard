import axios from "axios"
import type { apiResponseExpense } from "../types/expenses.types"
import Swal from "sweetalert2"
import { expenseRoutes } from "../ambientes/ambientes"


export const readExpenses = async (): Promise<apiResponseExpense | null> => {
    try{
        const { data } = await axios.get(
            expenseRoutes.read_expenses,
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
        }
        if(data.resultadoTipo === 'success'){
            return data
        }
        return null
    }catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudo leer los gastos",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
        return null
    }
}



export type ObjectToAddExpense = {
    p_fecha: string,
    p_descripcion: string,
    p_monto: number,
    p_categoria_id: number,
    p_metodo_pago_id: number,
    p_socio_id: number
}
export const createExpenses = async ({
    p_fecha,
    p_descripcion,
    p_monto,
    p_categoria_id,
    p_metodo_pago_id,
    p_socio_id
}: ObjectToAddExpense): Promise<apiResponseExpense | null>  => {
    try{
        const { data } = await axios.post(
            expenseRoutes.create_expense,
            {
                p_fecha,
                p_descripcion,
                p_monto,
                p_categoria_id,
                p_metodo_pago_id,
                p_socio_id
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
        }
        if(data.resultadoTipo === 'success'){
            return data
        }   
        return null
    }catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudo crear el gasto",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
        return null
    }

}


export const deleteExpense = async (id: number): Promise<apiResponseExpense | null> => {
    try{
        const { data } = await axios.delete<apiResponseExpense>(
            expenseRoutes.delete_expense + id,
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
                text: "El gasto ha sido eliminado"
            })
            return data
        }
        return null
    }catch(error){
        Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el gasto",
            icon: "error",
            confirmButtonText: "Aceptar",
        })
        return null
    }
}