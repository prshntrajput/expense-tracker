import { Button } from '../../../../../../components/ui/button';
import { Input } from '../../../../../../@/components/ui/input'
import React, { useState } from 'react'
import db from '../../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../../utils/schema';
import { toast } from 'sonner';

const AddExpense = ({budgetId, user ,refreshData}) => {

    const [expenseName,setexpenseName]= useState();
    const [expenseAmount,setexpenseAmount]= useState();

     const addExpenseInfo = async ()=> {
    const result = await db.insert(Expenses).values({name:expenseName,
        amount:expenseAmount,
        createdAt:user?.primaryEmailAddress?.emailAddress,
        budgetId:budgetId}).returning({insertedId:Budgets.id});

        if(result){

            refreshData();
            toast("New Expense Added");
        }

}

  return (
    <div className='mt-3 border-2 border-slate-200 p-4 rounded-md shadow-md'>
        <h2 className='font-bold'>Add Expense</h2>
        <div className='gap-2 flex flex-col'>
          <div className="grid  items-center gap-4">
               <Input className="col-span-3"  placeholder="e.g. Bedroom, decor" onChange={(e)=>(setexpenseName(e.target.value))} />
          </div>
        <div className="grid items-center gap-4">   
        <Input className="col-span-3" type="number" placeholder="e.g. 4000" onChange={(e)=>(setexpenseAmount(e.target.value))} />
         </div>
        </div>
        <Button disabled={!(expenseName&&expenseAmount)} onClick={()=>(addExpenseInfo())} className="bg-blue-600 mt-2">Add New Expense</Button>
    </div>
  )
}

export default AddExpense