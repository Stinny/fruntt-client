import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../media/customers.svg';
import moment from 'moment';
import { BiMailSend } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { BiMessageSquareDetail } from 'react-icons/bi';

//mui
import Rating from '@mui/material/Rating';

const ReviewsMobile = ({ reviews }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;

    setItemOffset(newOffset);
  };

  return reviews.length > 0 ? (
    <div className=''>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center justify- bg-stone-800 rounded p-2'>
          <BiMessageSquareDetail className='text-white text-lg' />
          <p className='text-sm text-white ml-2'>Reviews</p>
        </div>

        <p className='text-stone-800 font-medium text-sm'>
          {reviews.length > 1
            ? `${reviews.length} reviews`
            : `${reviews.length} review`}
        </p>
      </div>

      <div className='w-full mx-auto'>
        {currentItems.map((review) => (
          <Link to={`/dashboard/orders/${review?.orderId}`}>
            <div className='flex flex-col p-4 rounded-md mt-2 relative bg-white drop-shadow-md border'>
              <div className='absolute right-0 mr-2'></div>
              <div className='flex w-full items-center'>
                <p className='text-md'>{review?.name}</p>
                <Rating
                  value={review.rating}
                  readOnly
                  size='small'
                  className='ml-2'
                  precision={0.5}
                />
              </div>

              <p className='md:text-lg mt-2'>{review.review}</p>

              <p className='text-sm mt-2'>
                {moment(review?.createdAt).format('MMM D, YYYY')}
              </p>
            </div>
          </Link>
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
  ) : (
    <div className='flex flex-col items-center justify-center rounded h-full w-full p-4 mx-auto border bg-white drop-shadow-md'>
      <p className='text-md font-medium mb-4'>You have no reviews</p>

      <p className='text-sm text-center text-stone-800 mt-4'>
        Here you will be able view product reviews written by customers
      </p>
    </div>
  );
};

export default ReviewsMobile;
