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

      <div className='w-11/12 mx-auto mt-10 border-2 rounded p-2'>
        <div className='w-full flex justify-between border-b p-2'>
          <p className='text-xl font-medium'>Customer info</p>
          <Link
            to={`/dashboard/customers/${order.customerId}`}
            className='border-2 w-32 flex justify-center items-center rounded text-slate-800 border-slate-800 hover:text-white hover:bg-slate-800'
          >
            View customer
          </Link>
        </div>
        <div className='w-full p-4 flex justify-between mx-auto'>
          <div className='flex flex-col justify-between'>
            <p className='text-gray-400'>Email:</p>
            <p className='text-gray-400 mt-2'>First Name:</p>
            <p className='text-gray-400 mt-2'>Last Name:</p>
          </div>
          <div className='flex flex-col justify-between text-right'>
            <p className='text-lg font-medium'>{order?.email}</p>
            <p className='text-lg font-medium mt-2'>{order?.firstName}</p>
            <p className='text-lg font-medium mt-2'>{order?.lastName}</p>
          </div>
        </div>
        <div className='border-b p-2'>
          <p className='text-xl font-medium'>What they got</p>
        </div>
        <div className='w-full h-72 p-4 flex justify-between mx-auto'>
          <div className='flex flex-col justify-between'>
            <p className='text-gray-400'>title</p>
            <p className='text-gray-400'>Type:</p>
            <p className='text-gray-400 mt-2'>Files included:</p>
            <p className='text-gray-400 mt-2'>Total:</p>
          </div>
          <div className='flex flex-col justify-between items-end text-right'>
            <p className='text-lg font-medium mt-2'>{order?.item?.title}</p>

            {order?.item?.digitalType === 'video' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-10'>
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

            <p className='text-lg font-medium mt-2'>
              {order?.item?.files.length}
            </p>

            <p className='text-lg font-medium mt-2'>
              $
              {order?.total?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalDetail;
