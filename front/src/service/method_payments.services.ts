import Swal from "sweetalert2";
import axios from "axios";
import { methodPaymentRoutes } from "../ambientes/ambientes";
import type { MethodPaymentResponse } from "../types/method_payments.types";

export const getMethodPayments = async (): Promise<MethodPaymentResponse | null> => {
    try{
        const {data } = await axios.get<MethodPaymentResponse>(
            methodPaymentRoutes.read_methods_payments,
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
        Swal.fire({
            title: 'Error',
            text: 'Error al obtener los datos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        })  
        return null
    }
}