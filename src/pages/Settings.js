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
      <div className='w-full mt-20'>
        <div className='border-b-2 pb-4'>
          <h2 className='text-4xl font-semibold'>Settings</h2>
          <div className='flex justify-between items-center w-full'>
            <p className='text-md text-gray-500 mt-2'>
              Edit your profile info, connect to payment gateway, edit domain,
              adjust notifications, and manage your billing
            </p>
            <Link
              to='/dashboard'
              className='flex justify-center items-center text-gray-400 hover:text-gray-500'
            >
              <p>Back to dashboard</p> <BsArrowRightShort className='text-xl' />
            </Link>
          </div>
        </div>

        <div className='w-full mt-4'>
          <p className='text-xlg font-medium'>Profile</p>
          <Profile />
        </div>

        <div className='w-full mt-4'>
          <p className='text-xlg font-medium'>Payment Gateway</p>
          <Payments refetch={refetch} />
        </div>

        <div className='w-full mt-4'>
          <p className='text-xlg font-medium'>Billing</p>
          <Billing />
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
