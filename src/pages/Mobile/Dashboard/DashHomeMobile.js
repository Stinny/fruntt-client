import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SalesGraph from '../../../components/SalesGraph';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { GoGraph } from 'react-icons/go';

//mui
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const DashHomeMobile = ({ stats, currentUser, dataView }) => {
  //holds the url of the page being viewed
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);
  return (
    <>
      <div className='w-full p-2 flex flex-col mt-20'>
        {!currentUser.stripeOnboard && (
          <Alert severity='error' className='mt-2 w-full mx-auto'>
            <p>
              Connect to payment gateway in{' '}
              <Link to='/settings' className='text-red-900 font-semibold'>
                settings
              </Link>{' '}
              to enable purchases
            </p>
          </Alert>
        )}

        {!currentUser.firstName ||
        !currentUser?.sellerProfile?.bio ||
        !currentUser?.sellerProfile?.picture?.url ? (
          <Alert severity='error' className='mt-2 w-full mx-auto'>
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
          <Alert severity='error' className='mt-2 mb-2 w-full mx-auto'>
            <p>
              Please check your inbox to confirm your email so you can enable
              purchases
            </p>
          </Alert>
        )}
      </div>

      <div className='flex pl-2'>
        <p className='text-sm text-stone-800 font-medium'>Live store:</p>
        <a
          href={currentStoreUrl}
          className='flex justify-center items-center text-sm text-stone-800 hover:text-slate-800 font-medium ml-2 underline underline-offset-4'
          target='_blank'
        >
          {currentStoreUrl}
        </a>
      </div>

      <div className='flex flex-col items-center w-full p-2'>
        <div className='bg-white border rounded drop-shadow-md w-full p-2 h-28 mb-2 relative'>
          <Tooltip
            title={
              <p className='text-lg'>Total revenue your store has generated</p>
            }
            className='ml-2 text-lg absolute right-0 mr-2'
            placement='right-end'
          >
            <button>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
          <p className='text-sm text-stone-800'>Revenue</p>
          <p className='text-2xl font-medium text-slate-800 mt-2'>
            $
            {stats?.revenue > 0
              ? stats?.revenue.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '0'}
          </p>
          {/* <p className='mt-1 text-sm font-medium'>
            {dataView === 'today'
              ? 'In the past 24 hours'
              : dataView === 'seven'
              ? 'In the past 7 days'
              : dataView === 'thirty'
              ? 'In the past 30 days'
              : 'Since you opened your store'}
          </p> */}
        </div>
        <div className='w-full flex'>
          <div className='drop-shadow-md w-6/12 h-28 bg-white border rounded p-2 relative'>
            <Tooltip
              title={
                <p className='text-lg'>Total sales your store has generated</p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='bottom'
              enterTouchDelay={10}
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-sm font-medium'>Orders</p>
            <p className='text-2xl font-medium mt-1'>{stats?.numOfOrders}</p>
          </div>

          <div className='drop-shadow-md w-6/12 h-28 ml-2 bg-white border rounded p-2 relative'>
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
            <p className='text-sm'>Views</p>
            <p className='text-2xl font-medium mt-1'>{stats?.visits}</p>
          </div>
        </div>

        <div className='w-full flex'>
          <div className='drop-shadow-md w-6/12 h-28 bg-white border rounded p-2 relative mt-2'>
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
            <p className='text-sm font-medium'>Customers</p>
            <p className='text-2xl font-medium mt-1'>
              {stats?.numberOfCustomers > 0 ? stats?.numberOfCustomers : '0'}
            </p>
          </div>

          <div className='drop-shadow-md w-6/12 h-28 mt-2 ml-2 bg-white border rounded p-2 relative'>
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
            <p className='text-sm font-medium'>Conversion rate</p>
            <p className='text-2xl font-medium mt-1'>
              {stats?.conversion > 0 ? stats?.conversion.toFixed(1) : '0'}%
            </p>
          </div>
        </div>
      </div>

      {/* <div className='w-full flex flex-col items-center mx-auto p-2'>
        {/* <div className='w-full drop-shadow-md rounded-md h-40 bg-white border p-2'>
          <p className='text-xl font-medium'>Orders</p>
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
        </div> 

       <div className='w-full p-2 drop-shadow-md mx-auto rounded-md bg-white border h-40 flex flex-col justify-center mt-2'>
          <div className='w-full mx-auto'>
            <p className='font-medium text-lg'>Quick navigation</p>
          </div>
          <div className='w-full flex mx-auto justify-between items-center'>
            <Link to='/dashboard/item' className='w-6/12 h-12'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Product
              </button>
            </Link>
            <Link to='/dashboard/content' className='w-6/12 h-12 ml-2'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Content
              </button>
            </Link>
          </div>

          <div className='w-full flex mx-auto justify-between items-center mt-2'>
            <Link to='/dashboard/design' className='w-6/12 h-12'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Design
              </button>
            </Link>
            <Link to='/dashboard/orders' className='w-6/12 h-12 ml-2'>
              <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                Orders
              </button>
            </Link>
          </div>
        </div> 
      </div> */}

      <div className='w-full p-2'>
        <div className='w-full mx-auto bg-white border rounded drop-shadow-md flex flex-col p-2'>
          <p className='text-md font-medium text-stone-800'>
            Is your store ready for customers?
          </p>

          <div className='w-full flex flex-col mt-2'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.emailConfirmed}
                  color='default'
                  disabled
                />
              }
              label='Confirm your email'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.stripeOnboard}
                  color='default'
                  disabled
                />
              }
              label='Connect to payment gateway'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.store?.productAdded}
                  color='default'
                  disabled
                />
              }
              label='Add a product'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={currentUser?.store?.designAdded}
                  color='default'
                  disabled
                />
              }
              label='Design your store'
            />
          </div>
        </div>

        <div className='h-72 w-full flex flex-col items-center justify-center rounded border drop-shadow-md bg-white mt-4'>
          <GoGraph className='text-4xl text-gray-300' />
          <p className='font-medium text-stone-800 mt-2 text-sm'>
            Mobile graph coming soon
          </p>
        </div>
      </div>

      {/* <SalesGraph /> */}
    </>
  );
};

export default DashHomeMobile;
