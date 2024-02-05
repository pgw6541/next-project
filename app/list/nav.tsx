'use client'

import list from './list.module.scss'
import Link from "next/link";
// import { FaSortAmountDownAlt } from "react-icons/fa";
// import { FiChevronLeft, FiChevronDown, FiGrid, FiList } from "react-icons/fi";

import { useAppSelector } from '@/store/hook';

export default function Nav() {
  const [selectBrand, selectSeg] = [useAppSelector(state => state.selectOption.brand), useAppSelector(state => state.selectOption.segment)]

  return (
    <div className={list.Nav}>
        {/* 버튼들 */}
        <div className={list.btns}>
          {/* 브랜드 */}
          <div className={`${list.btn} ${list.brand}`}>
            {/* <p>{selectBrand} <FiChevronDown /></p> */}
            <p>{selectBrand}</p>
          </div>

          {/* 세그먼트 */}
          <div className={`${list.btn} ${list.segment}`}>
            {/* <p>{selectSeg} <FiChevronDown /></p> */}
            <p>{selectSeg}</p>
          </div>

          {/* 정렬 */}
          <div className={`${list.btn} ${list.sort}`}>
            {/* <p><FaSortAmountDownAlt /></p> */}
            <p>정렬</p>
          </div>

        </div>
      </div>
  )
}