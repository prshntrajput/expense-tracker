import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='w-full flex p-5 shadow-md items-center justify-between'>
      <div>
        SearchBar
      </div>
       <UserButton/>
    </div>
  )
}

export default DashboardHeader