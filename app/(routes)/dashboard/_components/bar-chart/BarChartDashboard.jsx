import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({budgetList}) => {
  return (
    <>
    <div className='border rounded-lg p-2'>
      <ResponsiveContainer width={"80%"} height={300}>
      <BarChart data={budgetList} margin={{top:4, right:4,left:4,bottom:4}}>

        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Bar dataKey="totalSpend" stackId="a" fill='#4845d2'/>
        <Bar dataKey="amount" stackId="a" fill='#C3C2FF'/>
      </BarChart>
      </ResponsiveContainer>
    </div>


    </>
  )
}

export default BarChartDashboard