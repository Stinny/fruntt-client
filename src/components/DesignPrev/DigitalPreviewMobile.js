import React from 'react';
import moment from 'moment';

//mui
import Rating from '@mui/material/Rating';

const DigitalPreviewMobile = ({
  itemAndReviews,
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
    <div className=''>
      <div
        className='w-full flex flex-col mx-auto'
        style={{ backgroundColor: pageBG }}
      >
        <div className='w-full mx-auto'>
          <img className='w-full' src={itemAndReviews?.item?.coverImage?.url} />
        </div>

        <div className='w-full flex flex-col p-2'>
          <h2
            className='text-xl font-medium w-full'
            style={{ color: pageText }}
          >
            {itemAndReviews?.item?.title}
          </h2>
          <p className='text-lg w-11/12' style={{ color: pageText }}>
            {itemAndReviews?.item?.description}
          </p>
          <p className='text-xl font-medium' style={{ color: pageText }}>
            ${itemAndReviews?.item?.price.toFixed(2)}
          </p>
          {itemAndReviews?.item?.options?.length > 0
            ? itemAndReviews.item.options.map((option) => (
                <>
                  <p>{option.name}</p>
                  <select className='rounded-md border-2 w-9/12 h-10 mt-2'>
                    <option>{option.values[0]}</option>
                  </select>
                </>
              ))
            : ''}
          <form>
            <div className='w-8/12 flex mt-2'>
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

            <div className='flex justify-between w-full items-center mt-4'>
              <button
                type='button'
                disabled
                className='w-full h-10 ml-2 border-2 border-slate-800 rounded'
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
        <p className='text-xl' style={{ color: headerColor }}>
          Customer questions
        </p>

        <div className='mt-2 pl-2 pr-2'>
          {itemAndReviews?.item?.faqs?.length ? (
            itemAndReviews?.item?.faqs.map((faq) => (
              <div
                className='flex flex-col rounded p-2 mb-2'
                style={{
                  backgroundColor: faqBackground,
                }}
              >
                <p
                  style={{ color: storefront?.style?.pageText }}
                  className='text-sm'
                >
                  <span
                    className='font-medium'
                    style={{ color: storefront?.style?.pageText }}
                  >
                    Question:
                  </span>{' '}
                  {faq.question}
                </p>
                <p
                  className='mt-2 text-sm'
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
              className='w-full h-32 mt-4 border-2 rounded flex justify-center items-center p-4'
            >
              <p
                className='font-medium text-lg text-center'
                style={{ color: storefront?.style?.pageText }}
              >
                Customer questions have not been posted yet!
              </p>
            </div>
          )}
        </div>

        <p className='text-xl mt-4' style={{ color: headerColor }}>
          Customer Reviews
        </p>
        <div className='pl-2 pr-2'>
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
              <p className='font-medium text-lg' style={{ color: pageText }}>
                Item has not been reviewed yet!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalPreviewMobile;
