'use client'

import list from './list.module.scss'
import { useEffect } from "react";
import Link from "next/link";


import { useAppSelector, useAppDispatch } from "@/redux/hook"
import { setChoose } from "@/redux/slice/chooseCar";
import { useCarData } from "@/hook/useData";



export default function CarList(){
  const carData = useCarData();
  const dispatch = useAppDispatch();
  const [selectBrand, selectSeg] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]
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

      <div className={list.listNav}>
        <div className={list.options}>
          <div>
            {selectBrand ? selectBrand : 'All'}
          </div>
          <div>
          {selectSeg ? selectSeg : 'All'}
          </div>
        </div>
        <div className={list.filtering}>
          <button>연료</button>
          <button>연비순</button>
          <button>가격순</button>
        </div>
      </div>

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