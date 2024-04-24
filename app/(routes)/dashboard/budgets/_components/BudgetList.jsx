"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import db from '../../../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

const BudgetList = () => {


    const [budgets,setBudgets]=useState([]);
    const {user}= useUser();

    useEffect(()=>{
        user&&getBudgetList();
    },[user])

   

    
    const getBudgetList=async ()=>{
     const result=  await db.select({
        ...getTableColumns(Budgets),totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql `count(${Expenses.id})`.mapWith(Number)}).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress)).groupBy(Budgets.id);
        setBudgets(result);
     }
  return (
    <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2'>
        <CreateBudget/>

        {budgets.map((budget)=>(<BudgetItem key={budget.id} budget={budget}/>))}
    </div>
  )
}

export default BudgetList