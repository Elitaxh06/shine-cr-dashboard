import { Routes, Route } from "react-router-dom";
import { Part } from "../view/Partners/Part";
import { Sales } from "../view/Sales/Sale";
import { EditPartner } from "../view/Partners/EditPartner/EditPartner";
import { Inventory } from "../view/Inventory/Inventory";
import { Expenses } from "../view/Expenses/Expenses";
import { CreateSale } from "../view/Sales/CreateSale";
import { Clients } from "../view/Clients/Clients";
import { CreateClient } from "../view/Clients/CreateClients";
import { CreateExpense } from "../view/Expenses/CreateExpense";
import { Home } from "../view/Home";
import Register from "../view/Admin/Register";
import Login from "../view/Admin/Login";
import FormHome from "../view/Admin/FormHome";
import { CreateProduct } from "../view/Inventory/CreateProduct";

import AuthGuard from "../view/Admin/AuthGuard";
import DashboardLayout from "../view/DashboardLayout";

function RoutesMain() {
  return (
    <Routes>

      <Route path="/" element={<FormHome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protegido por sesión */}
      <Route path="/dashboard/*" element={<AuthGuard />}>
        {/* Layout del dashboard */}
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="partners" element={<Part />} />
          <Route path="sales" element={<Sales />} />
          <Route path="edit-partner" element={<EditPartner />} />
          <Route path="products" element={<Inventory />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="clients" element={<Clients />} />
          <Route path="create-sale" element={<CreateSale />} />
          <Route path="create-client" element={<CreateClient />} />
          <Route path="create-expense" element={<CreateExpense />} />
          <Route path="create-product" element={<CreateProduct /> } />
        </Route>
      </Route>

    </Routes>
  );
}

export { RoutesMain };
