export type Expense = {
    gastos_id : number,
    fecha: string,
    descripcion: string,
    monto: number,
    categoria_nombre: string,
    metodo_pago: string,
    socio_nombre: string,
    msj_tipo: string,
    msj_texto: string
}

export type apiResponseExpense = {
    resultadoTipo : string,
    resultadoTexto : string,
    datos: Expense[] | null,
    mensaje: string
}