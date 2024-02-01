'use client'

import { useState, useEffect } from "react";
import { useCarData, useBrandData } from "@/hooks/useData";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import search from './search.module.scss';
import Image from 'next/image';
import Link from 'next/link';

// redux toolkit
import { setBrand, setSegment } from '@/store/slice/selectOption';
import { setChoose } from '@/store/slice/chooseCar';
// Components
import Modal from './modal'
// Type
import * as types from "@/types/types";

export default function Category() {
  const carData = useCarData(); // 자동차DB
  const brandData = useBrandData(); // 제조사DB
  const selectOption = useAppSelector(state => state.selectOption); // 차량선택
  const chooseCar = useAppSelector(state => state.chooseCar);
  const dispatch = useAppDispatch();
  // Modal
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [brandList, setBrandList] = useState<types.Brands[]>()  // 브랜드리스트
  const [segmentList, setSegmentList] = useState<string[]>() // 차급리스트
  
  // 브랜드목록, 차급 목록 가져오기(비동기)
  useEffect(() => {
    setBrandList(brandData)

    // segmenct 가져오기
    const seg = Array.from( new Set(carData.map(e => e.segment)));
    setSegmentList(seg)
  }, [carData, brandData])

  // 선택한 Brand로 변경함수
  const selectBrandHandler = (brand: string) => {
    console.log('변경: ' + brand)
    dispatch(setBrand(brand))
  }
  // 선택한 Segment로 변경함수
  const selectSegmentHandler = (brand: string) => {
    console.log('변경: ' + brand)
    dispatch(setSegment(brand))
  }

  // 제조사, 차급 선택시 선택완료 버튼에 차량 갯수 표시 및 0개라면 비활성화 기능
  // 아무것도 선택하지않았다면 차량 전체 목록
  const [filterBrand, setFilterBrand] = useState<types.Car[]>(carData);
  const [filterSeg, setFilterSeg] = useState<types.Car[]>(carData);

  useEffect(() => {
    if(selectOption.brand!=''){
      const filterBrand = carData.filter((car, i)=> car.brand.kr === selectOption.brand)
      setFilterBrand(filterBrand);
    } else {
      setFilterBrand(carData)
    }
  }, [carData, selectOption.brand]) // 변경함수에서 변경감지
   
  useEffect(() => {
    if(selectOption.segment!=''){
      const filterSegment = carData.filter((car, i)=> car.segment === selectOption.segment)
      setFilterSeg(filterSegment)
    } else {
      setFilterSeg(carData)
    }
  }, [carData, selectOption.segment]) // 변경함수에서 변경감지

  // 선택한 옵션 store.chooseCar에 할당
  useEffect(() => {
    if(selectOption.brand!='' && selectOption.segment!=''){
      dispatch(setChoose(filterBrand.filter( e => e.segment === selectOption.segment)));
    } else if(selectOption.brand===''){
      dispatch(setChoose(filterSeg))
    } else if(selectOption.segment===''){
      dispatch(setChoose(filterBrand))
    }
  }, [carData, filterBrand, filterSeg, dispatch, selectOption.brand, selectOption.segment])
  
  // 모달 열고 닫기
  const openModal = (content: string) => {
    setModalContent(content);
    setModalShow(true);
  }
  // 초기화
  const setClear = () => {
    dispatch(setBrand(''))
    dispatch(setSegment(''))
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
            <div className={search.selected}>{selectOption.brand}</div>
          </div>
        </li>
        {/* 차급 Segment */}
        <li className={search.li}>
          <div onClick={()=>{openModal('segment')}}>
            <div className={search.title}><span>차급</span></div>
            <div className={search.selected}>{selectOption.segment}</div>
          </div>
        </li>
      </ul>

      {/* Category 하단버튼 */}
      <div className={search.bottomBtns}>
        <div onClick={()=>{setClear()}} className={`${search.btn}, ${search.reset}`}>초기화</div>
        
        {/* 옵션 선택에 따라 상이한 버튼 */}
        {
          selectOption.brand==='' && selectOption.segment===''
          ?
          <div>옵션을 선택해주세요</div>
          :
          chooseCar.length===0
          ?
          <div>선택한 옵션에 차량이 없습니다</div>
          :
          <Link href={'/list'} className={`${search.btn}, ${search.complete}`}>
            {chooseCar?.length}개의 차량 보러가기
          </Link>
        }
      </div>



    </div>
  )
}