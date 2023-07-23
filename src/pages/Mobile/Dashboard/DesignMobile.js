import React from 'react';
import Switch from '@mui/material/Switch';
import DesignPreviewMobile from './DesignPreviewMobile';

const DesignMobile = ({ storefront }) => {
  return (
    <>
      <div className='p-2'>
        <div className='flex w-full h-32 overflow-x-scroll bg-white border rounded drop-shadow-md'>
          <div className='w-24 flex flex-col items-center p-2 mx-auto'>
            <p className='text-md font-medium mb-1'>Page</p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.pageBackground }}
            ></div>
          </div>

          <div className='w-28 h-full flex flex-col items-center p-2 mx-auto ml-2'>
            <p className='text-md font-medium mb-1'>Card</p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.cardBackground }}
            ></div>
          </div>

          <div className='w-28 h-full flex flex-col items-center p-2 mx-auto ml-2'>
            <p
              className={
                storefront?.style?.buttonStyle === 'filled'
                  ? `text-md font-medium mb-1 underline underline-offset-2`
                  : `text-md font-medium mb-1`
              }
            >
              Button
            </p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.buttonColor }}
            ></div>
          </div>

          <div className='w-24 h-full flex flex-col items-center p-2 mx-auto ml-2'>
            <p className='text-md font-medium w-24 mb-1'>Button text</p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.buttonTextColor }}
            ></div>
          </div>

          <div className='w-28 h-full flex flex-col items-center p-2 mx-auto ml-2'>
            <p className='text-md font-medium mb-1'>Borders</p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.borderColor }}
            ></div>
          </div>

          <div className='w-28 h-full flex flex-col items-center p-2 mx-auto ml-2'>
            <p className='text-md font-medium mb-1'>Headers</p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.headerColor }}
            ></div>
          </div>

          <div className='w-28 h-full flex flex-col items-center p-2 mx-auto ml-2'>
            <p className='text-md font-medium mb-1'>Questions</p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.faqBackground }}
            ></div>
          </div>

          <div className='w-28 h-full flex flex-col items-center p-2 border-b mx-auto ml-2'>
            <p className='text-md font-medium mb-1'>Reviews</p>
            <div
              className='w-12 h-12 border border-stone-800 rounded-full'
              style={{ backgroundColor: storefront?.style?.reviewBackground }}
            ></div>
          </div>
        </div>
      </div>
      <DesignPreviewMobile
        pageBG={storefront?.style?.pageBackground}
        cardBG={storefront?.style?.cardBackground}
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
