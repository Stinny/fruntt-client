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

//mui
import Avatar from '@mui/material/Avatar';

const LibraryMobile = ({ orders }) => {
  //stuff for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;

  const currentOrders = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;

    setItemOffset(newOffset);

    window.scroll(0, 0);
  };
  //end of pagination stuff

  return orders.length ? (
    <div className='mx-auto w-full mt-2'>
      <div className='w-full mx-auto flex flex-col'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-md font-medium'>Your library</p>

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
              <div className='border rounded-md bg-white drop-shadow-md relative flex flex-col mt-2 p-2'>
                {/* {order?.item?.digitalType === 'video' ? (
                  <div className='flex items-center justify-center text-stone-800 bg-gray-100 rounded w-36 h-8  mr-2 mt-2'>
                    <p className='text-sm'>Video Course</p>
                    <MdOutlineVideoLibrary className='ml-2 text-md' />
                  </div>
                ) : order?.item?.digitalType === 'ebook' ? (
                  <div className='flex items-center justify-center text-stone-800 bg-gray-100 rounded w-36 h-8  mr-2 mt-2'>
                    <p className='text-sm'>E-Book</p>
                    <HiOutlineBookOpen className='ml-2 text-md' />
                  </div>
                ) : order?.item?.digitalType === 'audio' ? (
                  <div className='flex items-center justify-center text-stone-800 bg-gray-100 rounded w-36 h-8  mr-2 mt-2'>
                    <p className='text-sm'>Audio</p>
                    <BsFillMicFill className='ml-2 text-md' />
                  </div>
                ) : order?.item?.digitalType === 'template' ? (
                  <div className='flex items-center justify-center text-stone-800 bg-gray-100 rounded w-36 h-8  mr-2 mt-2'>
                    <p className='text-sm'>Template</p>
                    <HiOutlineTemplate className='ml-2 text-md' />
                  </div>
                ) : order?.item?.digitalType === 'other' ? (
                  <div className='flex items-center justify-center text-stone-800 bg-gray-100 rounded w-36 h-8  mr-2 mt-2'>
                    <p className='text-sm'>Digital Media</p>
                    <MdOutlinePermMedia className='ml-2 text-md' />
                  </div>
                ) : (
                  <div className='flex items-center justify-center text-stone-800 bg-gray-100 rounded w-36 h-8  mr-2 mt-2'>
                    <p className='text-sm'>Art</p>
                    <BsPalette className='ml-2 text-md' />
                  </div>
                )} */}
                <p className='text-md font-bold mt-2'>{order?.item?.title}</p>

                <p className='text-sm mt-2'>{order?.item?.description}</p>
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
            </Link>
          ))}
          <div className='w-full flex justify-end mx-auto mt-2'>
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
    <div className='p-2'>
      <div className='w-full h-screen mx-auto bg-white drop-shadow-lg border flex items-center justify-center'>
        <div className='flex flex-col'>
          <p className='text-xl font-medium text-stone-800'>
            Your library is empty!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LibraryMobile;
