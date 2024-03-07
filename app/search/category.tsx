'use client'

import { useState, useEffect } from "react";
import search from './search.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useChoose, useBrandData, useSegmentData } from "@/util/useCarData";
// redux toolkit
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setBrand, setSegment } from '@/store/slice/selectOption';
import { setChoose } from '@/store/slice/chooseCar';
// Components
import Modal from './modal'
// Type
import * as types from "@/types/types";
// react-icon
import { GrPowerReset } from "react-icons/gr";

export default function Category() {
  const brandData = useBrandData(); // 제조사DB
  const segData = useSegmentData();
  const dispatch = useAppDispatch();
  
  const [modalShow, setModalShow] = useState(false); // Modal
  const [modalContent, setModalContent] = useState(''); // Mocal Content
  const [brandList, setBrandList] = useState<types.Brands[]>()  // 브랜드리스트
  const [segmentList, setSegmentList] = useState<string[]>() // 차급리스트
  const [brand, segment] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]; // 브랜드, 차급선택
  const chooseCar = useAppSelector(state => state.chooseCar); // 선택된 차량 목록

  

  // 브랜드목록, 차급 목록 가져오기(비동기)
  useEffect(() => {
    setBrandList(brandData)
    setSegmentList(segData)
  }, [brandData, segData])

  // 선택한 Brand로 변경함수
  const selectBrandHandler = (brand: string) => {
    // console.log('변경: ' + brand)
    dispatch(setBrand(brand))
    
  }
  // 선택한 Segment로 변경함수
  const selectSegmentHandler = (segment: string) => {
    // console.log('변경: ' + segment)
    dispatch(setSegment(segment))
  }

  // 
  useChoose();
  
  // 모달 열고 닫기
  const openModal = (content: string) => {
    setModalContent(content);
    setModalShow(true);
  }
  // 초기화
  const setClear = () => {
    dispatch(setBrand(''))
    dispatch(setSegment(''))
    dispatch(setChoose([]))
  }

  return(
    <div>
      {/* Modal */}
      <Modal show={modalShow} hide={!modalShow} >
        { modalContent === 'brand' &&
          brandList?.map((brand, i)=>(
            <div className={search.modal_img} key={i} onClick={()=>{selectBrandHandler(brand.name.kr); setModalShow(false)}} >
              <Image
              src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${brand.imgUrl}.png`}
              alt={brand.name.kr}
              fill
              sizes="100px, 100px"
              />
            </div>  
          ))
        }
        { modalContent === 'segment' &&
          segmentList?.map((segment, i)=>(
            <div className={search.modal_img} key={i} onClick={()=>{selectSegmentHandler(segment); setModalShow(false)}}>
              <p>{segment}</p>
              {/* <Image
              src={`https://via.placeholder.com/60x60?text=${segment}`}
              alt={segment}
              fill
              sizes="100px, 100px"
              /> */}
            </div>
          ))
        }
        <div className={search.modal_btns}>
            <span className={search.close} onClick={()=>{setModalShow(false)}}>&times;</span>
        </div>
      </Modal>

      {/* 검색창 */}
      <div className={`${search.searchBar} ${search.container} `}>
        <input id='search-input' type="text" placeholder="검색어를 입력하시오" />
      </div>

      {/* 옵션 카테고리 */}
      <ul className={search.container}>
        {/* 제조사 Brand */}
        <li className={search.li} >
          <div onClick={()=>{openModal('brand')}}>
            <div  className={search.title}><span>제조사</span></div>
            <div className={search.selected}>{brand}</div>
          </div>
        </li>
        {/* 차급 Segment */}
        <li className={search.li}>
          <div onClick={()=>{openModal('segment')}}>
            <div className={search.title}><span>차급</span></div>
            <div className={search.selected}>{segment}</div>
          </div>
        </li>
      </ul>

      {/* 하단 Nav */}
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
          <Link href={'/list'} className={`${search.btn} ${search.complete}`}>보러가기</Link>
        </div>
      </div>
    </div>
  )
}