import nav from './nav.module.scss'
import Link from 'next/link';

import { RiHome3Fill, RiUser3Line, RiSearchLine, RiHeart3Fill } from "react-icons/ri";

export default function Nav(){

  return(
    <div className={nav.container}>
      {/* Home */}
      <Link href={'/'}>
        <RiHome3Fill className={nav.icon}></RiHome3Fill>
      </Link>

      {/* Search */}
      <Link href={'/'}>
        <RiSearchLine className={nav.icon}></RiSearchLine>
      </Link>

      {/* Heart */}
      <Link href={'/'}>
        <RiHeart3Fill className={nav.icon}></RiHeart3Fill>
      </Link>

      {/* User */}
      <Link href={'/'}>
        <RiUser3Line className={nav.icon}></RiUser3Line>
      </Link>
    </div>
  )
}