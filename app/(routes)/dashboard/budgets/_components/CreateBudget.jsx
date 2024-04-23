
"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import db from '../../../../../utils/dbConfig';
import { Budgets } from '../../../../../utils/schema';
import { toast } from 'sonner';
import { DialogClose } from '@radix-ui/react-dialog';



const CreateBudget = () => {

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
               toast("New Budget Created")
             }
    }

  return (
    <div className='mt-4'>
         
            <Dialog>
            <DialogTrigger>
                        <div className=' p-4 px-10 bg-blue-200 flex items-center flex-col justify-center border-dashed border-2 border-gray-400 shadow-md gap-2 cursor-pointer hover:bg-blue-300'>
            <h2 className='text-3xl text-blue-600'>+</h2>
            <h2 className='font-bold text-blue-600'>Create New Budget</h2>

        </div>
            </DialogTrigger>
            <div className='xl:w-[50vh] xl:-mb-28'>
            <DialogContent className="xl:w-[50%] z-100  xl:left-[19%]  rounded-md shadow-md">
              <DialogHeader>
                
              <DialogTitle>Create New Budget</DialogTitle>
             <DialogDescription className="">
                <Button className="bg-gray-400" onClick={()=>(setEmojiPick(!EmojiPick))}
                
                >{EmojiIcon}</Button>
                <div className='mt-10'>
                    <EmojiPicker open={EmojiPick} onEmojiClick={(e)=>{setEmojiIcon(e.emoji) , setEmojiPick(false) }}/>
                </div>

                <div className='my-2'>
                    <h2 className='font-bold'>Budget Name</h2>
                    <Input placeholder="e.g. Home, Decor" onChange={(e)=>(setBudgetName(e.target.value))} />
                </div>
               <div className='my-2'>
                    <h2 className='font-bold'>Budget Amount</h2>
                    <Input type="number" placeholder="e.g. 5000" onChange={(e)=>(setUserBudget(e.target.value))} />
                </div>    

                

             </DialogDescription>
             
           </DialogHeader>
           <DialogClose>
           <DialogFooter>
             <Button disabled={!(BudgetName&&UserBudget)} onClick={()=>(onCreatedBudget())} className="bg-blue-600">Submit</Button>
           </DialogFooter>
           </DialogClose>
          </DialogContent>
          </div>
               </Dialog>
</div>
        
    
  )
}

export default CreateBudget