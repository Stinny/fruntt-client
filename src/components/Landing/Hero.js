import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import PageSamp from './PageSamp';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import { useLazyGetTwitterAuthUrlQuery } from '../../api/authApiSlice';
import Cookies from 'js-cookie';
import imgOne from '../../media/light.svg';
import imgTwo from '../../media/mail.svg';
import Features from './Features';
import Email from './Email';
import Pricing from './Pricing';

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
    <div className='h-fit flex flex-col w-full mt-20 p-2'>
      <div className='flex flex-col'>
        <div className='flex flex-col text-left w-full'>
          <p className='font-medium text-2xl'>
            Most affordable way to sell your digital products.
          </p>
          <p className='text-lg mt-6'>
            Sell any digital product from your own customized storefront and
            keep 99% of what you earn after payment processing fees.
          </p>
          <div className='flex items-center mt-6'>
            <Link to='/signup' className='flex w-56'>
              <button className='rounded text-stone-800 w-full h-10 border-stone-800 border-2 hover:bg-stone-800 hover:text-white flex items-center justify-center'>
                Open Storefront
              </button>
            </Link>

            <button
              style={{ backgroundColor: '#1D9BF0', borderColor: '#1D9BF0' }}
              className='w-56 h-10 rounded flex items-center justify-center text-white ml-1 border-2'
              type='button'
              onClick={handleTwitterSignup}
            >
              <AiOutlineTwitter className='text-2xl mr-2' />
              <p className=''>Connect with Twitter</p>
            </button>
          </div>
        </div>

        <div className='flex flex-col w-full rounded shadow-lg border mt-10'>
          <div className='flex'>
            <div className='w-3/6 bg-stone-800 text-white flex justify-center items-center h-32 rounded-tl'>
              <p className='flex justify-center items-center h-32 font-medium text-2xl'>
                99%
              </p>
            </div>
            <div className='w-3/6 bg-white h-32 rounded-tr flex items-center justify-center'>
              <img src={imgOne} className='w-44' />
            </div>
          </div>

          <div className='flex'>
            <div className='w-3/6 bg-white h-32 flex items-center justify-center rounded-bl'>
              <img src={imgTwo} className='w-44' />
            </div>
            <div className='w-3/6 bg-stone-800 flex justify-center items-center h-32 text-white'>
              <p className='text-2xl font-medium'>99%</p>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <Pricing />
    </div>
  ) : (
    <div className='h-fit flex flex-col max-w-7xl mt-44'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col text-left w-3/6 mr-32'>
          <p className='font-medium text-3xl'>
            Most affordable way to sell your digital products.
          </p>
          <p className='text-xl mt-6'>
            Sell any digital product from your own customized storefront and
            keep 99% of what you earn after payment processing fees.
          </p>
          <div className='flex items-center mt-6'>
            <Link to='/signup' className='flex w-56'>
              <button className='rounded text-stone-800 w-full h-10 border-stone-800 border-2 hover:bg-stone-800 hover:text-white flex items-center justify-center'>
                Open Storefront
              </button>
            </Link>

            <button
              style={{ backgroundColor: '#1D9BF0', borderColor: '#1D9BF0' }}
              className='w-56 h-10 rounded flex items-center justify-center text-white ml-1 border-2'
              type='button'
              onClick={handleTwitterSignup}
            >
              <AiOutlineTwitter className='text-2xl mr-2' />
              <p className=''>Connect with Twitter</p>
            </button>
          </div>
        </div>

        <div className='flex flex-col w-3/6 rounded shadow-lg border'>
          <div className='flex'>
            <div className='w-3/6 bg-stone-800 text-white flex justify-center items-center h-32 rounded-tl'>
              <p className='flex justify-center items-center h-32 font-medium text-2xl'>
                99%
              </p>
            </div>
            <div className='w-3/6 bg-white h-32 rounded-tr flex items-center justify-center'>
              <img src={imgOne} className='w-44' />
            </div>
          </div>

          <div className='flex'>
            <div className='w-3/6 bg-white h-32 flex items-center justify-center rounded-bl'>
              <img src={imgTwo} className='w-44' />
            </div>
            <div className='w-3/6 bg-stone-800 flex justify-center items-center h-32 text-white'>
              <p className='text-2xl font-medium'>99%</p>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <Pricing />
    </div>
  );
};

export default Hero;
