import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineAttachMoney,
  MdOutlineContactSupport,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { AiOutlineMail, AiOutlineCloudServer } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import MobileSampleStore from '../../components/Home/MobileSampleStore';

const HomeMobile = () => {
  return (
    <div className='mx-auto h-fit'>
      <div className='w-full h-full flex flex-col items-center justify-around'>
        <div className='flex flex-col w-11/12 text-center mt-20'>
          <p className='text-3xl font-medium'>One page. One product.</p>
          <p className='text-2xl font-medium mt-4 text-gray-400'>
            An eCommerce platform that understands simplicity
          </p>
          <p className='text-md mt-4 tracking-wider font-medium'>
            Launch, design, and manage single product storefronts from one
            simple dashboard. Bring your customers TWO clicks away from a
            purchase.
          </p>
          <Link to='/signup' className='flex justify-center mt-8'>
            <button className='rounded text-slate-800 w-9/12 h-10 text-lg mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
              Launch a storefront - for free
            </button>
          </Link>
        </div>
        <div className='mx-auto w-10/12 flex flex-col justify-center mt-14'>
          <div className='flex flex-col mx-auto w-full justify-between'>
            <div className='flex flex-col items-center w-full p-4'>
              <AiOutlineCloudServer className='text-4xl' />
              <p className='text-lg font-medium text-slate-800 mt-2'>
                Hosting on us
              </p>
              <p className='mt-2 text-center'>
                Never worry about hosting, storefronts are hosted and maintained
                by us
              </p>
            </div>
            <div className='flex flex-col items-center w-full p-4'>
              <MdOutlineNotificationsActive className='text-4xl' />
              <p className='text-lg font-medium text-salte-800 mt-2'>
                Custom notifications
              </p>
              <p className='mt-2 text-center'>
                Set notifications to receive emails about storefront events like
                orders placed or inventory running low
              </p>
            </div>
            <div className='flex flex-col items-center w-full p-4'>
              <AiOutlineMail className='text-4xl' />
              <p className='text-lg font-medium text-slate-800 mt-2'>
                Built in emailing
              </p>
              <p className='mt-2 text-center'>
                Automated emailing and notifying customers about order details
                and more
              </p>
            </div>
            <div className='flex flex-col items-center w-full p-4'>
              <RiSecurePaymentLine className='text-4xl' />
              <p className='text-lg font-medium text-slate-800 mt-2'>
                Secure payments
              </p>
              <p className='mt-2 text-center'>
                Sucurely accept different kinds of payment and get paid
                instantly
              </p>
            </div>
            <div className='flex flex-col items-center w-full p-4'>
              <BiWorld className='text-4xl' />
              <p className='text-lg font-medium text-slate-800 mt-2'>Add-ons</p>
              <p className='mt-2 text-center'>
                Connect to other services and sales channels to drive more
                business.
              </p>
            </div>
            <div className='flex flex-col items-center w-full p-4'>
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
      <MobileSampleStore />
    </div>
  );
};

export default HomeMobile;
