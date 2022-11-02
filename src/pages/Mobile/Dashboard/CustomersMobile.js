import React from 'react';
import img from '../../../media/customers.svg';
import moment from 'moment';
import { BiMailSend } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const CustomersMobile = ({ customers, cols }) => {
  return customers.length > 0 ? (
    <div>
      <div className='w-full  flex justify-between border-b-2 p-2'>
        <h2 className='text-2xl font-semibold'>Your Customers</h2>
        <div className='flex justify-between'>
          <button className='border-2 rounded w-16 ml-2  h-8 border-slate-800 text-slate-800 flex items-center justify-center'>
            <AiOutlineSearch />
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
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableVirtualization
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableExtendRowFullWidth={true}
          components={{
            noRowsOverlay: () => (
              <Stack height='100%' alignItems='center' justifyContent='center'>
                No rows in DataGrid
              </Stack>
            ),
            noResultsOverlay: () => (
              <Stack height='100%' alignItems='center' justifyContent='center'>
                Local filter returns no result
              </Stack>
            ),
          }}
        />
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center rounded h-full w-11/12 mx-auto mt-4 border-2 border-gray-200 mb-20'>
      <h2 className='text-2xl font-medium mb-4'>You have no customers</h2>
      <img src={img} className='w-5/12' />
      <p className='text-lg text-center text-gray-400 mt-4 font-medium'>
        Here you will be able view all customers and request reviews from them
      </p>
    </div>
  );
};

export default CustomersMobile;
