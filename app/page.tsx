import Link from "next/link";


export default function Home() {

  return (
    <div>
      {/* 검색링크 */}
      <section className='link_container'>
        <Link href={'/search'}><p>검색</p></Link>
      </section>
    </div>
  )
}
