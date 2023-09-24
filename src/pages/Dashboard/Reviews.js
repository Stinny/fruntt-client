import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import {
  useGetCustomersQuery,
  useSendReviewEmailMutation,
} from '../../api/customersApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import img from '../../media/customers.svg';
import moment from 'moment';
import { BiMailSend } from 'react-icons/bi';
import { isMobile } from 'react-device-detect';
import ReviewsMobile from '../Mobile/Dashboard/ReviewsMobile';
import { useGetReviewsQuery } from '../../api/ordersApiSlice';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import DesktopDisplay from '../../components/Reviews/DesktopDisplay';

const Reviews = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);

  const {
    data: reviews,
    isLoading,
    isSuccess,
    refetch,
  } = useGetReviewsQuery({
    storeId: currentStoreID,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <ReviewsMobile reviews={reviews} />
    ) : reviews.length > 0 ? (
      <DesktopDisplay reviews={reviews} />
    ) : (
      <div className='flex flex-col items-center justify-center rounded h-full w-full border bg-white drop-shadow-md mb-20'>
        <h2 className='text-2xl font-medium mb-4'>You have no reviews</h2>
        <img src={img} className='w-2/12' />
        <p className='text-stone-800 mt-4'>
          Here you will be able to view product reviews written by customers
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>{content}</div>
      <Footer />
    </>
  );
};

export default Reviews;
