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
import Avatar from '@mui/material/Avatar';
import { useMarkAsViewedMutation } from '../api/ordersApiSlice';
import { Badge } from 'flowbite-react';

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
      {/* <div
        className={`w-96 border-b-2 ${
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
      </div> */}
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
      <div className='flex flex-col max-w-2xl mx-auto border border-gray-200 rounded-md bg-white p-4'>
        <p className='text-stone-600 text-sm'>Template:</p>
        <p className='text-md mt-1'>{orderAndStore?.order?.item?.title}</p>
        <div className='w-full h-72 flex justify-end mt-1'>
          <img
            src={orderAndStore?.order?.item?.coverImage?.url}
            className='rounded-md w-full h-full object-fill'
          />
        </div>
        <div className='flex w-full'>
          <div className='w-full flex flex-col mt-4'>
            <div className='w-full flex items-center justify-between'>
              <p className='text-stone-600 text-sm'>Created by:</p>
            </div>

            <div className='flex items-center mt-2'>
              <Avatar
                src={orderAndStore?.order?.item?.userPicture}
                sx={{ width: 22, height: 22 }}
              />
              <p className='ml-1 text-stone-800 text-sm'>
                {orderAndStore?.order?.item?.userName}
              </p>
            </div>
            <p className='text-stone-600 text-sm mt-4'>Delivered to:</p>
            <p className='text-md mt-1'>{orderAndStore?.order?.email}</p>
          </div>

          <div className='w-full flex flex-col'>
            <div className='border border-gray-200 rounded-md mt-4 p-2'>
              <div className='w-full flex items-center justify-between'>
                <p className='text-stone-600 text-sm'>Total:</p>
                <Badge color='success'>Purchased</Badge>
              </div>

              <p className='text-md mt-2'>${orderAndStore?.order?.total}</p>
            </div>
          </div>
        </div>
        <button className='bg-gray-200 text-sm rounded-md text-stone-800 h-10 mt-4'>
          View template
        </button>
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

      {/* <div className='w-full mx-auto mt-4'>
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
      </div> */}
    </div>
  );
};

export default DesktopDownload;
