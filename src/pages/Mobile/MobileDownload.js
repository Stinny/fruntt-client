import React from 'react';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

//mui
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';

const MobileDownload = ({
  orderAndStore,
  setReview,
  setRating,
  handleSubmitReview,
  open,
  setOpen,
}) => {
  return (
    <div className='mx-auto p-2'>
      <div className='w-full border-b-2 mt-6 p-2 flex flex-col'>
        <p className='text-2xl font-medium'>Your Recent Digital Purchase</p>
        <p className='text-md text-gray-400 font-medium'>
          This is always accessible from you email
        </p>
      </div>

      <div className='w-full border-b mt-4 flex justify-between items-center pb-2'>
        <p className='font-medium text-slate-800 text-xl'>Purchase details</p>
        <button
          type='button'
          className='border-2 rounded border-stone-800 h-8 w-32 text-stone-800 hover:bg-stone-800 hover:text-white'
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close review' : 'Leave a review'}
        </button>
      </div>
      {open ? (
        <div className='w-full mt-4 mb-4 rounded mx-auto'>
          {orderAndStore?.order?.reviewed ? (
            <Alert severity='info'>
              Your review has successfully been submitted!
            </Alert>
          ) : (
            <form
              onSubmit={handleSubmitReview}
              className='w-full flex flex-col'
            >
              <Rating
                onChange={(e) => setRating(e.target.value)}
                precision={0.5}
                size='large'
              />
              <textarea
                onChange={(e) => setReview(e.target.value)}
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white mt-2'
                placeholder='Enter review here...'
              />

              <button
                type='submit'
                className='w-full mt-2 h-10 border-2 border-stone-800 rounded text-stone-800 hover:bg-stone-800 hover:text-white'
              >
                Submit
              </button>
            </form>
          )}
        </div>
      ) : (
        ''
      )}
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
          ) : orderAndStore?.order?.item?.digitalType === 'template' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
              <p>Template</p>
              <HiOutlineTemplate className='ml-2 text-2xl' />
            </div>
          ) : (
            <div className='flex items-center justify-center border-2 border-slate-800  rounded w-4/12 h-10'>
              <p>Printables</p>
              <MdLocalPrintshop className='ml-2 text-2xl' />
            </div>
          )}
          <p className='font-medium mt-4'>Page you purchased from:</p>
          <a
            href={orderAndStore?.store?.url}
            className='text-xl text-slate-800 underline'
            target='_blank'
          >
            {orderAndStore?.store?.url}
          </a>
          <p className='font-medium mt-4'>Delivered to:</p>
          <p className='text-xl'>{orderAndStore?.order?.email}</p>

          <p className='font-medium mt-4'>Title:</p>
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
          Content included in purchase
        </p>
      </div>
      <div className='w-full mx-auto mt-4'>
        <p className='text-gray-400'>Files</p>
      </div>
      <div className='p-2 flex flex-wrap w-full mx-auto border-2 rounded'>
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
              No files have been added
            </p>
          </div>
        )}
      </div>
      <div className='w-full mx-auto mt-4'>
        <p className='text-gray-400'>Content</p>
      </div>
      <div className='p-2 w-full mx-auto border-2 rounded'>
        {orderAndStore?.order?.item?.content === '' ? (
          <p className='text-center font-medium text-stone-800'>
            No additional content has been added
          </p>
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
};

export default MobileDownload;
