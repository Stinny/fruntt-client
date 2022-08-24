import React, { useEffect, useState } from 'react';
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
  const [tableView, setTableView] = useState('all');
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetStoreOrdersQuery();

  const fulfilledOrders =
    isSuccess && orders.filter((order) => order.fulfilled === true);
  const notFulfilledOrders =
    isSuccess && orders.filter((order) => order.fulfilled === false);

  useEffect(() => {
    refetch();
  }, []);

  const handleSelectedRows = () => {};

  //for data grid
  const cols = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 140,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 140,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <p>${params.row.total.toFixed(2)}</p>;
      },
    },
    {
      field: 'paid',
      headerName: 'Payment',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return params.row.paid ? (
          <p className='text-green-500 font-medium'>Paid</p>
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
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Link
            to={`/dashboard/orders/${params.row._id}/`}
            className='w-full mx-auto flex justify-center'
          >
            <button className='border-2 w-3/6 border-gray-400 text-gray-400 text-sm rounded'>
              Details
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
          <div className='w-full flex justify-between border-b-2 p-2'>
            <h2 className='text-3xl font-semibold'>Your Orders</h2>
            <div className='flex items-center'>
              <button className='border-2 w-48 h-10 rounded text-gray-400 border-gray-400 hover:border-gray-600 hover:text-gray-600'>
                Create Shipping Label(s)
              </button>
              <button className='border-2 ml-2 w-32 h-10 rounded text-gray-400 border-gray-400 hover:border-gray-600 hover:text-gray-600'>
                Fulfill Order(s)
              </button>
            </div>
          </div>

          <div className='w-full mx-auto mt-6'>
            <div className='flex flex-col'>
              <p className='text-gray-400'>Filter</p>
              <select
                onChange={(e) => setTableView(e.target.value)}
                className='rounded-md border-2 w-32 h-12 bg-transparent mb-2'
              >
                <option value='all'>All</option>
                <option value='notFulfilled'>Not Fulfilled</option>
                <option value='fulfilled'>Fulfilled</option>
              </select>
            </div>

            {tableView === 'all' && (
              <DataGrid
                rows={orders}
                columns={cols}
                getRowId={(row) => row._id}
                autoHeight
                disableSelectionOnClick={true}
                disableColumnFilter
                checkboxSelection
                pageSize={10}
                rowsPerPageOptions={[10]}
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
            )}

            {tableView === 'notFulfilled' && (
              <DataGrid
                rows={notFulfilledOrders}
                columns={cols}
                getRowId={(row) => row._id}
                autoHeight
                disableSelectionOnClick={true}
                disableColumnFilter
                checkboxSelection
                pageSize={10}
                rowsPerPageOptions={[10]}
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
            )}

            {tableView === 'fulfilled' && (
              <DataGrid
                rows={fulfilledOrders}
                columns={cols}
                getRowId={(row) => row._id}
                autoHeight
                disableSelectionOnClick={true}
                disableColumnFilter
                checkboxSelection
                pageSize={10}
                rowsPerPageOptions={[10]}
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
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center rounded h-full w-full border-2 border-gray-200 mb-20'>
          <h2 className='text-2xl font-medium mb-4'>You have no orders</h2>
          <img src={img} className='w-3/12' />
          <p className='text-xl text-gray-400 mt-4 font-medium'>
            Here you will be able view, fulfill, and create shipping labels for
            all orders
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
