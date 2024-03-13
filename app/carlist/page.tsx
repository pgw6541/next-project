import List from "./list"
import Category from "./category"

export default function Car() {
  return (
    <>
      <Category />
      <div className="container">
        <List />
      </div>
    </>
  )
}