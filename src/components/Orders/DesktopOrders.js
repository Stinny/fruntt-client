import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import img from '../../media/noOrders.svg';
import ReactPaginate from 'react-paginate';
import { AiOutlineLink, AiOutlineEye } from 'react-icons/ai';
import { BiPackage, BiMessageSquareDetail } from 'react-icons/bi';
import { MdOutlineAttachMoney } from 'react-icons/md';

const DesktopOrders = ({ orders }) => {
  //stuff for pagination//
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

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
      <div className='w-full flex justify-between'>
        <h2 className='text-3xl font-medium'>Your Orders</h2>
        <div className='flex justify-between'>
          <input
            placeholder='Coming soon!'
            className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
          />
          <button className='border-2 rounded w-20 ml-2  h-10 border-stone-800 text-slate-800'>
            Search
          </button>
        </div>

        <p className='text-stone-800 font-medium text-lg'>
          {orders.length > 1
            ? `${orders.length} orders`
            : `${orders.length} order`}
        </p>
      </div>

      <div className='w-full mx-auto mt-2'>
        <table className='w-full rounded-md bg-white border drop-shadow-lg p-2'>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr className='text-left text-sm'>
                <td className='p-3'>
                  <Link
                    to={`/dashboard/orders/${order?._id}`}
                    className='flex items-center justify-center'
                  >
                    {order._id}
                    <AiOutlineLink />
                  </Link>
                </td>
                <td>{order?.email}</td>
                <td>{<ElapsedTimeOrDate orderDate={order?.placedOn} />}</td>
                <td className='w-12'>
                  {order?.paid ? (
                    <MdOutlineAttachMoney className='text-2xl' />
                  ) : (
                    ''
                  )}
                </td>

                <td className='w-12'>
                  {order?.viewed ? <AiOutlineEye className='text-2xl' /> : ''}
                </td>

                <td className='w-12'>
                  {order?.reviwed ? (
                    <BiMessageSquareDetail className='text-2xl' />
                  ) : (
                    ''
                  )}
                </td>

                <td>${order?.total?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length > 15 ? (
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
      <h2 className='text-2xl font-medium mb-4'>You have no orders</h2>
      <img src={img} className='w-3/12' />
      <p className='text-stone-800 mt-4'>
        Here you will be able view all incoming orders from customers
      </p>
    </div>
  );
};

export default DesktopOrders;
