import { useEffect, useState } from 'react';
import { fetchData } from '@/pages/api/getGistData';
import * as types from '@/types/types'
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { setChoose } from '@/store/slice/carHandle';

// chooseCar 변경함수
export const useChoose = () => {
  const dispatch = useAppDispatch();
  const brand = useAppSelector(state => state.selectOption).brand
  const segment = useAppSelector(state => state.selectOption).segment // 차량선택
  const carDataUrl = 'https://gist.githubusercontent.com/pgw6541/3bec1be58457d14aab3e04fea8434458/raw/4076fd0af826abcdecc5a931d43f886a2c78f704/CarData.json'
  useEffect(() => {
    async function getCarData() {
      const carData = await fetchData(carDataUrl);

      if(brand && segment){
        const filter = carData.filter((car: types.Car) => car.segment === segment && car.brand.kr === brand)
        dispatch(setChoose(filter))
      }
      if(brand && !segment){
        const filter = carData.filter((car: types.Car) => car.brand.kr === brand)
        dispatch(setChoose(filter))
      }
      if(!brand && segment){
        const filter = carData.filter((car: types.Car) => car.segment === segment)
        dispatch(setChoose(filter))
      }
      if(!brand && !segment){
        dispatch(setChoose(carData))
      }
    };

    getCarData();

  }, [dispatch, brand, segment])

}
// Gist를 통해 전체 차량 목록 가져오기
export const useCarData = () => {
  const [brandData, setBrandData] = useState<types.Car[]>([]);
  const carDataUrl = 'https://gist.githubusercontent.com/pgw6541/3bec1be58457d14aab3e04fea8434458/raw/4076fd0af826abcdecc5a931d43f886a2c78f704/CarData.json'

  useEffect(()=>{
    const getData = async () => {
      try{
        const getCar = await fetchData(carDataUrl);
        setBrandData(getCar)
        
      } catch(error){ throw console.error('Error', error) }
    };
    getData();
  }, [])

  return brandData;
}
// Gist를 통해 brand 목록 가져오기
export const useBrandData = () => {
  const [brandData, setBrandData] = useState<types.Brands[]>([]);
  const brandDataUrl = 'https://gist.githubusercontent.com/pgw6541/9db3dd7dc7fe2c28d1c529e47b7d062b/raw/b5898483d1f7ae8509e8895350f152470b3b73e5/brandData.json'

  useEffect(()=>{
    const getData = async () => {
      try{
        const getBrand = await fetchData(brandDataUrl);
        setBrandData(getBrand)
        
      } catch(error){ throw console.error('Error', error) }
    };
    getData();
  }, [])

  return brandData;
}
// Gist를 통해 CarData.json에 있는 Segment 종류를 나열하기
export const useSegmentData = () => {
  const [segData, setSegData] = useState<string[]>([]);
  const carDataUrl = 'https://gist.githubusercontent.com/pgw6541/3bec1be58457d14aab3e04fea8434458/raw/4076fd0af826abcdecc5a931d43f886a2c78f704/CarData.json'

  useEffect(()=>{
    const getData = async () => {
      try{
        const getCarData = await fetchData(carDataUrl);
        const getSegment = Array.from( new Set(getCarData.map(e => e.segment)));
        setSegData(getSegment)

      } catch(error){ throw console.error('Error', error) }
    };
    getData();
  }, [])

  return segData ;
}