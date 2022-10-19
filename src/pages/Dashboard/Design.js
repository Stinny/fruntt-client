import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useGetStorefrontQuery } from '../../api/storefrontApiSlice';
import Spinner from '../../components/Spinner';
import { BsArrowRightShort } from 'react-icons/bs';
import moment from 'moment';

//mui
import Switch from '@mui/material/Switch';
import DesignPreview from '../DesignPreview';

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
      <div className='w-full mx-auto flex'>
        <div className='flex w-5/12 flex-col overflow-scroll'>
          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Page background</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.pageBackground }}
            ></div>
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Header background</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.navbarBackground }}
            ></div>
            <Switch checked={storefront?.style?.hideNav} disabled />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Footer background</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.footerBackground }}
            ></div>
            <Switch checked={storefront?.style?.hideFooter} disabled />
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Page text</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.pageText }}
            ></div>
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Button background</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.buttonColor }}
            ></div>
            <select className='mt-2 mb-2 bg-gray-300 rounded w-9/12' disabled>
              <option>{storefront?.style?.buttonStyle}</option>
            </select>
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Button text color</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.buttonTextColor }}
            ></div>
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Borders</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.borderColor }}
            ></div>
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Headers</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.headerColor }}
            ></div>
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>FAQs background</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.faqBackground }}
            ></div>
          </div>

          <div className='w-full flex flex-col p-2 border-b mx-auto'>
            <p className='text-lg font-medium'>Reviews background</p>
            <div
              className='w-10/12 h-14 border-2 rounded'
              style={{ backgroundColor: storefront?.style?.reviewBackground }}
            ></div>
          </div>
        </div>

        <DesignPreview
          pageBG={storefront?.style?.pageBG}
          navbarBG={storefront?.style?.navbarBackground}
          buttonColor={storefront?.style?.buttonColor}
          buttonTextColor={storefront?.style?.buttonTextColor}
          buttonStyle={storefront?.style?.buttonStyle}
          pageText={storefront?.style?.pageText}
          footerBG={storefront?.style?.footerBackground}
          storefrontId={storefront?._id}
          hideNav={storefront?.style?.hideNav}
          socialIcons={storefront?.style?.socialIcons}
          hideFooter={storefront?.style?.hideFooter}
          headerColor={storefront?.style?.headerColor}
          borderColor={storefront?.style?.borderColor}
          storefront={storefront}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-7xl mx-auto'>
        <div className='mb-10 flex justify-between items-center border-b-2 p-2'>
          <div className='flex flex-col'>
            <h2 className='text-3xl font-medium'>Storefront design</h2>
            <p>
              last edited on{' '}
              {moment(storefront?.lastEdited).format('MMM D, YYYY')}
            </p>
          </div>
          <a
            href={storefront?.url}
            target='_blank'
            className='flex items-center'
          >
            <p className='font-medium text-xl'>View your storefront</p>
            <BsArrowRightShort className='text-2xl font-medium' />
          </a>
          <Link to='/dashboard/design/edit'>
            <button className='w-40 h-10 rounded border-slate-800 border-2 hover:bg-slate-800 hover:text-white'>
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
