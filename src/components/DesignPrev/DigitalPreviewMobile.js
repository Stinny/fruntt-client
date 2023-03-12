import React from 'react';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';

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
  const contentState = convertFromRaw(JSON.parse(itemAndReviews?.item?.info));

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
          <p
            className='text-2xl font-medium w-full'
            style={{ color: pageText }}
          >
            {itemAndReviews?.item?.title}
          </p>
          <p className='text-lg w-full' style={{ color: pageText }}>
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
          <div className='flex items-center mt-2'>
            <p className='text-2xl font-medium' style={{ color: pageText }}>
              ${itemAndReviews?.item?.price.toFixed(2)}
            </p>
            <div className='w-8/12 flex ml-4'>
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
          </div>

          <form>
            <div className='flex justify-between w-full items-center mt-4'>
              <button
                type='button'
                disabled
                className='w-full h-10 border-2 border-slate-800 rounded'
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
        <div className='mt-2 pl-2 pr-2'>
          <div className='w-full border-b' style={{ borderColor: borderColor }}>
            <p className='text-xl' style={{ color: headerColor }}>
              Description
            </p>
          </div>
          {contentState.hasText() ? (
            <div className=''>
              <Editor
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(itemAndReviews?.item?.info))
                )}
                readOnly={true}
                toolbarHidden
              />
            </div>
          ) : (
            <div
              style={{ borderColor: borderColor }}
              className='w-full h-44 mt-4 border-2 rounded flex justify-center items-center'
            >
              <p
                className='font-medium text-lg text-center'
                style={{ color: pageText }}
              >
                A product description has not been added!
              </p>
            </div>
          )}
        </div>

        <div className='mt-2 pl-2 pr-2'>
          <div className='w-full border-b' style={{ borderColor: borderColor }}>
            <p className='text-xl' style={{ color: headerColor }}>
              Customer questions
            </p>
          </div>
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
                Customer questions have not been added!
              </p>
            </div>
          )}
        </div>

        <div className='pl-2 pr-2'>
          <div className='w-full border-b' style={{ borderColor: borderColor }}>
            <p className='text-xl' style={{ color: headerColor }}>
              Customer reviews
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
              <p className='font-medium text-lg' style={{ color: pageText }}>
                Item has not been reviewed!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalPreviewMobile;
