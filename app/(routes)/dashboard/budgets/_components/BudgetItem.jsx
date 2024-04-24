import React from 'react'

const BudgetItem = ({budget}) => {
  return (
    <div className=' rounded-md border-2 border-dashed shadow-md border-gray-400 p-2 mt-4'>
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
        
        <div className='w-[40%] bg-purple-800 h-2 rounded-full'></div>
    </div>
    </div>
    
  )
}

export default BudgetItem;