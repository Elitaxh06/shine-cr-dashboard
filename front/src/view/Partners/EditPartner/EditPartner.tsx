import { FormEditPartner } from "./FormEditPartner"
import { useNavigate } from "react-router-dom"




function EditPartner() {
    const navigate = useNavigate()

    return (
        <section className="mt-24">
            <button
              className="bg-white text-center w-36 pl-3 rounded-2xl h-12 relative text-black text-xl font-semibold group cursor-pointer ml-8"
              type="button"
              onClick={() => navigate('/')}
            >
              <div
                className="bg-green-400 rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-1 group-hover:w-[138px] z-10 duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height="25px"
                  width="25px"
                >
                  <path
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    fill="#000000"
                  ></path>
                  <path
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>
              <p className="translate-x-2">Regresar</p>
            </button>

            <div className="flex flex-col items-center justify-center gap-5">
            <h2 className="text-5xl font-bold">Editar Negocio</h2>
            <p className="text-center font-semibold">Por favor ingrese los siguientes datos</p>
            </div>
            <FormEditPartner />
        </section>
    )
}


export { EditPartner }