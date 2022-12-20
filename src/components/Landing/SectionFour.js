import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../media/dash.svg';
import { isMobile } from 'react-device-detect';

const SectionFour = () => {
  return isMobile ? (
    <div className='w-full mx-auto flex flex-col items-center mt-32 p-2'>
      <p className='text-xl font-medium text-center text-slate-800 w-full'>
        Bring your customers only TWO clicks from a purchase, lead them straight
        to the product not an entire online storefront!
      </p>
      <Link to='/pricing' className='flex justify-center mt-8 w-full'>
        <button className='rounded text-slate-800 w-full h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
          Launch a FREE product page
        </button>
      </Link>
      <img src={img} className='w-full' />
    </div>
  ) : (
    <div className='max-w-7xl mx-auto flex flex-col items-center mt-32'>
      <p className='text-4xl font-medium text-center text-slate-800 w-8/12'>
        Bring your customers only TWO clicks from a purchase, lead them straight
        to the product not an entire online storefront!
      </p>
      <Link to='/signup' className='flex justify-center mt-8 w-96'>
        <button className='rounded text-slate-800 w-full h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
          Launch a FREE product page
        </button>
      </Link>
      <img src={img} className='w-6/12' />
    </div>
  );
};

export default SectionFour;
