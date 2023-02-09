import React from 'react';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';

const MobileDownload = ({ orderAndStore }) => {
  return (
    <div className='mx-auto p-2'>
      <div className='w-full border-b-2 mt-6 p-2 flex flex-col'>
        <p className='text-2xl font-medium'>Your Recent Digital Purchase</p>
        <p className='text-md text-gray-400'>
          You will always have access to this page from your email
        </p>
      </div>
      <div className='w-full border-b mt-4'>
        <p className='font-medium text-slate-800 text-xl'>Purchase details</p>
      </div>
      <div className='flex flex-col mt-8 w-full border-2 rounded mx-auto p-2'>
        <div className='w-full flex flex-col'>
          <p className='font-medium mt-2'>What you got:</p>
          {orderAndStore?.order?.item?.digitalType === 'video' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-8/12 h-10'>
              <p>Video Course</p>
              <MdOutlineVideoLibrary className='ml-2 text-2xl' />
            </div>
          ) : orderAndStore?.order?.item?.digitalType === 'ebook' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-8/12 h-10'>
              <p>E-Book</p>
              <HiOutlineBookOpen className='ml-2 text-2xl' />
            </div>
          ) : orderAndStore?.order?.item?.digitalType === 'podcast' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-8/12 h-10'>
              <p>Podcast</p>
              <BsFillMicFill className='ml-2 text-2xl' />
            </div>
          ) : orderAndStore?.order?.item?.digitalType === 'other' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-8/12 h-10'>
              <p>Digital Media</p>
              <MdOutlinePermMedia className='ml-2 text-2xl' />
            </div>
          ) : (
            <div className='flex items-center justify-center border-2 border-slate-800  rounded w-4/12 h-10'>
              <p>Printables</p>
              <MdLocalPrintshop className='ml-2 text-2xl' />
            </div>
          )}
          <p className='font-medium mt-2'>Page you purchased from:</p>
          <a
            href={orderAndStore?.store?.url}
            className='text-xl text-slate-800 underline'
            target='_blank'
          >
            {orderAndStore?.store?.url}
          </a>
          <p className='font-medium mt-2'>Delivered to:</p>
          <p className='text-xl'>{orderAndStore?.order?.email}</p>

          <p className='font-medium mt-2'>Title:</p>
          <p className='text-xl'>{orderAndStore?.order?.item?.title}</p>
        </div>

        <div className='w-full flex justify-end'>
          <img
            src={orderAndStore?.order?.item?.coverImage?.url}
            className='border rounded w-full'
          />
        </div>
      </div>
      <div className='w-full border-b mt-4'>
        <p className='font-medium text-slate-800 text-xl'>
          Files included in purchase
        </p>
      </div>
      <div className='p-2 flex flex-wrap w-full mx-auto border-2 rounded mt-4'>
        {orderAndStore?.order?.item?.files?.map((file, index) => (
          <div className='w-full flex items-center justify-between border-b mt-2'>
            <div className='w-4/12'>
              <p className='font-medium text-lg'>{file?.name}</p>
            </div>

            <div className='w-4/12 flex justify-end'>
              <a
                href={file?.url}
                download
                className='text-blue-500 text-3xl font-medium'
              >
                <MdOutlineFileDownload />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileDownload;
