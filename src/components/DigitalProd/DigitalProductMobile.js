import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const DigitalProductMobile = ({ product }) => {
  return (
    <div className='w-full p-2'>
      <div className='w-full flex justify-between items-center mb-10 border-b-2 p-2'>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-semibold'>Your product</h2>
          <p>
            last edited on {moment.utc(product.updatedOn).format('MMM D, YYYY')}
          </p>
        </div>

        <Link to={`/dashboard/item/edit/${product._id}`}>
          <button className='w-28 h-10 rounded border-stone-800 text-stone-800 border-2 hover:bg-stone-800 hover:text-white'>
            EDIT
          </button>
        </Link>
      </div>

      <div className='w-full'>
        <div className='flex items-center'>
          <p className='text-2xl font-medium'>Details</p>
        </div>
        <div className='w-full p-4 border-2 rounded-md mt-4'>
          <div className='flex flex-col'>
            <div className='flex flex-col w-full'>
              {product?.digitalType === 'video' ? (
                <div className='flex items-center justify-center border-2 border-stone-800 rounded w-7/12 h-10'>
                  <p>Video Course</p>
                  <MdOutlineVideoLibrary className='ml-2 text-2xl' />
                </div>
              ) : product?.digitalType === 'ebook' ? (
                <div className='flex items-center justify-center border-2 border-stone-800 rounded w-7/12 h-10'>
                  <p>E-Book</p>
                  <HiOutlineBookOpen className='ml-2 text-2xl' />
                </div>
              ) : product?.digitalType === 'podcast' ? (
                <div className='flex items-center justify-center border-2 border-stone-800 rounded w-7/12 h-10'>
                  <p>Podcast</p>
                  <BsFillMicFill className='ml-2 text-2xl' />
                </div>
              ) : product?.digitalType === 'template' ? (
                <div className='flex items-center justify-center border-2 border-stone-800 rounded w-7/12 h-8 mt-2'>
                  <p>Template</p>
                  <HiOutlineTemplate className='ml-2 text-2xl' />
                </div>
              ) : product?.digitalType === 'other' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-7/12 h-10'>
                  <p>Digital Media</p>
                  <MdOutlinePermMedia className='ml-2 text-2xl' />
                </div>
              ) : (
                <div className='flex items-center justify-center border-2 border-slate-800  rounded w-8/12 h-10'>
                  <p>Printables</p>
                  <MdLocalPrintshop className='ml-2 text-2xl' />
                </div>
              )}
              <p className='text-gray-400 mt-4'>Product Title</p>
              <p className='text-3xl'>{product?.title}</p>
              {product.description && (
                <div className='flex flex-col'>
                  <p className='text-gray-400 mt-4'>Product Summary</p>
                  <p className='text-xl'>{product?.description}</p>
                </div>
              )}
              <p className='text-gray-400 mt-4'>Product Price</p>
              <p className='text-2xl font-medium'>
                ${product?.price.toFixed(2)}
              </p>

              <FormControlLabel
                label='Published to product page'
                control={<Switch checked={product?.published} disabled />}
                className='mt-2'
              />
            </div>
            <div className='w-full flex flex-col'>
              <p className='text-gray-400 mt-4'>Cover Image</p>
              <img
                src={product?.coverImage?.url}
                className='w-8/12 border rounded mt-2'
              />
            </div>
          </div>
        </div>

        <p className='text-2xl font-medium mt-4'>Content</p>
        <p className='text-gray-400 font-medium mt-2'>
          All content and files are available to customers immediately after
          purchase
        </p>
        <p className='text-gray-400 font-medium mt-4'>Files</p>
        <div className='p-4 flex flex-col w-full border-2 rounded-md'>
          {product?.files.length ? (
            product?.files?.map((file, index) => (
              <div className='w-full flex items-center justify-between border-b mt-2'>
                <div className='w-4/12'>
                  <p className='font-medium text-lg'>{file?.name}</p>
                </div>

                <div className='w-4/12 flex justify-end'>
                  <a
                    href={file?.url}
                    download
                    className='text-blue-500 font-lg font-medium'
                  >
                    <MdOutlineFileDownload className='text-3xl' />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center font-medium'>
              No files have been added to this product
            </p>
          )}
        </div>
        <p className='text-gray-400 font-medium mt-4'>Content</p>
        {product?.content === '' ? (
          <div className='border rounded p-2 h-14 flex items-center justify-center'>
            <p className='font-medium'>You have no additional content added</p>
          </div>
        ) : (
          <div className='border rounded p-2'>
            <ReactQuill
              value={product?.content}
              readOnly={true}
              theme={'bubble'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalProductMobile;
