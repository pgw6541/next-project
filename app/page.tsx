import Link from "next/link";
import main from "./main.module.scss"


export default function Home() {

  return (
    <div>
      {/* 검색링크 */}
      <section className={main.link_container}>
        <Link href={'/search'}><p>검색</p></Link>
      </section>
    </div>
  )
}
