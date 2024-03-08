import React from 'react'
import { useContext,useEffect,useState } from 'react'
import axios from "axios";
import { border } from './Info'
import { NavLink } from 'react-router-dom';

export default function BorderCountry() {

    const { element } = useContext(border)

    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

  return (
    <div>

        <button className='shadow p-2 flex justify-center items-center text-center lg:text-[15px] xl:text-[18px]'>{    
          data.map((item, key)=> {
              return(
                  <div key={key} className='flex justify-center items-center text-center'>
                      {
                        //check whether the country code matches one of the countries on my API and then takes it's common name and use it's id in order to redirect to the respective info page
                          item.cca3.includes(element) ? <NavLink to={`/Info/${key}`} className='rounded-full'>{item.name.common}</NavLink> : ""
                      }
                  </div>
              )
          })
        }</button>

    </div>
  )
}
