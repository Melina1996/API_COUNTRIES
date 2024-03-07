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
        <div className="w-[90%] h-[400px] flex justify-center items-center">
          <div className="w-[50%] h-[100%] flex justify-start items-start">
            <img
              src={data[id].flags.png}
              className="object-cover h-[90%] w-[90%]"
              alt=""
            />
          </div>

          <div className="w-[50%] h-[100%] flex flex-col items-start justify-start gap-4">

            <h1 className="font-semibold text-[30px]">
              {data[id].name.common}
            </h1>

            <div className="w-[100%] flex justify-center items-center">
              <div className="w-[50%]">
                <p><span className="font-semibold">Native Name:</span> </p>
                <p><span className="font-semibold">Population:</span> {data[id].population}</p>
                <p><span className="font-semibold">Region:</span> {data[id].region}</p>
                <p><span className="font-semibold">Sub Region:</span> {data[id].subregion}</p>
                <p><span className="font-semibold">Capital:</span> {data[id].capital}</p>
              </div>

              <div className="w-[50%]">
              <p><span className="font-semibold">Top Level Domain:</span> {data[id].tld}</p>
              <p><span className="font-semibold">Currencies:</span></p>
              <p><span className="font-semibold">Languages:</span> {Object.values(data[id].languages)}</p>
              </div>
            </div>

            <div className="flex justify-center items-center w-[100%]">

                <div className="w-[25%] flex justify-start">
                    <p className="pr-2 font-semibold">Border Countries: </p>
                </div>

                <div className="w-[75%] flex flex-wrap">

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
