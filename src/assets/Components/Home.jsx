import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import HeaderHome from "./HeaderHome";

export const myData = createContext();

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

  return (
    <div className="w-screen flex flex-col justify-center items-center gap-4">
      
    <HeaderHome />

      <div className="w-[90%] flex flex-wrap justify-between items-center gap-6">
        {data &&
          data.map((element, key) => (
            <NavLink key={key} to={`/Info/${key}`}>
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
            </NavLink>
          ))}
      </div>
    </div>
  );
}
