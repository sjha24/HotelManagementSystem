import React from 'react'

function RoomPaginator({currentPage,totalPages,onpageChange}) {
    const PageNumber = Array.from({length: totalPages},(_,i)=>i+1);
  return (
    <nav>
        <ul className='pagination , justify-content-center'>
            {PageNumber.map((pageNumber)=>(
                <li key={pageNumber}
                    className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                >
                    <button className='page-link' onClick={()=>onpageChange(pageNumber)}>
                        {pageNumber}
                    </button>
                    
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default RoomPaginator