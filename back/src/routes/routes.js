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

const routes = Router()


// ROUTES FRO PARTNERS
routes.get("/read-partners", ReadPartners)
routes.post("/create-partner", CreatePartner)
routes.put("/update-partner", UpdateTotalPartner)
routes.get("/read-with-id/:id", readWithIdPartner)

// ROUTES FOR CLIENTS
routes.post("/create-client", createClient)


// ROUTES FOR SALES
routes.post("/create-sale", createSale)
routes.get("/read-sales", readSales)
routes.put("/update-sale", UpdateTotalSale)
export default routes