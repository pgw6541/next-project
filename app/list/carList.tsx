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
        {/* 버튼들 */}
        <div className={list.btns}>
          {/* 조건 다시설정하러가기 */}
          <div className={`${list.btn} ${list.selec}`}></div>

          {/* 브랜드 */}
          <div className={`${list.btn} ${list.brand}`}></div>

          {/* 세그먼트 */}
          <div className={`${list.btn} ${list.segment}`}></div>

          {/* 정렬 */}
          <div className={`${list.btn} ${list.sort}`}></div>

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