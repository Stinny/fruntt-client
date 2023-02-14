import React from 'react';
import { IoShirtOutline } from 'react-icons/io5';
import { AiOutlineFormatPainter, AiOutlineLink } from 'react-icons/ai';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';

const Banner = () => {
  return isMobile ? (
    <div className='w-full flex flex-col items-center justify-center mb-44 border-t-2 border-b-2 p-2'>
      <p className='mb-8 text-xl text-center font-medium'>
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
        <div className='flex items-center justify-between mt-2'></div>

        <div className='flex flex-col items-center mt-4'>
          <AiOutlineLink className='text-4xl' />
          <p className='font-medium'>Private links</p>
        </div>
      </div>
    </div>
  ) : (
    <div className='w-full flex flex-col items-center mb-44 border-t-2 border-b-2 p-2'>
      <p className='mb-8 text-2xl font-medium'>
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
          <AiOutlineLink className='text-5xl' />
          <p className='text-xl font-medium'>Private links</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
