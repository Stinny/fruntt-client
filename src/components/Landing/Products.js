import React from 'react';
import { isMobile } from 'react-device-detect';
import { useGetFeaturedProductsQuery } from '../../api/productsApiSlice';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { BiSmile } from 'react-icons/bi';

//mui
import Avatar from '@mui/material/Avatar';

const Products = ({ products, gettingProducts, gotProducts }) => {
  //   const {
  //     data: products,
  //     isLoading,
  //     isSuccess,
  //     refetch,
  //   } = useGetFeaturedProductsQuery();

  let content;

  if (gettingProducts) {
    content = '';
  } else if (gotProducts) {
    content = isMobile ? (
      <div className='w-full flex flex-col items-center mt-44 mb-20'>
        <p className='text-lg font-medium'>Recommended Templates</p>

        <div className='w-full flex flex-col mt-6'>
          {products.map((product) => (
            <a
              href={`${product.storeUrl}/${product?.url}`}
              className='w-full'
              target='_blank'
            >
              <div
                className='border drop-shadow-lg flex w-full mb-4 rounded-md relative bg-white'
                style={{ height: '350px' }}
              >
                <div className='absolute bottom-0 right-0 mb-1 mr-1 bg-gray-100 rounded-br-md p-2'>
                  <p
                    className={
                      product?.item?.free
                        ? 'font-medium text-lg text-stone-800'
                        : 'font-medium text-lg text-stone-800'
                    }
                  >
                    {product?.free
                      ? 'FREE'
                      : product?.payChoice
                      ? `$ ${product?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} +`
                      : `$${product?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}`}
                  </p>
                </div>

                <div className='absolute bottom-0 ml-2 mb-2'>
                  <a
                    href={product?.storeUrl}
                    className='flex items-center'
                    target='_blank'
                  >
                    <Avatar
                      src={product?.userPicture}
                      sx={{ width: 22, height: 22 }}
                    />
                    <p className='ml-1 text-sm'>{product?.userName}</p>
                  </a>
                </div>

                <div className='w-full flex-col p-4'>
                  <div className='w-full h-44 pb-2'>
                    <img
                      src={product?.coverImage?.url}
                      className='object-cover w-full h-full rounded-md'
                    />
                  </div>

                  <p className='font-bold text-lg mb-1'>{product?.title}</p>
                  <p className='text-sm mb-2'>{product?.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    ) : (
      <div className='max-w-7xl flex flex-col items-center mt-44'>
        <p className='text-xl font-bold'>Recommended Templates</p>

        <div className='w-full grid grid-cols-3 gap-4 mt-6'>
          {products.map((product) => (
            <a
              href={`${product.storeUrl}/${product?.url}`}
              className='w-full'
              target='_blank'
            >
              <div
                className='border drop-shadow-lg flex w-full mb-4 rounded-md relative bg-white'
                style={{ height: '350px' }}
              >
                <div className='absolute bottom-0 right-0 font-medium bg-gray-100 mb-1 mr-1 rounded-br-md p-2'>
                  <p
                    className={
                      product?.item?.free
                        ? 'font-medium text-lg'
                        : 'font-medium text-lg'
                    }
                  >
                    {product?.free
                      ? 'FREE'
                      : product?.payChoice
                      ? `$ ${product?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} +`
                      : `$${product?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}`}
                  </p>
                </div>

                <div className='absolute bottom-0 ml-2 mb-2'>
                  <a
                    href={product?.storeUrl}
                    className='flex items-center'
                    target='_blank'
                  >
                    <Avatar
                      src={product?.userPicture}
                      sx={{ width: 32, height: 32 }}
                    />
                    <p className='ml-1'>{product?.userName}</p>
                  </a>
                </div>

                <div className='w-full flex-col p-4'>
                  <div className='w-full h-48 pb-2'>
                    <img
                      src={product?.coverImage?.url}
                      className='object-fill w-full h-full rounded-md'
                    />
                  </div>
                  {/* <div className='mb-2 mt-1'>
                    {product?.digitalType === 'video' ? (
                      <div className='flex items-center justify-center bg-gray-100 rounded w-40 h-8'>
                        <p className='text-sm'>Video Course</p>
                        <MdOutlineVideoLibrary className='ml-2 text-xl' />
                      </div>
                    ) : product?.digitalType === 'ebook' ? (
                      <div className='flex items-center justify-center bg-gray-100 rounded w-40 h-8'>
                        <p className='text-sm'>E-Book</p>
                        <HiOutlineBookOpen className='ml-2 text-xl' />
                      </div>
                    ) : product?.digitalType === 'audio' ? (
                      <div className='flex items-center justify-center bg-gray-100 rounded w-40 h-8'>
                        <p className='text-sm'>Audio</p>
                        <BsFillMicFill className='ml-2 text-xl' />
                      </div>
                    ) : product?.digitalType === 'other' ? (
                      <div className='flex items-center justify-center bg-gray-100 rounded w-40 h-8'>
                        <p className='text-sm'>Other</p>
                        <MdOutlinePermMedia className='ml-2 text-xl' />
                      </div>
                    ) : product?.digitalType === 'template' ? (
                      <div className='flex items-center justify-center bg-gray-100 rounded w-40 h-8 mt-2'>
                        <p className='text-sm'>Template</p>
                        <HiOutlineTemplate className='ml-2 text-xl' />
                      </div>
                    ) : (
                      <div className='flex items-center justify-center bg-gray-100  rounded w-40 h-8'>
                        <p className='text-sm'>Art</p>
                        <BsPalette className='ml-2 text-xl' />
                      </div>
                    )}
                  </div> */}

                  <p className='font-bold text-lg mb-1'>{product?.title}</p>
                  <p className='text-sm mb-2'>{product?.description}</p>
                </div>

                {/* <div className='absolute bottom-0 ml-2 mb-2'>
                <Rating
                  value={product?.totalRating}
                  readOnly
                  precision={0.5}
                  size='medium'
                />
                <p>{product.numberOfSales} sales</p>
              </div> */}

                {/* <div className='w-3/12 flex items-center justify-center p-4'>
          <img className='rounded' src={product?.item?.coverImage?.url} />
        </div> */}
              </div>
            </a>
          ))}
        </div>
        {/* <div className='w-full flex items-center justify-between mt-6'>
          <div className='w-48 h-48 bg-white rounded border shadow-lg flex flex-col p-4'>
            <BsStripe className='text-3xl' />
            <p className='font-medium mt-4'>Secure Payments</p>
            <p className='mt-2 text-sm'>
              Securely accept payments and be paid out immediately via Stripe
              connect.
            </p>
          </div>
  
          <div className='w-48 h-48 bg-white rounded border shadow-lg flex flex-col p-4'>
            <StoreIcon style={{ fontSize: '36px' }} />
            <p className='font-medium mt-4'>Marketplace</p>
            <p className='mt-2 text-sm'>
              List your products in our marketplace and gain access to another
              sales channel.
            </p>
          </div>
  
          <div className='w-48 h-48 bg-white rounded border shadow-lg flex flex-col p-4'>
            <IoDesktopOutline className='text-3xl' />
            <p className='font-medium mt-4'>Simple UI</p>
            <p className='mt-2 text-sm'>
              Never be overwhelmed with our simple user interface.
            </p>
          </div>
  
          <div className='w-48 h-48 bg-white rounded border shadow-lg flex flex-col p-4'>
            <IoColorPaletteOutline className='text-3xl' />
            <p className='font-medium mt-4'>Customization</p>
            <p className='mt-2 text-sm'>
              Customize and design your storefront from a pallet of colors.
            </p>
          </div>
  
          <div className='w-48 h-48 bg-white rounded border shadow-lg flex flex-col p-4'>
            <MdCloudDownload className='text-3xl' />
  
            <p className='font-medium mt-4'>Unlimited Products</p>
            <p className='mt-2 text-sm'>
              Create and sell as many products as you like.
            </p>
          </div>
        </div> */}
      </div>
    );
  }

  return content;
};

export default Products;
