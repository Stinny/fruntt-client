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
import moment from 'moment';

//mui
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import { useGetReviewsAndProductQuery } from '../api/customersApiSlice';

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
  headerColor,
  borderColor,
  socialIcons,
  faqBackground,
  reviewBackground,
}) => {
  // const { data: item, isLoading, isSuccess, refetch } = useGetProductsQuery();

  const {
    data: itemAndReviews,
    isLoading,
    isSuccess,
    refetch,
  } = useGetReviewsAndProductQuery({ storeId: storefront._id });

  useEffect(() => {
    refetch();
  }, []);

  const btnStyle = buttonStyle === 'filled' ? buttonColor : '';

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    console.log(itemAndReviews);
    content = (
      <div
        className='w-full h-full mx-auto border'
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
              <h2 style={{ color: pageText }} className='text-2xl font-medium'>
                {storefront?.name}
              </h2>
            )}
          </div>
        </div>

        {Object.entries(itemAndReviews?.item).length > 0 ? (
          <div className='p-14'>
            <div
              className='w-full flex justify-between mx-auto'
              style={{ backgroundColor: pageBG }}
            >
              <div className='w-3/6'>
                <img
                  className='w-11/12'
                  src={itemAndReviews?.item?.images[0].url}
                />
              </div>

              <div className='w-3/6 flex flex-col pl-10'>
                <h2
                  className='text-2xl font-medium w-11/12'
                  style={{ color: pageText }}
                >
                  {itemAndReviews?.item?.title}
                </h2>
                <p className='text-xl mt-4 w-11/12' style={{ color: pageText }}>
                  {itemAndReviews?.item?.description}
                </p>
                <p
                  className='text-4xl font-medium mt-4'
                  style={{ color: pageText }}
                >
                  ${itemAndReviews?.item?.price.toFixed(2)}
                </p>
                {itemAndReviews?.item?.options?.length > 0
                  ? itemAndReviews.item.options.map((option) => (
                      <>
                        <p>{option.name}</p>
                        <select className='rounded-md border-2 w-32 h-10 mt-2'>
                          <option>{option.values[0]}</option>
                        </select>
                      </>
                    ))
                  : ''}
                <form>
                  <div className='w-8/12 flex items-center mt-4'>
                    <Rating
                      value={itemAndReviews?.totalRating}
                      precision={0.5}
                      readOnly
                    />
                    <p className='ml-2' style={{ color: pageText }}>
                      ({itemAndReviews?.reviews?.length}){' '}
                      {itemAndReviews?.reviews?.length === 1
                        ? 'review'
                        : 'reviews'}
                    </p>
                  </div>

                  <div className='flex justify-between w-11/12 items-center mt-4'>
                    <div className='flex items-center'>
                      <p style={{ color: pageText }}>Qty:</p>
                      <select
                        className='rounded-xl border-2 bg-transparent w-12 h-10 ml-2'
                        style={{ color: pageText, borderColor: borderColor }}
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
              <p className='text-2xl' style={{ color: headerColor }}>
                Customer questions
              </p>

              <div className='mt-2'>
                {itemAndReviews?.item?.faqs?.length ? (
                  itemAndReviews?.item?.faqs.map((faq) => (
                    <div
                      className='flex flex-col rounded p-2 mb-2'
                      style={{
                        backgroundColor: faqBackground,
                      }}
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
                    style={{ borderColor: borderColor }}
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

              <p className='text-2xl mt-4' style={{ color: headerColor }}>
                Customer Reviews
              </p>
              {itemAndReviews?.reviews?.length > 0 ? (
                itemAndReviews?.reviews.map((review) => (
                  <div
                    className='flex flex-col bg-gray-200 p-4 rounded mt-2'
                    style={{
                      backgroundColor: reviewBackground,
                    }}
                  >
                    <div className='flex w-3/12'>
                      <p
                        className='font-medium mr-2'
                        style={{ color: storefront?.style?.pageText }}
                      >
                        {review?.customerName}
                      </p>
                      <p style={{ color: storefront?.style?.pageText }}>
                        {moment(review?.reviewedOn).format('MMM D, YYYY')}
                      </p>
                    </div>

                    <Rating
                      value={review.rating}
                      readOnly
                      size='medium'
                      className='mt-2'
                      precision={0.5}
                    />
                    <p
                      className='mt-2'
                      style={{ color: storefront?.style?.pageText }}
                    >
                      {review.review}
                    </p>
                  </div>
                ))
              ) : (
                <div
                  style={{ borderColor: borderColor }}
                  className='w-full h-32 mt-4 border-2 rounded flex justify-center items-center'
                >
                  <p
                    className='font-medium text-xl'
                    style={{ color: pageText }}
                  >
                    Item has not been reviewed yet!
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='w-full mx-auto'>
            <div
              className='mx-auto w-9/12 border-2 rounded flex flex-col justify-center items-center'
              style={{ borderColor: storefront?.style?.borderColor }}
            >
              <div className='h-60'></div>
              <p
                className='font-medium text-lg'
                style={{ borderColor: storefront?.style?.pageText }}
              >
                This single item storefront is empty
              </p>
              <Link
                to='/dashboard/item/add'
                className='border-2 rounded border-slate-800 text-slate-800 w-28 hover:bg-slate-800 hover:text-white mt-2 flex items-center justify-center'
              >
                + Add item
              </Link>
              <div className='h-60'></div>
            </div>
          </div>
        )}

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
    );
  }
  return (
    <div className='w-9/12 h-fit'>
      <Alert severity='info' className='mt-2 mb-4'>
        This is just a preview, not your actual storefront. This is just so you
        can see the design changes before you decide to save.
      </Alert>
      {content}
    </div>
  );
};

export default DesignPreview;
