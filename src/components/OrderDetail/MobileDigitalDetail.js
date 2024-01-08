import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';
import ReactCountryFlag from 'react-country-flag';
import Rating from '@mui/material/Rating';

const MobileDigitalDetail = ({ order }) => {
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

  return (
    <div className='w-full mt-16 p-2'>
      <div className='w-full mx-auto border rounded-md p-2 bg-white drop-shadow-md mt-2'>
        <div className='w-full flex flex-col mx-auto relative'>
          <p className='text-xs absolute right-0 mr-1 mt-1'>
            {<ElapsedTimeOrDate orderDate={order?.placedOn} />}
          </p>
          <p className='text-stone-800 font-medium text-sm'>Order</p>
          <p className='text-stone-800 font-medium text-md mt-1'>
            {order?._id}
          </p>
          <p className='text-stone-800 font-medium text-sm mt-4'>Total</p>
          <p className='font-medium text-stone-800 text-2xl mt-1'>
            ${order?.total}
          </p>
          <p className='text-stone-800 font-medium mt-4 text-sm'>
            Delivered to
          </p>
          <p className='text-stone-800 font-medium text-md mt-1'>
            {order?.name}
          </p>
          <p className='text-stone-800 font-medium text-md mt-1'>
            {order?.email}
          </p>
          <div className='flex items-center mt-1'>
            <ReactCountryFlag
              countryCode={order?.country?.value}
              className='mr-1'
            />
            <p className='text-md text-stone-800'>{order?.country?.label}</p>
          </div>
          <p className='text-stone-800 font-medium mt-4 text-sm'>Template</p>
          <p className='text-stone-800 font-medium text-lg'>
            {order?.item?.title}
          </p>

          <div className='mt-2'>
            {order?.reviewed ? (
              <>
                <p className='text-stone-800 font-medium mt-4 text-sm'>
                  Review
                </p>
                <div className='flex flex-col p-4 rounded mt-2 relative bg-white drop-shadow-md border'>
                  <Rating
                    value={order?.review?.rating}
                    readOnly
                    size='medium'
                    className=''
                    precision={0.5}
                  />

                  <p className='md:text-xl mt-2'>{order?.review?.content}</p>
                </div>
              </>
            ) : (
              <div className='w-full h-32 rounded bg-gray-100 flex items-center justify-center mt-1 text-sm'>
                <p>No review</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='w-full bg-white border rounded-md p-2 drop-shadow-md mt-2'>
        <Link to='/dashboard/orders' className='w-full'>
          <button
            type='button'
            className='border-2 rounded h-12 w-full text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white text-sm'
          >
            Back to orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MobileDigitalDetail;
