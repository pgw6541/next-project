import Link from "next/link";
import main from "./main.module.scss"


export default function Home() {

  return (
    <div>
      {/* 검색링크 */}
      <div className={main.link_container}>
        <Link href={'/search'}>검색</Link>
      </div>
    </div>
  )
}
