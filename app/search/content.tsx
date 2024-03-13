'use client'

import { useState, useEffect } from "react";
import search from './search.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useChoose, useBrandData, useSegmentData } from "@/util/useCarData";
// redux toolkit
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setBrand, setSegment, setChoose } from '@/store/slice/carHandle';
import { showSeet } from "@/store/slice/stateHandle";

// react-icon
import { GrPowerReset } from "react-icons/gr";

// Type
import * as types from "@/types/types";

export default function Content() {
  const dispatch = useAppDispatch();
  const chooseCar = useAppSelector(state => state.chooseCar);
  
  const brandData = useBrandData(); // 제조사DB
  const segData = useSegmentData();
  const [brandList, setBrandList] = useState<types.Brands[]>()  // 브랜드리스트
  const [segmentList, setSegmentList] = useState<string[]>() // 차급리스트
  const [brand, segment] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]; // 브랜드, 차급선택

  // 브랜드목록, 차급 목록 가져오기(비동기)
  useEffect(() => {
    setBrandList(brandData)
    setSegmentList(segData)
  }, [brandData, segData])

  // ChooseCar 함수실행
  useChoose()

  // 선택한 Brand로 변경함수
  const selectBrandHandler = (brand: string) => {
    dispatch(setBrand(brand))
  }
  // 선택한 Segment로 변경함수
  const selectSegmentHandler = (segment: string) => {
    dispatch(setSegment(segment))
  }

  const handleSeet = () => {
    dispatch(showSeet())
  }

  // 초기화
  const setClear = () => {
    dispatch(setBrand(''))
    dispatch(setSegment(''))
    dispatch(setChoose([]))
  }
  
  return(
    <div>
      {/* 옵션 카테고리 */}
      <ul>
        {/* 제조사 Brand */}
        <li className={search.li} >
          <div onClick={()=>{}}>
            <div  className={search.title}><span>제조사</span></div>
            <div className={search.selected}>{brand}</div>
          </div>
        </li>
        {/* 차급 Segment */}
        <li className={search.li}>
          <div onClick={()=>{}}>
            <div className={search.title}><span>차급</span></div>
            <div className={search.selected}>{segment}</div>
          </div>
        </li>
      </ul>

      {/* 하단 버튼 */}
      <div className={search.bottom}>
        <div className={search.bottomBtns}>
          <div onClick={()=>{setClear()}} className={`${search.btn} ${search.reset}`}><GrPowerReset /></div>
          <Link href={'/car'} className={`${search.btn} ${search.complete}`}>보러가기</Link>
        </div>
      </div>
    </div>
  )
}