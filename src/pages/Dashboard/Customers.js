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

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const Customers = () => {
  const {
    data: customers,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCustomersQuery();

  const [sendReviewEmail, result] = useSendReviewEmailMutation();

  useEffect(() => {
    refetch();
  }, []);

  const handleSendReviewEmail = async ({ customerId, storeId }) => {
    console.log(customerId);
    try {
      const sendReviewEmailReq = await sendReviewEmail({
        customerId: customerId,
        storeId: storeId,
      }).unwrap();
      console.log(sendReviewEmailReq);
    } catch {}
  };

  //for data grid
  const cols = [
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'firstName',
      headerName: 'Name',
      width: 190,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <p>
            {params.row.firstName} {params.row.lastName}
          </p>
        );
      },
    },

    {
      field: 'orderId',
      headerName: 'Order',
      width: 210,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'orderedOn',
      headerName: 'Ordered On',
      width: 175,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <p>{moment(params?.row?.orderedOn).format('MMM D, YYYY')}</p>;
      },
    },
    {
      field: 'reviewed',
      headerName: 'Review',
      width: 175,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.row.reviewed ? (
          <button className='rounded-lg w-80 text-lime-600 bg-lime-200 font-semibold hover:cursor-default'>
            Collected
          </button>
        ) : (
          <button className='rounded-lg w-60  bg-red-200 text-red-400 font-semibold hover:cursor-default'>
            Not collected
          </button>
        );
      },
    },
    {
      headerName: 'View',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <button
            className='border-2 w-10/12 border-slate-800 text-slate-800 text-sm rounded'
            onClick={(e) =>
              handleSendReviewEmail({
                customerId: params.row._id,
                storeId: params.row.storeId,
              })
            }
          >
            Request Review
          </button>
        );
      },
    },
  ];

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content =
      customers.length > 0 ? (
        <div>
          <div className='w-full  flex justify-between border-b-2 p-2'>
            <h2 className='text-3xl font-semibold'>Your Customers</h2>
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
              rows={customers}
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
        <div className='flex flex-col items-center justify-center rounded h-full w-full border-2 border-gray-200 mb-20'>
          <h2 className='text-2xl font-medium mb-4'>You have no customers</h2>
          <img src={img} className='w-2/12' />
          <p className='text-xl text-gray-400 mt-4 font-medium'>
            Here you will be able view all customers and request reviews from
            them
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
