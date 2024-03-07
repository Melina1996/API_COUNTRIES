import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import HeaderHome from "./HeaderHome";
import CountryCard from "./CountryCard";

export const myElement = createContext()


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

  const [region,setRegion]= useState("Africa")

  return (

    <div className="w-screen flex flex-col justify-center items-center">
      
    <HeaderHome />

      <div className="w-[90%] flex flex-wrap justify-center items-center">
        {data &&
          data.map((element, key) => (
            <div>
            {
                element.region.includes(region) ?  
                
                <NavLink key={key} to={`/Info/${key}`}>

                    <myElement.Provider value={{ element }}>

                        <CountryCard />

                    </myElement.Provider>

                </NavLink> : 

                region == "all" ?

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
