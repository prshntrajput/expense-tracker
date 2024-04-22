import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'


const layout = ({children}) => {
  return (
    <div>
      
        <div className='fixed w-64 shadow-md '>
            <SideNav/>
        </div>
        <div className='xl:ml-64'>
          <DashboardHeader/>
        {children}
          </div>
        </div>
  )
}

export default layout