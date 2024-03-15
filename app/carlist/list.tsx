'use client'

import style from './carlist.module.scss'
import Link from "next/link";
import Image from "next/image";

import { useAppSelector } from "@/store/hook"

export default function CarList(){
  const chooseCar = useAppSelector( state => state.chooseCar)
  
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
                />
              </Link>
              <div className={style.article}>
                {/* 차량 이름 */}
                  <Link className={style.name} href={`/carlist/${car.id}`}>
                    <p>{car.brand.kr}&nbsp;</p>
                    <p>{car.name.kr}</p>
                  </Link>
              </div>
            </div>
          </div>
        ))
        :
        <div>검색된 차량이 없습니다.</div>
      }
    </div>
  )
}