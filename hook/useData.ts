'use client'

import { useEffect, useState } from 'react';
import { fetchCarData } from '@/pages/api/getCarData';
import * as types from '@/types/types'

export const useCarData = () => {

  const [carData, setCarData] = useState<types.Car[]>([]);

  const carDataUrl = 'https://gist.githubusercontent.com/pgw6541/3bec1be58457d14aab3e04fea8434458/raw/4076fd0af826abcdecc5a931d43f886a2c78f704/CarData.json'

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const data = await fetchCarData(carDataUrl);
        setCarData(data)
        
      } catch(error){
        throw console.error('Error', error)
      }
    };
    fetchData();
  }, [])

  return carData; // useCarData()함수에 carData할당
}