"use client"

import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Footer = () => {
  const iconsize = 28;
const currentPath = usePathname();
  return (
    <div className='border-t-2 border-gray-400 w-full fixed bottom-0 h-14 pt-2 flex justify-center 
    /shadow-inner shadow-black/'>
      <Link className='w-1/3' href={'/'}>
        <FiSearch size={iconsize} color={currentPath === '/' ? 'orange' : 'gray'} className={`mx-auto w-fit ${currentPath==='/'?'text-orange-600' : 'text-gray-600'}`}/>
        <div className={`text-xs w-fit mx-auto
        ${currentPath==='/'?'text-orange-600' : 'text-gray-600'}
        `}>さがす</div>
      </Link>
      <Link className='w-1/3' href={'/registration'}>
        <CgFileDocument size={iconsize} color={currentPath === '/registration' ? 'orange' : 'gray'} className={`mx-auto w-fit ${currentPath==='/registration'?'text-orange-600' : 'text-gray-600'}` }/>
        <div className={`text-xs w-fit mx-auto
        ${currentPath==='/registration'?'text-orange-600' : 'text-gray-600'}
        `}>登録</div>
      </Link>
      <Link className='w-1/3' href={'/future_user_id'}>
        <AiOutlineUser size={iconsize} color={currentPath === '/future_user_id' ? 'orange' : 'gray'} className={`mx-auto w-fit ${currentPath==='/future_user_id'?'text-orange-600' : 'text-gray-600'}`}/>
        <div className={`text-xs w-fit mx-auto
        ${currentPath==='/future_user_id'?'text-orange-600' : 'text-gray-600'}
        `}>マイページ</div>
      </Link> 
    </div>
  );
}

export default Footer;
