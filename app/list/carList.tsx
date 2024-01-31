'use client'

import { useEffect } from "react";
import list from './list.module.scss'
import Link from "next/link";
import Image from "next/image";

// import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FiChevronLeft, FiChevronDown, FiGrid, FiList } from "react-icons/fi";



import { useAppSelector, useAppDispatch } from "@/store/hook"
import { setChoose } from '@/store/slice/chooseCar';
import { useCarData } from "@/hook/useData";



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

      <div className={list.Nav}>
        {/* 버튼들 */}
        <div className={list.btns}>
          {/* 조건 다시설정하러가기 */}
          {/* <Link href={'/search'} className={`${list.btn} ${list.selec}`}>
            <p><FiChevronLeft /></p>
          </Link> */}

          {/* 브랜드 */}
          <div className={`${list.btn} ${list.brand}`}>
            <p>{selectBrand} <FiChevronDown /></p>
          </div>

          {/* 세그먼트 */}
          <div className={`${list.btn} ${list.segment}`}>
            <p>{selectSeg} <FiChevronDown /></p>
          </div>

          {/* 정렬 */}
          <div className={`${list.btn} ${list.sort}`}>
            <p><FaSortAmountDownAlt /></p>
          </div>

        </div>
      </div>
      {/* Car Section */}
      <div className={`${list.section}`}>
        {
          chooseCar.map((car, i)=> (
            <Link href={'/detail'} className={`${list.box}`} key={i}>
              <Image 
                className={`${list.img}`} 
                src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                alt={car.name.en}
                width={360}
                height={153}
              />
              <p>{car.name.kr}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}