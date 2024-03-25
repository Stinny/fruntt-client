import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetStoreOrdersQuery } from '../../api/ordersApiSlice';
import Spinner from '../../components/Spinner';
import img from '../../media/noOrders.svg';
import { FiDownload } from 'react-icons/fi';
import moment from 'moment';
import OrdersMobile from '../Mobile/Dashboard/OrdersMobile';
import { isMobile } from 'react-device-detect';
import { MdOutlineFileDownload } from 'react-icons/md';
import { BiPackage } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import DesktopOrders from '../../components/Orders/DesktopOrders';

const Orders = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [tableView, setTableView] = useState('all');
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetStoreOrdersQuery({ storeId: currentUser?.store?._id });

  useEffect(() => {
    refetch();
  }, []);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <OrdersMobile
        orders={orders}
        tableView={tableView}
        setTableView={setTableView}
      />
    ) : (
      <DesktopOrders orders={orders} />
    );
  }

  const styles = isMobile
    ? 'w-full mt-16 mx-auto h-fit p-2 bg-gray-50'
    : 'w-full mx-auto h-screen bg-white ml-2';

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

export default Orders;
