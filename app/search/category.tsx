'use client'

import { useState, useEffect } from "react";
import { useCarData } from "@/hook/useData";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { setBrand, setSegment } from '@/redux/slice/selectedCar';
import search from './search.module.scss';
import Image from 'next/image';
import Link from 'next/link';

// Components
import Modal from './modal'

// Type
import { Car } from "@/types/types";

interface CarData {
  brand : {
    kr: string,
    en: string,
  },
  imgUrl: string;
}

interface Brand {
  brand : {
    kr: string,
    en: string,
  },
  imgUrl: string;
}

export default function Category() {
  const carData = useCarData(); // 자동차DB
  const [selectedCar, dispatch] = [useAppSelector(state => state.selectedCar), useAppDispatch()]; // redux
  const [brands, setBrands] = useState<Brand[]>()  // 브랜드리스트
  const [segments, setSegments] = useState<string[]>() // 차급리스트
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // 브랜드목록, 차급 목록 가져오기(비동기)
  useEffect(() => {
    const uniqueBrands: Brand[] = [];
    const seenBrands: { [key: string]: boolean } = {};
    
    // 브랜드 추가되어도 리스트 자동추가
    carData.forEach((car: CarData) => {
      if (!seenBrands[car.brand.kr]) {
        uniqueBrands.push({
          brand : {
            kr: car.brand.kr,
            en: car.brand.en.toLowerCase().replaceAll(' ','_'),
          },
          imgUrl: car.imgUrl
        });
        seenBrands[car.brand.kr] = true;
      }
    });
    // 필요에 따라 상위 N개의 요소만 가져오기 나중(6을 매개변수로 바꾼뒤 더보기 기능 만들기)
    // const limitedBrands = uniqueBrands.slice(0, 6);
    const limitedBrands = uniqueBrands;

    // segmenct 가져오기
    const seg = Array.from( new Set(carData.map(e => e.segment)));

    setBrands(limitedBrands)
    setSegments(seg)
  }, [carData])

  // Brand 변경함수
  const selectBrandHandler = (brand: string) => {
    console.log('변경: ' + brand)
    dispatch(setBrand(brand))
  }
  // Segment 변경함수
  const selectSegmentHandler = (brand: string) => {
    console.log('변경: ' + brand)
    dispatch(setSegment(brand))
  }

  // 제조사, 차급 선택시 선택완료 버튼에 차량 갯수 표시 및 0개라면 비활성화 기능
  // 아무것도 선택하지않았다면 차량 전체 목록
  const [filterBrand, setFilterBrand] = useState<Car[]>(carData);
  const [filterSeg, setFilterSeg] = useState<Car[]>(carData);
  const [chooseCar, setChooseCar] = useState<Car[]>(carData);

  useEffect(() => {
    setFilterBrand(carData)
    setFilterSeg(carData)
    setChooseCar(carData)
  }, [carData])

  useEffect(() => {
    if(selectedCar.brand!=''){
      const filterBrand = carData.filter((car, i)=> car.brand.kr === selectedCar.brand)
      setFilterBrand(filterBrand);
    } else {
      setFilterBrand(carData)
    }
  }, [carData, selectedCar.brand]) // 변경함수에서 변경감지
   
  useEffect(() => {
    if(selectedCar.segment!=''){
      const filterSegment = carData.filter((car, i)=> car.segment === selectedCar.segment)
      setFilterSeg(filterSegment)
    } else {
      setFilterSeg(carData)
    }
  }, [carData, selectedCar.segment]) // 변경함수에서 변경감지

  
  useEffect(() => {
    if(selectedCar.brand!='' && selectedCar.segment===''){
      setChooseCar(filterBrand)
    }
    if(selectedCar.brand==='' && selectedCar.segment!=''){
      setChooseCar(filterSeg)
    }
    if(selectedCar.brand!='' && selectedCar.segment!=''){
      setChooseCar(filterBrand?.filter( e => e.segment === selectedCar.segment));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carData, filterBrand, filterSeg])
  
  // 모달 열고 닫기
  const openModal = (content: string) => {
    setModalContent(content);
    setModalShow(true);
  }

  return(
    <div>
      {/* Modal */}
      <Modal show={modalShow} hide={!modalShow} >
        { modalContent === 'brand' &&
          brands?.map((brand, i)=>(
            <div className={search.modal_img} key={i} onClick={()=>{selectBrandHandler(brand.brand.kr); setModalShow(false)}} >
              <Image
              src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/logo/${brand.brand.en}.png`}
              alt={brand.brand.kr}
              fill
              sizes="100px, 100px"
              />
            </div>  
          ))
        }
        { modalContent === 'segment' &&
          segments?.map((segment, i)=>(
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
            <div className={search.selected}>{selectedCar.brand}</div>
          </div>
        </li>
        {/* 차급 Segment */}
        <li className={search.li}>
          <div onClick={()=>{openModal('segment')}}>
            <div className={search.title}><span>차급</span></div>
            <div className={search.selected}>{selectedCar.segment}</div>
          </div>
        </li>
      </ul>

      {/* 선택완료 버튼 */}
      <div className={search.btns}>
        <div className={search.reset}>초기화</div>
        <Link href={'/list'} className={search.complete}>{chooseCar?.length}개의 차량 보러가기</Link>
      </div>

      
    </div>
  )
}