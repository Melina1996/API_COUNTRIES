import React, { useContext } from 'react'
import { myElement } from './Home'

export default function CountryCard() {

    const { element } = useContext(myElement)

  return (
    <div className="flex flex-col justify-center items-center w-[300px] h-[450px] text-black shadow-xl rounded p-2">
    <div>
        <img src="" alt="" />
    </div>
    <div>
        <h1>{element.name.common}</h1>
        <div>
            <p>Population: {element.population}</p>
            <p>Region: {element.region}</p>
            <p>Capital: {element.capital}</p>
        </div>
    
    </div>
  </div>
  )
}
