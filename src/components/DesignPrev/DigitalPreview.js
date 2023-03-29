import React from 'react';
import moment from 'moment';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

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
            className='w-full border rounded'
            style={{ borderColor: borderColor }}
            src={itemAndReviews?.item?.coverImage?.url}
          />
        </div>

        <div
          className='w-3/6 flex flex-col pl-6'
          style={{ backgroundColor: pageBG }}
        >
          <h2 className='text-2xl font-medium' style={{ color: pageText }}>
            {itemAndReviews?.item?.title}
          </h2>
          <p className='text-xl mt-2 w-full' style={{ color: pageText }}>
            {itemAndReviews?.item?.description}
          </p>
          {itemAndReviews?.item?.digitalType === 'video' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
              <p>Video Course</p>
              <MdOutlineVideoLibrary className='ml-2 text-2xl' />
            </div>
          ) : itemAndReviews?.item?.digitalType === 'ebook' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
              <p>E-Book</p>
              <HiOutlineBookOpen className='ml-2 text-2xl' />
            </div>
          ) : itemAndReviews?.item?.digitalType === 'podcast' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
              <p>Podcast</p>
              <BsFillMicFill className='ml-2 text-2xl' />
            </div>
          ) : itemAndReviews?.item?.digitalType === 'template' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
              <p>Template</p>
              <HiOutlineTemplate className='ml-2 text-2xl' />
            </div>
          ) : itemAndReviews?.item?.digitalType === 'other' ? (
            <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
              <p>Digital Media</p>
              <MdOutlinePermMedia className='ml-2 text-2xl' />
            </div>
          ) : (
            <div className='flex items-center justify-center border-2 border-slate-800  rounded w-5/12 h-8 mt-2'>
              <p>Printables</p>
              <MdLocalPrintshop className='ml-2 text-2xl' />
            </div>
          )}

          <form>
            <div className='w-full flex items-center mt-2'>
              <p
                className='text-3xl font-medium mr-2'
                style={{ color: pageText }}
              >
                $
                {itemAndReviews?.item?.payChoice
                  ? `${itemAndReviews?.item?.price.toFixed(0)} +`
                  : itemAndReviews?.item?.price.toFixed(0)}
              </p>

              <Rating
                value={itemAndReviews?.totalRating}
                precision={0.5}
                readOnly
                size='small'
              />
              <p className='ml-2 text-sm' style={{ color: pageText }}>
                ({itemAndReviews?.reviews?.length}){' '}
                {itemAndReviews?.reviews?.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>

            <div className='flex justify-between w-full items-center mt-2'>
              {itemAndReviews?.item?.payChoice ? (
                <div className='flex flex-col w-full'>
                  <p className='text-sm'>Set your price</p>
                  <div className='w-full flex'>
                    <div className='flex flex-col w-3/12'>
                      <input
                        type='number'
                        className='border-2 mr-2 rounded h-8 bg-transparent p-2 outline outline-0'
                        style={{
                          borderColor: borderColor,
                          WebkitAppearance: 'none',
                          MozAppearance: 'textfield',
                        }}
                        placeholder={`$${itemAndReviews?.item?.suggestedPrice} +`}
                        min={itemAndReviews?.item?.price}
                      />
                    </div>
                    <button
                      type='button'
                      disabled
                      className='w-9/12 text-xl h-8 border-2 border-slate-800 rounded'
                      style={{
                        color: buttonTextColor,
                        backgroundColor: btnStyle,
                        borderColor: buttonColor,
                      }}
                    >
                      {itemAndReviews?.item?.callToAction === 'buy'
                        ? 'Buy Now'
                        : itemAndReviews?.item?.callToAction === 'want'
                        ? 'I want this!'
                        : 'Get Now'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type='button'
                  disabled
                  className='w-full text-xl h-10 border-2 border-slate-800 rounded'
                  style={{
                    color: buttonTextColor,
                    backgroundColor: btnStyle,
                    borderColor: buttonColor,
                  }}
                >
                  {itemAndReviews?.item?.callToAction === 'buy'
                    ? 'Buy Now'
                    : itemAndReviews?.item?.callToAction === 'want'
                    ? 'I want this!'
                    : 'Get Now'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Other stuff for the item */}
      <div className='mt-10'>
        <div className='w-full border-b' style={{ borderColor: borderColor }}>
          <p className='text-lg' style={{ color: headerColor }}>
            Description
          </p>
        </div>
        {itemAndReviews?.item?.info === '' ? (
          <div
            style={{ borderColor: borderColor }}
            className='w-full h-44 mt-4 border-2 rounded flex justify-center items-center'
          >
            <p className='font-medium text-xl' style={{ color: pageText }}>
              A product description has not been added!
            </p>
          </div>
        ) : (
          <div className=''>
            <ReactQuill
              value={itemAndReviews?.item?.info}
              readOnly={true}
              theme={'bubble'}
            />
          </div>
        )}

        <div
          className='w-full border-b mt-4'
          style={{ borderColor: borderColor }}
        >
          <p className='text-lg' style={{ color: headerColor }}>
            Questions
          </p>
        </div>

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
                Customer questions have not been added!
              </p>
            </div>
          )}
        </div>

        <div
          className='w-full border-b mt-4'
          style={{ borderColor: borderColor }}
        >
          <p className='text-lg' style={{ color: headerColor }}>
            Reviews
          </p>
        </div>
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
              Item has not been reviewed!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalPreview;
