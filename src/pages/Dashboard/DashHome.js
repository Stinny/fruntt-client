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
        {currentUser.trial && (
          <Alert severity='info' className='mt-4 mb-4 w-full'>
            While you are in trial mode, checkout will not be available in your
            storefront. Pick a plan in{' '}
            <Link to='/settings' className='text-blue-900 font-semibold'>
              settings
            </Link>{' '}
            under billing to open checkout
          </Alert>
        )}
        {!currentUser.stripeOnboard && !currentUser.trial && (
          <Alert severity='error' className='mt-4 mb-4 w-full'>
            Finish connecting to payment gateway in{' '}
            <Link to='/settings' className='text-red-900 font-semibold'>
              settings
            </Link>{' '}
            to make checkout available in your storefront
          </Alert>
        )}
        <div className='w-full flex justify-end items-center mb-4'>
          <div className='w-36 flex justify-between'>
            <button className='rounded-xl  w-2/6 mr-2'>D</button>
            <button className='rounded-xl bg-slate-800 text-white w-2/6 mr-2'>
              M
            </button>
            <button className='rounded-xl w-2/6 mr-2'>Y</button>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 relative'>
            <AiOutlineInfoCircle className='absolute right-0 mr-2' />
            <p className='text-xl font-medium'>Revenue</p>
            <p className='text-4xl font-medium'>$2,864</p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 ml-4 relative'>
            <AiOutlineInfoCircle className='absolute right-0 mr-2' />
            <p className='text-xl font-medium'>Number of orders</p>
            <p className='text-4xl font-medium'>48</p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 ml-4 relative'>
            <AiOutlineInfoCircle className='absolute right-0 mr-2' />
            <p className='text-xl font-medium'>Store visits</p>
            <p className='text-4xl font-medium'>1,246</p>
          </div>

          <div className='drop-shadow-md w-3/12 h-40 bg-gray-200 rounded-md p-2 ml-4 relative'>
            <AiOutlineInfoCircle className='absolute right-0 mr-2' />
            <p className='text-xl font-medium'>Conversions</p>
            <p className='text-4xl font-medium'>43%</p>
          </div>
        </div>

        <div></div>
      </div>
      <Footer />
    </>
  );
};

export default DashHome;
