import React from 'react';
import SellerPro from './SellerPro';
import {
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';

//mui
import Rating from '@mui/material/Rating';

const HomeDetail = ({
  products,
  pageBG,
  cardBG,
  buttonColor,
  buttonTextColor,
  buttonStyle,
  reviewBackground,
  headerColor,
  pageText,
  borderColor,
  hideReviews,
  storefront,
  hideDescription,
  selectedProduct,
  handleSelectedProduct,
}) => {
  return (
    <div
      className='w-full h-screen mx-auto border p-10 rounded mt-1 drop-shadow-lg'
      style={{ backgroundColor: pageBG }}
    >
      <SellerPro
        pageBG={pageBG}
        cardBG={cardBG}
        pageText={pageText}
        borderColor={borderColor}
        headers={headerColor}
        handleSelectedProduct={handleSelectedProduct}
        selectedProduct={selectedProduct}
        products={products}
      />

      <div
        className='mx-auto max-w-6xl h-12 mb-2 mt-2 border rounded flex justify-between items-center drop-shadow-lg p-4'
        style={{
          backgroundColor: cardBG,
          borderColor: borderColor,
        }}
      >
        <p className='font-medium text-xl'>My Digital Products</p>
        <p className='text-lg'>
          {products.length == 1
            ? `${products.length} product`
            : `${products.length} products`}
        </p>
      </div>

      <div className='mx-auto max-w-6xl overflow-scroll h-5/6'>
        {products.map((product) => (
          <div
            className='border drop-shadow-lg flex w-full mb-4 rounded relative'
            style={{
              backgroundColor: cardBG,
              borderColor: borderColor,
            }}
          >
            <div className='absolute top-0 right-0 mr-2 mt-2'>
              <Rating
                value={product?.totalRating}
                readOnly
                precision={0.5}
                size='large'
              />
            </div>

            <div
              className='absolute bottom-0 right-0 font-medium text-2xl border-l border-t rounded-tl p-2'
              style={{ borderColor: borderColor }}
            >
              <p className='font-medium text-3xl'>
                $
                {product?.item?.payChoice
                  ? `${product?.item?.price?.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })} +`
                  : product?.item?.price?.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
              </p>
            </div>
            <div className='w-3/12 flex items-center justify-center p-4'>
              <img className='rounded' src={product?.item?.coverImage?.url} />
            </div>

            <div className='w-9/12 flex-col p-4'>
              <p className='font-medium text-2xl mb-4'>
                {product?.item?.title}
              </p>
              <p className='font-medium text-xl mb-4'>
                {product?.item?.description}
              </p>

              {product?.item?.digitalType === 'video' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-10'>
                  <p>Video Course</p>
                  <MdOutlineVideoLibrary className='ml-2 text-2xl' />
                </div>
              ) : product?.item?.digitalType === 'ebook' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-10'>
                  <p>E-Book</p>
                  <HiOutlineBookOpen className='ml-2 text-2xl' />
                </div>
              ) : product?.item?.digitalType === 'audio' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-10'>
                  <p>Audio</p>
                  <BsFillMicFill className='ml-2 text-2xl' />
                </div>
              ) : product?.item?.digitalType === 'other' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-10'>
                  <p>Digital Media</p>
                  <MdOutlinePermMedia className='ml-2 text-2xl' />
                </div>
              ) : product?.item?.digitalType === 'template' ? (
                <div className='flex items-center justify-center border-2 border-stone-800 rounded w-44 h-8 mt-2'>
                  <p>Template</p>
                  <HiOutlineTemplate className='ml-2 text-2xl' />
                </div>
              ) : (
                <div className='flex items-center justify-center border-2 border-slate-800  rounded w-44 h-10'>
                  <p>Art</p>
                  <BsPalette className='ml-2 text-2xl' />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDetail;
