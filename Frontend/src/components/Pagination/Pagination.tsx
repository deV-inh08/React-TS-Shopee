import React, { useEffect } from "react"
import { Link, createSearchParams} from "react-router-dom"
import { QueryConfig } from "../../pages/ProductList/ProductList"
import path from "../../constants/path"
import classNames from "classnames"

interface NextPageProps {
  TOTALPAGE: number
  queryConfig: QueryConfig
}

const Pagination = ({queryConfig, TOTALPAGE}: NextPageProps) => {

  useEffect(() => {
    console.log("Query config update", queryConfig)
  }, [queryConfig])
  let page;
  if(queryConfig && queryConfig.limit && queryConfig.skip) {
    if(Number(queryConfig.skip / queryConfig.limit) == 0) {
      page = 1
    } else {
      page = Number(queryConfig.skip / queryConfig.limit) + 1
    }
  };

  const currentPage = Math.floor(parseInt(queryConfig.skip || "0") / parseInt(queryConfig.limit || "15")) + 1;
  console.log(currentPage)

  const RANGE = 2;
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
    };

    return (
      Array(TOTALPAGE)
      .fill(0)
      .map((_, index) => {
        let pageNumber = index + 1;
        if(page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < TOTALPAGE - RANGE + 1) {
          return renderDotAfter()
        } else if (page > RANGE * 2 + 1 && page < TOTALPAGE - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore()
          } else if(pageNumber > page + RANGE && pageNumber < TOTALPAGE - RANGE + 1) {
            return renderDotAfter()
          }
        } else if(page >= TOTALPAGE - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore()
        } else if(page >= TOTALPAGE) {
          return pageNumber = 13
        }
        return (
          <Link to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              skip: String((pageNumber- 1) * parseInt(queryConfig.limit)),
              limit: queryConfig.limit
            }).toString()
          }}
            key={index}
            className={classNames('px-3 py-4 cursor-pointer', {
               "text-white bg-orange": pageNumber === page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
    )
  }

  const nextSkip = currentPage * parseInt(queryConfig.limit || "15");
  const previousSkip = Math.max(parseFloat(currentPage -2) * parseInt(queryConfig.limit || "15"));

  return (
    <div className='flex justify-center items-center gap-4 mt-7 '>
      {
        currentPage == 1 
        ? (
        <button disabled={currentPage == 1} className='h-8 rounded-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        ) 
        : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              skip: String(previousSkip),
              limit: queryConfig.limit
            }).toString()
          }} 
          className='inline-block pt-1 h-8 rounded-sm bg-white/60 hover:bg-slate-100 shadow-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </Link>
        )
      }
      <article className='flex items-center gap-3'>
        {renderPagination()}
      </article>

      {
        currentPage == TOTALPAGE 
        ? (
          <button disabled={currentPage == TOTALPAGE} className='h-8 rounded-sm bg-white/60 hover:bg-slate-100 shadow-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        ) 
        : (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              skip: String(nextSkip),
              limit: queryConfig.limit
            }).toString()
          }} 
          className='inline-block pt-1 h-8 rounded-sm bg-white/60 hover:bg-slate-100 shadow-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </Link>
        )
      }
    </div>
  )
}

export default Pagination;
