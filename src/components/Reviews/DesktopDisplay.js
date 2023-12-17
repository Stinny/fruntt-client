import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

//mui
import Rating from '@mui/material/Rating';
import { BiMessageSquareDetail } from 'react-icons/bi';

const DesktopDisplay = ({ reviews }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
          <BiMessageSquareDetail className='text-white text-xl' />
          <p className='text-xl text-white ml-2'>Reviews</p>
        </div>
        <div className='flex justify-between'>
          <input
            placeholder='Coming soon!'
            className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
          />
          <button className='border-2 rounded w-20 ml-2  h-10 border-slate-800 text-slate-800'>
            Search
          </button>
        </div>
        <p className='text-stone-800 font-medium text-lg'>
          {reviews.length > 1
            ? `${reviews.length} reviews`
            : `${reviews.length} review`}
        </p>
      </div>

      <div className='w-full mx-auto'>
        {currentItems.map((review) => (
          <div className='flex flex-col p-4 rounded mt-2 relative bg-white drop-shadow-md border'>
            <div className='absolute right-0 mr-2'>
              <Link
                to={`/dashboard/orders/${review?.orderId}`}
                className='flex items-center justify-center text-stone-800 border-2 rounded p-2 text-sm border-stone-800'
              >
                View Order
              </Link>
            </div>
            <div className='flex w-full items-center'>
              <p className='text-lg'>{review?.name}</p>
              <Rating
                value={review.rating}
                readOnly
                size='small'
                className='ml-2'
                precision={0.5}
              />
            </div>

            <p className='md:text-xl mt-2'>{review.review}</p>

            <p className='text-sm mt-2'>
              {moment(review?.createdAt).format('MMM D, YYYY')}
            </p>
          </div>
        ))}
      </div>
      <div className='w-full flex justify-end mx-auto mt-2'>
        <div className=''>
          <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel='Prev'
            renderOnZeroPageCount={null}
            className='flex items-center'
            activeLinkClassName='activePage'
            pageLinkClassName='notActivePage'
            breakLinkClassName='breakLink'
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopDisplay;
