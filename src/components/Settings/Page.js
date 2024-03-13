import React from 'react';
import { Link } from 'react-router-dom';

const Page = ({ user }) => {
  return (
    <div className='w-full mt-4'>
      <div className='flex justify-between w-full border-b p-2'>
        <p className='text-lg font-medium'>Store Name</p>
        <Link
          to='/dashboard/name/change'
          className='flex items-center justify-center bg-stone-800 text-white rounded h-8 w-32'
        >
          Change Name
        </Link>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center rounded mt-1 bg-gray-100 p-2 pl-4 pr-4'>
          <span className='font-bold text-lg'>{`${user?.store?.name}`}</span>
          <span className='text-lg'>.fruntt.com</span>
        </div>
      </div>
    </div>
  );
};

export default Page;
