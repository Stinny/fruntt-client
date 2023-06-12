import React from 'react';
import { IoShirtOutline } from 'react-icons/io5';
import {
  AiOutlineFormatPainter,
  AiOutlineLink,
  AiOutlineStar,
  AiOutlineTrophy,
  AiOutlineCode,
} from 'react-icons/ai';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
  MdOutlineLocalGroceryStore,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';

const Banner = () => {
  return isMobile ? (
    <div className='w-full flex flex-col items-center justify-center mb-44 mt-52 border-t-2 border-b-2 p-2'>
      <div className='flex flex-col items-center'>
        <div className='flex items-center'>
          <MdOutlineLocalGroceryStore className='text-2xl mr-2' />
          <p className='text-2xl font-medium text-stone-800'>
            Fruntt Marketplace
          </p>
          <MdOutlineLocalGroceryStore className='text-2xl ml-2' />
        </div>
        <p className='text-lg text-gray-400 font-medium mt-4 text-center'>
          Browse through your favorite pages, products, and creators on the
          platform.
        </p>
        <button
          type='button'
          disabled
          className='rounded text-stone-800 w-60 h-10 text-lg mt-4 border-stone-800 border-2 hover:bg-stone-800 hover:text-white flex items-center justify-center'
        >
          COMING SOON
        </button>
      </div>
    </div>
  ) : (
    <div className='w-full flex flex-col items-center mb-44 border-t-2 border-b-2 p-2 mt-72'>
      {/* <p className='mb-8 text-2xl font-medium'>
        Sell just about anything from your page!
      </p>
      <div className='w-8/12 mx-auto flex justify-between'>
        <div className='flex flex-col items-center'>
          <IoShirtOutline className='text-5xl' />
          <p className='text-xl font-medium'>Merchandise</p>
        </div>
        <div className='flex flex-col items-center'>
          <AiOutlineFormatPainter className='text-5xl' />
          <p className='text-xl font-medium'>Arts & crafts</p>
        </div>
        <div className='flex flex-col items-center'>
          <HiOutlineBookOpen className='text-5xl' />
          <p className='text-xl font-medium'>E-books</p>
        </div>

        <div className='flex flex-col items-center'>
          <MdLocalPrintshop className='text-5xl' />
          <p className='text-xl font-medium'>Printables</p>
        </div>

        <div className='flex flex-col items-center'>
          <MdOutlineVideoLibrary className='text-5xl' />
          <p className='text-xl font-medium'>Video courses</p>
        </div>

        <div className='flex flex-col items-center'>
          <BsFillMicFill className='text-5xl' />
          <p className='text-xl font-medium'>Podcasts</p>
        </div>

        <div className='flex flex-col items-center'>
          <HiOutlineTemplate className='text-5xl' />
          <p className='text-xl font-medium'>Templates</p>
        </div>

        <div className='flex flex-col items-center'>
          <AiOutlineCode className='text-5xl' />
          <p className='text-xl font-medium'>Code</p>
        </div>
      </div> */}

      <div className='flex flex-col items-center'>
        <div className='flex items-center'>
          <MdOutlineLocalGroceryStore className='text-3xl mr-2' />
          <p className='text-4xl font-medium text-stone-800'>
            Fruntt Marketplace
          </p>
          <MdOutlineLocalGroceryStore className='text-3xl ml-2' />
        </div>
        <p className='text-xl text-gray-400 font-medium mt-4'>
          Browse through your favorite pages, products, and creators on the
          platform.
        </p>
        <button
          type='button'
          disabled
          className='rounded text-slate-800 w-72 h-10 text-xl mt-4 border-stone-800 border-2 hover:bg-stone-800 hover:text-white flex items-center justify-center'
        >
          COMING SOON
        </button>
      </div>
    </div>
  );
};

export default Banner;
