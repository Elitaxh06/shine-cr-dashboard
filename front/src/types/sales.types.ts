export type Sale = {
    venta_id: number,
    fecha: string,
    cliente_nombre: string,
    servicio_nombre: string,
    monto: number,
    metodo_pago: string,
    socios_participantes: string,
    msj_tipo : string,
    msj_texto: string;
}

export type ApiResponseSales = {
    resultadoTipo: string,
    resultadoTexto : string,
    datos : Sale[] | null,
    mensaje: string
}