import React, { useContext } from 'react'
import { myCountry } from './Home'

export default function Searchbar() {

    const { setCountry }= useContext(myCountry)

  return (
    <div className='w-[50%] flex justify-start items-center py-3'>

            <input type="text" className='shadow w-[400px] h-[50px]' placeholder='Search for a country...' onChange={(e)=>setCountry(e.target.value)}/>

    </div>
  )
}
