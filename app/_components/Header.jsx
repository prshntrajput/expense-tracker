import Image from 'next/image'
import React from 'react'
import { logo } from "../../public/logo.svg"
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <div>
        <div className='flex items-center justify-between p-4 shadow-md'>
            <Image src={"./logo.svg"} alt='logo' width={42} height={70}/>
            <Button className="bg-blue-700">Get Started</Button>
        </div>
    </div>
  )
}

export default Header