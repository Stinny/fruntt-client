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
      field: 'firstName',
      headerName: 'Name',
      width: 180,
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
      field: 'email',
      headerName: 'Email',
      width: 200,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'placedOn',
      headerName: 'Ordered on',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <p>{moment(params?.row?.placedOn).format('MMM D, YYYY')}</p>;
      },
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
      width: 100,
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
      field: 'labelUrl',
      headerName: 'Label',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return params.row.labelUrl ? (
          <a
            href={params.row.labelUrl}
            target='_blank'
            className='text-blue-600 flex justify-between items-center'
          >
            Download label <FiDownload className='ml-2' />
          </a>
        ) : (
          <p className='text-red-600'>No label</p>
        );
      },
    },
    {
      field: 'fulfilled',
      headerName: 'Fulfilled',
      width: 140,
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
      width: 130,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Link
            to={`/dashboard/orders/${params.row._id}/`}
            className='w-full mx-auto flex justify-center'
          >
            <button className='border-2 w-3/6 border-slate-800 text-slate-800 text-sm rounded'>
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
              placeholder='Enter email or  order number'
              className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
            />
            <button className='border-2 rounded w-20 ml-2  h-10 border-slate-800 text-slate-800'>
              Search
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
