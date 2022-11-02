import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdMobileFriendly } from 'react-icons/md';
import { GrHostMaintenance, GrStripe } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import PricingMobile from './Mobile/PricingMobile';

//mui
import Alert from '@mui/material/Alert';

const Pricing = () => {
  return (
    <>
      <Navbar />
      {isMobile ? (
        <PricingMobile />
      ) : (
        <div className='w-full mx-auto max-w-7xl h-fit'>
          <div className='w-8/12 mx-auto flex flex-col items-center'>
            <Alert severity='info' className='mt-20'>
              Welcome merchants! We are very excited to start onboarding public
              beta users. As we do this and collect feedback, please enjoy our
              platform for free.
            </Alert>
            <p className='text-5xl font-medium mt-8'>Pricing</p>

            <div className='border-2 rounded w-full h-full p-4 mt-4'>
              <p className='font-medium text-3xl'>
                <span className='text-5xl'>$TBD</span>/mo
              </p>
              <p className='font-medium text-gray-400 text-xl'>
                Per storefront launched
              </p>
              <p className='mt-8 text-xl text-slate-800 font-medium'>
                Platform includes:
              </p>
              <div className='w-full text-slate-800 text-xl p-2'>
                <p className='mt-2'>
                  - Easily Launch, design, and manage multiple single product
                  storefronts
                </p>
                <p className='mt-4'>
                  - Get shipping labels & rates directly from us
                </p>
                <p className='mt-4'>
                  - Automated customer emailing (order confirmation, order
                  shipped, etc.)
                </p>
                <p className='mt-4'>- Order tracking for customers</p>

                <p className='mt-4'>- Easily collect reviews from customers</p>
                <p className='mt-4'>
                  - Connect your storefront to socials and other sales channels
                </p>
                <p className='mt-4'>- Connect your own domain</p>
                <p className='mt-4'>- 24/7 email support</p>
              </div>
              <Link to='/signup' className='w-full'>
                <button className='w-full mt-4 h-14 text-lg border-2 border-slate-800 text-slate-800 rounded hover:text-white hover:bg-slate-800'>
                  Launch a storefront - for free
                </button>
              </Link>
            </div>

            <p className='text-4xl font-medium mt-4'>All storefronts include</p>
            <div className='flex justify-between w-full mt-4'>
              <div className='w-4/12 border-2 mt-2 rounded p-2'>
                <GrStripe className='text-4xl' />
                <p className='font-medium text-xl mt-2'>Secure payments</p>
                <p className='mt-2 text-lg'>
                  Securley accept many forms of payment using Stripe
                </p>
              </div>
              <div className='w-4/12 border-2 mt-2 ml-2 rounded p-2'>
                <MdMobileFriendly className='text-4xl' />
                <p className='font-medium text-xl mt-2'>100% Mobile friendly</p>
                <p className='mt-2 text-lg'>
                  All storefronts are mobile friendly, never miss a mobile
                  customer
                </p>
              </div>
              <div className='w-4/12 border-2 mt-2 ml-2 rounded p-2'>
                <GrHostMaintenance className='text-4xl' />
                <p className='font-medium text-lg mt-2'>Hosted by us</p>
                <p className='mt-2 text-lg'>
                  Don't worry about hosting your storefront, we got you
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Pricing;
