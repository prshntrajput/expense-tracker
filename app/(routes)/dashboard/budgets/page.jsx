import React from 'react'
import BudgetList from './_components/BudgetList'

const Budget = () => {
  return (
    <div className='p-8 overflow-y-auto'>
        <h2 className='font-bold text-3xl'>My Budgets</h2>
        <BudgetList/>
    </div>
  )
}

export default Budget