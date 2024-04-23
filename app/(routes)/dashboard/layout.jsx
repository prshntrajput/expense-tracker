"use client"

import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import db from "../../../utils/dbConfig";
import { Budgets } from '../../../utils/schema'


const DashboardLayout = ({children}) => {

  const {user} =useUser();
  const router = useRouter();
  const checkUserBudget=async ()=>{
    const result = await db.select().from(Budgets).where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    if(result?.length==0){
      router.replace("/dashboard/budgets")
    }
  }

  useEffect(()=>{
    user&&checkUserBudget();
  },[user])

  return (
    <div>
      
        <div className='fixed w-64 shadow-md '>
            <SideNav/>
        </div>
        <div className='xl:ml-64'>
          <DashboardHeader/>
        {children}
          </div>
        </div>
  )
}

export default DashboardLayout