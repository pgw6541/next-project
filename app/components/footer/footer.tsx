'use client'

import { usePathname } from 'next/navigation';
import footer from './footer.module.scss';

export default function Footer() {

  const pathname = usePathname();

  if(pathname === '/search'){
    return null;
  }

  return(
    <footer></footer>
  )
}