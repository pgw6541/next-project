'use client'

import { useState, useEffect } from "react";
import style from './carlist.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useChoose, useBrandData, useSegmentData } from "@/util/useCarData";
// redux toolkit
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setBrand, setSegment, setChoose } from '@/store/slice/carHandle';

// react-icon
import { GrPowerReset } from "react-icons/gr";

// Type
import * as types from "@/types/types";

export default function Category() {
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

  // 초기화
  // const setClear = () => {
  //   dispatch(setBrand(''))
  //   dispatch(setSegment(''))
  //   dispatch(setChoose([]))
  // }

  return(
    <div className={style.container}>
      
    </div>
  )
}