import React from 'react';
import img from '../../media/storefrontGreen.png';
import { BsArrow90DegDown } from 'react-icons/bs';

const SampleStore = () => {
  return (
    <div className='mt-20 mx-auto'>
      <div className='w-10/12 flex justify-between items-center mx-auto'>
        <div className='flex- w-5/12'>
          <p className='text-5xl font-medium w-10/12 leading-tight'>
            Easily gather everything needed to sell ONE product on ONE page.
          </p>
          <p className='text-4xl  mt-8 w-10/12 leading-tight'>
            Get rid of all the plugins and clutter, make it easy for you AND the
            customer.
          </p>
          <p className='mt-10 font-medium'>
            Sign up to receive the latest news & updates
          </p>
          <form className='flex items-center'>
            <input
              className='h-10 border-2 rounded p-2 outline outline-0'
              type='email'
              placeholder='Enter email'
            />
            <button
              type='button'
              className='h-10 border-slate-800 border-2 rounded w-32 font-medium hover:text-white hover:bg-slate-800 ml-2'
            >
              SIGN UP
            </button>
          </form>
        </div>
        <div className='w-7/12 flex flex-col'>
          <div className='flex w-full justify-end items-center'>
            <BsArrow90DegDown className='font-medium' />
            <p className='text-2xl font-medium mb-2 ml-2'>Sample storefront</p>
          </div>
          <img src={img} className='w-full border-2 rounded' />
        </div>
      </div>
    </div>
  );
};

export default SampleStore;
