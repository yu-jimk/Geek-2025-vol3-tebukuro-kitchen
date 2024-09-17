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
    <div className='border-t-2 border-black w-full fixed bottom-0 h-14 pt-2 flex justify-center 
    /shadow-inner shadow-black/'>
      <Link className='w-1/3' href={'/'}>
        <FiSearch size={iconsize} color={currentPath === '/'||'/favorites' ? 'orange' : 'gray'} />
      </Link>
      <Link className='w-1/3' href={'/registration'}>
        <CgFileDocument size={iconsize} color={currentPath === '/registration' ? 'orange' : 'gray'} />
      </Link>
      <Link className='' href={'/future_user_id'}>
        <AiOutlineUser size={iconsize} color={currentPath === '/future_user_id' ? 'orange' : 'gray'} />
      </Link> 
    </div>
  );
}

export default Footer;
