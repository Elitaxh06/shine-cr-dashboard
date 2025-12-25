import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "../components/Side-nav";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "../components/ui/sheet";
export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r">
        <SidebarNav />
      </aside>

      {/* Sidebar móvil */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarNav onClose={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Contenido */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-2 h-16 px-4 border-b bg-background">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
          <span className="font-bold text-lg">Sistema Lavacar</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
        

      </div>
    </div>
  );
}
