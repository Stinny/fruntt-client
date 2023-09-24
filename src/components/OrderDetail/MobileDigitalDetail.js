import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';

const MobileDigitalDetail = ({ order }) => {
  return (
    <div className='w-full mt-20 p-2'>
      <Link
        to='/dashboard/orders'
        className='flex items-center text-gray-400 text-lg hover:text-gray-600 w-full'
      >
        {' '}
        <BsArrowLeftShort />
        Back to orders
      </Link>
      <div className='flex flex-col w-ful p-2'>
        <div className='flex flex-col'>
          <h2 className='text-xl font-medium'>
            Viewing order: <span className=''>{order?._id}</span>
          </h2>
          <p>Placed on {moment(order?.placedOn).format('MMM D, YYYY')}</p>
        </div>
      </div>
      <div className='w-full mx-auto mt-4 border rounded p-2 bg-white drop-shadow-md'>
        <div className='w-full flex flex-col items-center mx-auto'>
          <p className='text-stone-800 font-medium text-sm'>Total</p>
          <p className='font-medium text-stone-800 text-2xl mt-1'>
            ${order?.total}
          </p>
          <p className='text-stone-800 font-medium mt-4 text-sm'>
            Delivered to
          </p>
          <p className='text-stone-800 font-medium text-lg'>{order?.email}</p>
          <p className='text-stone-800 font-medium mt-4 mb-2 text-sm'>Type</p>
          {order?.item?.digitalType === 'video' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10 mt-2'>
              <p>Video Course</p>
              <MdOutlineVideoLibrary className='ml-2 text-2xl' />
            </div>
          ) : order?.item?.digitalType === 'ebook' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10'>
              <p>E-Book</p>
              <HiOutlineBookOpen className='ml-2 text-2xl' />
            </div>
          ) : order?.item?.digitalType === 'audio' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10'>
              <p>Audio</p>
              <BsFillMicFill className='ml-2 text-2xl' />
            </div>
          ) : order?.item?.digitalType === 'other' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10'>
              <p>Digital Media</p>
              <MdOutlinePermMedia className='ml-2 text-2xl' />
            </div>
          ) : (
            <div className='flex items-center justify-center border-2 border-slate-800  rounded w-5/12 h-10'>
              <p>Art</p>
              <BsPalette className='ml-2 text-2xl' />
            </div>
          )}
          <p className='text-stone-800 font-medium mt-4 text-sm'>Title</p>
          <p className='text-stone-800 font-medium text-lg'>
            {order?.item?.title}
          </p>
          <img
            src={order?.item?.coverImage?.url}
            className='w-8/12 rounded mt-4'
          />
        </div>
      </div>
    </div>
  );
};

export default MobileDigitalDetail;
