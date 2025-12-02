import './App.css'
// import { Home } from './view/Home'
import { SidebarNav } from './components/Side-nav'
import { RoutesMain } from './routes/routes'
import { Button } from './components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent } from './components/ui/sheet'
import { useState } from 'react'
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR DESKTOP */}
      <aside className="hidden md:flex w-64 flex-col border-r">
        <SidebarNav />
      </aside>

      {/* SIDEBAR MOBILE */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarNav onClose={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header solo en móvil */}
        <header className="md:hidden flex items-center gap-2 h-16 px-4 border-b bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <span className="font-bold text-lg">Sistema Lavacar</span>
        </header>

        {/* Rutas */}
        <main className="flex-1 overflow-y-auto">
          <RoutesMain />
        </main>
      </div>
    </div>
  )
}

export default App
