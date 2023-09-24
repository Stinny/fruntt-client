import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetUsersOrdersQuery } from '../../api/ordersApiSlice';
import Spinner from '../../components/Spinner';
import { isMobile } from 'react-device-detect';
import LibraryMobile from '../Mobile/Dashboard/LibraryMobile';
import LibraryDesktop from './LibraryDesktop';

const Library = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
    refetch,
  } = useGetUsersOrdersQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <LibraryMobile orders={orders} />
    ) : (
      <LibraryDesktop orders={orders} />
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='mx-auto max-w-6xl'>{content}</div>
      <Footer />
    </>
  );
};

export default Library;