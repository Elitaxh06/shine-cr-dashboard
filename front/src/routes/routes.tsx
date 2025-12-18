import { Routes, Route } from "react-router-dom"
import { Part } from "../view/Partners/Part"
import { Sales } from "../view/Sales/Sale"
import { EditPartner } from "../view/Partners/EditPartner/EditPartner"
import { Inventory } from "../view/Inventory/Inventory"
import { Expenses } from "../view/Expenses/Expenses"
import { CreateSale } from "../view/Sales/CreateSale"
import { Clients } from "../view/Clients/Clients"
function RoutesMain() {
    return (
        <Routes>
            <Route path="/" element={<Part />} />
            <Route path="/partners" element={<Part />} />   
            <Route path="/sales" element={<Sales />} />
            <Route path="/edit-partner" element={<EditPartner />} />
            <Route path="/products" element={<Inventory />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/clients" element={<Clients /> } />
            <Route path="/create-sale" element={<CreateSale /> } />
        </Routes>
    )
}

export { RoutesMain }