import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../api/productsApiSlice';
import { AiFillStar } from 'react-icons/ai';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

//mui
import Alert from '@mui/material/Alert';

const DesignPreview = ({
  pageBG,
  navbarBG,
  buttonColor,
  buttonTextColor,
  buttonStyle,
  pageText,
  footerBG,
  storefront,
  hideNav,
  hideFooter,
  socialIcons,
}) => {
  const { data: item, isLoading, isSuccess, refetch } = useGetProductsQuery();

  useEffect(() => {
    refetch();
  }, []);

  const btnStyle = buttonStyle === 'filled' ? buttonColor : '';

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content =
      item.length > 0 ? (
        <div
          className='w-full mx-auto h-fit border'
          style={{ backgroundColor: pageBG }}
        >
          {/* Navabar */}
          <div
            className='w-full h-14 mb-10 mx-auto'
            style={{
              backgroundColor: navbarBG,
              display: hideNav ? 'none' : '',
            }}
          >
            <div className='w-11/12 h-full flex items-center mx-auto'>
              {storefront?.logo?.url ? (
                <img src={storefront?.logo?.url} className='h-10' />
              ) : (
                <h2
                  style={{ color: pageText }}
                  className='text-2xl font-medium'
                >
                  {storefront?.name}
                </h2>
              )}
            </div>
          </div>

          <div className='p-14'>
            <div
              className='w-full flex justify-between mx-auto'
              style={{ backgroundColor: pageBG }}
            >
              <div className='w-3/6'>
                <img className='w-11/12' src={item[0].images[0].url} />
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
                      <p style={{ color: pageText }}>8/10</p>
                      <AiFillStar className='text-yellow-400' />
                    </div>
                    <p className='ml-2' style={{ color: pageText }}>
                      23 reviews
                    </p>
                  </div>

                  <div className='flex justify-between w-11/12 items-center mt-4'>
                    <div className='flex items-center'>
                      <p style={{ color: pageText }}>Qty:</p>
                      <select
                        className='rounded-xl border-2 bg-transparent w-12 h-10 ml-2'
                        style={{ color: pageText }}
                      >
                        <option value={1}>1</option>
                      </select>
                    </div>

                    <button
                      type='button'
                      disabled
                      className='w-9/12 h-10 text-2xl border-2 border-slate-800 rounded'
                      style={{
                        color: buttonTextColor,
                        backgroundColor: btnStyle,
                        borderColor: buttonColor,
                      }}
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
                Customer questions
              </p>

              <div className='mt-2'>
                {item[0]?.faqs.length ? (
                  item[0]?.faqs.map((faq) => (
                    <div
                      className='flex flex-col border-2 rounded p-2 mb-2'
                      style={{ borderColor: storefront?.style?.pageText }}
                    >
                      <p style={{ color: storefront?.style?.pageText }}>
                        <span
                          className='font-medium'
                          style={{ color: storefront?.style?.pageText }}
                        >
                          Question:
                        </span>{' '}
                        {faq.question}
                      </p>
                      <p
                        className='mt-2'
                        style={{ color: storefront?.style?.pageText }}
                      >
                        <span
                          className='font-medium'
                          style={{ color: storefront?.style?.pageText }}
                        >
                          Answer:
                        </span>{' '}
                        {faq.answer}
                      </p>
                    </div>
                  ))
                ) : (
                  <div
                    style={{ borderColor: storefront?.style?.pageText }}
                    className='w-full h-32 mt-4 border-2 rounded flex justify-center items-center'
                  >
                    <p
                      className='font-medium text-xl'
                      style={{ color: storefront?.style?.pageText }}
                    >
                      Customer questions have not been posted yet!
                    </p>
                  </div>
                )}
              </div>

              <p className='text-2xl mt-4' style={{ color: pageText }}>
                Customer Reviews
              </p>
              <div
                style={{ borderColor: pageText }}
                className='w-full h-32 mt-4 border-2 rounded flex justify-center items-center'
              >
                <p className='font-medium text-xl' style={{ color: pageText }}>
                  Item has not been reviewed yet!
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className='w-full h-28 mt-24 flex items-center justify-center'
            style={{
              backgroundColor: footerBG,
              display: hideFooter ? 'none' : '',
            }}
          >
            <div
              className='flex w-44 justify-between text-4xl'
              style={{
                backgroundColor: footerBG,
              }}
            >
              {storefront.links.facebook && (
                <AiOutlineFacebook
                  style={{ color: socialIcons }}
                  className='text-gray-400 hover:text-blue-400'
                />
              )}

              {storefront.links.instagram && (
                <AiOutlineInstagram
                  style={{ color: socialIcons }}
                  className='text-gray-400 hover:text-blue-400'
                />
              )}

              {storefront.links.twitter && (
                <AiOutlineTwitter
                  style={{ color: socialIcons }}
                  className='text-gray-400 hover:text-blue-400'
                />
              )}

              {storefront.links.youtube && (
                <AiOutlineYoutube
                  style={{ color: socialIcons }}
                  className='text-gray-400 hover:text-blue-400'
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-72 border-2 rounded mt-4 flex flex-col justify-center items-center'>
          <p>
            An item has not been added to this Fruntt yet. Add an item to
            preview your styles.
          </p>
          <Link to='/dashboard/item'>
            <button className='h-10 w-28 border-2 rounded border-slate-800 mt-4'>
              Add item +
            </button>
          </Link>
        </div>
      );
  }
  return (
    <div>
      <Alert severity='info' className='mt-2 mb-4'>
        This is just a preview, not your actual storefront. This is just so you
        can see the design changes before you decide to save.
      </Alert>
      {content}
    </div>
  );
};

export default DesignPreview;
