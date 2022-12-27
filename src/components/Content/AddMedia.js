import React from 'react';
import { isMobile } from 'react-device-detect';

const AddMedia = () => {
  return isMobile ? (
    <div>
      <div className='w-full flex justify-between items-center mt-4 p-2'>
        <p className='text-slate-800 font-medium text-lg'>Video & media</p>
        <button
          className='border-2 rounded w-16 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
          //   onClick={openModal}
        >
          Edit
        </button>
      </div>

      <div className='p-2'>
        <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-4'>
          <p className='text-slate-800 text-lg font-medium text-center'>
            Adding video content will be available soon!
          </p>
          <p className='text-gray-400 text-center mt-2'>
            Here you will be able to link to or upload video content to your
            product page
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className='w-full flex justify-between items-center mt-4 border-b p-2'>
        <p className='text-slate-800 font-medium text-xl'>Video & media</p>
        <button
          className='border-2 rounded w-20 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
          //   onClick={openModal}
        >
          Edit
        </button>
      </div>

      <div className='p-4'>
        <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-2'>
          <p className='text-slate-800 text-xl font-medium'>
            Adding video content will be available soon!
          </p>
          <p className='text-gray-400 w-7/12 text-center mt-2'>
            Here you will be able to link to or upload video content to your
            product page
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddMedia;
