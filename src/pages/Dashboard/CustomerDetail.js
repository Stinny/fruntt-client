import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import { useGetCustomerQuery } from '../../api/customersApiSlice';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import CustomerDetailMobile from '../Mobile/Dashboard/CustomerDetailMobile';
import { useGetReviewQuery } from '../../api/ordersApiSlice';
import moment from 'moment';

//mui
import Rating from '@mui/material/Rating';

const CustomerDetail = () => {
  const { reviewId } = useParams();

  const { data: review, isLoading, isSuccess, refetch } = useGetReviewQuery({
    reviewId,
  });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    console.log(review);
    content = isMobile ? (
      <CustomerDetailMobile review={review} />
    ) : (
      <div className='w-full'>
        <Link
          to='/dashboard/reviews'
          className='flex items-center text-gray-400 text-lg hover:text-gray-600 w-4/12'
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

        <div className='w-7/12 mx-auto mt-10 border-2 rounded p-2 relative'>
          <Link
            to={`/dashboard/orders/${review?.orderId}`}
            className='absolute right-0 flex items-center justify-center border-2 border-stone-800 rounded w-28 h-10 mr-2 hover:bg-stone-800 hover:text-white'
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
  }

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto mt-10 h-screen'>{content}</div>
      <Footer />
    </>
  );
};

export default CustomerDetail;
