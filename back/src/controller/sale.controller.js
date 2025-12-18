import axios from 'axios';
const mensaje = 'Este endpoint devuelve '

export const createSale = async (req, res) => {
    try{
        const {p_fecha,p_cliente_id,p_servicio_id,p_monto,p_metodo_pago_id,p_socios} = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_SALE,
            {p_fecha,p_cliente_id,p_servicio_id,p_monto,p_metodo_pago_id,p_socios},
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
            "resultadoTexto" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + ' la venta'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la venta'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)
    }catch(error){
         console.error("ERROR EN CREATE:", error.response?.data || error);
        return res.status(500).json({ mensaje: error.message });
    }
}

export const readSales = async (req, res) => {
    try{
        const { data } = await axios.post(
            process.env.URL_READ_SALES,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.API_KEY,
                    "Authorization": `Bearer ${process.env.AUTHORIZATOIN}`
                },
            }
        )
        const result = data
        // constantes que se repiten
        const { msj_tipo, msj_texto} = result[0]
        const respuesta = result
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + ' la lista de ventas'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la lista de ventas'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)

    }catch(error){
        return res.status(500).json({ mensaje: error.message });
    }
}

export const UpdateTotalSale = async (req, res) => {
    try{
        const {  p_venta_id,p_cliente_id,p_servicio_id,p_monto,p_metodo_pago, p_socios } = req.body
        const { data } = await axios.post(
            process.env.URL_UPDATE_SALE,
            {p_venta_id,p_cliente_id,p_servicio_id,p_monto,p_metodo_pago, p_socios},
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
            "resultadoTexto" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + ' la venta'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la venta'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)
    }
    catch(error){
        console.log(res.json({message: error.message}))
        return res.status(500).json({message: error.message})
    }
}