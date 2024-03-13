import nav from './nav.module.scss'
import Link from 'next/link';

import { RiHome5Line, RiUser3Line, RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa6";

export default function Nav(){

  return(
    <div className={nav.container}>
      {/* Home */}
      <Link href={'/'}>
        <RiHome5Line className={nav.icon}></RiHome5Line>
      </Link>

      {/* Search */}
      <Link href={'/carlist'}>
        <RiSearchLine className={nav.icon}></RiSearchLine>
      </Link>

      {/* Heart */}
      <Link href={'/'}>
        <FaRegHeart className={nav.icon}></FaRegHeart>
      </Link>
    </div>
  )
}