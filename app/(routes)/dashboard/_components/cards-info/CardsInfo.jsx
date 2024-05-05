import { PiggyBank, Receipt, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardsInfo = ({budgetList}) => {

    const [totalBudget,settotalBudget]=useState(0);
    const [totalSpend,settotalSpend]=useState(0);
    useEffect(()=>{
       CalculateCardInfo();
    },[budgetList])

    const CalculateCardInfo = async()=>{
        let totalBudget_=0;
        let totalSpend_=0;
        budgetList.forEach(element => {
            totalBudget_=totalBudget_+Number(element.amount);
            totalSpend_=totalSpend_+element.totalSpend;
          settotalBudget(totalBudget_);
          settotalSpend(totalSpend_);
          
            
        });

    }
  return (
    <div className='mt-2 p-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2'>
        <div className='px-5 py-2 flex items-center justify-between rounded-md border-2'>
            <div>
                <h2  className="font-bold">Total Budget</h2>
                <h2 className='font-bold'>{totalBudget}</h2>
            </div>
            <PiggyBank className='text-white p-1 bg-blue-600 rounded-lg'/>
        </div>
        <div className='px-5 py-2 flex items-center justify-between rounded-md border-2'>
            <div>
                <h2  className="font-bold">Total Spend</h2>
                <h2 className='font-bold'>{totalSpend}</h2>
            </div>
            <Receipt className='text-white p-1 bg-blue-600 rounded-lg'/>
        </div>
        <div className='px-5 py-2 flex items-center justify-between rounded-md border-2'>
            <div>
                <h2  className="font-bold">No. of Budget</h2>
                <h2 className='font-bold'>{budgetList?.length}</h2>
            </div>
            <Wallet className='text-white p-1 bg-blue-600 rounded-lg'/>
        </div>
    </div>
  )
}

export default CardsInfo