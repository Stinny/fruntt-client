import React, { useState } from 'react';
import SellerPro from './SellerPro';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsArrow90DegDown } from 'react-icons/bs';
import {
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

//mui
import Rating from '@mui/material/Rating';

const DesignDetailMobile = ({
  products,
  pageBG,
  cardBG,
  buttonColor,
  buttonTextColor,
  buttonStyle,
  reviewBackground,
  headerColor,
  pageText,
  borderColor,
  hideReviews,
  storefront,
  hideDescription,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const btnStyle = buttonStyle === 'filled' ? buttonColor : '';
  const customQuillClass = 'custom-quill';

  const handleSelectedProduct = (e) => {
    const productId = e.target.value;
    const selected = products.find((product) => product.item._id === productId);

    setSelectedProduct(selected);
  };

  return (
    <>
      <div
        className='w-full h-full mx-auto border p-2 rounded'
        style={{ backgroundColor: pageBG }}
      >
        <SellerPro
          pageBG={pageBG}
          cardBG={cardBG}
          pageText={pageText}
          borderColor={borderColor}
          headers={headerColor}
          handleSelectedProduct={handleSelectedProduct}
          selectedProduct={selectedProduct}
          products={products}
        />

        {products.length > 0 ? (
          <div
            className='border rounded bg-inherit drop-shadow-md mt-2 p-2'
            style={{ backgroundColor: cardBG, borderColor: borderColor }}
          >
            <div
              className='w-full flex flex-col mx-auto'
              style={{ backgroundColor: cardBG }}
            >
              <div className='w-full mx-auto'>
                <img
                  className='w-full rounded'
                  src={selectedProduct?.item?.coverImage?.url}
                />
              </div>

              <div
                className='w-full flex flex-col p-2'
                style={{
                  backgroundColor: cardBG,
                }}
              >
                <p
                  className='text-2xl font-medium w-full'
                  style={{ color: pageText }}
                >
                  {selectedProduct?.item?.title}
                </p>
                <p className='text-lg w-full' style={{ color: pageText }}>
                  {selectedProduct?.item?.description}
                </p>
                {selectedProduct?.item?.digitalType === 'video' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
                    <p>Video Course</p>
                    <MdOutlineVideoLibrary className='ml-2 text-2xl' />
                  </div>
                ) : selectedProduct?.item?.digitalType === 'ebook' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
                    <p>E-Book</p>
                    <HiOutlineBookOpen className='ml-2 text-2xl' />
                  </div>
                ) : selectedProduct?.item?.digitalType === 'podcast' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
                    <p>Podcast</p>
                    <BsFillMicFill className='ml-2 text-2xl' />
                  </div>
                ) : selectedProduct?.item?.digitalType === 'template' ? (
                  <div className='flex items-center justify-center border-2 border-slate-800 rounded w-5/12 h-8 mt-2'>
                    <p>Template</p>
                    <HiOutlineTemplate className='ml-2 text-2xl' />
                  </div>
                ) : selectedProduct?.item?.digitalType === 'other' ? (
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
                <div
                  className='flex items-center mt-2'
                  style={{
                    backgroundColor: cardBG,
                  }}
                >
                  <p
                    className='text-2xl font-medium'
                    style={{ color: pageText }}
                  >
                    ${selectedProduct?.item?.price.toFixed(2)}
                  </p>
                  <div className='w-8/12 flex ml-4'>
                    <Rating
                      value={selectedProduct?.totalRating}
                      precision={0.5}
                      readOnly
                    />
                    <p className='ml-2' style={{ color: pageText }}>
                      ({selectedProduct?.reviews?.length}){' '}
                      {selectedProduct?.reviews?.length === 1
                        ? 'review'
                        : 'reviews'}
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
                <div
                  className='w-full border-b'
                  style={{ borderColor: borderColor }}
                >
                  <p className='text-xl' style={{ color: headerColor }}>
                    Description
                  </p>
                </div>
                {selectedProduct?.item?.info === '' ? (
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
                ) : (
                  <div className=''>
                    <ReactQuill
                      value={selectedProduct?.item?.info}
                      readOnly={true}
                      theme={'bubble'}
                    />
                  </div>
                )}
              </div>

              {/* <div className='mt-2 pl-2 pr-2'>
                <div
                  className='w-full border-b'
                  style={{ borderColor: borderColor }}
                >
                  <p className='text-xl' style={{ color: headerColor }}>
                    Questions
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
                      style={{ pageText }}
                    >
                      Customer questions have not been added!
                    </p>
                  </div>
                )}
              </div> */}

              {storefront?.hideReviews ? (
                ''
              ) : (
                <div className='pl-2 pr-2'>
                  <div
                    className='w-full border-b'
                    style={{ borderColor: borderColor }}
                  >
                    <p className='text-xl' style={{ color: headerColor }}>
                      Reviews
                    </p>
                  </div>
                  {selectedProduct?.reviews?.length > 0 ? (
                    selectedProduct?.reviews.map((review) => (
                      <div
                        className='flex flex-col bg-gray-200 p-4 rounded mt-2'
                        style={{
                          backgroundColor: reviewBackground,
                        }}
                      >
                        <div className='flex w-4/12'>
                          <p
                            className='font-medium mr-2'
                            style={{ color: pageText }}
                          >
                            {review?.customerName}
                          </p>
                          <p style={{ color: pageText }}>
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
                      style={{
                        backgroundColor: reviewBackground,
                      }}
                      className='w-full h-32 mt-4 rounded flex justify-center items-center'
                    >
                      <p
                        className='font-medium text-md'
                        style={{ color: pageText }}
                      >
                        Product has not been reviewed!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='w-full mx-auto p-2'>
            <div
              className='mx-auto w-full border rounded flex flex-col justify-center items-center bg-inherit drop-shadow-md'
              style={{
                borderColor: storefront?.style?.borderColor,
                backgroundColor: storefront?.style?.cardBackground,
              }}
            >
              <div className='h-60'></div>
              <p
                className='font-medium text-lg'
                style={{ borderColor: storefront?.style?.pageText }}
              >
                This product page is empty
              </p>
              <Link
                to='/dashboard/item/add'
                className='border-2 rounded border-slate-800 text-slate-800 w-24 h-10 hover:bg-slate-800 hover:text-white mt-2 flex items-center justify-center'
              >
                + Add
              </Link>
              <div className='h-60'></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DesignDetailMobile;
