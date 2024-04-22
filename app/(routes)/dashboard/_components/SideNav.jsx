
"use client"
import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideNav = () => {
  const path = usePathname();
  
  const menuList = [{
    id:1,
    name:"Dashboard",
    icon:LayoutGrid,
    path:"/dashboard",
  },

  {
    id:2,
    name:"Budgets",
    icon:PiggyBank,
    path:"/dashboard/budgets"
  },
  {
    id:3,
    name:"Expense",
    icon:ReceiptText,
    path:"/dashboard/expense"
  },
  {
    id:4,
    name:"Upgrade",
    icon:ShieldCheck,
    path:"/dashboard/upgrade"
  }

];

  return (
    <div className='h-screen xl:flex hidden xl:flex-col items-center gap-4 p-2'>
   <Image src={"./logo.svg"} alt='logo' width={70} height={70} className='p-1'/>

   <div className='flex flex-col gap-6 justify-center'>

    {menuList.map((items)=>(<Link href={items.path}><h1 key={items.id} className={`flex gap-1 ${path==items.path && "text-blue-600 bg-blue-100" } hover:bg-blue-200 p-4 rounded-md`}><items.icon/>{items.name}</h1></Link>))}

    <div className='flex gap-4 text-blue-600 fixed bottom-10'>
    <UserButton/>
    <p>Profile</p>
    </div>

   </div>

    </div>
  )
}

export default SideNav