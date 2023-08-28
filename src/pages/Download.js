import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  useGetDigitalOrderQuery,
  useAddProductReviewMutation,
} from '../api/ordersApiSlice';
import Spinner from '../components/Spinner';
import moment from 'moment';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import MobileDownload from './Mobile/MobileDownload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

//mui
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';

const Download = () => {
  const { orderId } = useParams();

  const [open, setOpen] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');

  //get order, as long as it is paid for
  const {
    data: orderAndStore,
    isLoading,
    isSuccess,
    refetch,
  } = useGetDigitalOrderQuery({
    orderId,
  });

  const [addProductReview, result] = useAddProductReviewMutation();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const addReviewReq = await addProductReview({
        review: review,
        rating: rating,
        orderId: orderAndStore?.order?._id,
        email: orderAndStore?.order?.email,
        name: name,
      }).unwrap();

      if (addReviewReq === 'Review added') {
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <MobileDownload
        orderAndStore={orderAndStore}
        setReview={setReview}
        setRating={setRating}
        handleSubmitReview={handleSubmitReview}
        open={open}
        setOpen={setOpen}
        setName={setName}
      />
    ) : (
      <div className='mx-auto'>
        <div className='w-full border-b-2 mt-20 flex justify-between items-center'>
          <div className='flex flex-col'>
            <p className='text-2xl font-medium'>Your Recent Digital Purchase</p>
            <p className='text-md text-stone-800'>
              This will always be accessible from the email address below.
            </p>
          </div>
          <button
            type='button'
            className='border-2 rounded border-stone-800 h-10 w-32 text-stone-800 hover:bg-stone-800 hover:text-white text-sm'
            onClick={() => setOpen(!open)}
          >
            {open ? 'Close review' : 'Leave a review'}
          </button>
        </div>
        {open ? (
          <div className='w-8/12 mt-4 mb-4 rounded mx-auto'>
            {orderAndStore?.order?.reviewed ? (
              <Alert severity='success'>Your review was submitted!</Alert>
            ) : (
              <form
                onSubmit={handleSubmitReview}
                className='w-full flex justify-around items-center'
              >
                <div className='flex flex-col w-full mr-4'>
                  <input
                    type='text'
                    placeholder='Name'
                    className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white mr-4'
                    onChange={(e) => setName(e.target.value)}
                  />

                  <textarea
                    onChange={(e) => setReview(e.target.value)}
                    className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white mr-4 mt-2'
                    placeholder='Enter review here...'
                  />
                </div>

                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  precision={0.5}
                  size='large'
                />

                <button
                  type='submit'
                  className='w-28 h-12 border-2 border-stone-800 rounded text-stone-800 hover:bg-stone-800 hover:text-white ml-4'
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        ) : (
          ''
        )}
        <div className='w-11/12 mt-4 mx-auto'>
          <p className='font-medium text-slate-800 text-xl'>Purchase details</p>
        </div>
        <div className='flex justify-between items-center mt-2 w-11/12 mx-auto border rounded bg-white drop-shadow-lg p-2'>
          <div className='w-6/12 flex flex-col'>
            <p className='font-medium mt-2 mb-2'>What you got:</p>
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
            ) : orderAndStore?.order?.item?.digitalType === 'template' ? (
              <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
                <p>Template</p>
                <HiOutlineTemplate className='ml-2 text-2xl' />
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
            <p className='font-medium mt-4'>Store you purchased from:</p>
            <a
              href={orderAndStore?.store?.url}
              className='text-xl text-slate-800 underline'
              target='_blank'
            >
              {orderAndStore?.store?.url}
            </a>
            <p className='font-medium mt-4'>Delivered to:</p>
            <p className='text-xl mt-2'>{orderAndStore?.order?.email}</p>

            <p className='font-medium mt-4'>Title:</p>
            <p className='text-xl mt-2'>{orderAndStore?.order?.item?.title}</p>
          </div>

          <div className='w-6/12 flex justify-end'>
            <img
              src={orderAndStore?.order?.item?.coverImage?.url}
              className='border rounded w-9/12'
            />
          </div>
        </div>
        <div className='w-11/12 mx-auto mt-4'>
          <p className='font-medium text-slate-800 text-xl'>Content included</p>
        </div>
        <div className=' w-11/12 mx-auto mt-4'>
          <p className='text-stone-800'>Files</p>
        </div>
        <div className='p-4 flex flex-wrap w-11/12 mx-auto border rounded drop-shadow-lg bg-white'>
          {orderAndStore?.order?.item?.files.length ? (
            orderAndStore?.order?.item?.files?.map((file, index) => (
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
            ))
          ) : (
            <div className='mx-auto w-full'>
              <p className='text-stone-800 text-center font-medium'>
                No files included
              </p>
            </div>
          )}
        </div>
        <div className=' w-11/12 mx-auto mt-4'>
          <p className='text-stone-800'>Content</p>
        </div>
        <div className='p-4 w-11/12 mx-auto border rounded bg-white drop-shadow-lg'>
          {orderAndStore?.order?.item?.content === '' ? (
            <p>No additional content added</p>
          ) : (
            <ReactQuill
              value={orderAndStore?.order?.item?.content}
              readOnly={true}
              theme={'bubble'}
            />
          )}
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
