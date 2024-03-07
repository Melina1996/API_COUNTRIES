import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect} from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { fromJSON } from 'postcss'

export default function Info() {

    const { id } = useParams()

    const[data,setData]=useState([])

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
    <div className='w-screen h-screen flex justify-center items-center'>

        {/* {data.data ? (
            <div className="flex flex-col justify-center items-center gap-5 w-[400px] text-center">
            <h1 className="font-semibold text-xl">US PRICE:${data.data[id].price_usd}</h1>
            <button className="bg-black text-white p-4 rounded">
                <Link to={`/`}>RETURN</Link>
            </button>
            </div>
        ) : (
            <p>Loading...</p>
        )} */}

    </div>
  )
}
