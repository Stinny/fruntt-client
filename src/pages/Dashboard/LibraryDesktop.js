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
      <div className='w-full mx-auto flex flex-col'>
        <div className='w-full flex justify-between items-center'>
          <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
            <BsBookmarkHeart className='text-white text-xl' />
            <p className='text-md text-white ml-2'>Library</p>
          </div>

          <div className='flex items-center'>
            <p className='text-stone-800 font-medium text-sm'>
              {orders.length > 1
                ? `${orders.length} purchases`
                : `${orders.length} purchase`}
            </p>
          </div>
        </div>
        <div className='flex flex-col'>
          {currentOrders.map((order) => (
            <Link to={`/order/${order?._id}`}>
              <div className='border border-gray-200 rounded-md bg-white relative flex mt-2'>
                <div className='w-2/12 h-full p-2'>
                  <img
                    src={order?.item?.coverImage?.url}
                    className='rounded-md w-full h-20 object-cover'
                  />
                </div>

                <div className='w-10/12 pl-4 flex flex-col p-2'>
                  <p className='text-stone-800 mb-1'>{order?.item?.title}</p>

                  <p className='text-sm text-stone-600 mb-1'>
                    {order?.item?.description}
                  </p>

                  <div className='mt-2'>
                    <a
                      href={order?.item?.storeUrl}
                      className='flex items-center'
                      target='_blank'
                    >
                      <Avatar
                        src={order?.item?.userPicture}
                        sx={{ width: 22, height: 22 }}
                      />
                      <p className='ml-1 text-sm'>{order?.item?.userName}</p>
                    </a>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className='w-full flex justify-end  mt-2'>
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
      </div>
    </div>
  ) : (
    <div className='w-full h-screen mx-auto bg-white drop-shadow-lg border flex items-center justify-center'>
      <div className='flex flex-col'>
        <p className='text-xl font-medium text-stone-800'>
          Your library is empty!
        </p>
      </div>
    </div>
  );
};

export default LibraryDesktop;
