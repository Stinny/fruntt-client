import React from 'react';
import img from '../../../media/noOrders.svg';
import { FiDownload } from 'react-icons/fi';
import moment from 'moment';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const OrdersMobile = ({
  orders,
  cols,
  tableView,
  setTableView,
  notFulfilledOrders,
  fulfilledOrders,
}) => {
  return orders.length > 0 ? (
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
    <div className='flex flex-col items-center justify-center rounded h-full w-11/12 border-2 border-gray-200 mb-20 mx-auto mt-4'>
      <h2 className='text-2xl font-medium mb-4'>You have no orders</h2>
      <img src={img} className='w-5/12' />
      <p className='text-lg text-gray-400 mt-4 font-medium text-center'>
        Here you will be able view, fulfill, and create shipping labels for all
        orders
      </p>
    </div>
  );
};

export default OrdersMobile;
