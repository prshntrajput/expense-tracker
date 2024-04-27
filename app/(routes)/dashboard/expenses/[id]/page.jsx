"use client"


import React, { useEffect, useState } from 'react'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import db from '../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/add-expense/AddExpense'
import ExpenseList from '../_components/expense-list/ExpenseList'

const Expense = ({params}) => {
   

    const [budgetInfo,setBudgetInfo]=useState([]);
    const [expenseList,setexpenseList] = useState([]);
    const {user}= useUser();

    useEffect(()=>{
        user&&getBudgetList();
        getExpenseList();
    },[user])
  /** get Budget List **/
    const getBudgetList=async ()=>{
     const result=  await db.select({
        ...getTableColumns(Budgets),totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql `count(${Expenses.id})`.mapWith(Number)}).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id,params.id))
        .groupBy(Budgets.id);
        setBudgetInfo(result[0]);

     }

     /**GET EXPENSE LIST **/

    const getExpenseList = async ()=>{
        const result = (await db.select().from(Expenses).where(eq(Expenses.budgetId,params.id)).orderBy(desc(Expenses.id)))
        
        setexpenseList(result);
    }

  return (
    <div className='p-2'>
        <h2 className='text-2xl font-bold'>My Expenses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2  gap-6 mt-2 mx-4 '>
            {budgetInfo? <BudgetItem budget={budgetInfo}/> : <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
               
                </div>}
                 <AddExpense budgetId={params.id} user={user} refreshData={()=>(getBudgetList())}/>
        </div>
        <ExpenseList list={expenseList} refreshData={()=>getExpenseList()}/>
        
        </div>
  )
}

export default Expense