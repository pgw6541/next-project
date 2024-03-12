'use client'

import search from "./search.module.scss"

export default function SearchBar() {
  return (
    // 검색창
    <div className={search.searchBar}>
      <input id='search-input' type="text" placeholder="검색어를 입력하시오" />
    </div>
  )
}