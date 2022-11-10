import React from 'react';
import { Link } from 'react-router-dom';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdMobileFriendly } from 'react-icons/md';
import { GrHostMaintenance, GrStripe } from 'react-icons/gr';
import { FaEarlybirds } from 'react-icons/fa';

//mui
import Alert from '@mui/material/Alert';

const PricingMobile = () => {
  return (
    <div className='w-full mx-auto h-fit'>
      <div className='w-10/12 mx-auto flex flex-col items-center'>
        <p className='text-3xl font-medium mt-8'>Pricing</p>
        <Alert severity='info' className='mt-2'>
          Welcome early bird merchants! We are very excited to offer our early
          bird special. Launch your first product page during our early bird
          special and pay $9/mo!
        </Alert>

        <div className='border-2 rounded w-full h-full p-4 mt-4'>
          <div className='flex items-center mb-2'>
            <p className='text-2xl font-medium'>Early bird special</p>
            <FaEarlybirds className='text-2xl' />
          </div>
          <p className='font-medium text-2xl'>
            <span className='text-4xl'>$9</span>/mo
          </p>
          <p className='font-medium text-gray-400 text-lg'>
            For first page launched
          </p>
          <p className='mt-8 text-xl text-slate-800 font-medium'>
            Platform includes:
          </p>
          <div className='w-full text-slate-800 text-lg p-2'>
            <p className='mt-2'>
              - Easily launch, design, and manage multiple product pages
            </p>
            <p className='mt-4'>- Import products</p>
            <p className='mt-4'>
              - Get shipping labels & rates directly from us
            </p>
            <p className='mt-4'>
              - Automated customer emailing (order confirmation, order shipped,
              etc.)
            </p>
            <p className='mt-4'>- Order tracking for customers</p>

            <p className='mt-4'>- Collect reviews from customers</p>

            <p className='mt-4'>- Connect your own domain</p>
            <p className='mt-4'>- 24/7 email support</p>
          </div>
          <Link to='/signup' className='w-full'>
            <button className='w-full mt-4 h-14 text-lg border-2 border-slate-800 text-slate-800 rounded hover:text-white hover:bg-slate-800'>
              Launch a product page - $9
            </button>
          </Link>
        </div>

        <p className='text-2xl font-medium mt-4'>All product pages include</p>
        <div className='flex flex-col w-full mt-4'>
          <div className='w-full border-2 mt-2 rounded p-2'>
            <GrStripe className='text-3xl' />
            <p className='font-medium text-xl mt-2'>Secure payments</p>
            <p className='mt-2 text-lg'>
              Securley accept many forms of payment using Stripe
            </p>
          </div>
          <div className='w-full border-2 mt-2 rounded p-2'>
            <MdMobileFriendly className='text-3xl' />
            <p className='font-medium text-xl mt-2'>100% Mobile friendly</p>
            <p className='mt-2 text-lg'>
              All pages are mobile friendly, never miss a mobile customer
            </p>
          </div>
          <div className='w-full border-2 mt-2 rounded p-2'>
            <GrHostMaintenance className='text-3xl' />
            <p className='font-medium text-lg mt-2'>Hosted by us</p>
            <p className='mt-2 text-lg'>
              Don't ever worry about hosting your page, we got you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingMobile;
