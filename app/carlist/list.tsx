'use client'

import { useEffect, useState } from "react";
import style from './carlist.module.scss'
import Link from "next/link";
import Image from "next/image";

import { useAppSelector } from "@/store/hook"
import * as types from '@/types/types'

interface showDetailCars extends types.Car {
  showDetail: boolean;
}

export default function CarList(){
  const selectBrand = useAppSelector(state => state.selectOption.brand);
  const selectSeg = useAppSelector(state => state.selectOption.segment);
  const [loadedImages, setLoadedImages] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const chooseCar = useAppSelector( state => state.chooseCar)

  // 카테고리 변경을 감지하고 loadedImages 및 allImagesLoaded를 초기화
  useEffect(() => {
    setLoadedImages(0);
    setAllImagesLoaded(false);
  }, [selectBrand, selectSeg, chooseCar]);

  // 모든 이미지 로드 되었는지 감지
  useEffect(()=>{
    console.log('변경감지')
    // 선택된 차량이 없거나 || 모든 이미지가 로드되지 않았다면 로딩 상태를 false로 설정합니다.
    if (chooseCar.length === 0 || loadedImages !== chooseCar.length) {
      setAllImagesLoaded(false);
    } else {
      setAllImagesLoaded(true);
    }
  }, [loadedImages, chooseCar.length])
  
  // 이미지 로딩 감지 - 완료 핸들러
  const handleImageLoaded = () => {
    setLoadedImages((prev) => prev + 1);
  };
  
  console.log(loadedImages)
  console.log(allImagesLoaded)
  
  return (
    // Car Section
    <div className={`${style.car_section}`}>
      {
        chooseCar ?
        chooseCar.map((car, i)=> (
          <div key={i}>
            {/* Car */}
            {/* 이미지 로딩중 */}
            <div className={style.car_article}>
              <Link className={style.img_ctn} href={`/detail/${car.id}`} >
                {/* 차량 이미지 */}
                <Image
                  className={style.img}
                  src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                  alt={car.name.en}
                  width={360}
                  height={153}
                  onLoadingComplete={handleImageLoaded}
                />
              </Link>
              <div className={style.article}>
                {/* 차량 이름 */}
                {
                  allImagesLoaded 
                  ?
                  (
                    <Link className={style.name} href={`/carlist/${car.id}`}>
                      <p>{car.brand.kr}&nbsp;</p>
                      <p>{car.name.kr}</p>
                    </Link>
                  ) 
                  :
                  (
                    <Link className={style.name} href={`/carlist/${car.id}`}>
                        <p>Brand&nbsp;</p>
                        <p>Car_name</p>
                    </Link>
                  )
                }
              </div>
            </div>
          </div>
        ))
        :
        <div>검색된 차량이 없습니다.</div>
      }
      {/* 이미지 로딩중 표시 */}
      {
        !allImagesLoaded && (
          <div className="loader">
            <div className="spinner">
          </div></div>
        )
      }
    </div>
  )
}