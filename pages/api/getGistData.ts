import { Car } from '@/types/types'

async function fetchData(gitsUrl: string): Promise<Car[]>{
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

export { fetchData };
