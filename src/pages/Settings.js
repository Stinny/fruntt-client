import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
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
              <h2 className='text-3xl font-medium'>Settings</h2>

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
          <div className='pb-4'>
            <div className='flex justify-between w-full items-center'>
              <h2 className='text-3xl font-medium'>Settings</h2>
            </div>
          </div>
        )}

        <div className='rounded w-full drop-shadow-lg bg-white p-1 border'>
          {/* <div className='w-full mt-4'>
            <SellerProfile user={user} refetch={refetch} />
          </div> */}

          <div className='w-full mt-4'>
            <Profile user={user} refetch={refetch} />
          </div>

          <div className='w-full mt-10'>
            <Notifications user={user} refetch={refetch} />
          </div>

          <div className='w-full mt-4'>
            <div className='flex flex-col w-full border-b p-2'>
              <p className='text-lg font-medium'>Payments</p>
              <p className=' font-medium text-stone-800 mt-1'>
                You are paid immediately after a successful purchase. You keep
                99% of what you make after processing fees (2.9% + 30¢ / sale).
              </p>
            </div>
            <Payments refetch={refetch} />
          </div>

          <div className='w-full mt-10'>
            <div className='flex flex-col w-full border-b p-2'>
              <p className='text-lg font-medium'>Delete account</p>
              <p className='text-stone-800 font-medium mt-1'>
                Deleting your account will delete all data from our servers
                (pages, orders, products, etc..)
              </p>
            </div>
            <DeleteAccount user={user} refetch={refetch} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        <div className='w-9/12 mx-auto p-10 bg-gray-50 h-screen overflow-y-scroll'>
          {content}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
