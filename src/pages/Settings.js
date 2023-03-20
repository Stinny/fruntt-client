import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Payments from '../components/Settings/Payments';
import Profile from '../components/Settings/Profile';
import Billing from '../components/Settings/Billing';
import Cookies from 'js-cookie';
import { BsArrowRightShort } from 'react-icons/bs';
import { useGetUpdatedUserQuery } from '../api/authApiSlice';
import Spinner from '../components/Spinner';
import Notifications from '../components/Settings/Notifications';
import BusinessInfo from '../components/Settings/BusinessInfo';
import { isMobile } from 'react-device-detect';
import SellerProfile from '../components/Settings/SellerProfile';
import DeleteAccount from '../components/Settings/DeleteAccount';

const Settings = () => {
  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetUpdatedUserQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    const updatedUser = JSON.stringify(user);
    Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
    content = (
      <div className='w-full'>
        {isMobile ? (
          <div className='border-b-2 pb-2'>
            <div className='flex justify-between items-center w-full'>
              <h2 className='text-3xl font-semibold'>Settings</h2>

              <Link
                to='/dashboard'
                className='flex justify-center items-center text-gray-400 hover:text-gray-500'
              >
                <p>Back to dashboard</p>{' '}
                <BsArrowRightShort className='text-xl' />
              </Link>
            </div>
          </div>
        ) : (
          <div className='border-b-2 pb-4 mt-20'>
            <div className='flex justify-between w-full'>
              <h2 className='text-4xl font-semibold'>Settings</h2>

              <Link
                to='/dashboard'
                className='flex justify-center items-center text-gray-400 hover:text-gray-500'
              >
                <p className='font-medium text-xl'>Back to dashboard</p>{' '}
                <BsArrowRightShort className='text-xl' />
              </Link>
            </div>
          </div>
        )}

        <div className='w-full mt-4'>
          <SellerProfile user={user} refetch={refetch} />
        </div>

        <div className='w-full mt-4'>
          <Profile user={user} refetch={refetch} />
        </div>

        {/* 
        <div className='w-full mt-10'>
          <BusinessInfo user={user} refetch={refetch} />
        </div> */}

        <div className='w-full mt-10'>
          <Notifications user={user} refetch={refetch} />
        </div>

        <div className='w-full mt-4'>
          <div className='flex justify-between items-center w-full border-b p-2'>
            <p className='text-lg font-medium'>Payment Gateway</p>
          </div>
          <Payments refetch={refetch} />
        </div>
        {/* 
        <div className='w-full mt-10'>
          <div className='flex flex-col w-full border-b p-2'>
            <p className='text-lg font-medium'>Payment Method</p>
            <p className='text-gray-400 font-medium'>
              Add a payment method only if you plan to buy shipping labels from
              us
            </p>
          </div>
          <Billing user={user} refetch={refetch} />
        </div> */}

        <div className='w-full mt-10'>
          <div className='flex flex-col w-full border-b p-2'>
            <p className='text-lg font-medium'>Delete your Fruntt account</p>
            <p className='text-gray-400 font-medium'>
              Deleting your account will delete all data from our servers
              (pages, orders, products, etc..)
            </p>
          </div>
          <DeleteAccount user={user} refetch={refetch} />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto'>{content}</div>
      <Footer />
    </>
  );
};

export default Settings;
