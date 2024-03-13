'use client'

import { useEffect, useState } from "react";
import style from './carlist.module.scss'
import Link from "next/link";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/store/hook"
import { setChoose } from '@/store/slice/carHandle';
import { useCarData } from "@/util/useCarData";
import * as types from '@/types/types'

interface showDetailCars extends types.Car {
  showDetail: boolean;
}

export default function CarList(){
  const carData = useCarData();
  const dispatch = useAppDispatch();
  const [selectBrand, selectSeg] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]
  const chooseCar = useAppSelector( state => state.chooseCar)
  const [cars, setCars] = useState<showDetailCars[]>()
   
  useEffect(()=>{
    if(chooseCar.length===0){
      console.log('비어있음')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carData])

  useEffect(()=>{
    const addShowDetail = chooseCar.map( car => ({
      ...car,
      showDetail: false,
    }))
    // console.log(addShowDetail)
    setCars(addShowDetail)
  }, [carData, chooseCar])

  const handleDetailSec = (id: number) =>{
    // const thisCar = cars?.filter( e =>  e.id === id).map( e => e.showDetail = !e.showDetail)
    const changeShow = cars?.map( car => car.id === id ? { ...car, showDetail: !car.showDetail} : car);
    setCars(changeShow)
  }

  console.log(cars)

  

  return (
    // Car Section
    <div className={`${style.car_section}`}>
      {
        cars?.length!=0 ?
        cars?.map((car, i)=> (
          <div key={i}>
            {/* Car */}
            <div className={style.car_article}>
              <Link className={style.img_ctn} href={`/detail/${car.id}`} >
                {/* 차량 이미지 */}
                <Image
                  className={style.img}
                  src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                  alt={car.name.en}
                  width={360}
                  height={153}
                />
              </Link>
              <div className={style.article}>
                {/* 차량 이름 */}
                <Link className={style.name} href={`/carlist/${car.id}`}>
                  <p>{car.brand.kr}&nbsp;</p>
                  <p>{car.name.kr}</p>
                </Link>

                {/* 펼쳐보기 버튼*/}
                <div onClick={()=>{handleDetailSec(car.id)}} className={style.InfoBtn}>펼쳐보기</div>
              </div>
            </div>
            {/* 펼쳐보기 Info */}
            <div className={ car.showDetail ? `${style.info_section} ${style.show}` : `${style.info_section} ${style.hide}` } >
              {/* info_article 1 */}
              <dl className={style.dl}>
                <dt>가격</dt> <dd>{car.price.min}~{car.price.max}</dd>
                <dt>연료</dt> <dd>{car.fuelTypes.map((fuelType, i) => (<div key={i}>{fuelType}</div>))}</dd>
                <dt>옵션</dt> <dd>1-3</dd>
              </dl>
              {/* info_article 2 */}
              <dl className={style.dl}>
                <dt>옵션</dt> <dd>2-1</dd>
                <dt>옵션</dt> <dd>2-2</dd>
                <dt>옵션</dt> <dd>2-3</dd>
              </dl>
            </div>
          </div>
        ))
        :
        <div>검색된 차량이 없습니다.</div>
      }
    </div>
  )
}