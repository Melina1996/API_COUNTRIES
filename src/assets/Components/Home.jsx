import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import HeaderHome from "./HeaderHome";
import CountryCard from "./CountryCard";
import Searchbar from "./Searchbar";
import DropDown from "./Dropdown";
import dropdownIcon from "./../img/dropdown.png"

export const myElement = createContext()

export const myCountry = createContext()

export const myRegion = createContext()


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

  const[region,setRegion]= useState("All")

  const[country,setCountry]=useState("")

  const[openMenu,setMenu]=useState(false)


  return (

    <div className="w-screen flex flex-col justify-center items-center font-nunito">
      
    <HeaderHome />

    <div className="w-[90%] flex justify-center items-center">

        <myCountry.Provider value={{ setCountry }}>
            
            <Searchbar />

        </myCountry.Provider>

        <div className="relative w-[50%] flex justify-end text-[15px]">

            <button onClick={()=>setMenu(!openMenu)} className="w-[250px] h-[50px] shadow flex justify-center items-center gap-6"><p>Filter by Region</p><img src={dropdownIcon} className="w-[18px] h-[18px]" alt="" /></button>
            
        {
            openMenu ? 
            <myRegion.Provider value={{ setRegion }}>

                <DropDown /> 
            
            </myRegion.Provider> :

            ""
        }
        </div>
        


    </div>
    


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
               region == "All" && element.name.common.includes(country) ?

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
