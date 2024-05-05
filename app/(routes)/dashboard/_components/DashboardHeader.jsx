import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='w-full flex p-5 shadow-md items-center justify-between'>
      <div className='font-bold text-xl text-blue-400 hover:text-blue-800 rounded-md'>
        Expense Tracker
      </div>
       <UserButton/>
    </div>
  )
}

export default DashboardHeader