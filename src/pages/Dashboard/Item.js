import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import {
  useGetProductsQuery,
  useLazyGetAliProductQuery,
} from '../../api/productsApiSlice';
import Spinner from '../../components/Spinner';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import ProductMobile from '../Mobile/Dashboard/ProductMobile';
import Cookies from 'js-cookie';
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
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const Item = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);
  const currentUser = JSON.parse(Cookies.get('currentUser'));

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProductsQuery({ storeId: currentStoreID });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  const noItem = (
    <div className='h-screen border border-gray-200 rounded bg-white drop-shadow-md w-full flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl font-medium text-stone-800'>
        You have no products added!
      </h2>

      <div className='flex w-11/12 mt-6 items-center'>
        <Link to='/dashboard/item/digital' className='w-full mx-auto'>
          <div className='w-52 mx-auto flex justify-center items-center border-2 rounded border-stone-800 p-2 h-10 hover:bg-stone-800 hover:text-white pl-8 pr-8 mt-2'>
            <p className='font-medium text-lg text-center'>+ Add product</p>
          </div>
        </Link>
      </div>
    </div>
  );

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <ProductMobile product={product[0]} />
    ) : product.length ? (
      <div className='w-full'>
        <div className='w-full flex justify-between items-center mb-4 p-2'>
          <h2 className='text-3xl font-semibold'>Your products</h2>

          {/* <Link to={`/dashboard/item/edit/${product[0]._id}`}>
            <button className='w-40 h-10 rounded border-stone-800 text-stone-800 border-2 hover:bg-stone-800 hover:text-white'>
              EDIT PRODUCT
            </button>
          </Link> */}
          <p className='text-stone-800 font-medium text-lg'>
            {product.length} products created
          </p>
        </div>

        {/* <div className='w-full border rounded bg-white drop-shadow-md p-2'>
          <div className='flex items-center'>
            <p className='text-xl font-medium'>Details</p>
          </div>
          <div className='w-full p-4 border-2 rounded-md mt-4'>
            <div className='flex justify-between'>
              <div className='flex flex-col w-6/12'>
                {product[0]?.digitalType === 'video' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10'>
                    <p>Video Course</p>
                    <MdOutlineVideoLibrary className='ml-2 text-2xl' />
                  </div>
                ) : product[0]?.digitalType === 'ebook' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10'>
                    <p>E-Book</p>
                    <HiOutlineBookOpen className='ml-2 text-2xl' />
                  </div>
                ) : product[0]?.digitalType === 'podcast' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-4/12 h-10'>
                    <p>Podcast</p>
                    <BsFillMicFill className='ml-2 text-2xl' />
                  </div>
                ) : product[0]?.digitalType === 'template' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
                    <p>Template</p>
                    <HiOutlineTemplate className='ml-2 text-2xl' />
                  </div>
                ) : product[0]?.digitalType === 'other' ? (
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
                <p className='text-gray-400 mt-4'>Product Title</p>
                <p className='text-3xl mt-4'>{product[0]?.title}</p>
                {product.description && (
                  <div className='flex flex-col'>
                    <p className='text-gray-400 mt-4'>Product Summmary</p>
                    <p className='text-xl mt-4'>{product[0]?.description}</p>
                  </div>
                )}
                <p className='text-gray-400 mt-4'>Product Price</p>
                <p className='text-3xl mt-4 font-medium'>
                  $
                  {product[0]?.payChoice
                    ? `${product[0]?.price} +`
                    : product[0]?.price}
                </p>

                <FormControlLabel
                  label='Let customers pay what they want'
                  control={<Switch checked={product[0]?.payChoice} disabled />}
                  className='mt-2'
                />
              </div>
              <div className='w-6/12 flex flex-col ml-4'>
                <p className='text-gray-400 mt-4'>Cover Image</p>
                <img
                  src={product[0]?.coverImage?.url}
                  className='w-8/12 border rounded mt-2'
                />

                <p className='text-gray-400 mt-4'>Call to action</p>
                <button
                  type='button'
                  disabled
                  className='w-10/12 border-2 rounded h-14 text-xl border-stone-800 text-stone-800'
                >
                  {product[0]?.callToAction === 'buy'
                    ? 'Buy Now'
                    : product[0]?.callToAction === 'want'
                    ? 'I want this!'
                    : 'Get Now'}
                </button>
              </div>
            </div>
          </div>

          <p className='text-xl font-medium mt-4'>Content</p>
          <p className='text-gray-400 font-medium mt-2'>
            All content and files are available to customers immediately after
            purchase
          </p>

          <p className='text-gray-400 font-medium mt-4'>Files</p>
          <div className='p-4 flex flex-col w-full border-2 rounded-md mb-2'>
            {product[0]?.files.length ? (
              product[0]?.files?.map((file, index) => (
                <div className='w-full flex items-center justify-between border-b mt-2'>
                  <div className='w-4/12'>
                    <p className='font-medium text-lg'>{file?.name}</p>
                  </div>
                  <div className='w-4/12 flex justify-center'>
                    <p className='font-medium text-lg'>
                      {' '}
                      {moment.utc(product[0].updatedOn).format('MMM D, YYYY')}
                    </p>
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
          {product[0]?.content === '' ? (
            <div className='border rounded p-2 h-14 flex items-center justify-center'>
              <p className='font-medium'>
                You have no additional content added
              </p>
            </div>
          ) : (
            <div className='border rounded p-2'>
              <ReactQuill
                value={product[0]?.content}
                readOnly={true}
                theme={'bubble'}
              />
            </div>
          )}
        </div> */}

        <div
          className='flex flex-col overflow-y-scroll h-screen bg-gray-50 p-2 rounded'
          // style={{ height: '500px' }}
        >
          {product.map((prod) => (
            <div className='border rounded bg-white drop-shadow-md relative flex mt-4'>
              <img
                src={prod?.coverImage?.url}
                className='rounded-tl rounded-bl w-2/12 h-32'
              />

              <div className='w-10/12 border-l pl-4 flex flex-col p-2'>
                <p className='text-xl font-medium mb-4'>{prod?.title}</p>
                <p className='text-2xl font-medium'>
                  ${prod?.payChoice ? `${prod?.price}+` : prod?.price}
                </p>
                {prod?.digitalType === 'video' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                    <p className='text-sm'>Video Course</p>
                    <MdOutlineVideoLibrary className='ml-2 text-md' />
                  </div>
                ) : prod?.digitalType === 'ebook' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                    <p className='text-sm'>E-Book</p>
                    <HiOutlineBookOpen className='ml-2 text-md' />
                  </div>
                ) : prod?.digitalType === 'podcast' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                    <p className='text-sm'>Podcast</p>
                    <BsFillMicFill className='ml-2 text-md' />
                  </div>
                ) : prod?.digitalType === 'template' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                    <p className='text-sm'>Template</p>
                    <HiOutlineTemplate className='ml-2 text-md' />
                  </div>
                ) : prod?.digitalType === 'other' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                    <p className='text-sm'>Digital Media</p>
                    <MdOutlinePermMedia className='ml-2 text-md' />
                  </div>
                ) : (
                  <div className='flex items-center justify-center border-2 border-slate-800  rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                    <p className='text-sm'>Printables</p>
                    <MdLocalPrintshop className='ml-2 text-md' />
                  </div>
                )}
                <div className='flex mt-4'>
                  <FormControlLabel
                    label='Published'
                    control={
                      <Switch checked={prod?.published} disabled size='small' />
                    }
                  />
                  <FormControlLabel
                    label='Marketplace'
                    control={
                      <Switch
                        checked={prod?.marketplace}
                        disabled
                        size='small'
                        className='ml-2'
                      />
                    }
                  />
                  <FormControlLabel
                    label='Pay what you want'
                    control={
                      <Switch
                        checked={prod?.payChoice}
                        disabled
                        size='small'
                        className='ml-2'
                      />
                    }
                  />
                </div>
              </div>

              <Link to={`/dashboard/item/edit/${prod?._id}`}>
                <button className='absolute border-2 h-8 w-16 text-sm border-stone-800 text-stone-800 rounded right-0 bottom-0 mb-2 mr-2 hover:text-white hover:bg-stone-800'>
                  Edit
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    ) : (
      noItem
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-fit mb-32'>{content}</div>
      <Footer />
    </>
  );
};

export default Item;
