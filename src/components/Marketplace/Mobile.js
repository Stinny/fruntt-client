import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Mobile = ({ products, handleFilterChange, filter }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;

    setItemOffset(newOffset);

    window.scrollTo(0, 0);
  };

  const activeLink =
    'text-md h-8 font-medium text-white w-full rounded bg-stone-800 flex items-center justify-center ml-2';
  const notActiveLink =
    'text-md font-medium w-full h-8 hover:bg-stone-800 hover:text-white rounded text-stone-800 flex items-center justify-center ml-2';

  return (
    <div className='p-2'>
      <div className='bg-stone-800 text-sm rounded-tr rounded-tl h-10 flex items-center justify-center mt-24'>
        <p className='text-white'>
          Pay us only 1% of sales after processing fees{' '}
        </p>
        <BiSmile className='ml-1 text-white text-xl' />
      </div>
      <div className='w-full rounded-bl rounded-br border drop-shadow-lg bg-white p-4 mb-4'>
        <p className='text-lg font-medium text-stone-800'>Marketplace</p>
        <p className='text-stone-800 text-sm mt-2'>
          A place for creators to earn
          <span className='font-bold'> MORE</span>. Discover the latest products
          and creators. Get your store open and products listed!
        </p>
        {/* <p className='mt-4 text-stone-800 text-lg font-bold'>
          {products.length} products and growing
        </p> */}
        <Link to='/signup'>
          <button className='border-2 font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white rounded w-24 h-8 text-sm mt-4'>
            Open Store
          </button>
        </Link>
      </div>

      {currentItems.length > 0 ? (
        <div className='w-full flex flex-col'>
          {currentItems.map((product) => (
            <a
              href={`${product.storeUrl}/${product?.url}`}
              className='w-full'
              target='_blank'
            >
              <div className='border drop-shadow-lg flex w-full mb-4 rounded relative h-96 bg-white'>
                <div className='absolute bottom-0 right-0 font-medium text-2xl border-l border-t rounded-tl p-2'>
                  <p
                    className={
                      product?.item?.free
                        ? 'font-medium text-xl'
                        : 'font-medium text-2xl'
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

                <div className='w-full flex-col p-4'>
                  <div className='w-full h-40 pb-2'>
                    <img
                      src={product?.coverImage?.url}
                      className='object-cover w-full h-full rounded'
                    />
                  </div>
                  <div className='mb-2 mt-1'>
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
                      <div className='flex items-center justify-center bg-gray-100 rounded w-40 h-8'>
                        <p className='text-sm'>Art</p>
                        <BsPalette className='ml-2 text-xl' />
                      </div>
                    )}
                  </div>

                  <p className='font-medium text-lg mb-1'>{product?.title}</p>
                  <p className='text-md mb-2'>{product?.description}</p>
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
      ) : (
        <div className='w-full bg-white drop-shadow-lg border rounded h-screen flex items-center justify-center mb-10'>
          <p className='text-stone-800 text-sm'>No products available</p>
        </div>
      )}

      {products.length > 5 ? (
        <div className='w-full flex justify-end mx-auto mt-2 mb-10'>
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
      ) : (
        ''
      )}
    </div>
  );
};

export default Mobile;
