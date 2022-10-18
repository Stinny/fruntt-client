import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import { useGetCustomerQuery } from '../../api/customersApiSlice';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

//mui
import Rating from '@mui/material/Rating';

const CustomerDetail = () => {
  const { customerId } = useParams();

  const { data: customer, isLoading, isSuccess, refetch } = useGetCustomerQuery(
    {
      customerId,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div>
        <Link
          to='/dashboard/customers'
          className='flex items-center text-gray-400 text-lg hover:text-gray-600 w-4/12'
        >
          {' '}
          <BsArrowLeftShort />
          Back to customers
        </Link>
        <div className='flex flex-col border-b-2 p-2'>
          <h2 className='text-2xl font-bold'>
            Viewing customer:{' '}
            <span className='font-medium'>{customer?.customer?._id}</span>
          </h2>
        </div>
        <div className='w-full flex justify-between border-b p-2 mt-10'>
          <p className='text-xl font-medium'>Details</p>
          <Link
            to={`/dashboard/orders/${customer?.customer?.orderId}`}
            className='border-2 w-32 flex justify-center items-center rounded text-slate-800 border-slate-800 hover:text-white hover:bg-slate-800'
          >
            View order
          </Link>
        </div>
        <div className='w-full p-4 flex justify-between mx-auto p-4'>
          <div className='flex flex-col justify-between'>
            <p className='text-gray-400'>Email:</p>
            <p className='text-gray-400 mt-2'>First Name:</p>
            <p className='text-gray-400 mt-2'>Last Name:</p>
          </div>
          <div className='flex flex-col justify-between text-right'>
            <p className='text-lg font-medium'>{customer?.customer?.email}</p>
            <p className='text-lg font-medium mt-2'>
              {customer?.customer?.firstName}
            </p>
            <p className='text-lg font-medium mt-2'>
              {customer?.customer?.lastName}
            </p>
          </div>
        </div>

        <div className='w-full border-b p-2'>
          <p className='text-xl font-medium mt-10'>Review</p>
        </div>
        {customer?.customer?.reviewed ? (
          <div className='w-full border-2 rounded p-2 mt-4'>
            <Rating
              value={customer?.customer?.rating}
              readOnly
              precision={0.5}
              size='large'
            />
            <p className='text-xl mt-2'>{customer?.customer?.review}</p>
          </div>
        ) : (
          <div className='border-2 rounded flex justify-center items-center p-4 h-20 mt-4'>
            <p className='text-gray-400 text-lg'>
              This customer has not left a review yet
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto mt-10'>{content}</div>
      <Footer />
    </>
  );
};

export default CustomerDetail;
