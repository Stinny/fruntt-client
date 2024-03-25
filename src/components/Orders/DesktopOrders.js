import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import img from '../../media/noOrders.svg';
import ReactPaginate from 'react-paginate';
import { AiOutlineLink, AiOutlineEye } from 'react-icons/ai';
import { BiPackage, BiMessageSquareDetail } from 'react-icons/bi';
import { MdOutlineAttachMoney, MdShoppingCart } from 'react-icons/md';

const DesktopOrders = ({ orders }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

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
        Math.floor(minutesElapsed) === 1
          ? `${Math.floor(minutesElapsed)} minute ago`
          : `${Math.floor(minutesElapsed)} minutes ago`;
    } else if (hoursElapsed < 24) {
      displayText =
        Math.floor(hoursElapsed) === 1
          ? `${Math.floor(hoursElapsed)} hour ago`
          : `${Math.floor(hoursElapsed)} hours ago`;
    } else if (daysElapsed < 3) {
      displayText =
        Math.floor(daysElapsed) === 1
          ? `${Math.floor(daysElapsed)} day ago`
          : `${Math.floor(daysElapsed)} days ago`;
    } else {
      displayText = `${moment(orderDate).format('MMM D, YYYY')}`;
    }

    return <span>{displayText}</span>;
  };

  return orders.length > 0 ? (
    <div className='flex flex-col gap-2'>
      <div className='w-full flex justify-between items-end'>
        <div className='flex flex-col border border-gray-200 rounded-md p-2'>
          <p className='text-sm text-stone-800'>Orders</p>
          <p className='text-xs text-stone-600'>View all your orders</p>
        </div>

        <p className='text-stone-600 font-medium text-xs'>
          {orders.length > 1
            ? `${orders.length} orders`
            : `${orders.length} order`}
        </p>
      </div>

      <div className='flex flex-col gap-2'>
        {currentOrders.map((order, index) => (
          <div className='flex items-center w-full border border-gray-200 rounded-md p-2'>
            <div className='w-3/12 flex justify-start'>
              <p className='text-sm text-stone-800'>{order?._id}</p>
            </div>

            <div className='w-3/12 flex justify-center'>
              <p className='text-sm text-stone-800'>{order?.email}</p>
            </div>

            <div className='w-3/12 flex justify-center'>
              <p className='text-sm text-stone-800'>
                <ElapsedTimeOrDate orderDate={order?.placedOn} />
              </p>
            </div>

            <div className='w-3/12 flex justify-end'>
              <div className='rounded-md p-1 pl-2 pr-2 bg-gray-200 flex items-center justify-center text-xs'>
                ${order?.total}
              </div>
            </div>
          </div>
        ))}
      </div>
      {orders.length > 12 ? (
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
    <div
      className='flex flex-col border-gray-200 items-center justify-center rounded-md w-full border bg-white'
      style={{ height: '600px' }}
    >
      <p className='text-stone-800 text-sm'>No orders</p>

      <p className='text-stone-600 text-xs'>
        View all incoming orders from customers
      </p>
    </div>
  );
};

export default DesktopOrders;
