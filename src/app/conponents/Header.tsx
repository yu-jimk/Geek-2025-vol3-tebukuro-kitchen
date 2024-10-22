import { FiSearch } from "react-icons/fi";
import SearchRecipe from "./SearchRecipe";

type headerProp={
    pathName : string
}

const Header = (prop:headerProp) => {
    const {pathName} = prop

    console.log('This`s Header')

  return (
    
    <div className='bg-white w-full p-2'>
        {/* <div className="mt-2 flex items-center bg-gray-200 rounded-2xl">
            <FiSearch size={32} color="gray" className="p-1 ms-3 h-12"/>
            <input className='ps-2 pe-6 w-full  text-xl border-spacing-4 bg-gray-200 border-gray-50 rounded-2xl focus:outline-none' 
            type='text' 
            placeholder= 'レシピをさがす' />
        </div> */}
        <div className='flex'>
            <div className='w-1/2 px-4 flex justify-center '>
                <button className={`px-4 py-2 ${pathName === '/' ? 'border-b-4 border-orange-400' : 'border-b-4 border-white'}`}
                onClick={() => location.href='/'}>
                    レシピ
                </button>
            </div>

            <div className='w-1/2 px-4 flex justify-center '>
                <button className={`px-4 py-2 ${pathName === '/favorites' ? 'border-b-4 border-orange-500' : 'border-b-4 border-white'}`}
                onClick={()=> location.href='/favorites'}>
                    お気に入り
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header