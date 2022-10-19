import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { Navigate, Link } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Cookies from 'js-cookie';
import Footer from '../../components/Footer';
import Spinner from '../../components/Spinner';
import { FaExternalLinkAlt } from 'react-icons/fa';

//mui
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { BsArrowRightShort } from 'react-icons/bs';
import { useGetStoreStatsQuery } from '../../api/storefrontApiSlice';

const DashHome = () => {
  const currentUser = JSON.parse(Cookies.get('currentUser'));
  //this component will display many ananlytics of sorts
  //relating to their store
  //(toggle between monthly, weekly, daily)
  //revenue, # of orders, # of customers, recent orders that links to orders page, graph display

  const { data: stats, isLoading, isSuccess, refetch } = useGetStoreStatsQuery({
    storeId: currentUser?.storeId,
  });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <>
        {!currentUser.stripeOnboard && (
          <Alert severity='error' className='mt-4 mb-4 w-full'>
            <p>
              Connect to payment gateway in{' '}
              <Link to='/settings' className='text-red-900 font-semibold'>
                settings
              </Link>{' '}
              to make checkout available to customers in your storefront
            </p>
          </Alert>
        )}
        <Alert severity='info' className='mt-4 mb-4 w-full'>
          <p>
            Welcome merchants! As we onboard beta users, collect feedback, and
            develop a pricing plan merchants will be restricted to only one
            storefront. We will be collecting a small 2% fee for successful
            orders to help us cover infrastructure costs. We encourage and
            appreaciate all feedback!
          </p>
        </Alert>

        <div className='flex justify-between w-full mb-2'>
          <div className='flex justify-between w-40'>
            <button className='text-sm font-medium text-white w-10 rounded-xl bg-slate-800'>
              All
            </button>
            <button className='text-sm font-medium text-slate-800 w-10 rounded-xl'>
              Day
            </button>
            <button className='text-sm font-medium text-slate-800 w-10 rounded-xl '>
              Week
            </button>
            <button className='text-sm font-medium text-slate-800 w-10 rounded-xl'>
              Year
            </button>
          </div>
          <a
            href={currentUser?.store?.url}
            className='flex justify-center items-center text-xl text-slate-800'
            target='_blank'
          >
            View your storefront <FaExternalLinkAlt className='ml-2' />{' '}
          </a>
        </div>

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
            <p className='text-4xl font-medium'>
              ${stats?.revenue > 0 ? stats?.revenue.toFixed(2) : '0'}
            </p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 ml-4 relative'>
            <Tooltip
              title={
                <p className='text-lg'>
                  Total orders your storefront has received
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
            <p className='text-4xl font-medium'>{stats?.numOfOrders}</p>
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
            <p className='text-4xl font-medium'>{stats?.visits}</p>
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
            <p className='text-xl font-medium'>Conversion rate</p>
            <p className='text-4xl font-medium'>
              {stats?.conversion > 0 ? stats?.conversion.toFixed(2) : '0'}%
            </p>
          </div>
        </div>

        <div className='w-full mt-4 mb-4 flex justify between'>
          <div className='w-8/12 drop-shadow-md rounded-md h-40 bg-gray-200 p-2'>
            <p className='text-xl font-medium'>Orders & Inventory</p>
            {stats?.numOfUnfulfilledOrders ? (
              <p className='text-3xl font-medium mt-2'>
                {stats?.numOfUnfulfilledOrders > 1
                  ? `You have ${stats?.numOfUnfulfilledOrders} unfulfilled orders`
                  : `You have ${stats?.numOfUnfulfilledOrders} unfulfilled order`}
              </p>
            ) : (
              <p className='text-3xl font-medium mt-2'>
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
          <div className='w-4/12 drop-shadow-md mx-auto rounded-md bg-gray-200 h-40 ml-4 flex flex-col justify-center p-2'>
            <div className='w-full flex mx-auto justify-between items-center'>
              <Link to='/dashboard/item' className='w-6/12 h-14'>
                <button className='w-full h-full border-2 border-slate-800 rounded hover:bg-slate-800 hover:text-white'>
                  Item
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

        <div className='w-full h-72 border-2 mt-4 rounded flex justify-center items-center'>
          <p className='text-gray-400'>More display coming soon</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>{content}</div>
      <Footer />
    </>
  );
};

export default DashHome;
