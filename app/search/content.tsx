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

// Type
import * as types from "@/types/types";

export default function Content() {
  const brandData = useBrandData(); // 제조사DB
  const segData = useSegmentData();
  const dispatch = useAppDispatch();
  
  const [modalShow, setModalShow] = useState(false); // Modal
  const [modalContent, setModalContent] = useState(''); // Mocal Content
  const [brandList, setBrandList] = useState<types.Brands[]>()  // 브랜드리스트
  const [segmentList, setSegmentList] = useState<string[]>() // 차급리스트
  const [brand, segment] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]; // 브랜드, 차급선택

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
  
  // 모달 열고 닫기
  const openModal = (content: string) => {
    setModalContent(content);
    setModalShow(true);
  }
 

  return(
    <>
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
    </>
  )
}

type ModalProps = {
  show: boolean;
  hide: boolean;
  // onClose: () => void;
  children: React.ReactNode;
}

function Modal({show, hide, children}: ModalProps) {
  // false값이 들어오면 null값을 리턴
  if(hide){
    return null
  }

  return(
    <div className={search.modal}>
      <div className={search.modal_section}>
        <div className={search.modal_content}>
          {children}
        </div>
      </div>
    </div>
  )
}