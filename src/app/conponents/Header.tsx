type headerProp={
    pathName : string
}

const Header = (prop:headerProp) => {
    const {pathName} = prop
  return (
    <div className='bg-white border-b-2 border-black w-full p-3'>

        <input className=' p-2 bg-gray-200 mt-3 mb-5 w-full text-2xl border-spacing-4 border-gray-50 rounded-2xl focus:outline-none' 
        type='text' 
        placeholder= 'レシピをさがす' />

        <div className='flex'>
            <div className='w-1/2 px-4 flex justify-center '>
                <button className={`px-4 py-2 ${pathName === '/' ? 'border-b-4 border-orange-500' : 'border-b-4 border-white'}`}
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