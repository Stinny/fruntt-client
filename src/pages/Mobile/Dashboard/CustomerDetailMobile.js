import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import moment from 'moment';

//mui
import Rating from '@mui/material/Rating';

const CustomerDetailMobile = ({ review }) => {
  return (
    <div className='w-full p-2'>
      <Link
        to='/dashboard/reviews'
        className='flex items-center text-gray-400 text-lg hover:text-gray-600 w-6/12'
      >
        {' '}
        <BsArrowLeftShort />
        Back to reviews
      </Link>
      <div className='flex justify-between items-center w-full border-b-2 p-2'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold'>
            Viewing review: <span className='font-medium'>{review?._id}</span>
          </h2>
          <p>Reviewed on {moment(review?.createdAt).format('MMM D, YYYY')}</p>
        </div>
      </div>

      <div className='w-full mx-auto mt-10 border-2 rounded p-2 relative'>
        <Link
          to={`/dashboard/orders/${review?.orderId}`}
          className='absolute right-0 text-sm flex items-center justify-center border-2 border-stone-800 rounded w-24 h-10 mr-2 hover:bg-stone-800 hover:text-white'
        >
          View Order
        </Link>
        <div className='w-full flex flex-col mx-auto'>
          <p className='text-gray-400 font-medium '>Name</p>
          <p className='text-xl font-medium'>{review?.name}</p>
          <p className='text-gray-400 font-medium mt-4'>Rating</p>
          <Rating
            value={review?.rating}
            precision={0.5}
            size='large'
            readOnly
          />
          <p className='text-gray-400 font-medium mt-4'>Review</p>
          <textarea
            value={review?.review}
            readOnly
            className='rounded border-gray-200 border-2 p-2 outline-0 outline'
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailMobile;
