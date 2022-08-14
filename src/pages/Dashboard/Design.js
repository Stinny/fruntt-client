import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetStorefrontQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';
import { BsArrowRightShort } from 'react-icons/bs';

const Design = () => {
  const {
    data: storefront,
    isLoading,
    isSuccess,
    refetch,
  } = useGetStorefrontQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div className='w-11/12 mx-auto'>
        <p className='text-gray-400 font-medium mt-4'>Page Styles</p>
        <div className='p-4'>
          <div className='w-full flex justify-between items-center mt-2'>
            <p className='text-xl font-medium'>Page background</p>
            <div
              className='border-2 w-16 h-16 rounded-md'
              style={{ backgroundColor: storefront?.style?.pageBackground }}
            ></div>
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <p className='text-xl font-medium'>Navbar background</p>
            <div
              className='border-2 w-16 h-16 rounded-md'
              style={{ backgroundColor: storefront?.style?.navbarBackground }}
            ></div>
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <p className='text-xl font-medium'>Footer background</p>
            <div
              className='border-2 w-16 h-16 rounded-md'
              style={{ backgroundColor: storefront?.style?.footerBackground }}
            ></div>
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <p className='text-xl font-medium'>Page text</p>
            <div
              className='border-2 w-16 h-16 rounded-md'
              style={{ backgroundColor: storefront?.style?.pageText }}
            ></div>
          </div>
        </div>

        <p className='text-gray-400 font-medium mt-4'>Button Styles</p>
        <div className='p-4'>
          <div className='w-full flex justify-between items-center mt-2'>
            <p className='text-xl font-medium'>Button background</p>
            <div
              className='border-2 w-16 h-16 rounded-md'
              style={{
                backgroundColor: storefront?.style?.buttonBackground,
              }}
            ></div>
          </div>
          <div className='w-full flex justify-between items-center mt-2'>
            <p className='text-xl font-medium'>Button text</p>
            <div
              className='border-2 w-16 h-16 rounded-md'
              style={{ backgroundColor: storefront?.style?.buttonTextColor }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto'>
        <div className='mb-10 flex justify-between border-b-2 p-2'>
          <h2 className='text-3xl font-medium'>Storefront styles</h2>
          <a
            href={storefront?.url}
            target='_blank'
            className='flex items-center'
          >
            <p className='font-medium text-xl'>View your storefront</p>
            <BsArrowRightShort className='text-2xl font-medium' />
          </a>
          <Link to='/dashboard/design/edit'>
            <button className='w-32 h-10 rounded border-slate-800 border-2'>
              EDIT
            </button>
          </Link>
        </div>
        {content}
      </div>
      <Footer />
    </>
  );
};

export default Design;
