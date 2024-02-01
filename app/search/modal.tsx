'use client'

import search from "./search.module.scss"

type ModalProps = {
  show: boolean;
  hide: boolean;
  // onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({show, hide, children}: ModalProps){
  // false값이 들어오면 null값을 리턴
  if(hide){
    return null
  }

  return(
    <div className={search.modal}>
      <div className={search.modal_section}>
        <div className={search.modal_content}>
          {children}
        </div>
      </div>
    </div>
  )
}