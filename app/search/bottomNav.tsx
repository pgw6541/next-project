'use client'

import Link from "next/link";

import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setBrand, setSegment } from '@/store/slice/selectOption';
import { setChoose } from '@/store/slice/chooseCar';

// react-icon
import { GrPowerReset } from "react-icons/gr";

import search from "./search.module.scss"

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const chooseCar = useAppSelector(state => state.chooseCar); 

   // 초기화
   const setClear = () => {
    dispatch(setBrand(''))
    dispatch(setSegment(''))
    dispatch(setChoose([]))
   }

  return (
      // 하단 Nav
      <div className={search.bottom}>
        {/* 상태표시창 */}
        <div className={search.status}>
          {
            chooseCar.length===0
            ?
            <div></div>
            :
            <div>{chooseCar.length} 개의 차량이 검색되었습니다.</div>
          }
        </div>
        {/* Category 하단버튼 */}
        <div className={search.bottomBtns}>
          <div onClick={()=>{setClear()}} className={`${search.btn} ${search.reset}`}><GrPowerReset /></div>
          <Link href={'/car'} className={`${search.btn} ${search.complete}`}>보러가기</Link>
        </div>
      </div>
  )
}