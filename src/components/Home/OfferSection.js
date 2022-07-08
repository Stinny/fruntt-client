import React from 'react';
import { IoStorefrontOutline } from 'react-icons/io5';
import { MdOutlineAttachMoney, MdOutlineContactSupport } from 'react-icons/md';
import { AiOutlineMail } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';

const OfferSection = () => {
  return (
    <div className='max-w-7xl mx-auto max-h-96 mb-40'>
      <div className='mx-auto w-full h-full flex flex-col justify-center items-center'>
        <h2 className='text-3xl font-medium'>What we provide</h2>

        <div className='flex w-full justify-between mt-20'>
          <div className='flex flex-col w-4/12 p-4'>
            <IoStorefrontOutline className='text-4xl' />
            <p className='text-lg font-medium text-blue-300 mt-2'>
              Own storefront
            </p>
            <p className='mt-2'>
              Customize your own storefront in minutes and offer physical,
              digital and subscription products to your customers.
            </p>
          </div>
          <div className='flex flex-col w-4/12 p-4'>
            <MdOutlineAttachMoney className='text-4xl' />
            <p className='text-lg font-medium text-blue-300 mt-2'>
              No revenue cap
            </p>
            <p className='mt-2'>
              No matter your monthly revenue, always pay for the same plan.
            </p>
          </div>
          <div className='flex flex-col w-4/12 p-4'>
            <AiOutlineMail className='text-4xl' />
            <p className='text-lg font-medium text-blue-300 mt-2'>
              Automated marketing
            </p>
            <p className='mt-2'>
              Have access to automated emailing to drive business and stay
              connected with customers.
            </p>
          </div>
          <div className='flex flex-col w-4/12 p-4'>
            <BiWorld className='text-4xl' />
            <p className='text-lg font-medium text-blue-300 mt-2'>
              Integrations
            </p>
            <p className='mt-2'>
              Sell to more of your audience by connecting to social media.
            </p>
          </div>
          <div className='flex flex-col w-4/12 p-4'>
            <MdOutlineContactSupport className='text-4xl' />
            <p className='text-lg font-medium text-blue-300 mt-2'>
              24/7 Support
            </p>
            <p className='mt-2'>We will be available for 24/7 email support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
