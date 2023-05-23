import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import PageSamp from './PageSamp';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import { useLazyGetTwitterAuthUrlQuery } from '../../api/authApiSlice';
import Cookies from 'js-cookie';

const Hero = () => {
  const [getTwitterAuthUrl, result] = useLazyGetTwitterAuthUrlQuery();

  const handleTwitterSignup = async (e) => {
    //request the twitter auth url from server
    //redirect user to the auth url for log in
    e.preventDefault();
    console.log('Signing up with Twitter!');
    const twitterAuthUrlReq = await getTwitterAuthUrl({
      type: 'register',
    }).unwrap();

    if (twitterAuthUrlReq.url) {
      Cookies.set('twitterOauth', twitterAuthUrlReq?.oauthSecret);
      Cookies.set('twitterAuthType', twitterAuthUrlReq?.type);
      window.location.href = twitterAuthUrlReq?.url;
    }
  };

  return isMobile ? (
    <div className='flex flex-col w-11/12 text-center mt-20'>
      <div className='flex flex-col w-full'>
        <p className='text-3xl font-medium text-stone-800'>
          Bring your digital products to LIFE.
        </p>
        <p className='text-xl font-medium mt-8 text-gray-400'>
          Your own customized pages to sell your digital products from. Make
          your products stand out to your audience.
        </p>

        <p className='font-medium text-2xl text-stone-800 mt-8'>
          Keep <span className='bg-stone-800 rounded text-white p-1'>99%</span>{' '}
          of what you earn.
        </p>

        <div className='flex flex-col items-center mt-12'>
          <Link to='/signup' className='flex w-56'>
            <button className='rounded text-stone-800 w-full h-10 border-stone-800 border-2 hover:bg-stone-800 hover:text-white flex items-center justify-center'>
              Launch a page
            </button>
          </Link>

          <button
            style={{ backgroundColor: '#1D9BF0', borderColor: '#1D9BF0' }}
            className='w-56 h-10 rounded flex items-center justify-center text-white mt-2 border-2'
            type='button'
            onClick={handleTwitterSignup}
          >
            <AiOutlineTwitter className='text-2xl mr-2' />
            <p className=''>Connect with Twitter</p>
          </button>
        </div>
      </div>

      <div className='w-full h-4/6 mt-12'>
        <PageSamp />
      </div>
    </div>
  ) : (
    <div className='flex flex-col h-screen w-6/12 items-center mb-24'>
      <div className='flex flex-col w-full items-center mt-24'>
        <p className='text-5xl text-center font-medium text-stone-800'>
          Bring your digital products to LIFE.
        </p>
        <p className='text-2xl font-medium mt-8 text-gray-400 text-center'>
          Your own customized pages to sell your digital products from. Make
          your products stand out to your audience.
        </p>

        <p className='font-medium text-3xl text-stone-800 mt-8 text-center'>
          Keep <span className='bg-stone-800 rounded text-white p-1'>99%</span>{' '}
          of what you earn.
        </p>

        <div className='flex items-center mt-12'>
          <Link to='/signup' className='flex w-56'>
            <button className='rounded text-stone-800 w-full h-10 border-stone-800 border-2 hover:bg-stone-800 hover:text-white flex items-center justify-center'>
              Launch a page
            </button>
          </Link>

          <button
            style={{ backgroundColor: '#1D9BF0', borderColor: '#1D9BF0' }}
            className='w-56 h-10 rounded flex items-center justify-center text-white ml-2 border-2'
            type='button'
            onClick={handleTwitterSignup}
          >
            <AiOutlineTwitter className='text-2xl mr-2' />
            <p className=''>Connect with Twitter</p>
          </button>
        </div>
      </div>

      <div
        className=' h-4/5 flex flex-col items-center mt-10'
        style={{ width: '625px' }}
      >
        <PageSamp />
      </div>
    </div>
  );
};

export default Hero;
