import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProduct } from "../../service/inventary.services"
import Swal from "sweetalert2"

const inventoryCategoryList = [
    {id: 1, name: "Limpieza Exterior"},
    {id: 2, name: "Limpieza Interior"},
    {id: 3, name: "Acabado"},
    {id: 4, name: "Accesorios"},
    {id: 5, name: "Herramientas"},
    {id: 6, name: "Maquinaria"},
    {id: 7, name: "Consumibles"},
    {id: 8, name: "Químicos"}
]

function CreateProduct(){
    const navigate = useNavigate()
    const [nombre, setNombre] = useState<string>("")
    const [stock, setStock] = useState<number>(0)
    const [stock_minimo, setStock_minimo] = useState<number>(0)
    const [precio_decimal, setPrecio_decimal] = useState<number>(0)
    const [categoria_inventario_id, setCategoria_inventario_id] = useState<number>(0)

    const insertProductHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if(nombre === "" || stock === 0 || stock_minimo < 0 || precio_decimal === 0 || categoria_inventario_id === 0){
            Swal.fire({
                icon: "warning",
                title: "Para su informacion",
                text: "Debe completar todos los campos"
            })
            return
        }
        try{
            const result = await createProduct({
                p_nombre: nombre,
                p_stock: stock,
                p_stock_minimo: stock_minimo,
                p_precio_decimal: precio_decimal,
                p_categoria_inventario_id: categoria_inventario_id
            })
            if(result){
                Swal.fire({
                    icon: "success",
                    title: "Operacion Exitosa",
                    text: result.resultadoTexto
                })
                navigate("/dashboard/products")
            }
        }catch(error){
            if (error instanceof Error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Ocurrió un error inesperado"
                });
                console.error("Error al insertar el producto:", error);
            }
        }
    }


    return (
        <div className="flex flex-col items-center justify-center dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Crear Producto</h2>
                <form className="flex flex-col" onSubmit={insertProductHandler}>

                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="nombre">
                        Nombre      
                    </label>
                    <input
                      placeholder="Nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="nombre"
                      type="text"
                    />          

                    {/* Stock */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        placeholder="Stock"
                        value={stock}
                        onChange={e => setStock(Number(e.target.value))}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out          duration-150"
                        id="stock"
                        type="number"
                    />


                    {/* Stock_Minimo */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="stock_minimo">
                        Stock_Minimo
                    </label>
                    <input
                        placeholder="Stock_Minimo"
                        value={stock_minimo}
                        onChange={e => setStock_minimo(Number(e.target.value))}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out          duration-150"
                        id="stock_minimo"
                        type="number"
                    />
                    
                    {/* Precio */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="precio">
                        Precio
                    </label>
                    <input
                        placeholder="Precio"
                        value={precio_decimal}
                        onChange={e => setPrecio_decimal(Number(e.target.value))}
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1     focus:ring-blue-500 transition ease-in-out          duration-150"
                        id="precio"
                        type="number"
                    />
                
                    {/* CATEGORIA INVENTARIO */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="categoria_inventario_id">
                        Categoria Inventario
                    </label>
                    <select
                        value={categoria_inventario_id}
                        onChange={e => setCategoria_inventario_id(Number(e.target.value))}
                
                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring0     focus:ring-blue-500 transition ease-in-out           duration-150"
                        id="venta"
                    >
                    <option value={0}>Escoja una categoria</option>
                    {inventoryCategoryList.map((category) => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                    </select>
                
                   
                  
                  <button
                    className="bg-linear-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out           duration-150 cursor-pointer"
                    type="submit"
                  >
                    Crear Producto
                  </button>
                </form>
            </div>
        </div>
    )


}

export { CreateProduct }
