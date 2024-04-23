import React from 'react'
import CreateBudget from './CreateBudget'

const BudgetList = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        <CreateBudget/>
    </div>
  )
}

export default BudgetList