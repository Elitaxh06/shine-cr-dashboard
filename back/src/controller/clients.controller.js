import axios from "axios"

const mensaje = "Este endpoint devuelve "

export const createClient = async (req, res) => {
    try{    
        const { p_nombre,p_email,p_telefono,p_vehiculo,p_placa,p_rol_cliente_id} = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_CLIENT,
            {p_nombre,p_email,p_telefono,p_vehiculo,p_placa,p_rol_cliente_id},
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
            "mensaje" : mensaje + ' el cliente'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el cliente'
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

export const readClients = async (req, res) => {
    try{
        const { data } = await axios.post(
            process.env.URL_READ_CLIENTES,
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
        // vamos hacer una constantes que se repiten
        const { msj_tipo, msj_texto} = result[0]
        // extraemos este mensaje que siempre va a ser el mismo (success, warning, error)
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : result,
            "mensaje" : mensaje + " los clientes"
        }

        const mensajeCompletoWarningError ={
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + " los clientes"
        }

        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)

    }catch(error){
        console.log({error: error.message})
        return res.send(error.message);
    }
}