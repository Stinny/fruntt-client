import React from 'react';
import Switch from '@mui/material/Switch';
import DesignPreviewMobile from './DesignPreviewMobile';

const DesignMobile = ({ storefront }) => {
  return (
    <>
      <div className='flex w-full h-32 overflow-x-scroll'>
        <div className='w-28 h-full flex flex-col p-2 mx-auto'>
          <p className='text-md font-medium'>Page</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.pageBackground }}
          ></div>
        </div>

        <div className='w-28 h-full flex flex-col p-2 mx-auto ml-2'>
          <p className='text-md font-medium'>Page text</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.pageText }}
          ></div>
        </div>

        <div className='w-28 h-full flex flex-col p-2 mx-auto ml-2'>
          <p className='text-md font-medium'>Button</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.buttonColor }}
          ></div>
          <select className='mt-2 mb-2 bg-gray-300 rounded w-9/12' disabled>
            <option>{storefront?.style?.buttonStyle}</option>
          </select>
        </div>

        <div className='w-28 h-full flex flex-col p-2 mx-auto ml-2'>
          <p className='text-md font-medium'>Button text</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.buttonTextColor }}
          ></div>
        </div>

        <div className='w-28 h-full flex flex-col p-2 mx-auto ml-2'>
          <p className='text-md font-medium'>Borders</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.borderColor }}
          ></div>
        </div>

        <div className='w-28 h-full flex flex-col p-2 mx-auto ml-2'>
          <p className='text-md font-medium'>Headers</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.headerColor }}
          ></div>
        </div>

        <div className='w-28 h-full flex flex-col p-2 mx-auto ml-2'>
          <p className='text-md font-medium'>FAQs</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.faqBackground }}
          ></div>
        </div>

        <div className='w-28 h-full flex flex-col p-2 border-b mx-auto ml-2'>
          <p className='text-md font-medium'>Reviews</p>
          <div
            className='w-28 h-12 border-2 rounded'
            style={{ backgroundColor: storefront?.style?.reviewBackground }}
          ></div>
        </div>
      </div>
      <DesignPreviewMobile
        pageBG={storefront?.style?.pageBackground}
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
      />
    </>
  );
};

export default DesignMobile;
