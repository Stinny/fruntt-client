import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AiOutlineSearch } from 'react-icons/ai';
import ReactPaginate from 'react-paginate';
import { AiOutlineLink, AiOutlineEye } from 'react-icons/ai';
import { BiPackage, BiMessageSquareDetail } from 'react-icons/bi';
import { MdOutlineAttachMoney, MdShoppingCart } from 'react-icons/md';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const OrdersMobile = ({ orders, cols }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;
  const currentOrders = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;

    setItemOffset(newOffset);
  };
  //pagination stuff ends here//

  const ElapsedTimeOrDate = ({ orderDate }) => {
    const now = new Date();
    const duration = moment.duration(moment(now).diff(moment(orderDate)));
    const secondsElapsed = duration.asSeconds();
    const minutesElapsed = duration.asMinutes();
    const hoursElapsed = duration.asHours();
    const daysElapsed = duration.asDays();

    let displayText = '';

    if (secondsElapsed < 60) {
      displayText = `${Math.floor(secondsElapsed)} seconds ago`;
    } else if (minutesElapsed < 60) {
      displayText =
        Math.floor(minutesElapsed) == 1
          ? `${Math.floor(minutesElapsed)} minute ago`
          : `${Math.floor(minutesElapsed)} minutes ago`;
    } else if (hoursElapsed < 24) {
      displayText =
        Math.floor(hoursElapsed) == 1
          ? `${Math.floor(hoursElapsed)} hour ago`
          : `${Math.floor(hoursElapsed)} hours ago`;
    } else if (daysElapsed < 3) {
      displayText =
        Math.floor(daysElapsed) == 1
          ? `${Math.floor(daysElapsed)} day ago`
          : `${Math.floor(daysElapsed)} days ago`;
    } else {
      displayText = `${moment(orderDate).format('MMM D, YYYY')}`;
    }

    return <span>{displayText}</span>;
  };

  return orders.length > 0 ? (
    <div>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center justify- bg-stone-800 rounded p-2'>
          <MdShoppingCart className='text-white text-lg' />
          <p className='text-md text-white ml-2'>Orders</p>
        </div>

        <p className='text-stone-800 font-medium text-sm'>
          {orders.length > 1
            ? `${orders.length} orders`
            : `${orders.length} order`}
        </p>
      </div>

      <div className='w-full mx-auto mt-2'>
        {currentOrders.map((order, index) => (
          <Link to={`/dashboard/orders/${order?._id}`}>
            <div className='relative flex flex-col mt-2 border drop-shadow-md bg-white rounded h-24 p-2'>
              {/* <Link to={`/dashboard/orders/${order?._id}`} className='flex'>
              {order._id}
              <AiOutlineLink />
            </Link> */}
              <p className='font-bold text-sm'>{order?.item?.title}</p>
              <p className='mt-2 text-sm'>{order?.email}</p>
              <p className='absolute bottom-0 left-0 ml-2 mb-2 text-sm'>
                {<ElapsedTimeOrDate orderDate={order?.placedOn} />}
              </p>
              <p className='absolute bottom-0 right-0 mr-2 mb-2 text-md'>
                ${order?.total?.toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {orders.length > 3 ? (
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
      ) : (
        ''
      )}
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center rounded h-full w-full border bg-white drop-shadow-md mb-20'>
      <h2 className='text-2xl text-stone-800 font-medium mb-4'>
        You have no orders
      </h2>

      <p className='text-stone-800 mt-4'>
        Here you will be able view all incoming orders from customers
      </p>
    </div>
  );
};

export default OrdersMobile;
