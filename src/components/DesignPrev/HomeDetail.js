import React, { useState } from 'react';
import SellerPro from './SellerPro';
import {
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';

//mui
import Rating from '@mui/material/Rating';

const HomeDetail = ({
  products,
  pageBG,
  cardBG,
  price,
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
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentProducts = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;

    setItemOffset(newOffset);
  };
  return (
    <div
      className='w-full h-fit mx-auto border p-10 rounded mt-1 drop-shadow-lg'
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

      <div className='mx-auto max-w-6xl grid grid-cols-3 gap-4'>
        {currentProducts.map((product) => (
          <div
            className='border drop-shadow-lg flex w-full mb-4 rounded relative h-96'
            style={{
              backgroundColor: cardBG,
              borderColor: borderColor,
            }}
          >
            <div
              className='absolute bottom-0 right-0 font-medium text-2xl border-l border-t rounded-tl p-2'
              style={{ borderColor: borderColor, backgroundColor: price }}
            >
              <p className='font-medium text-2xl'>
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

            <div className='w-full flex-col p-4'>
              <div className='w-full h-40 pb-2'>
                <img
                  src={product?.item?.coverImage?.url}
                  className='object-cover w-full h-full rounded'
                />
              </div>
              <div className='mb-2 mt-1'>
                {product?.item?.digitalType === 'video' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-40 h-8'>
                    <p className='text-sm'>Video Course</p>
                    <MdOutlineVideoLibrary className='ml-2 text-xl' />
                  </div>
                ) : product?.item?.digitalType === 'ebook' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-40 h-8'>
                    <p className='text-sm'>E-Book</p>
                    <HiOutlineBookOpen className='ml-2 text-xl' />
                  </div>
                ) : product?.item?.digitalType === 'audio' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-40 h-8'>
                    <p className='text-sm'>Audio</p>
                    <BsFillMicFill className='ml-2 text-xl' />
                  </div>
                ) : product?.item?.digitalType === 'other' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-40 h-8'>
                    <p className='text-sm'> Digital Media</p>
                    <MdOutlinePermMedia className='ml-2 text-xl' />
                  </div>
                ) : product?.item?.digitalType === 'template' ? (
                  <div className='flex items-center justify-center border-2 border-stone-800 rounded w-40 h-8 mt-2'>
                    <p className='text-sm'>Template</p>
                    <HiOutlineTemplate className='ml-2 text-xl' />
                  </div>
                ) : (
                  <div className='flex items-center justify-center border-2 border-slate-800  rounded w-40 h-8'>
                    <p className='text-sm'>Art</p>
                    <BsPalette className='ml-2 text-xl' />
                  </div>
                )}
              </div>

              <p className='font-medium text-lg mb-1'>{product?.item?.title}</p>
              <p className='text-md mb-2'>{product?.item?.description}</p>
            </div>

            <div className='absolute bottom-0 ml-2'>
              <Rating
                value={product?.totalRating}
                readOnly
                precision={0.5}
                size='medium'
              />
            </div>
          </div>
        ))}
      </div>
      <div className='max-w-6xl flex justify-end mx-auto mt-2'>
        <div className=''>
          <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel='Prev'
            renderOnZeroPageCount={null}
            className='flex items-center'
            activeLinkClassName='activePage'
            pageLinkClassName='notActivePage'
            breakLinkClassName='breakLink'
          />
        </div>
      </div>
    </div>
  );
};

export default HomeDetail;
