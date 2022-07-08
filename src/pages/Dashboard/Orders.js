import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetStoreOrdersQuery } from '../../api/ordersApiSlice';
import Spinner from '../../components/Spinner';
import img from '../../media/noOrders.svg';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const Orders = () => {
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetStoreOrdersQuery();

  useEffect(() => {
    refetch();
  }, []);

  //for data grid
  const cols = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 175,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 175,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'paid',
      headerName: 'Payment',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return params.row.paid ? (
          <p className='text-green-500 font-medium'>Payment Successful</p>
        ) : (
          <p className='text-red-600'>No Payment</p>
        );
      },
    },
    {
      field: 'fulfilled',
      headerName: 'Fulfilled',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return params.row.fulfilled ? (
          <button className='rounded-lg w-80 text-lime-600 bg-lime-200 font-semibold hover:cursor-default'>
            Fulfilled
          </button>
        ) : (
          <button className='rounded-lg w-60  bg-red-200 text-red-400 font-semibold hover:cursor-default'>
            Needs Fulfilling
          </button>
        );
      },
    },
    {
      field: 'view',
      headerName: 'View',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Link
            to={`/order/${params.row._id}/`}
            className='w-full mx-auto flex justify-center'
          >
            <button className='border-2 w-3/6 border-gray-400 text-gray-400 text-sm rounded'>
              Detials
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
    content =
      orders.length > 0 ? (
        <div>
          <div className='w-full flex justify-between'>
            <h2 className='text-3xl font-semibold'>Your Orders</h2>
            <Link
              to='/dashboard/addproduct'
              className='h-8 w-36 border-2 border-stone-800 hover:text-white hover:bg-stone-800 font-medium text-stone-800 rounded-md text-sm flex justify-center items-center'
            >
              Fulfill Order(s)
            </Link>
          </div>

          <div className='w-full mx-auto mt-6'>
            {/* data grid copied over from old component */}
            <DataGrid
              rows={orders}
              columns={cols}
              getRowId={(row) => row._id}
              autoHeight
              disableSelectionOnClick={true}
              disableColumnFilter
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
        <div className='flex flex-col items-center justify-center h-full w-full border-2 border-gray-200 mb-20'>
          <h2 className='text-xl font-medium mb-4'>You have no orders</h2>
          <img src={img} className='w-2/12' />
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
