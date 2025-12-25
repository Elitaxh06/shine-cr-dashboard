import { useState } from "react";
import supabase from "../../helper/supabaseClient";
import { Link } from "react-router-dom";

export default function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ message, setMessage ] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEmail("")
        setPassword("")
        setMessage("")
        
        const role = "employee" 
        const { data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
        })
    

        if(error){
            setMessage(error.message)
            return
        }
        if(data?.user){
            await supabase.from("profiles").insert([
                {id: data.user.id, role}
            ])
            setMessage("Usuario creado exitosamente, por favor verifique su correo para activar la cuenta.")
        }
        setEmail("")
        setPassword("")
    }

    return (
        <div className="flex flex-col items-center justify-center dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Registro de Usuario</h2>

                {message && (
                    <div className="bg-blue-500 text-white p-4 rounded-md mb-4">
                        {message}
                    </div>
                )}

                <form className="flex flex-col" onSubmit={handleSubmit}>

                    {/* FECHA */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="email">
                        Email (Obligatorio)*  
                    </label>
                    <input
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="email"
                      type="email"
                    />

                    {/* DESCRIPCION */}
                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="password">
                        Contraseña (Obligatorio)*
                    </label>
                    <input
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <label htmlFor="showPassword" className='text-white flex items-center gap-2 cursor-pointer mt-1'>                    
                        <input
                          onChange={(e) => setShowPassword(e.target.checked)}
                          type="checkbox"
                          id="showPassword"
                          className="text-white rounded-md"
                        />
                        Mostrar contraseña
                    </label>


                  <button
                    className="bg-linear-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out   duration-150 cursor-pointer mb-3"
                    type="submit"
                  >
                    Registrarse
                  </button>
                </form>
                <span className="text-white">¿Ya tienes una cuenta? <Link className='text-blue-500 border-b border-blue-700 hover:text-blue-600' to="/login">Iniciar Sesion</Link></span>   
            </div>
        </div>
    )

}