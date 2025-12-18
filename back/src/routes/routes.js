import { Router } from 'express'
import {
    ReadPartners,
    CreatePartner,
    UpdateTotalPartner,
    readWithIdPartner
} from '../controller/partners.controller.js'
import {
    createClient
} from '../controller/clients.controller.js'

import { 
    createSale,
    readSales,
    UpdateTotalSale
} from '../controller/sale.controller.js'


import {
    createCategoryInventary,
    createProduct,
    readProducts
} from "../controller/inventary.controller.js"
import { 
    createMethodPayment,
    createCategoryExpense,
    readExpenses,
    createExpenses
} from '../controller/expenses.controller.js'


import {
    readClients
} from "../controller/clients.controller.js"


const routes = Router()


// ROUTES FRO PARTNERS
routes.get("/read-partners", ReadPartners)
routes.post("/create-partner", CreatePartner)
routes.put("/update-partner/:id", UpdateTotalPartner)
routes.get("/read-with-id/:id", readWithIdPartner)

// ROUTES FOR CLIENTS
routes.post("/create-client", createClient)


// ROUTES FOR SALES
routes.post("/create-sale", createSale)
routes.get("/read-sales", readSales)
routes.put("/update-sale", UpdateTotalSale)

// ROUTES FOR INVENTARY
routes.post("/create-category-inventary", createCategoryInventary)
routes.post("/create-product", createProduct)
routes.get("/read-products", readProducts)


// ROUTES FOR EXPENSES
routes.post("/create-method-payment", createMethodPayment)
routes.post("/create-category-expense", createCategoryExpense)
routes.get("/read-expenses", readExpenses)
routes.post("/create-expense", createExpenses)


// ROUTES FOR CLIENTS
routes.get("/read-clients", readClients)


export default routes