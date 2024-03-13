'use client'

import { useState, useEffect } from "react";
import search from './search.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useChoose, useBrandData, useSegmentData } from "@/util/useCarData";
// redux toolkit
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setBrand, setSegment } from '@/store/slice/selectOption';

// Type
import * as types from "@/types/types";

export default function Content() {
  const brandData = useBrandData(); // 제조사DB
  const segData = useSegmentData();
  const dispatch = useAppDispatch();

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
      

    </div>
  )
}