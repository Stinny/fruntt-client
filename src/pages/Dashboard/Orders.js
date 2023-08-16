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
//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const Orders = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);

  const [tableView, setTableView] = useState('all');
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetStoreOrdersQuery({ storeId: currentStoreID });

  const fulfilledOrders =
    isSuccess && orders.filter((order) => order.fulfilled === true);
  const notFulfilledOrders =
    isSuccess && orders.filter((order) => order.fulfilled === false);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  //for data grid
  const cols = [
    {
      field: 'email',
      headerName: 'Email',
      width: 275,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <p className='text-md'>{params.row.email}</p>;
      },
    },
    {
      field: 'placedOn',
      headerName: 'Ordered on',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <p>{moment(params?.row?.placedOn).format('MMM D, YYYY')}</p>;
      },
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 175,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <p className='font-bold text-xl'>${params?.row?.total?.toFixed(2)}</p>
        );
      },
    },
    {
      field: 'paid',
      headerName: 'Payment',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return params?.row?.paid ? (
          <div className='w-3/12 flex items-center justify-center bg-green-300 rounded-md h-8'>
            <p className='text-stone-800 font-bold'>PAID</p>
          </div>
        ) : (
          <p className='text-red-600'>No Payment</p>
        );
      },
    },
    {
      field: 'view',
      headerName: 'View',
      width: 300,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Link
            to={`/dashboard/orders/${params?.row?._id}/`}
            className='w-full mx-auto flex justify-center'
          >
            <button className='border-2 w-4/6 border-slate-800 text-slate-800 text-sm rounded h-8'>
              View Order
            </button>
          </Link>
        );
      },
    },
  ];

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <OrdersMobile
        orders={orders}
        cols={cols}
        tableView={tableView}
        setTableView={setTableView}
        notFulfilledOrders={notFulfilledOrders}
        fulfilledOrders={fulfilledOrders}
      />
    ) : orders.length > 0 ? (
      <div>
        <div className='w-full flex justify-between border-b-2 p-2'>
          <h2 className='text-3xl font-semibold'>Your Orders</h2>
          <div className='flex justify-between'>
            <input
              placeholder='Search by email'
              className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
            />
            <button className='border-2 rounded w-20 ml-2  h-10 border-stone-800 text-slate-800'>
              Search
            </button>
          </div>
        </div>

        <div className='w-full mx-auto mt-6'>
          <DataGrid
            rows={orders}
            columns={cols}
            getRowId={(row) => row._id}
            autoHeight
            disableSelectionOnClick={true}
            disableColumnFilter
            pageSize={12}
            rowsPerPageOptions={[12]}
            disableExtendRowFullWidth={true}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = orders.filter((order) =>
                selectedIDs.has(order._id.toString())
              );
              console.log(selectedRowData); //console logs the selected rows(orders)
            }}
            components={{
              noRowsOverlay: () => (
                <Stack
                  height='100%'
                  alignItems='center'
                  justifyContent='center'
                >
                  No rows in DataGrid
                </Stack>
              ),
              noResultsOverlay: () => (
                <Stack
                  height='100%'
                  alignItems='center'
                  justifyContent='center'
                >
                  Local filter returns no result
                </Stack>
              ),
            }}
          />
        </div>
      </div>
    ) : (
      <div className='flex flex-col items-center justify-center rounded h-full w-full border bg-white drop-shadow-md mb-20'>
        <h2 className='text-2xl font-medium mb-4'>You have no orders</h2>
        <img src={img} className='w-3/12' />
        <p className='text-xl text-gray-400 mt-4 font-medium'>
          Here you will be able view all incoming orders from customers
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

export default Orders;
