import { useState, useEffect } from "react";
import supabase from "../../helper/supabaseClient";
import { Navigate } from "react-router-dom";
import { Loader1 } from "../../components/loaders/loader1";

export default function Wrapper({ children }: any) {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            const {
                data: {session}

            } = await supabase.auth.getSession()

            setAuthenticated(!!session)
            setLoading(false)
        }
        getSession()
    }, [])

    if(loading){
        return <div className="pt-52"><Loader1 /></div>
    }else{
        if(authenticated){
            return <>{children}</>
        }
    }
    return <Navigate to="/" />


}