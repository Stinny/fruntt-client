import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { isMobile } from 'react-device-detect';
import PageSamp from './PageSamp';
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import { useLazyGetTwitterAuthUrlQuery } from '../../api/authApiSlice';
import Cookies from 'js-cookie';
import imgOne from '../../media/notionNews.svg';
import imgTwo from '../../media/notionPerson.svg';
import imgThree from '../../media/notionPeeps.svg';
import Features from './Features';
import Email from './Email';
import Pricing from './Pricing';
import Products from './Products';
import { Accordion } from 'flowbite-react';

const Hero = ({ products, gettingProducts, gotProducts }) => {
  const [view, setView] = useState('subscribe');

  const Display = () => {
    switch (view) {
      case 'subscribe':
        return (
          <div className='flex flex-col gap-2'>
            <div className='flex'>
              <img src={imgOne} className='w-44' />
              <div className='w-44 border-l border-stone-800'>
                <img src={imgThree} className='w-full' />
              </div>
              <div className='w-44 border-l border-stone-800'>
                <img src={imgTwo} className='w-full' />
              </div>
            </div>
            <Email />
          </div>
        );
      case 'pricing':
        return (
          <div className='flex flex-col gap-2'>
            <div className='flex items-center w-full gap-2'>
              <div className='bg-white rounded-md border border-gray-200 flex flex-col items-center justify-center p-4 w-3/6'>
                <p className='font-bold text-stone-800'>$0</p>

                <p className='mt-1 text-xs text-stone-600 text-center'>
                  fee on sales <span className='font-bold'>under $5</span>
                </p>
              </div>
              <div className='bg-white rounded-md border border-gray-200 flex flex-col items-center justify-center p-4 w-3/6'>
                <p className='font-bold text-stone-800'>$1</p>

                <p className='mt-1 text-xs text-stone-600 text-center'>
                  fee on sales <span className='font-bold'>$5+</span>
                </p>
              </div>
            </div>
            <div className='w-full p-2 bg-white border border-gray-200 rounded-md flex items-center justify-center'>
              <p className='text-xs text-stone-600 flex items-center'>
                with an additional 2.9% + 30 ¢ / sale fee by{' '}
                <span className='underline underline-offset-2 ml-1'>
                  <a href='https://stripe.com/pricing' target='_blank'>
                    {' '}
                    Stripe
                  </a>
                </span>{' '}
              </p>
            </div>
          </div>
        );
      case 'coming':
        return (
          <div className='flex flex-col gap-4 p-4 border border-gray-200 rounded-md'>
            <div className='flex flex-col items-start'>
              <p className='text-sm text-stone-800'>Discounts</p>
              <p className='text-xs text-stone-600'>
                Create and offer discounts for your templates
              </p>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-sm text-stone-800'>Pricing Tiers</p>
              <p className='text-xs text-stone-600'>
                Offer multiple template versions based on price. Ex. basic and
                premium
              </p>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-sm text-stone-800'>Upsells</p>
              <p className='text-xs text-stone-600'>
                Suggest other templates to customers making a purchase
              </p>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-sm text-stone-800'>PayPal</p>
              <p className='text-xs text-stone-600'>
                Connect a PayPal account and allow customers to pay via PayPal
              </p>
            </div>
          </div>
        );
      case 'info':
        return (
          <Accordion collapseAll>
            <Accordion.Panel>
              <Accordion.Title>
                <p className='text-sm text-stone-800'>What is Notion?</p>
              </Accordion.Title>
              <Accordion.Content>
                <p className='text-stone-600 text-sm mb-2'>
                  Notion is an all-in-one workspace app that helps you organize
                  your life and work in a flexible and customizable way. It
                  combines the functionality of note-taking apps, project
                  management tools, and databases into one platform.
                </p>

                <a
                  href='https://www.notion.so'
                  className='text-stone-800 underline text-sm mt-2'
                  target='_blank'
                >
                  View Notion&nbsp;
                </a>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <p className='text-sm text-stone-800'>
                  How do I create a template?
                </p>
              </Accordion.Title>
              <Accordion.Content>
                <div className='flex flex-col items-start gap-4'>
                  <p className='text-sm text-stone-600'>
                    1. Sign up or sign in to your{' '}
                    <span>
                      <a
                        href='https://www.notion.so'
                        className='text-stone-800 underline text-sm'
                        target='_blank'
                      >
                        Notion&nbsp;
                      </a>
                    </span>{' '}
                    account.
                  </p>
                  <p className='text-sm text-stone-600'>
                    2. Once signed in, create a new page using the menu on the
                    left side.
                  </p>
                  <p className='text-sm text-stone-600'>
                    3. Using the page creation menu, select template to set your
                    page as a template for duplication purposes later.
                  </p>
                  <p className='text-sm text-stone-600'>
                    4. Now you can design your template using various elements
                    and databases. This is when the magic happens.
                  </p>
                  <p className='text-sm text-stone-600'>
                    5. Once your design is complete, share, publish, and allow
                    duplicates on your template to create a duplication link.
                  </p>
                  <a
                    href='https://www.youtube.com/watch?v=GOy6uVrSjuA'
                    className='text-stone-800 underline text-sm'
                    target='_blank'
                  >
                    View tutorial by Thomas Frank
                  </a>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <p className='text-sm text-stone-800'>
                  How do I sell my template?
                </p>
              </Accordion.Title>
              <Accordion.Content>
                <div className='flex flex-col items-start gap-4'>
                  <p className='text-sm text-stone-600'>
                    1. Sign up or sign in to your Fruntt account.
                  </p>
                  <p className='text-sm text-stone-600'>
                    2. Once signed in, click 'New +' in the side menu to list a
                    new template.
                  </p>
                  <p className='text-sm text-stone-600'>
                    3. Fill out all details required, including your duplcation
                    link you created in 'How do I create a template'. Select
                    publish and save.
                  </p>
                  <p className='text-sm text-stone-600'>
                    Share your template listing using your fruntt.com/t/template
                    URL wherever you'd like to allow customers to view and
                    purchase. Your template will also be available in our
                    marketplace.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                <p className='text-sm text-stone-800'>How do I get paid?</p>
              </Accordion.Title>
              <Accordion.Content>
                <div className='flex flex-col items-start gap-4'>
                  <p className='text-sm text-stone-600'>
                    You have the option to connect a bank account or a Stripe
                    account.
                  </p>

                  <p className='text-sm text-stone-600'>
                    If a bank account is connected, payouts occur only when you
                    have a positive balance. Depending on your account settings,
                    payouts will happen monthly or weekly.
                  </p>

                  <p className='text-sm text-stone-600'>
                    If a Stripe account is connected, funds move directly to
                    your connected Stripe account immediately after a successful
                    sale.
                  </p>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        );
      default:
        return;
    }
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
    <div className='flex flex-col max-w-7xl mt-44'>
      <div className='flex items-start gap-24'>
        <div className='flex flex-col gap-6 text-left w-3/6 h-96'>
          <div className='flex flex-col items-start text-left'>
            <p className='font-bold text-2xl text-stone-800'>
              Cheap and easy way to sell your
            </p>
            <p className='text-white bg-stone-800 rounded-md p-1 font-bold text-2xl inline-block'>
              Notion templates.
            </p>
          </div>
          <p className='text-sm text-stone-600'>
            We believe current solutions used to sell templates are too complex
            and take too high of fees when it's time to be paid out. So, we are
            bulding Fruntt to help creators avoid these issues.
          </p>
          <div className='flex items-center'>
            <Link to='/signup' className='p-1'>
              <button className='rounded-md text-stone-800 hover:bg-gray-200 text-xs p-2'>
                Start Selling
              </button>
            </Link>

            <Link to='/marketplace' className='border-l border-stone-800 p-1'>
              <button className=' text-stone-800 text-xs p-2 hover:bg-gray-200 rounded-md'>
                Browse Templates
              </button>
            </Link>
          </div>
        </div>

        <div className='flex flex-col gap-2 w-3/6'>
          <div className='w-full flex items-center gap-2'>
            <button
              type='button'
              onClick={(e) => setView('subscribe')}
              className={`${
                view === 'subscribe' ? 'bg-gray-200' : ''
              } rounded-md text-xs p-2 hover:bg-gray-200`}
            >
              Subscribe
            </button>
            <button
              type='button'
              onClick={(e) => setView('info')}
              className={`${
                view === 'info' ? 'bg-gray-200' : ''
              } rounded-md text-xs p-2 hover:bg-gray-200`}
            >
              How
            </button>
            <button
              type='button'
              onClick={(e) => setView('coming')}
              className={`${
                view === 'coming' ? 'bg-gray-200' : ''
              } rounded-md text-xs p-2 hover:bg-gray-200`}
            >
              Coming
            </button>
            <button
              type='button'
              onClick={(e) => setView('pricing')}
              className={`${
                view === 'pricing' ? 'bg-gray-200' : ''
              } rounded-md text-xs p-2 hover:bg-gray-200`}
            >
              Pricing
            </button>
          </div>
          <Display />
        </div>
      </div>
      <Products
        products={products}
        gettingProducts={gettingProducts}
        gotProducts={gotProducts}
      />
      {/* <Features />
      <Pricing /> */}
    </div>
  );
};

export default Hero;
