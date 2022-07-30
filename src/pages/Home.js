import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import img from '../media/shoppingImg.svg';
import imgTwo from '../media/shopping2img.svg';
import OfferSection from '../components/Home/OfferSection';
import SignupStripe from '../components/Home/SignupStripe';
import Cookies from 'js-cookie';
import { IoStorefrontOutline } from 'react-icons/io5';
import { MdOutlineAttachMoney, MdOutlineContactSupport } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';

const Home = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  if (currentUser) return <Navigate to='/dashboard' />;

  return (
    <>
      <Navbar />
      <div className='mx-auto h-screen max-w-7xl'>
        <div className='w-full h-full flex flex-col items-center justify-around'>
          <div className='flex flex-col w-10/12 text-center mt-20'>
            <p className='text-5xl font-medium'>
              One page. One item. More Conversions.
            </p>
            <p className='text-xl mt-8 tracking-wider'>
              Single item storefronts that you can deploy, design, and sell from
              in minutes. Get your customers attention on ONE single item and
              focus on getting that conversion.
            </p>
            <Link to='/signup' className='flex justify-center mt-8'>
              <button className='rounded text-slate-800 w-5/12 h-10 text-xl mt-4 border-blue-300 border-2 hover:bg-blue-300 flex items-center justify-center'>
                Try now - for free
              </button>
            </Link>
          </div>

          <div className='mx-auto w-full flex justify-center'>
            <div className='flex w-full justify-between'>
              <div className='flex flex-col w-4/12 p-4'>
                <IoStorefrontOutline className='text-4xl' />
                <p className='text-lg font-medium text-blue-300 mt-2'>
                  Single item storefronts
                </p>
                <p className='mt-2'>
                  Easily deploy, design, and manage single item storefronts from
                  one simple dashboard
                </p>
              </div>
              <div className='flex flex-col w-4/12 p-4'>
                <MdOutlineAttachMoney className='text-4xl' />
                <p className='text-lg font-medium text-blue-300 mt-2'>
                  Offer items
                </p>
                <p className='mt-2'>
                  Offer your customers 'Buy Now' items or 'Subscribe Now' items
                  depending on your business
                </p>
              </div>
              <div className='flex flex-col w-4/12 p-4'>
                <AiOutlineMail className='text-4xl' />
                <p className='text-lg font-medium text-blue-300 mt-2'>
                  Built in marketing
                </p>
                <p className='mt-2'>
                  Automated transactional emails and newsletters to send out to
                  your customers
                </p>
              </div>
              <div className='flex flex-col w-4/12 p-4'>
                <BiWorld className='text-4xl' />
                <p className='text-lg font-medium text-blue-300 mt-2'>
                  Integrations
                </p>
                <p className='mt-2'>
                  Connect to other services and sales channels to drive more
                  business and reach more potential customers
                </p>
              </div>
              <div className='flex flex-col w-4/12 p-4'>
                <MdOutlineContactSupport className='text-4xl' />
                <p className='text-lg font-medium text-blue-300 mt-2'>
                  24/7 Support
                </p>
                <p className='mt-2'>
                  Easliy get in touch with us via 24/7 email support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
