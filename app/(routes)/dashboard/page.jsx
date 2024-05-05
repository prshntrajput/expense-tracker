
"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import DashboardHeader from './_components/DashboardHeader'
import CardsInfo from "../dashboard/_components/cards-info/CardsInfo"
import { eq, getTableColumns, sql } from 'drizzle-orm'
import db from '../../../utils/dbConfig'
import { Budgets, Expenses } from '../../../utils/schema'

const page = () => {
 
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
    
      <div>
        <div className='p-5'>
          <h1 className='text-2xl font-bold'>
          Hi,<span className='font-semibold text-blue-600 text-lg'>{user?.fullName}</span>
          </h1>
          <p className='text-sm text-gray-600'>Let's manage your expense</p></div>

          <CardsInfo budgetList={budgets}/>
      </div>
  )
}


export default page