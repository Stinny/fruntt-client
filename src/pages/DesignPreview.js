import React from 'react';
import { useGetProductsQuery } from '../api/productsApiSlice';
import { AiFillStar } from 'react-icons/ai';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
} from 'react-icons/ai';
import Spinner from '../components/Spinner';

//mui
import Alert from '@mui/material/Alert';

const DesignPreview = ({
  pageBG,
  itemDetailsBG,
  navbarBG,
  buttonBG,
  buttonTextColor,
  pageText,
  footerBG,
  storefrontId,
}) => {
  const { data: item, isLoading, isSuccess } = useGetProductsQuery();

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <div
        className='w-full mx-auto h-fit border'
        style={{ backgroundColor: pageBG }}
      >
        {/* Navabar */}
        <div
          className='w-full h-14 mb-10 mx-auto'
          style={{ backgroundColor: navbarBG }}
        >
          <div className='w-11/12 h-full flex items-center mx-auto'>
            <h2>LOGO</h2>
          </div>
        </div>

        <div className='p-10'>
          <div
            className='w-full flex justify-between mx-auto'
            style={{ backgroundColor: pageBG }}
          >
            <div className='w-3/6'>
              <img className='w-11/12' src={item[0].images[2].url} />
            </div>

            <div className='w-3/6 flex flex-col pl-10'>
              <h2
                className='text-2xl font-medium w-11/12'
                style={{ color: pageText }}
              >
                {item[0].title}
              </h2>
              <p className='text-xl mt-4 w-11/12' style={{ color: pageText }}>
                {item[0].description}
              </p>
              <p
                className='text-4xl font-medium mt-4'
                style={{ color: pageText }}
              >
                ${item[0].price.toFixed(2)}
              </p>
              <form>
                <div className='w-8/12 flex items-center mt-4'>
                  <div className='flex justify-center items-center border-2 w-28 h-10 rounded-xl'>
                    <p>8/10</p>
                    <AiFillStar className='text-yellow-400' />
                  </div>
                  <p className='ml-2' style={{ color: pageText }}>
                    23 reviews
                  </p>
                </div>

                <div className='flex justify-between w-11/12 items-center mt-4'>
                  <select className='rounded-xl border-2 bg-transparent w-12 h-10'>
                    <option value={1}>1</option>
                  </select>

                  <button
                    type='button'
                    disabled
                    className='w-10/12 h-10 text-2xl border-2 border-slate-800 rounded'
                  >
                    Buy Now
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Other stuff for the item */}
          <div className='mt-10'>
            <p className='text-2xl' style={{ color: pageText }}>
              FAQs
            </p>
            <div className='w-full h-32 mt-4 border-2 rounded flex justify-center items-center'>
              <p className='font-medium text-xl' style={{ color: pageText }}>
                FAQs have been asked yet!
              </p>
            </div>
            <p className='text-2xl mt-4' style={{ color: pageText }}>
              Customer Reviews
            </p>
            <div className='w-full h-32 mt-4 border-2 rounded flex justify-center items-center'>
              <p className='font-medium text-xl' style={{ color: pageText }}>
                Item has not been reviewed yet!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className='w-full h-28 mt-24 flex items-center justify-center'
          style={{ backgroundColor: footerBG }}
        >
          <div
            className='flex w-40 justify-between text-4xl'
            style={{ backgroundColor: footerBG }}
          >
            <AiOutlineFacebook className='text-gray-400 hover:text-blue-400' />
            <AiOutlineInstagram className='text-gray-400 hover:text-blue-400' />
            <AiOutlineYoutube className='text-gray-400 hover:text-blue-400' />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Alert severity='info' className='mt-2 mb-4'>
        This is just a preview and not your actual storefront. This is just so
        you can see the design changes you make before saving.
      </Alert>
      {content}
    </div>
  );
};

export default DesignPreview;
