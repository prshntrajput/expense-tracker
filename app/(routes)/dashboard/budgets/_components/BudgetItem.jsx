import Link from 'next/link';
import React from 'react'

const BudgetItem = ({budget}) => {

    const calcPercentage= ()=>{
        const perc = (budget.totalSpend/budget.amount)*100
        return perc.toFixed(2)
    }
  return (
    <Link href={"/dashboard/expenses/"+budget.id} className=' rounded-md border-2 border-dashed shadow-md h-[140px] border-gray-400 p-2 mt-4'>
    <div className=' flex justify-between '>
        <div className='flex gap-2'>
            <h2>{budget.icon}</h2>
            <div className='flex flex-col justify-center'>
            <h1 className='text-sm font-semibold'>{budget.name}</h1>
            <h4 className='text-xs font-semibold'>{budget.totalItem} Item</h4>
            </div>
        </div>
        <div>
          <h1 className='text-lg font-bold text-purple-800'>{budget.amount}</h1></div>
    </div>

        <div className='flex justify-between mt-2'>
            <h2 className='text-xs font-semibold'>{budget.totalSpend? budget.totalSpend : 0} Spend</h2>
            <h2 className='text-xs font-semibold'>{budget.amount-budget.totalSpend} Remaining</h2>
        </div>
    <div className='w-full h-2 bg-slate-400 rounded-full mt-4'>
            <div className=' bg-purple-600 h-2 rounded-full' style={{width:`${calcPercentage()}%`}}>

            </div>
    </div>
    </Link>
    
  )
}

export default BudgetItem;