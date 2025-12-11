import axios from "axios"
import type { apiResponseExpense } from "../types/expenses.types"
import Swal from "sweetalert2"


export const readExpenses = async (): Promise<apiResponseExpense | null> => {
    try{
        const { data } = await axios.get(
            import.meta.env.VITE_API_READ_EXPENSES_URL,
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
                text: data.msj_texto
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