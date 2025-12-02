export type Partner = {
    socio_id: number,
    nombre: string,
    porcentaje_participacion: number,
    rol_id: number,
    email: string,
    telefono: string,
    inversion_inicial: number,
    ganancia_neta: number,
    rol_nombre: string,
    ventas_generadas : number,
    gastos_generados : number
}

export type ApiResponsePartners = {
    resultadoTipo: string,
    resultadoTexto : string,
    datos : Partner[] | null,
    mensaje : string
}