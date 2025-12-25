import { Link } from "react-router-dom";



export default function FormHome() {
  return (
    <section className="flex items-center flex-col gap-12"  >
        <h1 className="text-4xl font-bold">Formulario de inicio de sesión</h1>
        <div className="flex items-center justify-between gap-4">
            <Link to="/register">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Registrarse
              </button>
            </Link>
            <br />
            <Link to="/login">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Iniciar Sesion
              </button>
            </Link>
        </div>
    </section>
  );
}
