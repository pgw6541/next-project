'use client'

import search from './search.module.scss'
import { useState, useEffect } from "react";
import Image from 'next/image'
import { useCarData } from "@/hook/useData"
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { setBrand, setSegment, setFuelType } from '@/redux/slice/selectedCar';

// Components
import Modal from './modal'

interface Car {
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
  const [brands, setBrands] = useState<Brand[]>() 
  const [segments, setSegments] = useState<string[]>()

  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const uniqueBrands: Brand[] = [];
    const seenBrands: { [key: string]: boolean } = {};

    carData.forEach((car: Car) => {
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
    // 필요에 따라 상위 N개의 요소만 가져오기
    const limitedBrands = uniqueBrands.slice(0, 6);
    const seg = Array.from( new Set(carData.map(e => e.segment)));

    console.log(limitedBrands)

    setBrands(limitedBrands)
    setSegments(seg)
  
  }, [carData])

  const selectBrandHandler = (brand: string) => {
    console.log('변경: ' + brand)
    dispatch(setBrand(brand))
  }
  const selectSegmentHandler = (brand: string) => {
    console.log('변경: ' + brand)
    dispatch(setSegment(brand))
  }

  const openModal = (content: string) => {
    setModalContent(content);
    setModalShow(true);
  }

  console.log(selectedCar)

  return(
    <div>
      {/* Modal */}
      <Modal show={modalShow} hide={!modalShow} >
      <div className={search.modal_btns}>
          <span className={search.close} onClick={()=>{setModalShow(false)}}>&times;</span>
        </div>
        { modalContent === 'brand' &&
          brands?.map((brand, i)=>(
            <div key={i} onClick={()=>{selectBrandHandler(brand.brand.kr); setModalShow(false)}} >
              <Image
              src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/logo/${brand.brand.en}.png`}
              width={60}
              height={60}
              alt={brand.brand.kr}
              />
            </div>  
          ))
        }
        { modalContent === 'segment' &&
          segments?.map((segment, i)=>(
            <div key={i} onClick={()=>{selectSegmentHandler(segment); setModalShow(false)}}>
              <Image
              src={`https://via.placeholder.com/60x60?text=${segment}`}
              className={search.modal_img}
              width={60}
              height={60}
              alt={segment}
              />
            </div>  
          ))
        }
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
        <button className={search.reset}>초기화</button>
        <button className={search.complete}>선택완료</button>
      </div>

      
    </div>
  )
}