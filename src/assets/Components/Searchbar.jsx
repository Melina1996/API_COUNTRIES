import React, { useContext, useEffect, useState } from "react";
import { myCountry } from "./Home";

import Search from "../img/search.png";

export default function Searchbar() {

  const { setCountry } = useContext(myCountry);

  const [inputValue, setInputValue] = useState("");

  //in order to make the code more robust, the user's input will be formatted always according to the same style
  function getInput(e) {
    setInputValue(
      e.target.value.charAt(0).toUpperCase() +
        e.target.value.slice(1).toLowerCase()
    );
  }

  return (
    <div
      className={`md:w-[50%] max-[426px]:w-[100%] flex md:justify-start max-[426px]:justify-center items-center py-3`}
    >
      <div className="relative xl:w-[400px] w-[300px]">
        <input
          type="text"
          className={`shadow w-[100%] h-[50px] pl-14 rounded outline-none`}
          placeholder="Search for a country..."
          onChange={(e) => getInput(e)}
        />
        {/* as we have a search-btn, once it is clicked, it updates the "country"-variable that is used to filter */}
        <button
          onClick={() => setCountry(inputValue)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
        >
          <img src={Search} alt="" />
        </button>
      </div>
    </div>
  );
}
