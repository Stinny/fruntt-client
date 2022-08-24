import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { Navigate, Link } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import Footer from '../../components/Footer';

//mui
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { BsArrowRightShort } from 'react-icons/bs';

const DashHome = () => {
  const currentUser = JSON.parse(Cookies.get('currentUser'));
  //this component will display many ananlytics of sorts
  //relating to their store
  //(toggle between monthly, weekly, daily)
  //revenue, # of orders, # of customers, recent orders that links to orders page, graph display

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>
        {/* {currentUser.trial && (
          <Alert severity='info' className='mt-4 mb-4 w-full'>
            While you are in trial mode, checkout will not be available in your
            storefront. Pick a plan in{' '}
            <Link to='/settings' className='text-blue-900 font-semibold'>
              settings
            </Link>{' '}
            under billing to open checkout
          </Alert>
        )} */}
        {!currentUser.stripeOnboard && (
          <Alert severity='error' className='mt-4 mb-4 w-full'>
            <p>
              Finish adding business details and connecting to payment gateway
              in{' '}
              <Link to='/settings' className='text-red-900 font-semibold'>
                settings
              </Link>{' '}
              to make checkout available to customers in your storefront
            </p>
          </Alert>
        )}

        <div className='flex justify-between'>
          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 relative'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Total revenue your storefront has generated
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium'>Revenue</p>
            <p className='text-4xl font-medium'>$0.00</p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 ml-4 relative'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Amount of orders your storefront has received
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium'>Number of orders</p>
            <p className='text-4xl font-medium'>0</p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 ml-4 relative'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Amount of users who have visted your storefront
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium'>Store visits</p>
            <p className='text-4xl font-medium'>0</p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 ml-4 relative'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Percentage of customers who visit and make a purchase
                </p>
              }
              className='ml-2 text-lg absolute right-0 mr-2'
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
            <p className='text-xl font-medium'>Conversions</p>
            <p className='text-4xl font-medium'>0%</p>
          </div>
        </div>

        <div className='w-full mt-4 mb-4 flex justify between'>
          <div className='w-8/12 rounded-md h-40 bg-gray-200 p-2'>
            <p className='text-xl font-medium'>Orders</p>
            <p className='text-3xl font-medium mt-2'>
              You have no recent orders
            </p>
            <Link to='/dashboard/orders' className='mt-2'>
              <div className='flex items-center mt-2'>
                <p>View orders</p>
                <BsArrowRightShort />
              </div>
            </Link>
          </div>
          <div className='w-4/12 mx-auto rounded-md bg-gray-200 h-40 ml-4 flex flex-col justify-center p-2'>
            <div className='w-full flex mx-auto justify-between items-center'>
              <Link to='/dashboard/item' className='w-6/12 h-14'>
                <button className='w-full h-full border-2 border-slate-800 rounded-tl-lg'>
                  Item
                </button>
              </Link>
              <Link to='/dashboard/design' className='w-6/12 h-14 ml-2'>
                <button className='w-full h-full border-2 border-slate-800 rounded-tr-lg'>
                  Design
                </button>
              </Link>
            </div>

            <div className='w-full flex mx-auto justify-between items-center mt-4'>
              <Link to='/dashboard/orders' className='w-6/12 h-14'>
                <button className='w-full h-full border-2 border-slate-800 rounded-bl-lg'>
                  Orders
                </button>
              </Link>
              <Link to='/dashboard/customers' className='w-6/12 h-14 ml-2'>
                <button className='w-full h-full border-2 border-slate-800 rounded-br-lg'>
                  Customers
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className='w-full h-72 border-2 mt-4 rounded flex justify-center items-center'>
          <p>Graph going here</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashHome;
