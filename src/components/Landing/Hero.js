import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import PageSamp from './PageSamp';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import { useLazyGetTwitterAuthUrlQuery } from '../../api/authApiSlice';
import Cookies from 'js-cookie';
import imgOne from '../../media/light.svg';
import imgTwo from '../../media/mail.svg';
import imgThree from '../../media/xlogowhite.png';
import Features from './Features';
import Email from './Email';
import Pricing from './Pricing';
import Products from './Products';

const Hero = ({ products, gettingProducts, gotProducts }) => {
  const [getTwitterAuthUrl, result] = useLazyGetTwitterAuthUrlQuery();
  const words = ['templates', 'content', 'e-books', 'code', 'courses', 'art'];
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = words[wordIndex];

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

  useEffect(() => {
    const interval = setInterval(cycleWords, 2000); // Change word every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  const cycleWords = () => {
    setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return isMobile ? (
    <div className='h-fit flex flex-col w-full mt-16 p-4'>
      <div className='flex flex-col'>
        <div className='flex flex-col text-left w-full'>
          <p className='font-bold text-xl'>Most affordable way to sell your</p>
          <div>
            <p className='text-white bg-stone-800 rounded-md p-1 font-bold text-xl inline-block'>
              Notion templates.
            </p>
          </div>
          <p className='text-md mt-6'>
            Stop worrying about high payout fees and focus more on your
            earnings.
          </p>

          <a
            href='#pricing'
            className='text-stone-800 mt-6 flex items-center text-sm'
          >
            See pricing{' '}
            <FaChevronDown className='ml-2 text-stone-800 text-sm' />
          </a>
          <div className='flex items-center mt-6'>
            <Link to='/signup' className='flex w-56'>
              <button className='rounded-md bg-white text-stone-800 text-sm w-full h-10 border-stone-800 border-2 shadow-md hover:bg-stone-800 hover:text-white flex items-center justify-center'>
                Open Store
              </button>
            </Link>

            <Link to='/marketplace' className='flex w-56 ml-1'>
              <button className='rounded-md text-white w-full h-10 text-sm border-stone-800 border-2 bg-stone-800 flex items-center shadow-md justify-center'>
                Browse Templates
              </button>
            </Link>

            {/* <button
              style={{
                backgroundColor: 'rgb(15, 20, 25)',
                borderColor: 'rgb(15, 20, 25)',
              }}
              className='w-56 h-10 rounded flex items-center justify-center text-white ml-1 shadow-md border-2'
              type='button'
              onClick={handleTwitterSignup}
            >
              <p className='text-sm mr-2'>Connect with</p>
              <img src={imgThree} className='w-4 h-4' />
            </button> */}
          </div>
        </div>

        <div className='flex flex-col w-full rounded-md shadow-lg border mt-10'>
          <div className='flex'>
            <div className='w-3/6 bg-stone-800 text-white flex justify-center items-center h-32 rounded-tl-md'>
              <p className='flex justify-center items-center h-32 font-medium text-2xl'>
                $
              </p>
            </div>
            <div className='w-3/6 bg-white h-32 rounded-tr flex items-center justify-center'>
              <img src={imgOne} className='w-44' />
            </div>
          </div>

          <div className='flex'>
            <div className='w-3/6 bg-white h-32 flex items-center justify-center rounded-bl-md'>
              <img src={imgTwo} className='w-44' />
            </div>
            <div className='w-3/6 bg-stone-800 flex justify-center items-center rounded-br-md h-32 text-white'>
              <p className='text-2xl font-medium'>$</p>
            </div>
          </div>
        </div>
      </div>
      <Products
        products={products}
        gettingProducts={gettingProducts}
        gotProducts={gotProducts}
      />
      <Features />
      <Pricing />
    </div>
  ) : (
    <div className='h-fit flex flex-col max-w-7xl mt-44'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col text-left w-3/6 mr-32'>
          <p className='font-bold text-3xl'>Most affordable way to sell your</p>
          <div>
            <p className='text-white bg-stone-800 rounded-md p-1 font-bold text-3xl inline-block'>
              Notion templates.
            </p>
          </div>
          {/* <p className='text-xl mt-10'>
            
            Sell any Notion template to your customers{' '}
            <span className='font-bold'>without</span> worrying about high
            payout fees.
          </p> */}
          <p className='text-xl mt-6'>
            Stop worrying about high payout fees and focus more on your
            earnings.
          </p>
          <a href='#pricing' className='text-stone-800 mt-6 flex items-center'>
            See pricing{' '}
            <FaChevronDown className='ml-2 text-stone-800 text-sm' />
          </a>
          <div className='flex items-center mt-10'>
            <Link to='/signup' className='flex w-56'>
              <button className='rounded-md text-stone-800 w-full h-10 border-stone-800 border-2 hover:bg-stone-800 hover:text-white flex items-center shadow-md bg-white justify-center'>
                Open Store
              </button>
            </Link>

            <Link to='/marketplace' className='flex w-56 ml-1'>
              <button className='rounded-md text-white w-full h-10 border-stone-800 border-2 bg-stone-800 flex items-center shadow-md justify-center'>
                Browse Templates
              </button>
            </Link>

            {/* <button
              style={{
                backgroundColor: 'rgb(15, 20, 25)',
                borderColor: 'rgb(15, 20, 25)',
              }}
              className='w-56 h-10 rounded flex items-center justify-center text-white ml-1 border-2 shadow-md'
              type='button'
              onClick={handleTwitterSignup}
            >
              
              <p className='mr-2'>Connect with</p>
              <img src={imgThree} className='w-4 h-4' />
            </button> */}
          </div>
        </div>

        <div className='flex flex-col w-3/6 shadow-lg rounded-md border'>
          <div className='flex'>
            <div className='w-3/6 bg-stone-800 text-white flex justify-center items-center h-36 rounded-tl-md'>
              <p className='flex justify-center items-center h-32 font-medium text-3xl'>
                $
              </p>
            </div>
            <div className='w-3/6 bg-white h-36 rounded-tr-md flex items-center justify-center'>
              <img src={imgOne} className='w-44' />
            </div>
          </div>

          <div className='flex'>
            <div className='w-3/6 bg-white h-36 flex items-center justify-center rounded-bl-md'>
              <img src={imgTwo} className='w-44' />
            </div>
            <div className='w-3/6 bg-stone-800 flex justify-center rounded-br-md items-center h-36 text-white'>
              <p className='text-3xl font-medium'>$</p>
            </div>
          </div>
        </div>
      </div>
      <Products
        products={products}
        gettingProducts={gettingProducts}
        gotProducts={gotProducts}
      />
      <Features />
      <Pricing />
    </div>
  );
};

export default Hero;
