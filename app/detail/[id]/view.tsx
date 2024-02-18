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

  // console.log(carData)
  // console.log(params?.id)


  return (
    <div>
      {
        car
        ?
        <div>
          <Image
            className={view.img }
            src={`https://raw.githubusercontent.com/pgw6541/CarSite/main/src/images/${car.imgUrl}.png`}
            alt={car.name.en}
            width={360}
            height={153}
          />
          <div>{car.name.kr}</div>
        </div>
        :
        <div>잘못된 경로로 접근</div>
      }
    </div>
  )
}