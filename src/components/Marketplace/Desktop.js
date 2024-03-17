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
import Cookies from 'js-cookie';

//mui
import Avatar from '@mui/material/Avatar';

const Desktop = ({ products, handleFilterChange, filter }) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;

    setItemOffset(newOffset);

    window.scrollTo(0, 0);
  };

  const marketClass = currentUser
    ? `max-w-6xl mx-auto h-fit mt-2`
    : `max-w-6xl mx-auto h-fit mt-24`;

  return (
    <div className={marketClass}>
      {/* <div className='bg-stone-800 text-sm rounded-tr rounded-tl h-10 flex items-center justify-center'>
        <p className='text-white'>
          Pay us only 1% of sales after processing fees{' '}
        </p>
        <BiSmile className='ml-1 text-white text-xl' />
      </div> */}
      <div className='w-full rounded-md border border-gray-200 bg-white p-4 mb-4'>
        <p className=' text-stone-800'>Fruntt Marketplace</p>
        <p className='text-stone-600 text-sm mt-2'>
          Browse the latest Notion templates from your favorite creators.
        </p>

        {/* <p className='mt-4 text-stone-800 text-lg font-bold'>
          {products.length} products and growing
        </p> */}
        <Link to='/signup'>
          <button className='text-stone-800 rounded-md text-sm p-1 pl-2 pr-2 bg-gray-200 mt-2'>
            Submit Template
          </button>
        </Link>
      </div>

      {currentItems.length > 0 ? (
        <div className='w-full grid grid-cols-4 gap-6'>
          {currentItems.map((product) => (
            <Link to={`/t/${product?.url}`} className='w-full'>
              <div
                className='border border-gray-200 flex w-full rounded-md relative bg-white'
                style={{ height: '300px' }}
              >
                <div className='absolute bottom-0 right-0 bg-gray-200 mb-1 mr-1 rounded-md p-1 pl-2 pr-2'>
                  <p className='text-xs'>
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
                  <Link
                    to={`/${product?.storeUrl.match(/\/\/([^.]+)\./)?.[1]}`}
                    className='flex items-center'
                    target='_blank'
                  >
                    <Avatar
                      src={product?.userPicture}
                      sx={{ width: 22, height: 22 }}
                    />
                    {/* <p className='ml-1 text-sm'>{product?.userName}</p> */}
                  </Link>
                </div>

                <div className='w-full flex-col p-2'>
                  <div className='w-full h-32 pb-2'>
                    <img
                      src={product?.coverImage?.url}
                      className='object-fill w-full h-full rounded-md'
                    />
                  </div>

                  <p className='text-sm mb-1 text-stone-800'>
                    {product?.title}
                  </p>
                  <p className='text-sm text-stone-600'>
                    {product?.description}
                  </p>
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
            </Link>
          ))}
        </div>
      ) : (
        <div className='w-full bg-white drop-shadow-lg border rounded h-screen flex items-center justify-center mb-10'>
          <p className='text-stone-800'>No products available</p>
        </div>
      )}
      {products.length > 9 ? (
        <div className='w-full flex justify-end mx-auto mt-2 mb-10'>
          <div className=''>
            <ReactPaginate
              breakLabel='...'
              nextLabel='Next'
              onPageChange={handlePageClick}
              marginPagesDisplayed={0}
              pageRangeDisplayed={0}
              pageCount={pageCount}
              previousLabel='Prev'
              renderOnZeroPageCount={null}
              className='flex items-center'
              activeLinkClassName='activePage'
              pageLinkClassName='notActivePage'
              breakLinkClassName='breakLink'
              disabledClassName='disabled'
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Desktop;
