import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';

//mui
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const Plans = () => {
  const currentUser = JSON.parse(Cookies.get('currentUser'));

  return (
    <>
      <Navbar />
      <div className='max-w-6xl h-screen mx-auto mt-30'>
        <div className='border-b-2 pb-4 mt-10'>
          <h2 className='text-4xl font-semibold'>Plans</h2>
          <div className='flex justify-between items-center w-full'>
            <p className='text-md text-gray-500 mt-2'>
              Pick a plan that best suites your needs
            </p>
          </div>
        </div>

        <div>
          {!currentUser.subscribed && !currentUser.trial && (
            <Alert severity='error' className='mt-4 mb-4 w-full'>
              Your trial period is over, pick a plan that best fits your needs
              to continue using Fruntt
            </Alert>
          )}
        </div>

        <div className='w-10/12 flex justify-between mt-10 mx-auto'>
          <div className='border-2 rounded w-96 p-4'>
            <p className='text-3xl'>Free</p>
            <p className='text-4xl font-medium mt-4'>$0/Month</p>
            <div className='w-full h-10 flex justify-center mt-4 mb-4'>
              <Link
                to='/dashboard/plans/free'
                className='flex justify-center w-full'
              >
                <button className='rounded text-white bg-blue-300 w-10/12 hover:bg-blue-400'>
                  Start Now
                </button>
              </Link>
            </div>
            <div>
              <p className='text-xl font-medium'>plan includes:</p>
              <ul className='text-lg mt-4 leading-loose'>
                <li>Storefront</li>
                <li>Storefront customization</li>
                <li>Up to 10 products</li>
                <li>Physical goods</li>
              </ul>
            </div>
          </div>

          <div className='border-2 rounded w-96 p-4'>
            <p className='text-3xl'>Paid</p>
            <p className='text-4xl font-medium mt-4'>$32/Month</p>
            <div className='w-full h-10 flex justify-center mt-4 mb-4'>
              <Link
                to='/dashboard/plans/paid'
                className='flex justify-center w-full'
              >
                <button className='rounded text-white bg-blue-300 w-10/12 hover:bg-blue-400'>
                  Start Now
                </button>
              </Link>
            </div>
            <div>
              <p className='text-xl font-medium'>plan includes:</p>
              <ul className='text-lg mt-4 leading-loose'>
                <li>Everything in free</li>
                <li>Unlimited products</li>
                <li>Physical & digital goods</li>
                <li>Offer subscriptions</li>
                <li>Connect own domain</li>
                <li>Email marketing</li>
                <li>Integrations</li>
                <li>24/7 email support</li>
                <li>Remove Fruntt branding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Plans;
