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
    content = <DesktopCustomers customers={customers} />;
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='h-screen'>{content}</div>
      <Footer />
    </>
  );
};

export default Customers;
