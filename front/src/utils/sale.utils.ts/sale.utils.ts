// sales.utils.ts
import type { Sale } from "../../types";



export function getTotalSalesThisMonth(sales: Sale[]): number {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const salesThisMonth = sales.filter(sale => {
    const saleDate = new Date(sale.fecha);
    return (
      saleDate.getMonth() === currentMonth &&
      saleDate.getFullYear() === currentYear
    );
  });
  return salesThisMonth.reduce((sum, sale) => sum + sale.monto, 0);
}

// 👉 clientes únicos

export function logUniqueClientsThisMonth(sales: Sale[]): string[] {

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const salesThisMonth = sales.filter(sale => {
      const saleDate = new Date(sale.fecha);
      return (
        saleDate.getMonth() === currentMonth &&
        saleDate.getFullYear() === currentYear
      );
    });

    // 👉 clientes únicos por nombre
    const clientesUnicos = Array.from(
      new Set(salesThisMonth.map(sale => sale.cliente_nombre))
    );

    return clientesUnicos
    
    
}