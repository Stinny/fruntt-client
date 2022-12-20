import React from 'react';
import { isMobile } from 'react-device-detect';

const PHunt = () => {
  return (
    <div className='w-full border-t-2 border-b-2 h-32 flex flex-col items-center justify-center mx-auto'>
      <p className='text-center text-slate-800 font-medium text-2xl'>
        Check us out on ProductHunt!
      </p>
      {isMobile ? (
        <a
          href='https://www.producthunt.com/posts/fruntt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fruntt'
          target='_blank'
          className='mt-4'
        >
          <img
            src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=365879&theme=dark'
            alt='Fruntt - Easily&#0032;launch&#0044;&#0032;design&#0044;&#0032;and&#0032;manage&#0032;single&#0032;product&#0032;storefronts | Product Hunt'
            style={{ width: '200px', height: '54px' }}
            width='250'
            height='54'
          />
        </a>
      ) : (
        <a
          href='https://www.producthunt.com/posts/fruntt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fruntt'
          target='_blank'
          className='mt-4'
        >
          <img
            src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=365879&theme=dark'
            alt='Fruntt - Easily&#0032;launch&#0044;&#0032;design&#0044;&#0032;and&#0032;manage&#0032;single&#0032;product&#0032;storefronts | Product Hunt'
            style={{ width: '250px', height: '54px' }}
            width='250'
            height='54'
          />
        </a>
      )}
    </div>
  );
};

export default PHunt;
