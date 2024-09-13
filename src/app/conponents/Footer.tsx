import React from 'react'
import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

const Footer = () => {
  return (
    <div className=' bg-white border-t-2 h-14  border-black fixed bottom-0 w-full px-16 pt-2 flex justify-between
    /*線を影みたいにするならshadow-inner shadow-black*/'>
      <a className=''><FiSearch size={28}/></a>
      <div className='justify-center'><CgFileDocument size={28}/></div>
      <div className=''><AiOutlineUser size={28}/></div>
    </div>
  )
}

export default Footer