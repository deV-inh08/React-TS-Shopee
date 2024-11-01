import React from 'react'

const SortProductList = () => {
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
            <div className='flex items-center flex-wrap gap-2'>
                <p>Sắp xếp theo</p>
                <button className='h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center'>Phổ biến</button>
                <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center'>Mới nhất</button>
                <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center'>Bán chạy</button>
                <select className='h-8 px-4 capitalize bg-white text-sm hover:bg-slate-100 text-center' name="" id="">
                    <option value="" disabled>Giá</option>
                    <option value="price:asc">Giá: Thấp đến cao</option>
                    <option value="price:desc">Giá: Cao đến thấp</option>
                </select>
            </div>
            <div className='flex items-center'>
            {/* <article>
                <span className='text-orange mr-2'>
                    1
                </span>
                <span>2</span>
            </article>
            <article>
                <div className='ml-2'>
                    <button className='px-3 h-8 rounded-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button className='px-3 h-8 rounded-sm bg-white/60 hover:bg-slate-100 shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </article> */}
            </div>
        </div>
    </div>
  )
}

export default SortProductList
