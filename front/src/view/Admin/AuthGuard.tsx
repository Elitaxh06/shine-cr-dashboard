import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import supabase from "../../helper/supabaseClient";
import { Loader1 } from "../../components/loaders/loader1";

export default function AuthGuard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation()

  const params = new URLSearchParams(location.search); 
  const isDemo = params.get("demo") === "true";

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    getSession();
  }, []);

  if (loading) return <div className="pt-52"><Loader1 /></div>;
  if (isDemo) return <Outlet />;

  if (!authenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
