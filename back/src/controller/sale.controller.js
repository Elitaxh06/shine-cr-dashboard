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
    try {
        const now = new Date()

        const year = req.query.year
            ? Number(req.query.year)
            : now.getFullYear()

        const month = req.query.month
            ? Number(req.query.month)
            : now.getMonth() + 1

        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 1)

        const start = startDate.toISOString().split("T")[0]
        const end = endDate.toISOString().split("T")[0]

        const { data } = await axios.get(
            `${process.env.URL_READ_SALES}?fecha=gte.${start}&fecha=lt.${end}`,
            {
                headers: {
                    apikey: process.env.API_KEY,
                    Authorization: `Bearer ${process.env.AUTHORIZATOIN}`
                }
            }
        )
        const result = data 
        // vamos hacer una constantes que se repiten
        const { msj_tipo, msj_texto} = result[0]
        // extraemos este mensaje que siempre va a ser el mismo (success, warning, error)
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : result,
            "mensaje" : mensaje + ` las ventas del mes ${month}/${year}`
        }

        const mensajeCompletoWarningError ={
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ` las ventas del mes ${month}/${year}`
        }

        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        // return res.json({
        //     resultadoTipo: "success",
        //     resultadoTexto: "Ventas obtenidas correctamente",
        //     datos: data,
        //     mensaje: "Este endpoint devuelve la lista de ventas del mes"
        // })

        return res.json(result)

    }
    catch(error){
        console.log(error)
        return res.status(500).json({ mensaje: error.message })
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


export const deleteSale = async (req, res) => {
    try{
        const p_venta_id = req.params.id
        const { data } = await axios.post(
            process.env.URL_DELETE_SALE,
            {p_venta_id},
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
        console.log({message: error.message})
        return res.status(500).json({message: error.message})
    }
}