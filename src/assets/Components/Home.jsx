import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import HeaderHome from "./HeaderHome";
import CountryCard from "./CountryCard";
import Searchbar from "./Searchbar";

export const myElement = createContext()

export const myCountry = createContext()


export default function Home() {

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

  const[region,setRegion]= useState("all")

  const[country,setCountry]=useState("")


  return (

    <div className="w-screen flex flex-col justify-center items-center">
      
    <HeaderHome />
    
    <myCountry.Provider value={{ setCountry }}>
        
        <Searchbar />

    </myCountry.Provider>

      <div className="w-[90%] flex flex-wrap justify-center items-center">
        {data &&
          data.map((element, key) => (
            <div key={key} className="flex gap-3">
            {
                element.region.includes(region) && element.name.common.includes(country) ?  
                
                <NavLink key={key} to={`/Info/${key}`}>

                    <myElement.Provider value={{ element }}>

                        <CountryCard />

                    </myElement.Provider>

                </NavLink> 
              : 
               region == "all" && element.name.common.includes(country) ?

               <NavLink key={key} to={`/Info/${key}`}>

               <myElement.Provider value={{ element }}>

                   <CountryCard />

               </myElement.Provider>

           </NavLink>
           : 
           ""

              }
              </div>

          ))}
      </div>
    </div>
  );
}
