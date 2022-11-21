import React from 'react';
import moment from 'moment';

//mui
import Rating from '@mui/material/Rating';

const AliItemPrev = ({
  item,
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
  const btnStyle = buttonStyle === 'filled' ? buttonColor : '';

  return (
    <div className='p-4'>
      <div
        className='w-full flex justify-between items-center'
        style={{ backgroundColor: pageBG }}
      >
        <div className='w-3/6'>
          <img className='w-full' src={item?.aliImages[0]} />
        </div>

        <div className='w-3/6 flex flex-col ml-2'>
          <h2
            className='text-2xl font-medium w-11/12'
            style={{ color: pageText }}
          >
            {item?.title}
          </h2>
          <p className='text-xl mt-4 w-11/12' style={{ color: pageText }}>
            {item?.description}
          </p>
          <p
            className='text-4xl font-medium mt-4 mb-2'
            style={{ color: pageText }}
          >
            ${item?.price.toFixed(2)}
          </p>
          {item?.options?.length > 0
            ? item.options.map((option) => (
                <>
                  <p>{option.name}</p>
                  <select className='rounded-md border-2 w-8/12 h-10'>
                    <option>{option.values[0].name}</option>
                  </select>
                </>
              ))
            : ''}
          <form>
            <div className='w-8/12 flex items-center mt-4'>
              <Rating value={item?.aliRating} precision={0.1} readOnly />
              <p className='ml-2' style={{ color: pageText }}>
                ({item?.aliReviews?.length}){' '}
                {item?.aliReviews?.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <div className='flex justify-between w-full items-center mt-4'>
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
                className='w-9/12 h-10 text-2xl border-2 border-slate-800 rounded ml-2'
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
          {item?.faqs?.length ? (
            item?.faqs.map((faq) => (
              <div
                className='flex flex-col rounded p-2 mb-2'
                style={{
                  backgroundColor: faqBackground,
                }}
              >
                <p style={{ color: pageText }}>
                  <span className='font-medium' style={{ color: pageText }}>
                    Question:
                  </span>{' '}
                  {faq.question}
                </p>
                <p className='mt-2' style={{ color: pageText }}>
                  <span className='font-medium' style={{ color: pageText }}>
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
              <p className='font-medium text-xl' style={{ color: pageText }}>
                Customer questions have not been posted yet!
              </p>
            </div>
          )}
        </div>

        <p className='text-2xl mt-4' style={{ color: headerColor }}>
          Customer Reviews({item?.aliReviews.length})
        </p>
        {item?.aliReviews?.length > 0 ? (
          <div className='flex flex-col h-56 overflow-y-scroll'>
            {item?.aliReviews.map((review) => (
              <div
                className='flex flex-col bg-gray-200 p-4 rounded mt-2'
                style={{
                  backgroundColor: reviewBackground,
                }}
              >
                <div className='flex w-4/12'>
                  <p style={{ color: pageText }}>
                    {moment(review?.date).format('MMM D, YYYY')}
                  </p>
                </div>

                <Rating
                  value={review.rating}
                  readOnly
                  size='medium'
                  className='mt-2'
                  precision={0.5}
                />
                <p className='mt-2' style={{ color: pageText }}>
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{ borderColor: borderColor }}
            className='w-full h-32 mt-4 border-2 rounded flex justify-center items-center'
          >
            <p className='font-medium text-xl' style={{ color: pageText }}>
              Item has not been reviewed yet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AliItemPrev;
