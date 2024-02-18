'use client'

import { useParams } from "next/navigation"
import view from "./detail.module.scss"
import { useCarData } from "@/hooks/useData"
import { useEffect, useState } from "react"
import * as types from "@/types/types"
import Image from "next/image"

export default function View() {
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
        <div>
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
              <div className={view.option}>
                
              </div>
            </div>
          </div>
        </div>
        :
        <div>잘못된 경로로 접근</div>
      }
    </div>
  )
}