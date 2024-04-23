
"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'






const Header = () => {

  const{user,isSignedIn}=useUser();
  return (
    <div>
        <div className='flex items-center justify-between p-4 shadow-md'>
            <Image src={"./logo.svg"} alt='logo' width={42} height={70}/>
            <div className='flex items-center gap-2 justify-center'>
              {isSignedIn ? <UserButton/> :  <Link href={'/sign-in'}><Button  className="bg-blue-700">Get Started</Button></Link> }
           
            
            </div>
        </div>
    </div>
  )
}

export default Header