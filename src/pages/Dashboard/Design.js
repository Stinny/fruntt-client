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
import { isMobile } from 'react-device-detect';
import DesignPreview from '../DesignPreview';
import DesignMobile from '../Mobile/Dashboard/DesignMobile';
import Cookies from 'js-cookie';

const Design = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);

  const {
    data: storefront,
    isLoading,
    isSuccess,
    refetch,
  } = useGetStorefrontQuery({ storeId: currentStoreID });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <DesignMobile storefront={storefront} />
    ) : (
      <div className='w-full mx-auto flex flex-col'>
        <div className='flex w-full bg-white border drop-shadow-md rounded mt-4 mb-2'>
          <div className='w-full flex flex-col items-center p-2 mx-auto'>
            <p className='text-lg font-medium mb-1'>Page</p>
            <div
              className='w-14 h-14 border border-stone-800 rounded shadow-lg'
              style={{ backgroundColor: storefront?.style?.pageBackground }}
            ></div>
            <p className='text-sm font-medium mt-1'>
              {storefront?.style?.pageBackground}
            </p>
          </div>

          <div className='w-full flex flex-col items-center p-2 mx-auto'>
            <p className='text-lg font-medium mb-1'>Card</p>
            <div
              className='w-14 h-14 border border-stone-800 rounded shadow-lg'
              style={{ backgroundColor: storefront?.style?.cardBackground }}
            ></div>
            <p className='text-sm font-medium mt-1'>
              {storefront?.style?.cardBackground}
            </p>
          </div>

          <div className='w-full flex flex-col items-center p-2 mx-auto'>
            <p
              className={
                storefront?.style?.buttonStyle === 'filled'
                  ? `text-lg font-medium mb-1 underline underline-offset-2`
                  : `text-lg font-medium mb-1`
              }
            >
              Button
            </p>
            <div
              className='w-14 h-14 border rounded border-stone-800 shadow-lg'
              style={{ backgroundColor: storefront?.style?.buttonColor }}
            ></div>
            <p className='text-sm font-medium mt-1'>
              {storefront?.style?.buttonColor}
            </p>
          </div>

          <div className='w-full flex flex-col p-2 mx-auto items-center'>
            <p className='text-lg font-medium mb-1'>Button text</p>
            <div
              className='w-14 h-14 border border-stone-800 rounded shadow-lg'
              style={{ backgroundColor: storefront?.style?.buttonTextColor }}
            ></div>
            <p className='text-sm font-medium mt-1'>
              {storefront?.style?.buttonTextColor}
            </p>
          </div>

          <div className='w-full flex flex-col items-center p-2 mx-auto'>
            <p className='text-lg font-medium mb-1'>Borders</p>
            <div
              className='w-14 h-14 border border-stone-800 rounded shadow-lg'
              style={{ backgroundColor: storefront?.style?.borderColor }}
            ></div>
            <p className='text-sm font-medium mt-1'>
              {storefront?.style?.borderColor}
            </p>
          </div>

          <div className='w-full flex flex-col items-center p-2 mx-auto'>
            <p className='text-lg font-medium mb-1'>Headers</p>
            <div
              className='w-14 h-14 border border-stone-800 rounded shadow-lg'
              style={{ backgroundColor: storefront?.style?.headerColor }}
            ></div>
            <p className='text-sm font-medium mt-1'>
              {storefront?.style?.headerColor}
            </p>
          </div>

          {storefront?.hideQuestions ? (
            ''
          ) : (
            <div className='w-full flex flex-col items-center p-2 mx-auto'>
              <p className='text-lg font-medium mb-1'>Price</p>
              <div
                className='w-14 h-14 border border-stone-800 rounded shadow-lg'
                style={{ backgroundColor: storefront?.style?.price }}
              ></div>
              <p className='text-sm font-medium mt-1'>
                {storefront?.style?.price}
              </p>
            </div>
          )}

          {storefront?.hideReviews ? (
            ''
          ) : (
            <div className='w-full flex flex-col p-2 mx-auto items-center'>
              <p className='text-lg font-medium mb-1'>Reviews</p>
              <div
                className='w-14 h-14 border border-stone-800 rounded shadow-lg'
                style={{ backgroundColor: storefront?.style?.reviewBackground }}
              ></div>
              <p className='text-sm font-medium mt-1'>
                {storefront?.style?.reviewBackground}
              </p>
            </div>
          )}
        </div>

        <DesignPreview
          pageBG={storefront?.style?.pageBackground}
          price={storefront?.style?.price}
          cardBG={storefront?.style?.cardBackground}
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
          faqBackground={storefront?.style?.faqBackground}
          reviewBackground={storefront?.style?.reviewBackground}
          hideReviews={storefront?.hideReviews}
          hideDescription={storefront?.hideDescription}
          hideQuestions={storefront?.hideQuestions}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      {isMobile ? (
        <div className='w-full mx-auto h-fit'>
          <div className='flex justify-between items-center p-2'>
            <div className='flex flex-col'>
              <h2 className='text-2xl font-medium'>Storefront design</h2>
              <p>
                Page last designed on{' '}
                {moment(storefront?.lastEdited).format('MMM D, YYYY')}
              </p>
            </div>
            <Link to='/dashboard/design/edit'>
              <button className='w-20 text-sm h-10 rounded border-slate-800 border-2 hover:bg-slate-800 hover:text-white'>
                EDIT
              </button>
            </Link>
          </div>
          {content}
        </div>
      ) : (
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-between items-center p-2'>
            <div className='flex flex-col'>
              <h2 className='text-2xl font-medium'>Storefront design</h2>
              <p className='mt-2'>
                Last designed on{' '}
                {moment(storefront?.lastEdited).format('MMM D, YYYY')}
              </p>
            </div>
            <a
              href={storefront?.url}
              target='_blank'
              className='flex items-center mt-6'
            >
              <p className='font-medium text-xl'>View your storefront</p>
              <BsArrowRightShort className='text-2xl font-medium' />
            </a>
            <Link to='/dashboard/design/edit'>
              <button className='w-40 h-10 rounded border-stone-800 border-2 hover:bg-stone-800 hover:text-white'>
                EDIT
              </button>
            </Link>
          </div>
          {content}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Design;
