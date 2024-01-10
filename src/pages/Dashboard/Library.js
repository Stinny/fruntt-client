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

  const styles = isMobile
    ? 'mx-auto w-full p-2 bg-gray-50 h-screen mt-14'
    : 'mx-auto w-10/12 pt-10 pb-10 pl-32 pr-32 bg-gray-50 overflow-y-scroll';

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default Library;
