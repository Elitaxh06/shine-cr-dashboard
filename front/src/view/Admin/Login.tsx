import { useState} from 'react'
import supabase from '../../helper/supabaseClient'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ message, setMessage ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)
    
    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEmail("")
        setPassword("")
        setMessage("")

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            setMessage(error.message)
            setEmail("")
            setPassword("")
            return
        }
        if(data){
            navigate("/dashboard")
            return null
        }

    
    }
    return (
                <div className="flex flex-col items-center justify-center dark">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-200 mb-4">Iniciar Sesion</h2>

                {message && (
                    <div className="bg-red-500 text-white p-4 rounded-md mb-4">
                        {message}
                    </div>
                )}

                <form className="flex flex-col" onSubmit={handleSubmitLogin}>

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
                    Iniar Sesion
                  </button>
                </form>
                <span className='text-white'>¿No tienes cuenta? <Link className='text-blue-500 border-b border-blue-700 hover:text-blue-600' to="/register">Registrarse</Link></span>
            </div>
        </div>
    )

}