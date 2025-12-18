export type Client = {
    client_id: number
    nombre: string,
    email: string,
    telefono: string,
    vehiculo: string,
    placa: string,
    rol_cliente_nombre: string,
    total_gastado: number,
    total_visitas: number,
    ultima_visita: string,
    msj_tipo: string,
    msj_texto: string
}

export type ApiResponseClients = {
    resultadoTipo: string
    resultadoTexto: string
    datos: Client[] | null,
     mensaje: string
}
