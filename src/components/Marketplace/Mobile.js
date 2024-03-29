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

//mui
import Avatar from '@mui/material/Avatar';

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
    'text-sm font-medium text-white rounded bg-stone-800 flex items-center justify-center ml-2 w-24 p-1';
  const notActiveLink =
    'text-sm font-medium bg-gray-100 w-24 p-1 hover:bg-stone-800 hover:text-white rounded text-stone-800 flex items-center justify-center ml-2';

  return (
    <div className='p-4'>
      {/* <div className='bg-stone-800 text-sm rounded-tr rounded-tl h-10 flex items-center justify-center mt-24'>
        <p className='text-white'>
          Pay us only 1% of sales after processing fees{' '}
        </p>
        <BiSmile className='ml-1 text-white text-xl' />
      </div> */}
      <div className='w-full rounded-md border drop-shadow-lg bg-white p-4 mb-4 mt-16'>
        <p className='text-lg font-medium text-stone-800'>Fruntt Marketplace</p>
        <p className='text-stone-800 text-sm mt-2'>
          Browse the latest Notion templates from your favorite creators.
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
                      className='object-fill w-full h-full rounded-md'
                    />
                  </div>

                  <p className='font-bold text-lg mb-1'>{product?.title}</p>
                  <p className='text-sm mb-2'>{product?.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className='w-full bg-white drop-shadow-lg border rounded h-screen flex items-center justify-center mb-10'>
          <p className='text-stone-800 text-sm'>No templates available</p>
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
