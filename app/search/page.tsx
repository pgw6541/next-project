import search from "./search.module.scss"

// Components
import SearchBar from './searchBar'
import Content from "./content";
import BottomNav from "./bottomNav"

export default function Search() {
  return (
    <div className={search.container}>
      <SearchBar />
      <Content />
      <BottomNav />
    </div>
  )
}