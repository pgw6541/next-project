'use client'

import { useEffect, useState } from "react";
import list from './list.module.scss'
import Link from "next/link";
import Image from "next/image";

import { useAppSelector, useAppDispatch } from "@/store/hook"
import { setChoose } from '@/store/slice/chooseCar';
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
      dispatch(setChoose(carData))
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

  return (
    <div className="container">
      {/* Car Section */}
      <div className={`${list.car_container}`}>
        {
          cars ?
          cars.map((car, i)=> (
            <div key={i}>
              {/* Car */}
              <div className={list.car_section}>
                <Link className={list.img_ctn} href={`/detail/${car.id}`} >
                  {/* 차량 이미지 */}
                  <Image
                    className={list.img}
                    src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
                    alt={car.name.en}
                    width={360}
                    height={153}
                  />
                </Link>
                <div className={list.article}>
                  {/* 차량 이름 */}
                  <Link className={list.name} href={`/detail/${car.id}`}>
                    <p>{car.brand.kr}&nbsp;</p>
                    <p>{car.name.kr}</p>
                  </Link>

                  {/* 펼쳐보기 버튼*/}
                  <div onClick={()=>{handleDetailSec(car.id)}} className={list.InfoBtn}>펼쳐보기</div>
                </div>
              </div>
              {/* Info */}
              <div className={ car.showDetail ? `${list.info_section} ${list.show}` : `${list.info_section} ${list.hide}` } >
                {/* info_article 1 */}
                <dl className={list.dl}>
                  <dt>가격</dt> <dd>{car.price.min}~{car.price.max}</dd>
                  <dt>연료</dt> <dd>{car.fuelTypes.map((fuelType, i) => (<div key={i}>{fuelType}</div>))}</dd>
                  <dt>옵션</dt> <dd>1-3</dd>
                </dl>
                {/* info_article 2 */}
                <dl className={list.dl}>
                  <dt>옵션</dt> <dd>2-1</dd>
                  <dt>옵션</dt> <dd>2-2</dd>
                  <dt>옵션</dt> <dd>2-3</dd>
                </dl>
              </div>
            </div>
          ))
          // 선택한 옵션이 없이 경로로 진입했을 떄
          :
          <div>선택한 값이 없거나 잘못된 경로로 접근하였습니다.</div>
        }
      </div>
    </div>
  )
}