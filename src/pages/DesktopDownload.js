import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsArrowRightShort, BsFillMicFill, BsPalette } from 'react-icons/bs';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Cookies from 'js-cookie';

//mui
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import { useMarkAsViewedMutation } from '../api/ordersApiSlice';

const DesktopDownload = ({
  orderAndStore,
  setReview,
  setRating,
  handleSubmitReview,
  open,
  setOpen,
  setName,
}) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [markAsViewed, result] = useMarkAsViewedMutation();

  useEffect(() => {
    const markViewed = async () => {
      const markAsViewedReq = await markAsViewed({
        orderId: orderAndStore?.order?._id,
      }).unwrap();
      console.log(markAsViewedReq);
    };

    if (!orderAndStore?.order?.viewed) {
      markViewed();
    }
  }, []);

  return (
    <div className='mx-auto'>
      <div
        className={`w-full border-b-2 ${
          currentUser ? 'mt-10' : 'mt-20'
        } flex justify-between items-center`}
      >
        <div className='flex flex-col'>
          <p className='text-2xl font-medium text-stone-800'>
            Your Digital Purchase
          </p>
          <p className='text-md text-stone-800'>
            This will always be accessible from the email address below.
          </p>
        </div>

        {currentUser ? (
          <Link
            to='/dashboard/library'
            className='text-stone-800 flex items-center'
          >
            Back to library
            <BsArrowRightShort className='text-2xl' />
          </Link>
        ) : (
          <Link to='/signup' className='text-stone-800 flex items-center'>
            Create account
            <BsArrowRightShort className='text-2xl' />
          </Link>
        )}
        <button
          type='button'
          className='border-2 rounded border-stone-800 h-10 w-32 text-stone-800 hover:bg-stone-800 hover:text-white text-sm'
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close review' : 'Leave a review'}
        </button>
      </div>
      {open ? (
        <div className='w-full mt-4 mb-4 rounded mx-auto'>
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
      <div className='w-full mx-auto mt-4'>
        <p className='text-stone-800'>Details</p>
      </div>
      <div className='flex justify-between items-center w-full mx-auto border rounded bg-white drop-shadow-lg p-4'>
        <div className='w-6/12 flex flex-col'>
          {/* <p className='font-medium mt-2 mb-2'>What you got:</p> */}
          {/* {orderAndStore?.order?.item?.digitalType === 'video' ? (
            <div className='flex items-center justify-center bg-gray-100 text-stone-800 rounded w-4/12 h-10'>
              <p>Video Course</p>
              <MdOutlineVideoLibrary className='ml-2 text-2xl' />
            </div>
          ) : orderAndStore?.order?.item?.digitalType === 'ebook' ? (
            <div className='flex items-center justify-center bg-gray-100 text-stone-800 rounded w-4/12 h-10'>
              <p>E-Book</p>
              <HiOutlineBookOpen className='ml-2 text-2xl' />
            </div>
          ) : orderAndStore?.order?.item?.digitalType === 'audio' ? (
            <div className='flex items-center justify-center bg-gray-100 text-stone-800 rounded w-4/12 h-10'>
              <p>Audio</p>
              <BsFillMicFill className='ml-2 text-2xl' />
            </div>
          ) : orderAndStore?.order?.item?.digitalType === 'template' ? (
            <div className='flex items-center justify-center text-stone-800 bg-gray-100 rounded w-5/12 h-8 mt-2'>
              <p>Template</p>
              <HiOutlineTemplate className='ml-2 text-2xl' />
            </div>
          ) : orderAndStore?.order?.item?.digitalType === 'other' ? (
            <div className='flex items-center justify-center bg-gray-100 text-stone-800 rounded w-4/12 h-10'>
              <p>Digital Media</p>
              <MdOutlinePermMedia className='ml-2 text-2xl' />
            </div>
          ) : (
            <div className='flex items-center justify-center bg-gray-100 text-stone-800  rounded w-4/12 h-10'>
              <p>Art</p>
              <BsPalette className='ml-2 text-2xl' />
            </div>
          )} */}
          <p className='font-medium text-sm mt-4'>Store you purchased from:</p>
          <a
            href={orderAndStore?.store?.url}
            className='text-md text-slate-800 underline'
            target='_blank'
          >
            {orderAndStore?.store?.url}
          </a>
          <p className='font-medium text-sm mt-4'>Delivered to:</p>
          <p className='text-md mt-1'>{orderAndStore?.order?.email}</p>

          <p className='font-medium text-sm mt-4'>Template:</p>
          <p className='text-md mt-1'>{orderAndStore?.order?.item?.title}</p>
          <p className='font-medium text-sm mt-4'>Total:</p>
          <p className='text-lg mt-1'>${orderAndStore?.order?.total}</p>
        </div>

        <div className='w-6/12 flex justify-end'>
          <img
            src={orderAndStore?.order?.item?.coverImage?.url}
            className='border rounded w-9/12'
          />
        </div>
      </div>

      {orderAndStore?.order?.item?.files.length ? (
        <div className=' w-full mx-auto mt-4'>
          <p className='text-stone-800'>Files</p>
        </div>
      ) : (
        ''
      )}
      {orderAndStore?.order?.item?.files.length ? (
        <div className='p-4 flex flex-wrap w-full mx-auto border rounded drop-shadow-lg bg-white'>
          {' '}
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
      ) : (
        ''
      )}

      <div className='w-full mx-auto mt-4'>
        <p className='text-stone-800'>Content</p>
      </div>
      <div className='p-4 w-full mx-auto border rounded bg-white drop-shadow-lg mb-56'>
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
};

export default DesktopDownload;
