import axios from "axios";


const mensaje = 'Este endpint devuelve '

export const createCategoryInventary = async (req, res) => {
    try{
        const { p_nombre } = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_CATEGORY_INVENTARY,
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
            "mensaje" : mensaje + ' la categoria de inventario'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la categoria de inventario'
        }
        
        // devolver la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(data)
    }catch(error){
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
}


export const createProduct = async (req, res) => {
    try{
        const { p_nombre,p_stock,p_stock_minimo,p_precio_decimal,p_categoria_inventario_id } = req.body
        const { data } = await axios.post(
            process.env.URL_CREATE_PRODUCTS,
            {p_nombre,p_stock,p_stock_minimo,p_precio_decimal,p_categoria_inventario_id},
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
        const { msj_tipo, msj_texto } = result[0]
        const resupesta = result
        const mensajeCompletoSuccess = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : resupesta,
            "mensaje" : mensaje + ' el producto'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el producto'
        }

        // devolver la respuesta
        if(msj_tipo == 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(data)
    } catch (error) {
        console.error("ERROR COMPLETO:", error);
        return res.status(500).json({ 
            message: error.message,
            error: error.response?.data ?? null 
        });
    }
}


export const readProducts = async (req, res) => {
    try{
        const { data } = await axios.post(
            process.env.URL_READ_PRODUCTS,
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
            "resultadoTexto" : msj_texto,
            "datos" : respuesta,
            "mensaje" : mensaje + ' la lista de productos'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' la lista de productos'
        }

        // devolvemos la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }

        return res.json(data)

    }catch(error){
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }
}


export const deleteProduct = async (req, res) => {
    try{
        const p_producto_id = req.params.id
        const { data } = await axios.post(
            process.env.URL_DELETE_PRODUCT,
            {p_producto_id},
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
            "mensaje" : mensaje + ' el producto'
        }
        const mensajeCompletoWarningError = {
            "resultadoTipo" : msj_tipo,
            "resultadoTexto" : msj_texto,
            "datos" : null,
            "mensaje" : mensaje + ' el producto'
        }
        // devolvemos la respuesta
        if(msj_tipo === 'success'){
            return res.json(mensajeCompletoSuccess)
        }else if(msj_tipo === 'warning' || msj_tipo === 'error'){
            return res.json(mensajeCompletoWarningError)
        }
        return res.json(data)

    }catch(e){
        console.log(e.message)
        return res.status(500).json({ message: e.message });
    }
}