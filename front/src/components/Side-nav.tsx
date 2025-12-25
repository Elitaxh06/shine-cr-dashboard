import { Link, useLocation } from "react-router-dom"
import supabase from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

import { cn } from "../lib/utils"
import {
  LayoutDashboard,
  DollarSign,
  TrendingDown,
  Package,
  Users,
  UserCircle,
  Droplets,
} from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ventas",
    href: "/dashboard/sales",
    icon: DollarSign,
  },
  {
    title: "Gastos",
    href: "/dashboard/expenses",
    icon: TrendingDown,
  },
  {
    title: "Inventario",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Socios",
    href: "/dashboard/partners",
    icon: Users,
  },
  {
    title: "Clientes",
    href: "/dashboard/clients",
    icon: UserCircle,
  },
  // {
  //   title: "Reportes",
  //   href: "/dashboard/reportes",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Configuración",
  //   href: "/dashboard/configuracion",
  //   icon: Settings,
  // },
]

interface SidebarNavProps {
  onClose?: () => void
}

export function SidebarNav({ onClose }: SidebarNavProps) {
    const { pathname } = useLocation()

    const navigate = useNavigate();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        // Si NO hay error, la sesión se cerró. Redirige:
        if (!error) navigate("/");
    };


  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
          <Droplets className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <span className="font-bold text-lg">Sistema Lavacar</span>
        
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
        <div className="flex items-start">
          <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer mt-5">
            Cerrar Sesión
          </button>
        </div>
      </ScrollArea>
    </div>
  )
}