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

    <div className="w-[90%] flex md:flex-row max-[426px]:flex-col justify-center items-center max-[426px]:pb-4">

        <myCountry.Provider value={{ setCountry }}>
            
            <Searchbar />

        </myCountry.Provider>

        <div className="relative md:w-[50%] max-[426px]:w-[100%] flex md:justify-end max-[426px]:justify-center text-[15px]">

            <button onClick={()=>setMenu(!openMenu)} className="xl:w-[250px] md:w-[180px] w-[300px] h-[50px] shadow flex justify-center items-center gap-6"><p>Filter by Region</p><img src={dropdownIcon} className="w-[18px] h-[18px]" alt="" /></button>
            
        {
            openMenu ? 
            <myRegion.Provider value={{ setRegion }}>

                <DropDown /> 
            
            </myRegion.Provider> :

            ""
        }
        </div>
        


    </div>
    


      <div className="w-[90%] h-auto flex flex-wrap max-[426px]:justify-center md:justify-between items-center gap-4">
        {data &&
          data.map((element, key) => (

                element.region.includes(region) && element.name.common.includes(country) ?  

                <div key={key} className="lg:w-[280px] w-[300px] lg:h-[350px] h-[370px]">

                
                <NavLink key={key} to={`/Info/${key}`}>

                    <myElement.Provider value={{ element }}>

                        <CountryCard />

                    </myElement.Provider>

                </NavLink> 
                </div>

              : 
               region == "All" && element.name.common.includes(country) ?

               <div key={key} className="lg:w-[280px] w-[300px] lg:h-[350px] h-[370px]">

               <NavLink key={key} to={`/Info/${key}`}>

               <myElement.Provider value={{ element }}>

                   <CountryCard />

               </myElement.Provider>

           </NavLink>
           </div>

           : 
           ""

            

          ))}
      </div>
    </div>
  );
}
