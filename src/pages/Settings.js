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
import { BsGear } from 'react-icons/bs';

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
          <div className='mb-1'>
            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center justify-center bg-stone-800 rounded p-2'>
                <BsGear className='text-white text-xl' />
                <p className='text-sm text-white ml-2'>Settings</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='pb-4'>
            <div className='flex justify-between w-full items-center'>
              <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
                <BsGear className='text-white text-xl' />
                <p className='text-md text-white ml-2'>Settings</p>
              </div>
            </div>
          </div>
        )}

        <div className='rounded-md w-full bg-white p-1 border border-gray-200'>
          {/* <div className='w-full mt-4'>
            <SellerProfile user={user} refetch={refetch} />
          </div> */}

          <div className='w-full mt-4'>
            <Profile user={user} refetch={refetch} />
          </div>

          <div className='w-full mt-4'>
            <div className='flex justify-between w-full border-b p-2'>
              <p className='text-lg font-medium'>Store Name</p>
              <Link
                to='/dashboard/name/change'
                className='flex items-center justify-center bg-stone-800 text-white rounded h-8 w-32'
              >
                Change Name
              </Link>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center rounded mt-1 bg-gray-100 p-2 pl-4 pr-4'>
                <span className='font-bold text-lg'>{`${user?.store?.name}`}</span>
                <span className='text-lg'>.fruntt.com</span>
              </div>
            </div>
          </div>

          <div className='w-full mt-10'>
            <Notifications user={user} refetch={refetch} />
          </div>

          <div className='w-full mt-4'>
            <div className='flex flex-col w-full border-b p-2'>
              <p className='text-lg font-medium'>Payments & Payouts</p>
              <p className='text-sm font-medium text-stone-800 mt-1'>
                Sales under $10, you pay $0.50/sale. Sales $10 and over, you pay
                $1/sale.
              </p>
            </div>
            <Payments refetch={refetch} />
          </div>

          <div className='w-full mt-10'>
            <div className='flex flex-col w-full border-b p-2'>
              <p className='text-lg font-medium'>Delete account</p>
              <p className='text-stone-800 text-sm mt-1'>
                Deleting your account will delete all data from our servers
                (store, orders, templates, etc..)
              </p>
            </div>
            <DeleteAccount user={user} refetch={refetch} />
          </div>
        </div>
      </div>
    );
  }
  const styles = isMobile
    ? 'w-full mx-auto p-2 bg-gray-50 h-fit mt-16'
    : 'w-full mx-auto bg-white h-screen overflow-y-scroll ml-2';

  return (
    <>
      <Navbar />
      <div className='flex mx-auto max-w-6xl'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
