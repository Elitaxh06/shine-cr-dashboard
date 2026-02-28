import axios from "axios"

const mensaje = 'Este enpoint devuelve '

export const getMethodPayment = async (req, res) => {
    try{
        const { data } = await axios.post(
            process.env.URL_READ_METHODS_PAYMENTS,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.API_KEY,
                    "Authorization": `Bearer ${process.env.AUTHORIZATOIN}`
                }
            }
        )

        const result = data 
        // constantes que se repiten
        const { msj_tipo, msj_texto} = result[0]
        const respuesta = result
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            resultadoTexto : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + "Los metodos de pago"

        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + "Los metodos de pago"
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)


    }catch(error){
        // make sure we reference the caught error variable and provide a helpful message
        console.error('Error in getMethodPayment:', error)
        return res.status(500).json({ resultadoTipo: 'error', respuestaMensaje: error?.message ?? 'unknown error' });
    }
}