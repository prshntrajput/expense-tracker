
"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,Label
} from "../../../../../@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import db from '../../../../../utils/dbConfig';
import { Budgets } from '../../../../../utils/schema';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';



const CreateBudget = ({refreshData}) => {

    const [EmojiIcon,setEmojiIcon] = useState("😊");
    const [EmojiPick,setEmojiPick]=useState(false);

    const [BudgetName, setBudgetName] = useState(); 
    const [UserBudget, setUserBudget]= useState();
    const {user}=useUser();

    const onCreatedBudget = async()=>{
        const result = await db.insert(Budgets).
        values({name:BudgetName,
             amount:UserBudget,
             createdBy:user?.primaryEmailAddress?.emailAddress, 
             icon:EmojiIcon}).returning({insertedId:Budgets.id})

             if(result){
              refreshData();
               toast("New Budget Created")
             }
    }

  return (
    
     <div className='overflow-y-auto'>
        <Dialog>
      <DialogTrigger asChild>
        <div className=' p-4 px-10 bg-blue-200 flex items-center flex-col justify-center border-dashed border-2 border-gray-400 shadow-md gap-2 cursor-pointer hover:bg-blue-300 mt-4'>
            <h2 className='text-3xl text-blue-600'>+</h2>
            <h2 className='font-bold text-blue-600'>Create New Budget</h2>
        </div>
      </DialogTrigger>
      <div className='relative'>
      <div className='absolute inset-x-0 top-0'>
      <DialogContent className="sm:max-w-[425px] bottom-[40%] xl:left-[19%]">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>
           <Button className="bg-gray-400" onClick={()=>(setEmojiPick(!EmojiPick))}>{EmojiIcon}</Button>
           <EmojiPicker className='-mb-80 z-50' open={EmojiPick} onEmojiClick={(e)=>{setEmojiIcon(e.emoji) , setEmojiPick(false) }}/>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
           
            <Input className="col-span-3"  placeholder="e.g. Home, Decor" onChange={(e)=>(setBudgetName(e.target.value))} />
           
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            
            <Input className="col-span-3" type="number" placeholder="e.g. 5000" onChange={(e)=>(setUserBudget(e.target.value))} />
          </div>
        </div>
        <DialogClose>
        <DialogFooter>
          <Button disabled={!(BudgetName&&UserBudget)} onClick={()=>(onCreatedBudget())} className="bg-blue-600">Submit</Button>
        </DialogFooter>
        </DialogClose>
      </DialogContent>
      </div>
      </div>

    </Dialog>
    </div>
    

        
    
  )
}

export default CreateBudget;





