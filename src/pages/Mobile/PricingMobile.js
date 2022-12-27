import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdMobileFriendly } from 'react-icons/md';
import { GrHostMaintenance, GrStripe } from 'react-icons/gr';
import { FaLongArrowAltDown } from 'react-icons/fa';

//mui
import Alert from '@mui/material/Alert';

const PricingMobile = () => {
  //auto scrolls the page to the top
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='w-full mx-auto h-fit'>
      <div className='w-full mx-auto flex flex-col items-center p-2'>
        <p className='text-3xl font-medium mt-8 border-b'>Pricing</p>
        <div className='w-full mt-4 flex flex-col'>
          <div className='border-2 rounded w-full flex items-center justify-center h-24'>
            <p className='text-2xl font-medium text-slate-800'>
              First product page FREE
            </p>
          </div>
          <div className='w-full flex flex-col items-center justify-center mt-2 mb-2'>
            <p className='font-medium'>additional pages</p>
            <FaLongArrowAltDown className='text-3xl' />
          </div>
          <div className='border-2 rounded w-full flex flex-col items-center justify-center p-2'>
            <p className='font-medium text-4xl'>
              <span className='text-4xl'>$3</span>/mo
            </p>
            <p className='font-medium text-gray-400'>
              Per additional product page
            </p>
          </div>
        </div>

        <div className='border-2 rounded w-full h-full p-4 mt-4'>
          <p className='mt-4 text-xl text-slate-800 font-medium'>
            Platform includes:
          </p>
          <div className='w-full text-slate-800 text-lg p-2'>
            <p className='mt-2'>
              - Easily launch, design, and manage product pages
            </p>
            <p className='mt-4'>- Offer physical or digital goods</p>
            <p className='mt-4'>
              - Get shipping labels & rates directly from us
            </p>
            <p className='mt-4'>- No transaction fees</p>
            <p className='mt-4'>
              - Automated customer emailing and order tracking
            </p>
            <p className='mt-4'>- Collect reviews from customers</p>
            <p className='mt-4'>- Connect your own domain to pages</p>
          </div>
          <Link to='/signup' className='w-full'>
            <button className='w-full mt-4 h-14 text-lg border-2 border-slate-800 text-slate-800 rounded hover:text-white hover:bg-slate-800'>
              Launch product page
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
              All pages are mobile friendly, never miss out on a mobile customer
            </p>
          </div>
          <div className='w-full border-2 mt-2 rounded p-2'>
            <GrHostMaintenance className='text-3xl' />
            <p className='font-medium text-lg mt-2'>Hosted by us</p>
            <p className='mt-2 text-lg'>
              Never worry about hosting, pages are hosted and maintained by us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingMobile;
