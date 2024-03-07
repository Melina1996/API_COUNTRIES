import React from 'react'
import { useContext } from 'react'
import { myRegion } from './Home'

export default function DropDown() {

    const { setRegion } = useContext(myRegion)

  return (
    
    <div className='flex flex-col absolute top-[55px] w-[250px] h-max bg-white rounded shadow-lg'>
      
      <ul className='flex flex-col gap-4 py-4'>
        <button onClick={()=>setRegion("All")} className='hover:font-bold flex justify-start pl-10'><p>All</p></button>
        <button onClick={()=>setRegion("Africa")}  className='hover:font-bold flex justify-start pl-10'><p>Africa</p></button>
        <button onClick={()=>setRegion("America")}  className='hover:font-bold flex justify-start pl-10'><p>America</p></button>
        <button onClick={()=>setRegion("Asia")}  className='hover:font-bold flex justify-start pl-10'><p>Asia</p></button>
        <button onClick={()=>setRegion("Europe")}  className='hover:font-bold flex justify-start pl-10'><p>Europe</p></button>
        <button onClick={()=>setRegion("Oceania")}  className='hover:font-bold flex justify-start pl-10'><p>Oceania</p></button>
      </ul>
      
    </div>
  )
}
