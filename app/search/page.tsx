import search from "./search.module.scss"

// Components
import SearchBar from './searchBar'
import Content from "./content";

export default function Search() {
  return (
    <>
      <div className="container">
        {/* <SearchBar /> */}
        <Content />
      </div>
    </>
  )
}