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
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';

const Banner = () => {
  return isMobile ? (
    <div className='w-full flex flex-col items-center justify-center mb-44 mt-44 border-t-2 border-b-2 p-2'>
      {/* <p className='mb-8 text-2xl text-center font-medium'>
        Sell just about anything from your page!
      </p>
      <div className='w-full mx-auto flex flex-col p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-center'>
            <IoShirtOutline className='text-4xl' />
            <p className='font-medium'>Merchandise</p>
          </div>
          <div className='flex flex-col items-center'>
            <AiOutlineFormatPainter className='text-4xl' />
            <p className='font-medium'>Arts & crafts</p>
          </div>
          <div className='flex flex-col items-center'>
            <HiOutlineBookOpen className='text-4xl' />
            <p className='font-medium'>E-books</p>
          </div>
        </div>

        <div className='flex items-center justify-between mt-4'>
          <div className='flex flex-col items-center'>
            <MdLocalPrintshop className='text-4xl' />
            <p className='font-medium'>Printables</p>
          </div>
          <div className='flex flex-col items-center'>
            <MdOutlineVideoLibrary className='text-4xl' />
            <p className='font-medium'>Video courses</p>
          </div>

          <div className='flex flex-col items-center'>
            <BsFillMicFill className='text-4xl' />
            <p className='font-medium'>Podcasts</p>
          </div>
        </div>
        <div className='flex items-center justify-around mt-4'>
          <div className='flex flex-col items-center'>
            <HiOutlineTemplate className='text-4xl' />
            <p className='font-medium'>Templates</p>
          </div>

          <div className='flex flex-col items-center'>
            <AiOutlineCode className='text-4xl' />
            <p className='font-medium'>Code</p>
          </div>
        </div>
      </div> */}

      <div className='flex flex-col items-center'>
        <div className='flex items-center'>
          <p className='text-4xl font-medium'>Fruntt Marketplace</p>
        </div>
        <p className='text-xl text-gray-400 font-medium mt-4 text-center'>
          Browse through your favorite pages, products, and creators on the
          platform.
        </p>
        <button
          type='button'
          disabled
          className='rounded text-slate-800 w-72 h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'
        >
          COMING SOON
        </button>
      </div>
    </div>
  ) : (
    <div className='w-full flex flex-col items-center mb-44 border-t-2 border-b-2 p-2'>
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
          <p className='text-4xl font-medium'>Fruntt Marketplace</p>
        </div>
        <p className='text-xl text-gray-400 font-medium mt-4'>
          Browse through your favorite pages, products, and creators on the
          platform.
        </p>
        <button
          type='button'
          disabled
          className='rounded text-slate-800 w-72 h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'
        >
          COMING SOON
        </button>
      </div>
    </div>
  );
};

export default Banner;
