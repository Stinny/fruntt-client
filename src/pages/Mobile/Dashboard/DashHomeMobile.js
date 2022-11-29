import React from 'react';
import { Link } from 'react-router-dom';
import SalesGraph from '../../../components/SalesGraph';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';

//mui
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

const DashHomeMobile = ({ stats, currentUser }) => {
  return (
    <>
      {!currentUser.stripeOnboard && (
        <Alert severity='error' className='mt-4 mb-4 w-11/12 mx-auto'>
          <p>
            Connect to payment gateway in{' '}
            <Link to='/settings' className='text-red-900 font-semibold'>
              settings
            </Link>{' '}
            to enable checkout
          </p>
        </Alert>
      )}

      {!currentUser.firstName ||
      !currentUser.lastName ||
      !currentUser?.sellerProfile?.bio ||
      !currentUser?.sellerProfile?.picture?.url ? (
        <Alert severity='error' className='mt-4 mb-4 w-full'>
          <p>
            Finish setting up your seller profile in{' '}
            <Link to='/settings' className='text-red-900 font-semibold'>
              settings!
            </Link>
          </p>
        </Alert>
      ) : (
        ''
      )}

      {!currentUser.emailConfirmed && (
        <Alert severity='error' className='mt-2 mb-4 w-11/12 mx-auto'>
          <p>
            Please check your inbox to confirm your email so you can enable
            checkout
          </p>
        </Alert>
      )}

      <div className='flex w-11/12 mx-auto mt-4 mb-2'>
        <a
          href={currentUser?.store?.url}
          className='flex items-center text-lg text-slate-800 font-medium'
          target='_blank'
        >
          View your product page <FaExternalLinkAlt className='ml-2' />{' '}
        </a>
      </div>

      <div className='flex flex-col items-center'>
        <div className='w-11/12 flex'>
          <div className='drop-shadow-md w-11/12 h-28 bg-gray-200 rounded-md p-2 relative'>
            <Tooltip
              title={
                <p className='text-lg'>Total revenue your page has generated</p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='bottom'
              enterTouchDelay={10}
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-lg font-medium'>Revenue</p>
            <p className='text-2xl font-medium'>
              $
              {stats?.revenue > 0
                ? stats?.revenue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '0'}
            </p>
          </div>

          <div className='drop-shadow-md w-11/12 h-28 bg-gray-200 rounded-md p-2 relative ml-2'>
            <Tooltip
              title={
                <p className='text-lg'>Total sales your page has generated</p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='bottom'
              enterTouchDelay={10}
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-lg font-medium'>Sales</p>
            <p className='text-2xl font-medium'>{stats?.numOfOrders}</p>
          </div>
        </div>

        <div className='w-11/12 flex'>
          <div className='drop-shadow-md w-6/12 h-28 mt-2 bg-gray-200 rounded-md p-2 relative'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Amount of users who have visted your page
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='bottom'
              enterTouchDelay={10}
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-lg font-medium'>Store visits</p>
            <p className='text-2xl font-medium'>{stats?.visits}</p>
          </div>

          <div className='drop-shadow-md w-6/12 h-28 mt-2 ml-2 bg-gray-200 rounded-md p-2 relative'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Percentage of customers who visit and make a purchase
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='bottom'
              enterTouchDelay={10}
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-lg font-medium'>Conversion rate</p>
            <p className='text-2xl font-medium'>
              {stats?.conversion > 0 ? stats?.conversion.toFixed(2) : '0'}%
            </p>
          </div>
        </div>
      </div>

      <div className='w-full mt-2 mb-4 flex flex-col items-center mx-auto'>
        <div className='w-11/12 drop-shadow-md rounded-md h-40 bg-gray-200 p-2'>
          <p className='text-xl font-medium'>Orders & Inventory</p>
          {stats?.numOfUnfulfilledOrders ? (
            <p className='text-2xl font-medium mt-2'>
              {stats?.numOfUnfulfilledOrders > 1
                ? `You have ${stats?.numOfUnfulfilledOrders} unfulfilled orders`
                : `You have ${stats?.numOfUnfulfilledOrders} unfulfilled order`}
            </p>
          ) : (
            <p className='text-2xl font-medium mt-2'>
              You have no recent orders
            </p>
          )}
          <Link to='/dashboard/orders' className='mt-2'>
            <div className='flex items-center'>
              <p>View orders</p>
              <BsArrowRightShort />
            </div>
          </Link>
          {stats?.itemStock <= 10 ? (
            <p className='mt-2'>
              Inventory:{' '}
              <span className='text-red-400 font-medium'>
                {stats?.itemStock} units
              </span>
            </p>
          ) : (
            <p className='mt-2'>
              Inventory:{' '}
              <span className='text-slate-800 font-medium'>
                {stats?.itemStock} units left
              </span>
            </p>
          )}
        </div>

        <div className='w-11/12 mx-auto mt-2'>
          <p className='font-medium text-lg'>Quick navigation</p>
        </div>
        <div className='w-11/12 drop-shadow-md mx-auto rounded-md bg-gray-200 h-40 flex flex-col justify-center p-2 mt-2'>
          <div className='w-full flex mx-auto justify-between items-center'>
            <Link to='/dashboard/item' className='w-6/12 h-14'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Product
              </button>
            </Link>
            <Link to='/dashboard/design' className='w-6/12 h-14 ml-2'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Design
              </button>
            </Link>
          </div>

          <div className='w-full flex mx-auto justify-between items-center mt-4'>
            <Link to='/dashboard/orders' className='w-6/12 h-14'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Orders
              </button>
            </Link>
            <Link to='/dashboard/customers' className='w-6/12 h-14 ml-2'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Customers
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* <SalesGraph /> */}
    </>
  );
};

export default DashHomeMobile;
