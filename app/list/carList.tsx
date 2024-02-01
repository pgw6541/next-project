'use client'

import { useEffect } from "react";
import list from './list.module.scss'
import Link from "next/link";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/store/hook"
import { setChoose } from '@/store/slice/chooseCar';
import { useCarData } from "@/hooks/useData";

export default function CarList(){
  const carData = useCarData();
  const dispatch = useAppDispatch();
  const [selectBrand, selectSeg] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]
  const chooseCar = useAppSelector( state => state.chooseCar)
   
  useEffect(()=>{
    if(chooseCar.length===0){
      console.log('비어있음')
      dispatch(setChoose(carData))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carData])

  return (
    <div className="container">
      {/* Car Section */}
      <div className={`${list.section}`}>
        {
          chooseCar.map((car, i)=> (
            <Link href={`/detail/${car.id}`} className={`${list.box}`} key={i}>
              <Image 
                className={`${list.img}`} 
                src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                alt={car.name.en}
                width={360}
                height={153}
              />
              <div>
                <p>{car.name.kr}</p>
                <p>가격 : {car.price.min}~{car.price.max}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}