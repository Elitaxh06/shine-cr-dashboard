let Ambiente = '';

// Ambiente = 'dev';
Ambiente = 'prod';

let ruta_apis_partners = ''
let ruta_apis_sales =''
let ruta_apis_expenses
let ruta_apis_inventory = ''
let ruta_apis_clients = ''




switch (Ambiente) {
    case 'dev':
        ruta_apis_partners = 'http://localhost:3001/api/'
        ruta_apis_sales = 'http://localhost:3001/api/'
        ruta_apis_expenses = 'http://localhost:3001/api/'
        ruta_apis_inventory = 'http://localhost:3001/api/'
        ruta_apis_clients = 'http://localhost:3001/api/'
        break;
    case 'prod':
        ruta_apis_partners = 'https://shine-cr-dashboard-backend.onrender.com/api/'
        ruta_apis_sales = 'https://shine-cr-dashboard-backend.onrender.com/api/'
        ruta_apis_expenses = 'https://shine-cr-dashboard-backend.onrender.com/api/'
        ruta_apis_inventory = 'https://shine-cr-dashboard-backend.onrender.com/api/'
        ruta_apis_clients = 'https://shine-cr-dashboard-backend.onrender.com/api/'
        break;  
    default:
        ruta_apis_partners = 'http://localhost:3001/api/'
        ruta_apis_sales = 'http://localhost:3001/api/'
        ruta_apis_expenses = 'http://localhost:3001/api/'
        ruta_apis_inventory = 'http://localhost:3001/api/'
        ruta_apis_clients = 'http://localhost:3001/api/'       
}


export const partnerRoutes = {
    read_partners: ruta_apis_partners + import.meta.env.VITE_API_GET_PARTNERS,
    read_partner_by_id: ruta_apis_partners + import.meta.env.VITE_API_GET_WITH_ID,
    create_partner: ruta_apis_partners + import.meta.env.VITE_API_CREATE_PARTNER,
    update_partner: ruta_apis_partners + import.meta.env.VITE_API_UPDATE_PARTNER,
    delete_partner: ruta_apis_partners + import.meta.env.VITE_API_DELETE_PARTNER

}

export const saleRoutes = {
    read_sales: ruta_apis_sales + import.meta.env.VITE_API_GET_SALES,
    create_sale: ruta_apis_sales + import.meta.env.VITE_API_CREATE_SALE,
    update_sale: ruta_apis_sales + import.meta.env.VITE_API_UPDATE_SALE,
    delete_sale: ruta_apis_sales + import.meta.env.VITE_API_DELETE_SALE
}

export const expenseRoutes = {
    create_method_payment: ruta_apis_expenses + import.meta.env.VITE_API_CREATE_METHOD_PAYMENT,
    create_category_expense: ruta_apis_expenses + import.meta.env.VITE_API_CREATE_CATEGORY_EXPENSE,
    read_expenses: ruta_apis_expenses + import.meta.env.VITE_API_GET_EXPENSES,
    create_expense: ruta_apis_expenses + import.meta.env.VITE_API_CREATE_EXPENSE,
    delete_expense: ruta_apis_expenses + import.meta.env.VITE_API_DELETE_EXPENSE
}

export const inventoryRoutes = {
    read_inventory: ruta_apis_inventory + import.meta.env.VITE_API_GET_PRODUCTS,
    create_category_inventory: ruta_apis_inventory + import.meta.env.VITE_API_CREATE_CATEGORY_INVENTORY,
    create_product: ruta_apis_inventory + import.meta.env.VITE_API_CREATE_PRODUCT
}

export const clientRoutes = {
    read_clients: ruta_apis_clients + import.meta.env.VITE_API_GET_CLIENTS,
    create_client: ruta_apis_clients + import.meta.env.VITE_API_CREATE_CLIENTS,
    delete_client: ruta_apis_clients + import.meta.env.VITE_API_DELETE_CLIENTS
}