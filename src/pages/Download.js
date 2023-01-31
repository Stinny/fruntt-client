import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGetDigitalOrderQuery } from '../api/ordersApiSlice';
import Spinner from '../components/Spinner';
import moment from 'moment';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';

const Download = () => {
  const { orderId } = useParams();
  //get order, as long as it is paid for
  const { data: orderAndStore, isLoading, isSuccess } = useGetDigitalOrderQuery(
    {
      orderId,
    }
  );

  //allow for files in order to be downloaded

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div className='mx-auto'>
        <div className='w-full border-b-2 mt-20'>
          <p className='text-2xl font-medium'>Your Recent Digital Purchase</p>
          <p className='text-xl text-gray-400'>
            You will always have access to this page from your email
          </p>
        </div>
        <div className='w-full border-b mt-4'>
          <p className='font-medium text-slate-800 text-xl'>Purchase details</p>
        </div>
        <div className='flex justify-between items-center mt-8 w-11/12 mx-auto'>
          <div className='w-6/12 flex flex-col'>
            <p className='font-medium mt-2'>What you got:</p>
            {orderAndStore?.order?.item?.digitalType === 'video' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10'>
                <p>Video Course</p>
                <MdOutlineVideoLibrary className='ml-2 text-2xl' />
              </div>
            ) : orderAndStore?.order?.item?.digitalType === 'ebook' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10'>
                <p>E-Book</p>
                <HiOutlineBookOpen className='ml-2 text-2xl' />
              </div>
            ) : orderAndStore?.order?.item?.digitalType === 'podcast' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10'>
                <p>Podcast</p>
                <BsFillMicFill className='ml-2 text-2xl' />
              </div>
            ) : orderAndStore?.order?.item?.digitalType === 'other' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10'>
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

          <div className='w-6/12 flex justify-end'>
            <img
              src={orderAndStore?.order?.item?.coverImage?.url}
              className='border rounded w-10/12'
            />
          </div>
        </div>
        <div className='w-full border-b mt-4'>
          <p className='font-medium text-slate-800 text-xl'>
            Files included in purchase
          </p>
        </div>
        <div className='p-4 flex flex-wrap w-11/12 mx-auto border-2 rounded mt-4'>
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
  }
  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto'>{content}</div>
      <Footer />
    </>
  );
};

export default Download;
