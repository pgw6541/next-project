'use client'

import { useEffect, useState } from "react"
import { useCarData } from "@/util/useData"
import { useParams } from "next/navigation"
import Image from "next/image"
import view from "./detail.module.scss"
import * as types from "@/types/types"

export default function Content() {
  const carData = useCarData();
  const params = useParams<{ id: string }>()
  const [car, setCar] = useState<types.Car>()

  useEffect(()=>{
    const finding = carData.find(car => String(car.id) === params?.id)
    setCar(finding)
  }, [carData, params])

  return (
    <div>
      {
        car
        ?
        <div className={view.container}>
          <Image
            className={view.img}
            src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
            alt={car.name.en}
            width={360}
            height={153}
          />
          <div className={view.article}>
            <div>{car.brand.kr}</div>
            <p>{car.name.kr}</p>
            {/* 옵션 */}
            <div className={view.option}>

            </div>
          </div>
        </div>
        :
        <div>잘못된 경로로 접근</div>
      }
    </div>
  )
}