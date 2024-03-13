'use client'

import { useState, useEffect, useRef } from "react";
import style from './carlist.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useChoose, useBrandData, useSegmentData } from "@/util/useCarData";
// redux toolkit
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setBrand, setSegment, setChoose } from '@/store/slice/carHandle';

// react-icon
import { IoIosArrowDropdown } from "react-icons/io";
// import { GrPowerReset } from "react-icons/gr";

// Type
import * as types from "@/types/types";

export default function Category() {
  const dispatch = useAppDispatch();
  const chooseCar = useAppSelector(state => state.chooseCar);
  const brandData = useBrandData(); // 제조사DB
  const segData = useSegmentData();
  const [brand, segment] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]; // 브랜드, 차급선택

  // 브랜드목록, 차급 목록 가져오기
  const [brandList, setBrandList] = useState<types.Brands[]>([])  // 브랜드리스트
  const [segmentList, setSegmentList] = useState<string[]>([]) // 차급리스트

  // 상태 변수로 드롭다운 메뉴의 표시 여부를 관리
  const [isBrandDropdownVisible, setIsBrandDropdownVisible] = useState(false);
  const [isSegmentDropdownVisible, setIsSegmentDropdownVisible] = useState(false);

  // 드롭다운, 카테고리 요소 참조(useRef)
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const segmentDropdownRef = useRef<HTMLDivElement>(null);

  const toggleBrandDropdown = () => {
    // 현재 드롭다운 상태를 토글
    setIsBrandDropdownVisible(prev => !prev); 
    if (isSegmentDropdownVisible) {
      // 다른 드롭다운이 열려있다면 닫기
      setIsSegmentDropdownVisible(false); 
    }
  };
  const toggleSegmentDropdown = () => {
    // 현재 드롭다운 상태를 토글
    setIsSegmentDropdownVisible(prev => !prev); 
    if (isBrandDropdownVisible) {
      // 다른 드롭다운이 열려있다면 닫기
      setIsBrandDropdownVisible(false); 
    }
  };

  useEffect(() => {
    // 클릭 이벤트 핸들러 정의
    const handleClickOutside = (event: MouseEvent) => {
      // event.target이 EventTarget | null이므로, Node로 타입 단언
      const target = event.target as Node;

      if (brandDropdownRef.current && !brandDropdownRef.current.contains(target) &&
          segmentDropdownRef.current && !segmentDropdownRef.current.contains(target)) {
        setIsBrandDropdownVisible(false);
        setIsSegmentDropdownVisible(false);
      }
    };
  
    // 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
  
    // 클린업 함수
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  
  useEffect(() => {
    setBrandList(brandData)
    setSegmentList(segData)
  }, [brandData, segData])

  // 선택한 Brand로 변경함수
  const brandHandler = (brand: string) => {
    dispatch(setBrand(brand))
  }
  // 선택한 Segment로 변경함수
  const segmentHandler = (segment: string) => {
    dispatch(setSegment(segment))
  }

  // ChooseCar 함수실행
  useChoose()

  return(
    <div className={style.CAT_ctn}>

      {/* 상단 카테고리 버튼 */}
      <div className={style.CAT_box} >
        {/* 브랜드 버튼 */}
        <div className={`${style.btn}`} ref={brandDropdownRef} onClick={toggleBrandDropdown}>
          <div className={style.term__txt}>브랜드</div>
          <div><p className={style.select__txt}>{brand || '전체'}</p></div>
          <IoIosArrowDropdown className={style.arrow__dropdown} />
        </div>
        {/* 브랜드 드롭다운 */}
        {isBrandDropdownVisible && (
          <div className={style.dropdown_content} ref={brandDropdownRef}>
            {
              brandList.map((brand, i) =>(
                <div key={i} className={style.dropdown_item} onClick={()=>{brandHandler(brand.name.kr); toggleBrandDropdown();}}>
                  {brand.name.kr} 
                </div>
              ))
            }
          </div>
        )}
        
        {/* 차종 버튼 */}
        <div className={`${style.btn}`} ref={segmentDropdownRef} onClick={toggleSegmentDropdown}>
          <div className={style.term__txt}>차종</div>
          <div><p className={style.select__txt}>{segment || '전체'}</p></div>
          <IoIosArrowDropdown className={style.arrow__dropdown} />
        </div>
        {/* 차종 드롭다운 */}
        {isSegmentDropdownVisible && (
          <div className={style.dropdown_content} ref={segmentDropdownRef}>
            {
              segmentList.map((seg, i) =>(
                <div key={i} className={style.dropdown_item} onClick={()=>{segmentHandler(seg); toggleSegmentDropdown();} }> {seg} </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}