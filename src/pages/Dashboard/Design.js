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
import { BsPalette } from 'react-icons/bs';

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
      <div className='w-full mx-auto flex'>
        {/* <p className='mt-2'>
          Last designed on{' '}
          {moment(storefront?.lastEdited).format('MMM D, YYYY')}
        </p> */}
        <div className='mr-2 w-2/12'>
          <div className='w-full flex flex-col bg-white border drop-shadow-lg rounded p-2'>
            <div className='flex flex-col w-full'>
              <p className='text-sm font-medium mb-1'>Page</p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.pageBackground}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-md border'
                    style={{
                      backgroundColor: storefront?.style?.pageBackground,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full mt-1'>
              <p className='text-sm font-medium mb-1'>Card</p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.cardBackground}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-md border'
                    style={{
                      backgroundColor: storefront?.style?.cardBackground,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full mt-1'>
              <p
                className={
                  storefront?.style?.buttonStyle === 'filled'
                    ? `text-sm font-medium mb-1 underline underline-offset-2`
                    : `text-sm font-medium mb-1`
                }
              >
                Button
              </p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.buttonColor}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-md border'
                    style={{ backgroundColor: storefront?.style?.buttonColor }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full mt-1'>
              <p className='text-sm font-medium mb-1'>Button text</p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.buttonTextColor}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-md border'
                    style={{
                      backgroundColor: storefront?.style?.buttonTextColor,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full mt-1'>
              <p className='text-sm font-medium mb-1'>Borders</p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.borderColor}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-md border'
                    style={{ backgroundColor: storefront?.style?.borderColor }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full mt-1'>
              <p className='text-sm font-medium mb-1'>Headers</p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.headerColor}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-md border'
                    style={{ backgroundColor: storefront?.style?.headerColor }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full mt-1'>
              <p className='text-sm font-medium mb-1'>Price</p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.price}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-l-md border'
                    style={{ backgroundColor: storefront?.style?.price }}
                  ></div>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full mt-1'>
              <p className='text-sm font-medium mb-1'>Reviews</p>
              <div className='flex rounded-md bg-gray-100 h-10 w-full'>
                <div className='w-9/12 flex items-center justify-center'>
                  <p className='text-sm font-medium mt-1'>
                    {storefront?.style?.reviewBackground}
                  </p>
                </div>
                <div className='p-1 w-3/12'>
                  <div
                    className='w-full h-full rounded-md border'
                    style={{
                      backgroundColor: storefront?.style?.reviewBackground,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
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
      <div className='flex'>
        <Topbar />
        {isMobile ? (
          <div className='w-full h-screen p-2 mx-auto mt-16'>{content}</div>
        ) : (
          <div className='w-10/12 mx-auto pt-10 pb-10 pl-32 pr-32 h-screen overflow-y-scroll bg-gray-50'>
            <div className='flex justify-between items-center mb-2'>
              <div className='flex flex-col'>
                {/* <h2 className='text-3xl font-medium'>Storefront design</h2> */}
                <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
                  <BsPalette className='text-white text-xl' />
                  <p className='text-md text-white ml-2'>Design</p>
                </div>
              </div>

              <Link to='/dashboard/design/edit'>
                <button className='w-40 h-10 rounded border-stone-800 border-2 hover:bg-stone-800 hover:text-white'>
                  EDIT
                </button>
              </Link>
            </div>
            {content}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Design;
