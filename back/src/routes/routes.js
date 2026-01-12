import { Router } from 'express'
import {
    ReadPartners,
    CreatePartner,
    UpdateTotalPartner,
    readWithIdPartner
} from '../controller/partners.controller.js'

import { 
    createSale,
    readSales,
    UpdateTotalSale,
    deleteSale
} from '../controller/sale.controller.js'


import {
    createCategoryInventary,
    createProduct,
    readProducts,
    deleteProduct
} from "../controller/inventary.controller.js"
import { 
    createMethodPayment,
    createCategoryExpense,
    readExpenses,
    createExpenses,
    deleteExpense
} from '../controller/expenses.controller.js'


import {
    readClients,
    createClient,
    deleteClient

} from "../controller/clients.controller.js"


const routes = Router()


// ROUTES FRO PARTNERS
routes.get("/read-partners", ReadPartners)
routes.post("/create-partner", CreatePartner)
routes.put("/update-partner/:id", UpdateTotalPartner)
routes.get("/read-partner-with-id/:id", readWithIdPartner)

// ROUTES FOR CLIENTS
routes.post("/create-client", createClient)
routes.get("/read-clients", readClients)
routes.delete("/delete-client/:id", deleteClient)

// ROUTES FOR SALES
routes.post("/create-sale", createSale)
routes.get("/read-sales", readSales)
routes.put("/update-sale", UpdateTotalSale)
routes.delete("/delete-sale/:id", deleteSale)

// ROUTES FOR INVENTARY
routes.post("/create-category-inventary", createCategoryInventary)
routes.post("/create-product", createProduct)
routes.get("/read-products", readProducts)
routes.delete("/delete-product/:id", deleteProduct)


// ROUTES FOR EXPENSES
routes.post("/create-method-payment", createMethodPayment)
routes.post("/create-category-expense", createCategoryExpense)
routes.get("/read-expenses", readExpenses)
routes.post("/create-expense", createExpenses)
routes.delete("/delete-expense/:id", deleteExpense)



export default routes