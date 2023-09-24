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
  MdOutlineAttachMoney,
} from 'react-icons/md';
import { AiOutlineLink, AiOutlineEye } from 'react-icons/ai';
import { BiPackage, BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';
import ReactCountryFlag from 'react-country-flag';
import { Rating } from '@mui/material';

const DigitalDetail = ({ order }) => {
  return (
    <div className='w-full mt-24 h-screen'>
      <Link
        to='/dashboard/orders'
        className='flex items-center text-stone-800 text-lg hover:text-gray-600 w-4/12'
      >
        {' '}
        <BsArrowLeftShort />
        Orders
      </Link>
      <div className='flex justify-between items-center w-full'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold'>
            Viewing order: <span className='font-medium'>{order?._id}</span>
          </h2>
          <p>Order placed on {moment(order?.placedOn).format('MMM D, YYYY')}</p>
        </div>
      </div>

      <div className='w-full mx-auto mt-2 border bg-white drop-shadow-md rounded p-2 relative flex flex-col'>
        <div className='absolute right-0 flex items-center mr-2'>
          {order?.paid ? <MdOutlineAttachMoney className='text-2xl' /> : ''}{' '}
          {order?.viewed ? <AiOutlineEye className='text-2xl' /> : ''}
        </div>
        <div className='w-full flex items-center mx-auto'>
          <div className='w-3/6 flex flex-col mr-4'>
            <img
              src={order?.item?.coverImage?.url}
              className='rounded mt-4 border'
            />
          </div>
          <div className='flex flex-col w-3/6'>
            <p className='text-stone-800 font-medium mb-2'>Total</p>
            <p className='font-medium text-stone-800 text-4xl'>
              ${order?.total}
            </p>
            <p className='text-stone-800 font-medium mt-4 mb-2'>Delivered to</p>
            <p className='text-stone-800 font-medium text-xl'>{order?.name}</p>
            <p className='text-stone-800 font-medium text-xl mt-1'>
              {order?.email}
            </p>
            <div className='flex items-center text-xl mt-1'>
              <ReactCountryFlag
                countryCode={order?.country?.value}
                className='mr-1'
              />
              <p>{order?.country?.label}</p>
            </div>

            <p className='text-stone-800 font-medium mt-4 mb-2'>Item</p>

            <p className='text-stone-800 font-medium text-2xl'>
              {order?.item?.title}
            </p>
            {order?.item?.digitalType === 'video' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8'>
                <p className='text-sm'>Video Course</p>
                <MdOutlineVideoLibrary className='ml-2 text-xl' />
              </div>
            ) : order?.item?.digitalType === 'ebook' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8'>
                <p className='text-sm'>E-Book</p>
                <HiOutlineBookOpen className='ml-2 text-xl' />
              </div>
            ) : order?.item?.digitalType === 'audio' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8'>
                <p className='text-sm'>Audio</p>
                <BsFillMicFill className='ml-2 text-xl' />
              </div>
            ) : order?.item?.digitalType === 'other' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8'>
                <p className='text-sm'>Digital Media</p>
                <MdOutlinePermMedia className='ml-2 text-xl' />
              </div>
            ) : (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8'>
                <p className='text-sm'>Art</p>
                <BsPalette className='ml-2 text-xl' />
              </div>
            )}
          </div>
        </div>

        <div className='mt-2'>
          <p>Review</p>

          {order?.reviewed ? (
            <div className='flex flex-col p-4 rounded mt-2 relative bg-white drop-shadow-md border'>
              <Rating
                value={order?.review?.rating}
                readOnly
                size='medium'
                className=''
                precision={0.5}
              />

              <p className='md:text-xl mt-2'>{order?.review?.content}</p>
            </div>
          ) : (
            <div className='w-full h-32 rounded bg-gray-50 flex items-center justify-center mt-1'>
              <p>No review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalDetail;
