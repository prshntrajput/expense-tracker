"use client"

import React,{useEffect, useState} from 'react'
import {Button} from "../../../../../../components/ui/button"
import EmojiPicker from 'emoji-picker-react';
import {PenBoxIcon} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,Label
} from "../../../../../../@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog';
import { Input } from '../../../../../../@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import db from '../../../../../../utils/dbConfig';
import { Budgets } from '../../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({budgetInfo,refreshData}) => {
      const [EmojiIcon,setEmojiIcon] = useState(budgetInfo?.icon);
    const [EmojiPick,setEmojiPick]=useState(false);

    const [BudgetName, setBudgetName] = useState(); 
    const [UserBudget, setUserBudget]= useState();
    const {user}=useUser();

    const onUpdateBudget = async ()=>{
      const result = await db.update(Budgets).set({
        name:BudgetName,
        amount:UserBudget,
        icon:EmojiIcon
      }).where(eq(Budgets.id,budgetInfo.id)).returning();

      if(result){
        refreshData();
        toast("Budget Updated")
      }
    }

    
  
  return (
    <div>
        <div className='overflow-y-auto'>
        <Dialog>
      <DialogTrigger asChild>
       <Button className="flex gap-2"> <PenBoxIcon/> Edit </Button>
      </DialogTrigger>
      <div className='relative'>
      <div className='absolute inset-x-0 top-0'>
      <DialogContent className="sm:max-w-[425px] bottom-[40%] xl:left-[19%]">
        <DialogHeader>
          <DialogTitle>Update Budget</DialogTitle>
          <DialogDescription>
           <Button className="bg-gray-400" onClick={()=>(setEmojiPick(!EmojiPick))}>{EmojiIcon}</Button>
           <EmojiPicker className='-mb-80 z-50' open={EmojiPick} onEmojiClick={(e)=>{setEmojiIcon(e.emoji) , setEmojiPick(false) }}/>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
           
            <Input className="col-span-3" defaultValue={budgetInfo?.name}  placeholder="e.g. Home, Decor" onChange={(e)=>(setBudgetName(e.target.value))} />
           
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            
            <Input className="col-span-3" type="number" defaultValue={budgetInfo?.amount} placeholder="e.g. 5000" onChange={(e)=>(setUserBudget(e.target.value))} />
          </div>
        </div>
        <DialogClose>
        <DialogFooter>
          <Button disabled={!(BudgetName&&UserBudget)} onClick={()=>(onUpdateBudget())} className="bg-blue-600">Submit</Button>
        </DialogFooter>
        </DialogClose>
      </DialogContent>
      </div>
      </div>

    </Dialog>
    </div>
    </div>
  )
}

export default EditBudget