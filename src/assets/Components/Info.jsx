import React, { createContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import HeaderHome from "./HeaderHome";
import BorderCountry from "./BorderCountry";
import Arrow from "../img/arrow.png";

export const border = createContext();

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

  //Currencies-property: the issue is that our API-elements all have a currencies-property & following nested objects for each of the currencies, but the name of the nested objects change depending on the respective currency. In order to be able to access the deepest level of nested objects, I use the reduce-method and loop through the objects as if it was an array. With the index [0] I specify that I want the first property ("name" and nor "symbol"). UseEffect in order to constantly update the currency-state, whenever a new Country is read
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    data[id]
      ? setCurrency(
          Object.entries(data[id].currencies).reduce(
            (acc, [key, obj]) => ({
              ...acc,
              [key]: Object.values(obj)[0],
            }),
            {}
          )
        )
      : "";
  }, [data[id]]);

  //See above: use an useEffect here to update my variable for the native name of the country. With the index "1" I indicate that I want to read the 2nd property in all of the objects on this level.
  const [nativeName, setNativeName] = useState("");

  useEffect(() => {
    data[id]
      ? setNativeName(
          Object.entries(data[id].name.nativeName).reduce(
            (acc, [key, obj]) => ({
              ...acc,
              [key]: Object.values(obj)[1],
            }),
            {}
          )
        )
      : "";
  }, [data[id]]);

  //as there are several objects nested at the same level, here I read the last one
  const [lastElement, setLastElement] = useState("");

  useEffect(() => {
    data[id]
      ? setLastElement(
          nativeName[
            Object.keys(nativeName)[Object.keys(nativeName).length - 1]
          ]
        )
      : "";
  }, [nativeName]);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <HeaderHome />

      <div className="w-[90%] h-[100px] flex justify-start items-center">
        <button className="flex justify-center items-center shadow rounded h-[40px] px-6 hover:bg-[#F5F5F5ff]">
          <Link to={`/API_COUNTRIES`}>
            <span className="flex justify-center items-center gap-1">
              <img src={Arrow} className="w-[20px] h-[20px]" alt="" />
              <p className="text-[17px]">Back</p>
            </span>
          </Link>
        </button>
      </div>

      {data[id] ? (
        <div className="w-[90%] xl:h-[400px] lg:h-[300px] flex lg:flex-row flex-col justify-center items-center xl:gap-24 lg:gap-16 md:gap-10 md:h-[600px]">
          <div className="xl:w-[45%] lg:w-[50%] w-[90%] lg:h-[100%] max-[426px]:h-[230px] md:h-[50%] flex justify-start items-center">
            <img
              src={data[id].flags.png}
              className="object-fit xl:h-[80%] xl:w-[90%] lg:w-[100%] lg:h-[90%] md:h-[90%] md:w-[70%] rounded max-[426px]:w-[100%] max-[426px]:h-[80%]"
              alt=""
            />
          </div>

          <div className="xl:w-[55%] lg:w-[50%] w-[90%] md:h-[50%] lg:h-[100%] flex flex-col items-start justify-center gap-4 md:pb-10 max-[426px]:pb-10">
            <h1 className="font-semibold xl:text-[30px] md:text-[25px] pb-2 max-[426px]:text-[25px]">
              {data[id].name.common}
            </h1>

            <div className="w-[100%] flex flex-row max-[426px]:flex-col justify-center items-start max-[426px]:gap-3">
              <div className="md:w-[50%] max-[426px]:w-[100%] flex flex-col gap-3 lg:text-[15px] xl:text-[18px]">
                <p>
                  <span className="font-semibold">Native Name:</span>{" "}
                  {lastElement}
                </p>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {data[id].population}
                </p>
                <p>
                  <span className="font-semibold">Region:</span>{" "}
                  {data[id].region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span>{" "}
                  {data[id].subregion}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {data[id].capital}
                </p>
              </div>

              <div className="md:w-[50%] max-[426px]:w-[100%] flex flex-col gap-3 lg:text-[15px] xl:text-[18px]">
                <p>
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {data[id].tld}
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span>{" "}
                  {Object.values(currency) + " "}
                </p>
                <p className="flex flex-wrap">
                  <span className="font-semibold">Languages:</span>{" "}
                  {/* I read all the keys' values of my object*/}
                  {Object.values(data[id].languages) + " "}
                </p>
              </div>
            </div>

            {/* only if the respective element has a "borders"-property, I will display the neighbouring countries */}
            {data[id].borders ? (
              <div className="flex md:flex-row max-[426px]:flex-col justify-center items-center w-[100%] gap-4 md:gap-0">
                <div className="md:w-[25%] max-[426px]:w-[100%] flex justify-start items-start">
                  <p className="pr-2 font-semibold lg:text-[15px] xl:text-[18px]">
                    Border Countries:{" "}
                  </p>
                </div>

                <div className="md:w-[75%] max-[426px]:w-[100%] flex flex-wrap gap-2">
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
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
