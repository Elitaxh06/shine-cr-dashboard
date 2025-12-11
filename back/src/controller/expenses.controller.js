import axios from "axios"

const mensaje = "Este endpoint devuelve "

export const createMethodPayment = async (req, res) => {
    try{
        const { p_nombre } = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_PAY_METHOD,
            {p_nombre},
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
            "mensaje" : mensaje + ' el metodo de pago'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el metodo de pago'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)



    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

export const createCategoryExpense = async (req, res) => {
    try{
        const {p_nombre } = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_CATEGORY_EXPENSE,
            {p_nombre},
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
            "mensaje" : mensaje + ' la categoria de gastos'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la categoria de gastos'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result) 


    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

export const readExpenses = async (req, res) => {
    try{
        const { data } = await axios.post(
            process.env.URL_READ_EXPENSES,
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
            "mensaje" : mensaje + ' la categoria de gastos'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la categoria de gastos'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }   

        return res.json(result)

    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

export const createExpenses = async (req, res) => {
    try{
        const {  p_fecha, p_descripcion, p_monto ,p_categoria_id, p_metodo_pago_id, p_socio_id }  = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_EXPENSES,
            { p_fecha, p_descripcion, p_monto ,p_categoria_id, p_metodo_pago_id, p_socio_id },
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
            "mensaje" : mensaje + ' el gasto'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el gasto'
        }

        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(result)

    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}