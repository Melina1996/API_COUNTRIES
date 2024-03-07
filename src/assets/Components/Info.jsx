import React, { createContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fromJSON } from "postcss";

import HeaderHome from "./HeaderHome";
import BorderCountry from "./BorderCountry";
import Arrow from "../img/arrow.png"

export const border = createContext()

export default function Info() {
  const { id } = useParams();

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
    <div className="w-screen flex flex-col justify-center items-center">
      <HeaderHome />

      <div className="w-[90%] h-[100px] flex justify-start items-center">
        <button className="flex justify-center items-center shadow rounded h-[40px] px-6">
          <Link to={`/`}><span className="flex justify-center items-center gap-1"><img src={Arrow} className="w-[20px] h-[20px]" alt="" /><p className="text-[17px]">Back</p></span></Link>
        </button>
      </div>

      {data[id] ? (
        <div className="w-[90%] xl:h-[400px] lg:h-[300px] flex lg:flex-row flex-col justify-center items-center gap-4">
          <div className="lg:w-[50%] w-[90%] lg:h-[100%] flex justify-start items-center">
            <img
              src={data[id].flags.png}
              className="object-cover xl:h-[80%] lg:h-[75%] w-[100%]"
              alt=""
            />
          </div>

          <div className="lg:w-[50%] w-[90%] lg:h-[100%] flex flex-col items-start justify-center gap-4">

            <h1 className="font-semibold text-[30px]">
              {data[id].name.common}
            </h1>

            <div className="w-[100%] flex flex-row max-[426px]:flex-col justify-center items-start">
              <div className="md:w-[50%] max-[426px]:w-[100%]">
                <p><span className="font-semibold">Native Name:</span>{Object.keys(data[id].name.nativeName)}</p>
                <p><span className="font-semibold">Population:</span> {data[id].population}</p>
                <p><span className="font-semibold">Region:</span> {data[id].region}</p>
                <p><span className="font-semibold">Sub Region:</span> {data[id].subregion}</p>
                <p><span className="font-semibold">Capital:</span> {data[id].capital}</p>
              </div>

              <div className="md:w-[50%] max-[426px]:w-[100%]">
              <p><span className="font-semibold">Top Level Domain:</span> {data[id].tld}</p>
              <p><span className="font-semibold">Currencies: {Object.keys(data[id].currencies) + " "}</span></p>
              <p><span className="font-semibold">Languages:</span> {Object.values(data[id].languages) + " "}</p>
              </div>
            </div>

            <div className="flex md:flex-row max-[426px]:flex-col justify-center items-center w-[100%] gap-4 md:gap-0">

                <div className="md:w-[25%] max-[426px]:w-[100%] flex justify-start">
                    <p className="pr-2 font-semibold">Border Countries: </p>
                </div>

                <div className="md:w-[75%] max-[426px]:w-[100%] flex flex-wrap">

                    {data[id].borders
                        ? data[id].borders.map((element, key) => {
                            return (
                            <div key={key}>
                                <border.Provider value={{ element }}>
                    
                                    <BorderCountry />

                                </border.Provider>
                            </div>
                            );
                        })
                        : ""}

                </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
