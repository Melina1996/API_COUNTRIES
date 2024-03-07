import React, { useContext } from 'react'
import { myElement } from './Home'

export default function CountryCard() {

    const { element } = useContext(myElement)

  return (
    <div className="flex flex-col justify-center items-center w-[280px] h-[350px] text-black shadow-xl rounded">
        <div className='h-[50%] w-[100%] flex justify-center items-center'>
            <img src={element.flags.png} className='object-cover h-[100%] w-[100%] rounded-t' alt="" />
        </div>
        <div className='h-[50%] w-[80%] flex flex-col justify-center items-start'>
            <h1 className='font-semibold text-lg pb-1'>{element.name.common}</h1>
            <div>
                <p className='text-[15px]'><span className='font-semibold'>Population:</span> {element.population}</p>
                <p className='text-[15px]'><span className='font-semibold'>Region:</span> {element.region}</p>
                <p className='text-[15px]'><span className='font-semibold'>Capital:</span> {element.capital}</p>
            </div>
        </div>
  </div>
  )
}
