import React from 'react';

const FAQs = () => {
  return (
    <div className='border-b mb-4'>
      <div className='w-full flex justify-between items-center'>
        <p className='text-slate-800 font-medium'>FAQs</p>
        <button
          className='border-2 rounded w-20 h-8 border-gray-400 text-gray-400'
          // onClick={openModal}
        >
          + Add
        </button>
      </div>

      <div className='p-4'>
        <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-2'>
          <p className='text-slate-800 text-xl font-medium'>
            You have not added any FAQs yet
          </p>
          <p className='text-gray-400 w-7/12 text-center mt-2'>
            These FAQs are visible on your storefront for customers to read.
            They should relate to whatever item you have added.
          </p>
          <button className='border-2 border-slate-800 rounded text-slate-800 w-32 h-10 mt-2'>
            + Add first FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
