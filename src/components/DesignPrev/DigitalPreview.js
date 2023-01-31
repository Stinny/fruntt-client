import React from 'react';
import moment from 'moment';

//mui
import Rating from '@mui/material/Rating';

const DigitalPreview = ({
  itemAndReviews,
  pageBG,
  buttonColor,
  buttonTextColor,
  buttonStyle,
  pageText,
  storefront,
  headerColor,
  borderColor,
  faqBackground,
  reviewBackground,
}) => {
  const btnStyle = buttonStyle === 'filled' ? buttonColor : '';

  return (
    <div className='p-14'>
      <div
        className='w-full flex justify-between mx-auto'
        style={{ backgroundColor: pageBG }}
      >
        <div className='w-3/6' style={{ backgroundColor: pageBG }}>
          <img
            className='w-11/12'
            src={itemAndReviews?.item?.coverImage?.url}
          />
        </div>

        <div
          className='w-3/6 flex flex-col pl-10'
          style={{ backgroundColor: pageBG }}
        >
          <h2
            className='text-2xl font-medium w-11/12'
            style={{ color: pageText }}
          >
            {itemAndReviews?.item?.title}
          </h2>
          <p className='text-xl mt-4 w-11/12' style={{ color: pageText }}>
            {itemAndReviews?.item?.description}
          </p>
          <p className='text-4xl font-medium mt-4' style={{ color: pageText }}>
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
                {itemAndReviews?.reviews?.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <div className='flex justify-between w-11/12 items-center mt-4'>
              <button
                type='button'
                disabled
                className='w-full h-10 text-2xl border-2 border-slate-800 rounded'
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
              <div className='flex w-4/12'>
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
            <p className='font-medium text-xl' style={{ color: pageText }}>
              Item has not been reviewed yet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalPreview;
