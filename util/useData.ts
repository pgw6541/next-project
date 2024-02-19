'use client'

import { useEffect, useState } from 'react';
import { fetchData } from '@/pages/api/getGistData';
import * as types from '@/types/types'

export const useCarData = () => {
  const [carData, setCarData] = useState<types.Car[]>([]);
  const carDataUrl = 'https://gist.githubusercontent.com/pgw6541/3bec1be58457d14aab3e04fea8434458/raw/4076fd0af826abcdecc5a931d43f886a2c78f704/CarData.json'

  useEffect(()=>{
    const getCarData = async () => {
      try{
        const getCar = await fetchData(carDataUrl);
        setCarData(getCar)
      } catch(error){
        throw console.error('Error', error)
      }
    };
    getCarData();
  }, [])

  return carData; // useCarData()함수에 carData를 리턴
}

export const useBrandData = () => {
  const [brandData, setBrandData] = useState<types.Brands[]>([]);
  const brandDataUrl = 'https://gist.githubusercontent.com/pgw6541/9db3dd7dc7fe2c28d1c529e47b7d062b/raw/b5898483d1f7ae8509e8895350f152470b3b73e5/brandData.json'

  useEffect(()=>{
    const getBrandData = async () => {
      try{
        const getBrand = await fetchData(brandDataUrl);
        setBrandData(getBrand)
        
      } catch(error){
        throw console.error('Error', error)
      }
    };
    getBrandData();
  }, [])

  return brandData ; // useCarData()함수에 carData를 리턴
}