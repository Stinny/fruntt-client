import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Cookies from 'js-cookie';
import { useGetCustomersQuery } from '../../api/customersApiSlice';
import Spinner from '../../components/Spinner';
import DesktopCustomers from '../../components/Customers/DesktopCustomers';
import { isMobile } from 'react-device-detect';
import MobileCustomers from '../../components/Customers/MobileCustomers';

const Customers = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const {
    data: customers,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCustomersQuery({ storeId: currentUser?.store?._id });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <MobileCustomers customers={customers} />
    ) : (
      <DesktopCustomers customers={customers} />
    );
  }

  const styles = isMobile
    ? 'h-fit w-full p-2 bg-gray-50'
    : 'h-screen w-full bg-white mx-auto ml-2';

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

export default Customers;
