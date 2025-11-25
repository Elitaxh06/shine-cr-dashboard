import axios from 'axios';


const mensaje = 'Este endpoint devuelve '

export const ReadPartners = async (req, res) => {
    try{
        const { data } = await axios.post(
            process.env.URL_READ_PARTNERS,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": process.env.API_KEY,
                    "Authorization": `Bearer ${process.env.AUTHORIZATOIN}`
                },
                validateStatus: () => true
            }
        )

        const result = data

        // console.log(result)
        // constantes que se repiten 
        const { msj_tipo, msj_texto} = result[0]
        const respuesta = result
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + ' la lista de socios'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la lista de socios'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)


    }catch(error){
        console.log('fasjl;kfjasd;lkfjasl;kfjasl;kfasj')
        return res.status(500).json({message: error.message})
    }
}

export const CreatePartner = async (req, res) => {
    try{
        const { p_nombre, p_porcentar_participacion, p_email, p_telefono, p_inversion_inicial, p_ganancian_neta, p_ventas_generadas, p_gastos_generados, p_rol_id  } = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_PARTNER,
            {p_nombre, p_porcentar_participacion, p_email, p_telefono, p_inversion_inicial, p_ganancian_neta, p_ventas_generadas, p_gastos_generados, p_rol_id},
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
            "mensaje" : mensaje + ' el socio'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el socio'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)

    }catch(error){
        console.log('fasjl;kfjasd;lkfjasl;kfjasl;kfasj')
        return res.status(500).json({message: error.message})
    }
}

export const UpdateTotalPartner = async (req, res) => {
    try{
        const {  p_socio_id,p_nombre,p_porcentaje_participacion,p_email,p_telefono,p_inversion_inicial,p_ganancia_neta,p_rol_id,p_ventas_generadas,p_gastos_generados } = req.body
        const { data } = await axios.post(
            process.env.URL_UPDATE_PARTNER,
            {p_socio_id,p_nombre,p_porcentaje_participacion,p_email,p_telefono,p_inversion_inicial,p_ganancia_neta,p_rol_id,p_ventas_generadas,p_gastos_generados},
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
            "mensaje" : mensaje + ' el socio'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el socio'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }   
        return res.json(result)

    }catch(error){
        console.log(res.json({message: error.message}))
        return res.status(500).json({message: error.message})
    }
}

export const readWithIdPartner = async (req, res) => {
    try{
        const { id } = req.params
        const { data } = await axios.post(
            process.env.URL_READ_WITH_ID_PARTNER, { p_socio_id: id },
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
            "mensaje" : mensaje + ' el socio'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el socio'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(result)



    }catch(error){
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}