import { Routes, Route } from "react-router-dom"
import { Part } from "../view/Partners/Part"
import { Sales } from "../view/Sales/Sale"
import { EditPartner } from "../view/Partners/EditPartner/EditPartner"
function RoutesMain() {
    return (
        <Routes>
            <Route path="/" element={<Part />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/edit-partner" element={<EditPartner />} />
        </Routes>
    )
}

export { RoutesMain }