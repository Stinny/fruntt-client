import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { MdMobileFriendly } from 'react-icons/md';
import { GrHostMaintenance, GrStripe } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import PricingMobile from './Mobile/PricingMobile';
import { FaLongArrowAltRight } from 'react-icons/fa';

//mui
import Alert from '@mui/material/Alert';

const Pricing = () => {
  //auto scrolls the page to the top
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Navbar />
      {isMobile ? (
        <PricingMobile />
      ) : (
        <div className='w-full mx-auto max-w-7xl h-fit'>
          <div className='w-8/12 mx-auto flex flex-col items-center'>
            <p className='text-5xl font-medium mt-8'>Pricing</p>

            <div className='w-full mt-4 flex justify-between'>
              <div className='border-2 rounded w-5/12 flex flex-col items-center justify-center'>
                <p className='text-2xl font-medium text-slate-800'>
                  First product page FREE
                </p>
                <p className='text-gray-400 font-medium'>
                  No credit card required
                </p>
              </div>
              <div className='w-2/12 flex flex-col items-center justify-center'>
                <p className='font-medium'>After that</p>
                <FaLongArrowAltRight className='text-3xl' />
              </div>
              <div className='border-2 rounded w-5/12 flex flex-col items-center justify-center p-2'>
                <p className='font-medium text-4xl'>
                  <span className='text-4xl'>$3</span>/mo
                </p>
                <p className='font-medium text-gray-400'>
                  Per additional product page you launch
                </p>
              </div>
            </div>

            <div className='border-2 rounded w-full h-full p-4 mt-4'>
              {/* <div className='flex items-center mb-2'>
                <p className='text-3xl font-medium'>Early bird special</p>
                <FaEarlybirds className='text-3xl' />
              </div> */}

              <p className='mt-8 text-xl text-slate-800 font-medium'>
                Platform includes:
              </p>
              <div className='w-full text-slate-800 text-xl p-2'>
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
                <button className='w-full mt-4 h-14 text-xl border-2 border-slate-800 text-slate-800 rounded hover:text-white hover:bg-slate-800'>
                  Launch FREE product page
                </button>
              </Link>
            </div>

            <p className='text-4xl font-medium mt-4'>
              All product pages include
            </p>
            <div className='flex justify-between w-full mt-4'>
              <div className='w-4/12 border-2 mt-2 rounded p-2'>
                <GrStripe className='text-4xl' />
                <p className='font-medium text-xl mt-2'>Secure payments</p>
                <p className='mt-2 text-lg'>
                  Securley accept several forms of payment using Stripe
                </p>
              </div>
              <div className='w-4/12 border-2 mt-2 ml-2 rounded p-2'>
                <MdMobileFriendly className='text-4xl' />
                <p className='font-medium text-xl mt-2'>100% Mobile friendly</p>
                <p className='mt-2 text-lg'>
                  All pages are mobile friendly, never miss out on a mobile
                  customer
                </p>
              </div>
              <div className='w-4/12 border-2 mt-2 ml-2 rounded p-2'>
                <GrHostMaintenance className='text-4xl' />
                <p className='font-medium text-lg mt-2'>Hosted by us</p>
                <p className='mt-2 text-lg'>
                  Never worry about hosting, pages are hosted and maintained by
                  us
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
