import search from "./search.module.scss"

// Components
import SearchBar from './searchBar'
import Content from "./content";
import BottomSeet from "./bottomSeet";

export default function Search() {
  return (
    <>
      <div className="container">
        {/* <SearchBar /> */}
        <Content />
      </div>
      <BottomSeet />
    </>
  )
}