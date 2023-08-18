import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Marketplace = () => {
  return isMobile ? (
    <>
      <Navbar />
      <div className='w-full mx-auto h-screen mt-24 p-2'>
        <div className='w-full rounded border drop-shadow-lg bg-white p-4'>
          <p className='text-3xl font-medium text-stone-800'>Marketplace</p>
          <p className='text-stone-800 text-lg mt-2'>
            Browse the latest and greatest products and creators on Fruntt. Open
            your storefront to submit your products early before we open for
            customers!
          </p>

          <div className='rounded border w-full h-44 flex flex-col items-center justify-center mt-6'>
            <p className='text-stone-800 text-lg font-medium'>Coming soon!</p>
            <Link to='/signup'>
              <button className='border-2 font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white rounded w-36 h-10 mt-4'>
                Open Storefront
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto h-screen mt-24'>
        <div className='w-full rounded border drop-shadow-lg bg-white p-4'>
          <p className='text-3xl font-medium text-stone-800'>Marketplace</p>
          <p className='text-stone-800 text-lg mt-2'>
            Browse the latest and greatest products and creators on Fruntt. Open
            your storefront to submit your products early before we open for
            customers!
          </p>

          <div className='rounded border w-full h-44 flex flex-col items-center justify-center mt-6'>
            <p className='text-stone-800 text-lg font-medium'>Coming soon!</p>
            <Link to='/signup'>
              <button className='border-2 font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white rounded w-36 h-10 mt-4'>
                Open Storefront
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Marketplace;
