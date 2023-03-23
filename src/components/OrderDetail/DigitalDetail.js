import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import MobileDigitalDetail from './MobileDigitalDetail';
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
import { BsFillMicFill } from 'react-icons/bs';

const DigitalDetail = ({ order }) => {
  return (
    <div className='w-full'>
      <Link
        to='/dashboard/orders'
        className='flex items-center text-gray-400 text-lg hover:text-gray-600 w-4/12'
      >
        {' '}
        <BsArrowLeftShort />
        Back to orders
      </Link>
      <div className='flex justify-between items-center w-full border-b-2 p-2'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold'>
            Viewing order: <span className='font-medium'>{order?._id}</span>
          </h2>
          <p>Order placed on {moment(order?.placedOn).format('MMM D, YYYY')}</p>
        </div>
        <div className='flex items-center'>
          <div className='flex items-center justify-center ml-2 border-2 mr-2 w-40 h-10 rounded text-slate-800 border-slate-800 '>
            <p>Order Delivered</p>
            <AiOutlineCheckCircle className='text-green-600 text-xl ml-2' />
          </div>
        </div>
      </div>

      <div className='w-7/12 mx-auto mt-10 border-2 rounded p-2'>
        <div className='w-full flex flex-col items-center mx-auto'>
          <p className='text-gray-400 font-medium'>Total</p>
          <p className='font-medium text-stone-800 text-4xl'>${order?.total}</p>
          <p className='text-gray-400 font-medium mt-4'>Delivered to</p>
          <p className='text-stone-800 font-medium text-xl'>{order?.email}</p>
          <p className='text-gray-400 font-medium mt-4'>Type</p>
          {order?.item?.digitalType === 'video' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10 mt-2'>
              <p>Video Course</p>
              <MdOutlineVideoLibrary className='ml-2 text-2xl' />
            </div>
          ) : order?.item?.digitalType === 'ebook' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10'>
              <p>E-Book</p>
              <HiOutlineBookOpen className='ml-2 text-2xl' />
            </div>
          ) : order?.item?.digitalType === 'podcast' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10'>
              <p>Podcast</p>
              <BsFillMicFill className='ml-2 text-2xl' />
            </div>
          ) : order?.item?.digitalType === 'other' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10'>
              <p>Digital Media</p>
              <MdOutlinePermMedia className='ml-2 text-2xl' />
            </div>
          ) : (
            <div className='flex items-center justify-center border-2 border-slate-800  rounded w-5/12 h-10'>
              <p>Printables</p>
              <MdLocalPrintshop className='ml-2 text-2xl' />
            </div>
          )}
          <p className='text-gray-400 font-medium mt-4'>Title</p>
          <p className='text-stone-800 font-medium text-2xl'>
            {order?.item?.title}
          </p>
          <img
            src={order?.item?.coverImage?.url}
            className='w-7/12 rounded mt-4'
          />
        </div>
      </div>
    </div>
  );
};

export default DigitalDetail;
