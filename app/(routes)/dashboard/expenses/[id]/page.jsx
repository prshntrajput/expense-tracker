"use client"


import React, { useEffect, useState } from 'react'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import db from '../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/add-expense/AddExpense'
import ExpenseList from '../_components/expense-list/ExpenseList'
import { Button } from '../../../../../components/ui/button'
import { PenBoxIcon, Trash } from 'lucide-react'
import EditBudget from "../_components/editBudget/EditBudget"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const Expense = ({params}) => {
   

    const [budgetInfo,setBudgetInfo]=useState([]);
    const [expenseList,setexpenseList] = useState([]);
    const {user}= useUser();
    const route= useRouter();

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
        
        const result = await db.select().from(Expenses).where(eq(Expenses.budgetId,params.id)).orderBy(desc(Expenses.id))
        
        setexpenseList(result);
    }

    /** delete budget */
    const deleteBuget= async ()=>{
      const deleteExpense = await db.delete(Expenses).where(eq(Expenses.budgetId,params.id))

      if(deleteExpense){
          const result = await db.delete(Budgets).where(eq(Budgets.id,params.id)).returning();
          console.log(result)
      }
       toast("Budget Deleted")
       route.replace('/dashboard/budgets')
    }





  return (
    <div className='p-2'>
        <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses
        <div className='flex items-center gap-2'>
         <AlertDialog>
  <AlertDialogTrigger>  <h2 className='flex text-sm items-center justify-center gap-2 bg-red-500 md:xl:mr-2 px-2 py-1 rounded-md text-white cursor-pointer font-semibold'><Trash/> Delete</h2></AlertDialogTrigger>
  <AlertDialogContent className="md:xl:w-[50%] md:xl:left-[20%] shadow-md   bottom-[50%] rounded-md">
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex gap-4 items-center justify-between">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>(deleteBuget())}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
 <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetList()}/>
 </div>


        </h2>
       
       
        <div className='grid grid-cols-1 md:grid-cols-2  gap-6 mt-2 mx-4 '>
            {budgetInfo? <BudgetItem budget={budgetInfo}/> : <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
               
                </div>}
                 <AddExpense budgetId={params.id} user={user} refreshData={()=>(getExpenseList())}/>
        </div>
        <ExpenseList list={expenseList} refreshData={()=>getExpenseList()}/>
        
        </div>
  )
}

export default Expense