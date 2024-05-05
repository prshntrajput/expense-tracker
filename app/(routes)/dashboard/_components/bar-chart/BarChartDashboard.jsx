import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({budgetList}) => {
  return (
    <>
    <div className='border rounded-lg p-2'>
      <BarChart width={300} height={300} data={budgetList} margin={{top:4, right:4,left:4,bottom:4}}>

        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="totalSpend" stackId="a" fill='#4845d2'/>
        <Bar dataKey="amount" stackId="a" fill='#C3C2FF'/>
      </BarChart>
    </div>


    </>
  )
}

export default BarChartDashboard