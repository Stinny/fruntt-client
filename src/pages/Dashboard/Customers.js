import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { useGetCustomersQuery } from '../../api/customersApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import img from '../../media/customers.svg';

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

  useEffect(() => {
    refetch();
  }, []);

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
      field: 'orderId',
      headerName: 'Order',
      width: 175,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <p>{params.row.orderId}</p>;
      },
    },
    {
      field: 'Reviewed',
      headerName: 'View',
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Link
            to={`/dashboard/orders/${params.row._id}/`}
            className='w-full mx-auto flex justify-center'
          >
            <button className='border-2 w-10/12 border-gray-400 text-gray-400 text-sm rounded'>
              Request Review
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
      customers.length > 0 ? (
        <div>
          <div className='w-full'>
            <h2 className='text-3xl font-semibold'>Your Customers</h2>
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
