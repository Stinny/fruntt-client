import React, { useState } from 'react';
import {
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import SellerPro from './SellerPro';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BsArrow90DegDown } from 'react-icons/bs';

//mui
import Rating from '@mui/material/Rating';

const DesignDetail = ({
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
      <div className='w-full flex justify-between items-center mb-2 mt-2'>
        <div className='flex flex-col'>
          <select
            onChange={handleSelectedProduct}
            className='w-full h-14 rounded p-2 mt-1'
            value={selectedProduct ? selectedProduct?.item?._id : ''}
          >
            {products.map((prod) => (
              <option value={prod?.item?._id}>{prod?.item?.title}</option>
            ))}
          </select>
        </div>
        <div className='flex items-center mt-6'>
          <BsArrow90DegDown className='text-xl mt-2' />
          <p className='font-medium text-2xl'>Preview product page</p>
        </div>
      </div>
      <div
        className='w-full h-full mx-auto border p-10 rounded'
        style={{ backgroundColor: pageBG }}
      >
        <SellerPro
          pageBG={pageBG}
          cardBG={cardBG}
          pageText={pageText}
          borderColor={borderColor}
          headers={headerColor}
        />

        {products.length > 0 ? (
          <div
            className='p-10 border rounded mt-10 bg-inherit drop-shadow-lg'
            style={{ borderColor: borderColor, backgroundColor: cardBG }}
          >
            <div
              className='w-full flex justify-between mx-auto'
              style={{ backgroundColor: cardBG }}
            >
              <div className='w-3/6' style={{ backgroundColor: cardBG }}>
                <img
                  className='w-full border rounded'
                  style={{ borderColor: borderColor }}
                  src={selectedProduct?.item?.coverImage?.url}
                />
              </div>

              <div
                className='w-3/6 flex flex-col pl-6'
                style={{ backgroundColor: cardBG }}
              >
                <h2
                  className='text-2xl font-medium'
                  style={{ color: pageText }}
                >
                  {selectedProduct?.item?.title}
                </h2>
                <p className='text-xl mt-2 w-full' style={{ color: pageText }}>
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

                <form>
                  <div className='w-full flex items-center mt-2'>
                    <p
                      className='text-3xl font-medium mr-2'
                      style={{ color: pageText }}
                    >
                      $
                      {selectedProduct?.item?.payChoice
                        ? `${selectedProduct?.item?.price.toFixed(0)} +`
                        : selectedProduct?.item?.price.toFixed(0)}
                    </p>

                    <Rating
                      value={selectedProduct?.totalRating}
                      precision={0.5}
                      readOnly
                      size='small'
                    />
                    <p className='ml-2 text-sm' style={{ color: pageText }}>
                      ({selectedProduct?.reviews?.length}){' '}
                      {selectedProduct?.reviews?.length === 1
                        ? 'review'
                        : 'reviews'}
                    </p>
                  </div>

                  <div className='flex justify-between w-full items-center mt-2'>
                    {selectedProduct?.item?.payChoice ? (
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
                              placeholder={`$${selectedProduct?.item?.suggestedPrice} +`}
                              min={selectedProduct?.item?.price}
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
                            {selectedProduct?.item?.callToAction === 'buy'
                              ? 'Buy Now'
                              : selectedProduct?.item?.callToAction === 'want'
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
                        {selectedProduct?.item?.callToAction === 'buy'
                          ? 'Buy Now'
                          : selectedProduct?.item?.callToAction === 'want'
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
              {hideDescription ? (
                ''
              ) : (
                <>
                  <div
                    className='w-full border-b'
                    style={{ borderColor: borderColor }}
                  >
                    <p className='text-lg' style={{ color: headerColor }}>
                      Description
                    </p>
                  </div>
                  {selectedProduct?.item?.info === '' ? (
                    <div
                      style={{ borderColor: borderColor }}
                      className='w-full h-44 mt-4 border-2 rounded flex justify-center items-center'
                    >
                      <p
                        className='font-medium text-xl'
                        style={{ color: pageText }}
                      >
                        No description had been added!
                      </p>
                    </div>
                  ) : (
                    <div className=''>
                      <ReactQuill
                        value={selectedProduct?.item?.info}
                        readOnly={true}
                        theme={'bubble'}
                        className={customQuillClass}
                      />
                    </div>
                  )}
                </>
              )}

              {hideReviews ? (
                ''
              ) : (
                <>
                  <div
                    className='w-full border-b mt-4'
                    style={{ borderColor: borderColor }}
                  >
                    <p className='text-lg' style={{ color: headerColor }}>
                      Reviews
                    </p>
                  </div>
                  {selectedProduct?.reviews?.length > 0 ? (
                    selectedProduct?.reviews.map((review) => (
                      <div
                        className='flex flex-col bg-gray-200 p-4 rounded mt-2 relative'
                        style={{
                          backgroundColor: reviewBackground,
                        }}
                      >
                        <div className='absolute right-0 mr-2'>
                          <p style={{ color: storefront?.style?.pageText }}>
                            {moment(review?.reviewedOn).format('MMM D, YYYY')}
                          </p>
                        </div>
                        <div className='flex items-center w-72'>
                          <p
                            className='font-medium mr-2'
                            style={{ color: storefront?.style?.pageText }}
                          >
                            {review?.name}
                          </p>
                          <Rating
                            value={review.rating}
                            readOnly
                            size='small'
                            precision={0.5}
                          />
                        </div>

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
                      style={{ backgroundColor: reviewBackground }}
                      className='w-full h-32 mt-4 rounded flex justify-center items-center'
                    >
                      <p
                        className='font-medium text-lg'
                        style={{ color: pageText }}
                      >
                        Item has not been reviewed!
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className='w-full mx-auto mt-4'>
            <div
              className='mx-auto w-full border rounded flex flex-col justify-center items-center drop-shadow-md bg-inherit'
              style={{ borderColor: borderColor, backgroundColor: cardBG }}
            >
              <div className='h-60'></div>
              <p
                className='font-medium text-lg text-stone-800'
                style={{ color: pageText }}
              >
                This product page is empty
              </p>
              <Link
                to='/dashboard/item'
                className='border-2 rounded border-stone-800 text-stone-800 w-36 h-10 hover:bg-stone-800 hover:text-white mt-2 flex items-center justify-center'
              >
                + Add product
              </Link>
              <div className='h-60'></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DesignDetail;
