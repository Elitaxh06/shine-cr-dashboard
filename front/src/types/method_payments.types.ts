export type MethodPayment = {
    metodos_pago_id : number,
    nombre : string,
    msj_tipo: string,
    msj_texto: string
}

export type MethodPaymentResponse = {
    resultadoTipo: string,
    resultadoTexto: string,
    datos: MethodPayment[] | null,
    mensaje : string
}



