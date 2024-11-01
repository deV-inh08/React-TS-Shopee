import React from "react"
import classNames from "classnames"

interface NextPageProps {
  page: number
  onPageChange: (page: number) => void
  totalPages: number
  setNextPage: React.Dispatch<React.SetStateAction<number>>
}


const Nextpage = ({page, onPageChange, totalPages, setNextPage}: NextPageProps) => {
  const RANGE = 2;
  const handlePreviousPage = () => {
    if(page > 1) {
      onPageChange(page - 1)
    }
  }

  const handleNextPage = () => {
    if(page < totalPages) {
      onPageChange(page + 1)
    }
  }

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = () => {
      if(!dotBefore) {
        dotBefore = true
        return (
          <span className='px-3 py-4 cursor-pointer'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = () => {
      if(!dotAfter) {
        dotAfter = true
        return (
          <span className='px-3 py-4 cursor-pointer'>
            ...
          </span>
        )
      }
      return null
    }
    return (
      Array(totalPages)
      .fill(0)
      .map((_, index) => {
        let pageNumber = index + 1;
        if(page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < totalPages - RANGE + 1) {
          return renderDotAfter()
        } else if (page > RANGE * 2 + 1 && page < totalPages - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore()
          } else if(pageNumber > page + RANGE && pageNumber < totalPages - RANGE + 1) {
            return renderDotAfter()
          }
        } else if(page >= totalPages - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore()
        } else if(page >= totalPages) {
          return pageNumber = 13
        }
        return (
          <span
            key={index}
            className={classNames('px-3 py-4 cursor-pointer', {
               "text-white bg-orange": pageNumber === page
            })}
            onClick={() => setNextPage(pageNumber)}
          >
            {pageNumber}
          </span>
        )
      })
    ) 
  }

  return (
    <div className='flex justify-center items-center gap-4 mt-7 '>
      <button onClick={handlePreviousPage} className='h-8 rounded-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <article className='flex items-center gap-3'>
      <article className='flex items-center gap-3'>
        {renderPagination()}
      </article>
      </article>
      <button onClick={handleNextPage} className='h-8 rounded-sm bg-white/60 hover:bg-slate-100 shadow-sm'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
      </button>
    </div>
  )
}

export default Nextpage;
