import { Expenses } from '../../../../../../utils/schema'
import db from '../../../../../../utils/dbConfig'
import { Trash } from 'lucide-react'
import React from 'react'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

const ExpenseList = ({list, refreshData}) => {

    const deleteExpense = async (expense)=>{
        const result = await db.delete(Expenses).where(eq(Expenses.id,expense.id)).returning();

        if(result){
            toast("Expense Deleted");
            refreshData();
        }
    }

  return (
    <div className='px-2'>
        <h2 className='font-bold'>Expense List</h2>
        <div className='grid grid-cols-4 bg-slate-200 p-2 rounded-sm font-bold'>
            <h2>Name</h2>
            <h2>Amount</h2>
            <h2>Date</h2>
            <h2>Action</h2>
        </div>
        {list.map((expense,index)=>( <div className='grid grid-cols-4 bg-slate-100 text-sm p-2 rounded-sm font-semibold'>
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            <h2>{expense.createdAt}</h2>
            <Trash className='text-red-600 mx-4' onClick={()=>(deleteExpense(expense))} expesne={expense}/>
        </div>))}
    </div>
  )
}

export default ExpenseList