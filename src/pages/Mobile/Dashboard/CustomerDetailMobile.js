import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

//mui
import Rating from '@mui/material/Rating';

const CustomerDetailMobile = ({ customer }) => {
  return (
    <div>
      <Link
        to='/dashboard/customers'
        className='flex items-center text-gray-400 text-lg hover:text-gray-600 w-4/12'
      >
        {' '}
        <BsArrowLeftShort />
        Customers
      </Link>
      <div className='flex flex-col border-b-2 p-2'>
        <h2 className='text-xl font-bold'>
          Viewing customer:{' '}
          <span className='font-medium'>{customer?.customer?._id}</span>
        </h2>
      </div>
      <div className='w-full flex justify-between border-b p-2 mt-2'>
        <p className='text-xl font-medium'>Details</p>
        <Link
          to={`/dashboard/orders/${customer?.customer?.orderId}`}
          className='border-2 w-32 flex justify-center items-center rounded text-slate-800 border-slate-800 hover:text-white hover:bg-slate-800'
        >
          View their order
        </Link>
      </div>

      <div className='w-full p-2 flex flex-col mx-auto p-4'>
        <p className='text-gray-400'>Email:</p>
        <p className='text-lg font-medium'>{customer?.customer?.email}</p>
        <p className='text-gray-400 mt-2'>First Name:</p>
        <p className='text-lg font-medium'>{customer?.customer?.firstName}</p>
        <p className='text-gray-400 mt-2'>Last Name:</p>
        <p className='text-lg font-medium '>{customer?.customer?.lastName}</p>
      </div>

      <div className='w-full border-b p-2'>
        <p className='text-xl font-medium '>Review</p>
      </div>
      {customer?.customer?.reviewed ? (
        <div className='w-full border-2 rounded p-2 mt-4'>
          <Rating
            value={customer?.customer?.rating}
            readOnly
            precision={0.5}
            size='medium'
          />
          <p className='text-lg mt-2'>{customer?.customer?.review}</p>
        </div>
      ) : (
        <div className='border-2 rounded flex justify-center items-center p-4 h-20 mt-4 w-11/12 mx-auto'>
          <p className='text-gray-400 text-lg text-center'>
            This customer has not left a review yet
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailMobile;
