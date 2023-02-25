import React from 'react';
import launchImg from '../../media/launch.svg';
import uploadImg from '../../media/upload.svg';
import cardImg from '../../media/card.svg';
import customizeImg from '../../media/customize.svg';
import { isMobile } from 'react-device-detect';

const HowSell = () => {
  return isMobile ? (
    <div className='flex flex-col items-center w-full'>
      <p className='font-medium text-gray-400 text-2xl underline underline-offset-8'>
        How to sell?
      </p>
      <p className='font-medium text-xl mt-2'>Seriously it takes minutes.</p>

      <div className='flex flex-col w-full mt-10'>
        <div className='flex flex-col items-center'>
          <div className='w-44 h-44 bg-green-200 flex items-center justify-center rounded'>
            <img className='w-28' src={launchImg} />
          </div>
          <p className='font-medium text-lg mt-2'>1. Launch a page</p>
        </div>

        <div className='flex flex-col items-center mt-6'>
          <div className='w-44 h-44 bg-purple-200 flex items-center justify-center rounded'>
            <img src={uploadImg} />
          </div>
          <p className='font-medium text-lg mt-2'>
            2. Upload your digital product
          </p>
        </div>

        <div className='flex flex-col items-center mt-6'>
          <div className='w-44 h-44 bg-red-200 flex items-center justify-center rounded'>
            <img className='w-24' src={customizeImg} />
          </div>
          <p className='font-medium text-lg mt-2'>
            3. Customize to your liking
          </p>
        </div>

        <div className='flex flex-col items-center mt-6'>
          <div className='w-44 h-44 bg-yellow-100 flex items-center justify-center rounded'>
            <img className='w-24' src={cardImg} />
          </div>
          <p className='font-medium text-lg mt-2'>4. Ready for sales</p>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center w-7/12'>
      <p className='font-medium text-gray-400 text-2xl underline underline-offset-8'>
        How to sell?
      </p>
      <p className='font-medium text-xl mt-2'>Seriously it takes minutes.</p>

      <div className='flex justify-between w-full mt-10'>
        <div className='flex flex-col items-center'>
          <div className='w-32 h-32 bg-green-200 flex items-center justify-center rounded'>
            <img className='w-28' src={launchImg} />
          </div>
          <p className='font-medium text-lg mt-2'>1. Launch a page</p>
        </div>

        <div className='flex flex-col items-center'>
          <div className='w-32 h-32 bg-purple-200 flex items-center justify-center rounded'>
            <img src={uploadImg} />
          </div>
          <p className='font-medium text-lg mt-2'>
            2. Upload your digital product
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <div className='w-32 h-32 bg-red-200 flex items-center justify-center rounded'>
            <img className='w-24' src={customizeImg} />
          </div>
          <p className='font-medium text-lg mt-2'>
            3. Customize to your liking
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <div className='w-32 h-32 bg-yellow-100 flex items-center justify-center rounded'>
            <img className='w-24' src={cardImg} />
          </div>
          <p className='font-medium text-lg mt-2'>4. Ready for sales</p>
        </div>
      </div>
    </div>
  );
};

export default HowSell;
