import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import { IoStorefrontOutline } from 'react-icons/io5';
import {
  MdOutlineAttachMoney,
  MdOutlineContactSupport,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { AiOutlineMail, AiOutlineCloudServer } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import SampleStore from '../components/Home/SampleStore';
import { isMobile } from 'react-device-detect';
import HomeMobile from './Mobile/HomeMobile';

const Home = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  if (currentUser) return <Navigate to='/dashboard' />;

  return (
    <>
      <Navbar />
      {isMobile ? (
        <HomeMobile />
      ) : (
        <div className='mx-auto h-fit max-w-8xl'>
          <div className='w-full h-full flex flex-col items-center justify-around'>
            <div className='flex flex-col w-6/12 text-center mt-40'>
              <p className='text-5xl font-medium'>One page. One product.</p>
              <p className='text-3xl font-medium mt-8 text-gray-400'>
                An eCommerce platform that understands simplicity
              </p>
              <p className='text-2xl mt-8 tracking-wider font-medium'>
                Easily launch, design, and manage product pages from one simple
                dashboard. Avoid the hastle of managing an entire storefront.
              </p>
              <Link to='/pricing' className='flex justify-center mt-8'>
                <button className='rounded text-slate-800 w-5/12 h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
                  Launch a product page - for free
                </button>
              </Link>
              <a
                href='https://www.producthunt.com/posts/fruntt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fruntt'
                target='_blank'
                className='mx-auto mt-4'
              >
                <img
                  src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=365879&theme=neutral'
                  alt='Fruntt - Easily&#0032;launch&#0044;&#0032;design&#0044;&#0032;and&#0032;manage&#0032;single&#0032;product&#0032;storefronts | Product Hunt'
                  style={{ width: '250px', height: '54px' }}
                  width='250'
                  height='54'
                />
              </a>
            </div>
            <div className='mx-auto w-10/12 flex justify-center mt-14'>
              <div className='flex w-full justify-between'>
                <div className='flex flex-col items-center w-4/12 p-4'>
                  <AiOutlineCloudServer className='text-4xl' />
                  <p className='text-lg font-medium text-slate-800 mt-2'>
                    Hosting on us
                  </p>
                  <p className='mt-2 text-center'>
                    Never worry about hosting, pages are hosted and maintained
                    by us
                  </p>
                </div>
                <div className='flex flex-col items-center w-4/12 p-4'>
                  <MdOutlineNotificationsActive className='text-4xl' />
                  <p className='text-lg font-medium text-salte-800 mt-2'>
                    Custom notifications
                  </p>
                  <p className='mt-2 text-center'>
                    Set notifications to receive emails about page events like
                    orders placed or inventory running low
                  </p>
                </div>
                <div className='flex flex-col items-center w-4/12 p-4'>
                  <AiOutlineMail className='text-4xl' />
                  <p className='text-lg font-medium text-slate-800 mt-2'>
                    Built in emailing
                  </p>
                  <p className='mt-2 text-center'>
                    Automated emailing and contacting customers about order
                    details and more
                  </p>
                </div>
                <div className='flex flex-col items-center w-4/12 p-4'>
                  <RiSecurePaymentLine className='text-4xl' />
                  <p className='text-lg font-medium text-slate-800 mt-2'>
                    Secure payments
                  </p>
                  <p className='mt-2 text-center'>
                    Sucurely accept different kinds of payment and be paid
                    instantly
                  </p>
                </div>
                <div className='flex flex-col items-center w-4/12 p-4'>
                  <BiWorld className='text-4xl' />
                  <p className='text-lg font-medium text-slate-800 mt-2'>
                    Add-ons
                  </p>
                  <p className='mt-2 text-center'>
                    Connect to other services and sales channels to drive more
                    business.
                  </p>
                </div>
                <div className='flex flex-col items-center w-4/12 p-4'>
                  <MdOutlineContactSupport className='text-4xl' />
                  <p className='text-lg font-medium text-slate-800 mt-2'>
                    24/7 Support
                  </p>
                  <p className='mt-2 text-center'>
                    Easily get in touch with us via 24/7 email support
                  </p>
                </div>
              </div>
            </div>
          </div>
          <SampleStore />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
