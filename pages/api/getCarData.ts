import { Car } from '@/types/types'


// gits에서 자동차 데이터 가져오기
// const gitsUrl = 'https://gist.githubusercontent.com/pgw6541/3bec1be58457d14aab3e04fea8434458/raw/489ee75632f5d987cbc6e423bacce6ec8af481d6/CarData.json'

async function fetchCarData(gitsUrl: string): Promise<Car[]>{
  try {
    const res = await fetch(gitsUrl);
    if(!res.ok){
      throw new Error(`Error: ${res.status}`);
    }
    const data: Car[] = await res.json();
    return data;

  } catch (error){
    console.error('데이터를 불러오지 못했습니다.', error);
    throw error
  }
}


// MongoDB


export { fetchCarData };
