import type { Expense } from "../../types/expenses.types";


export function getTotalExpensesThisMonth(expenses: Expense[]): number {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const expensesThisMonth = expenses.filter(sale => {
    const saleDate = new Date(sale.fecha);
    return (
      saleDate.getMonth() === currentMonth &&
      saleDate.getFullYear() === currentYear
    );
  });

  return expensesThisMonth.reduce((sum, sale) => sum + sale.monto, 0);
}
