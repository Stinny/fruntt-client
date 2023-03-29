import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import {
  useGetCustomersQuery,
  useSendReviewEmailMutation,
} from '../../api/customersApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import img from '../../media/customers.svg';
import moment from 'moment';
import { BiMailSend } from 'react-icons/bi';
import { isMobile } from 'react-device-detect';
import CustomersMobile from '../Mobile/Dashboard/CustomersMobile';
import { useGetReviewsQuery } from '../../api/ordersApiSlice';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

const Customers = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);

  const { data: reviews, isLoading, isSuccess, refetch } = useGetReviewsQuery({
    storeId: currentStoreID,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  //for data grid
  const cols = [
    {
      field: 'orderId',
      headerName: 'Order',
      width: 250,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Link
            to={`/dashboard/orders/${params?.row?.orderId}`}
            className='underline underline0-offset-4'
          >
            {params?.row?.orderId}
          </Link>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 225,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <p className='text-lg'>{params?.row?.name}</p>;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Reviewed On',
      width: 225,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <p className='font-bold text-lg'>
            {moment(params?.row?.createdAt).format('MMM D, YYYY')}
          </p>
        );
      },
    },

    {
      field: 'reviewed',
      headerName: 'Rating',
      width: 225,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <Rating value={params?.row?.rating} precision={0.5} readOnly />;
      },
    },

    {
      field: ' ',
      headerName: 'View',
      width: 225,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Link
            className='w-full flex justify-center items-center'
            to={`/dashboard/reviews/${params.row._id}`}
          >
            <button className='border-2 w-4/6 border-slate-800 text-slate-800 text-sm rounded'>
              See Full Review
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
    console.log(reviews);
    content = isMobile ? (
      <CustomersMobile reviews={reviews} cols={cols} />
    ) : reviews.length > 0 ? (
      <div>
        <div className='w-full  flex justify-between border-b-2 p-2'>
          <h2 className='text-3xl font-semibold'>Your Reviews</h2>
          <div className='flex justify-between'>
            <input
              placeholder='Enter customer email or name'
              className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
            />
            <button className='border-2 rounded w-20 ml-2  h-10 border-slate-800 text-slate-800'>
              Search
            </button>
          </div>
        </div>

        <div className='w-full mx-auto mt-6'>
          {/* data grid copied over from old component */}
          <DataGrid
            rows={reviews}
            columns={cols}
            getRowId={(row) => row._id}
            autoHeight
            disableSelectionOnClick={true}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableVirtualization
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableExtendRowFullWidth={true}
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
      <div className='flex flex-col items-center justify-center rounded h-full w-full border-2 border-gray-200 mb-20'>
        <h2 className='text-2xl font-medium mb-4'>You have no reviews</h2>
        <img src={img} className='w-2/12' />
        <p className='text-xl text-gray-400 mt-4 font-medium'>
          Here you will be able view product reviews written by customers
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

export default Customers;
