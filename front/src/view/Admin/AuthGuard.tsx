import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "../../helper/supabaseClient";
import { Loader1 } from "../../components/loaders/loader1";

export default function AuthGuard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    getSession();
  }, []);

  if (loading) return <div className="pt-52"><Loader1 /></div>;
  if (!authenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
