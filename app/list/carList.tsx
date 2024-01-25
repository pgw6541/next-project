'use client'

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook"
import { setChoose } from "@/redux/slice/chooseCar";
import { useCarData } from "@/hook/useData";

export default function CarList(){
  const carData = useCarData();
  const dispatch = useAppDispatch();
  const chooseCar = useAppSelector( state => state.chooseCar)
   
  useEffect(()=>{
    if(chooseCar.length===0){
      dispatch(setChoose(carData))
      console.log('비어있음')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carData])

  return (
    <div className="container">
      <div className="listName"></div>
      <div>
        {
          chooseCar.map((car, i)=> (
            <p key={i}>{car.name.kr}</p>
          ))
        }
      </div>
      
    </div>
  )
}