import React from 'react';
import { BsStripe } from 'react-icons/bs';
import { GrStripe } from 'react-icons/gr';
import { IoDesktopOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { MdCloudDownload } from 'react-icons/md';
import { HiOutlineTemplate } from 'react-icons/hi';

//mui
import StoreIcon from '@mui/icons-material/Store';
import { isMobile } from 'react-device-detect';

const Features = () => {
  return isMobile ? (
    <div className='w-full flex flex-col items-center mt-44 mb-20'>
      <p className='text-lg font-bold'>Features</p>
      <div className='w-full flex flex-col items-center mt-6'>
        <div className='w-full h-36 bg-white rounded border shadow-lg flex flex-col p-4'>
          <BsStripe className='text-3xl' />
          <p className='font-medium mt-4'>Secure Payments</p>
          <p className='mt-2 text-sm'>
            Securely accept payments and be paid out immediately via Stripe
            connect.
          </p>
        </div>

        <div className='w-full h-36 mt-4 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <StoreIcon style={{ fontSize: '36px' }} />
          <p className='font-medium mt-4'>Marketplace</p>
          <p className='mt-2 text-sm'>
            List your products in our marketplace and gain access to another
            sales channel.
          </p>
        </div>

        <div className='w-full h-36 mt-4 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <IoDesktopOutline className='text-3xl' />
          <p className='font-medium mt-4'>Simple UI</p>
          <p className='mt-2 text-sm'>
            Never be overwhelmed with our simple user interface.
          </p>
        </div>

        <div className='w-full mt-4 h-36 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <IoColorPaletteOutline className='text-3xl' />
          <p className='font-medium mt-4'>Customization</p>
          <p className='mt-2 text-sm'>
            Customize and design your storefront from a pallet of colors.
          </p>
        </div>

        <div className='w-full h-36 mt-4 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <HiOutlineTemplate className='text-3xl' />

          <p className='font-medium mt-4'>Templates</p>
          <p className='mt-2 text-sm'>
            Create and sell as many templates as you like.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className='max-w-7xl flex flex-col items-center mt-44'>
      <p className='text-xl font-bold'>Features</p>
      <div className='w-full flex items-center justify-between mt-6'>
        <div className='w-48 h-48 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <BsStripe className='text-3xl' />
          <p className='font-medium mt-4'>Secure Payments</p>
          <p className='mt-2 text-sm'>
            Securely accept payments and be paid out immediately via Stripe
            connect.
          </p>
        </div>

        <div className='w-48 h-48 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <StoreIcon style={{ fontSize: '36px' }} />
          <p className='font-medium mt-4'>Marketplace</p>
          <p className='mt-2 text-sm'>
            List your templates in our marketplace and gain access to another
            sales channel.
          </p>
        </div>

        <div className='w-48 h-48 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <IoDesktopOutline className='text-3xl' />
          <p className='font-medium mt-4'>Simple UI</p>
          <p className='mt-2 text-sm'>
            Never be overwhelmed with our simple user interface.
          </p>
        </div>

        <div className='w-48 h-48 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <IoColorPaletteOutline className='text-3xl' />
          <p className='font-medium mt-4'>Customization</p>
          <p className='mt-2 text-sm'>
            Customize and design your store from a pallet of colors.
          </p>
        </div>

        <div className='w-48 h-48 bg-white rounded-md border shadow-lg flex flex-col p-4'>
          <HiOutlineTemplate className='text-3xl' />

          <p className='font-medium mt-4'>Unlimited Templates</p>
          <p className='mt-2 text-sm'>
            Create and sell as many templates as you like.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
