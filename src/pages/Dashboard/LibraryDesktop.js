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
import { BsBookmarkHeart } from 'react-icons/bs';

//mui
import Avatar from '@mui/material/Avatar';

const LibraryDesktop = ({ orders }) => {
  //stuff for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;

  const currentOrders = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
  };
  //end of pagination stuff

  return orders.length ? (
    <div className='mx-auto w-full'>
      <div className='w-full mx-auto flex flex-col gap-2'>
        <div className='w-full flex justify-between items-end'>
          <div className='flex flex-col justify-center border border-gray-200 bg-white rounded-md p-2'>
            <p className='text-sm text-stone-800'>Library</p>
            <p className='text-xs text-stone-600'>View all your purchases</p>
          </div>

          <div className='flex items-center'>
            <p className='text-stone-600 text-xs'>
              {orders.length > 1
                ? `${orders.length} purchases`
                : `${orders.length} purchase`}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          {currentOrders.map((order) => (
            <Link to={`/order/${order?._id}`}>
              <div className='border border-gray-200 rounded-md bg-white relative flex'>
                <div className='w-2/12 h-full p-2'>
                  <img
                    src={order?.item?.coverImage?.url}
                    className='rounded-md w-full h-20 object-cover'
                  />
                </div>

                <div className='w-10/12 pl-4 flex flex-col items-start p-2'>
                  <p className='text-stone-800 mb-1'>{order?.item?.title}</p>

                  <p className='text-sm text-stone-600'>
                    {order?.item?.description}
                  </p>

                  <Link
                    to={`/${order?.item?.storeUrl.match(/\/\/([^.]+)\./)?.[1]}`}
                    className='flex items-center mt-1'
                  >
                    <Avatar
                      src={order?.item?.userPicture}
                      sx={{ width: 20, height: 20 }}
                    />
                    <p className='ml-1 text-xs'>{order?.item?.userName}</p>
                  </Link>
                </div>
              </div>
            </Link>
          ))}
          {orders.length > 5 && (
            <div className='w-full flex justify-end mt-2'>
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
          )}
        </div>
      </div>
    </div>
  ) : (
    <div
      className='flex flex-col border-gray-200 items-center justify-center rounded-md w-full border bg-white'
      style={{ height: '600px' }}
    >
      <p className='text-stone-800'>Your library is empty</p>

      <Link
        to='/marketplace'
        className='flex items-center justify-center bg-gray-200 text-xs text-stone-800 rounded-md pt-1 pb-1 pl-2 pr-2 mt-2'
      >
        Marketplace
      </Link>
    </div>
  );
};

export default LibraryDesktop;
