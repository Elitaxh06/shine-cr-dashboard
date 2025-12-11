export type Inventary = {
    producto_id: number,
    nombre: string,
    stock: number
    stock_minimo: number, 
    precio: number,
    categoria_nombre: string, 
    msj_tipo: string
    msj_texto: string
}

export type ApiResponseInventary = {
    resultadoTipo: string,
    resultadoTexto: string,
    datos: Inventary[] | null,
    mensaje: string 
}