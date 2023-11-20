import React, { useState } from 'react';
import {
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import SellerPro from './SellerPro';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

//mui
import Rating from '@mui/material/Rating';
import HomeDetail from './HomeDetail';

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
  price,
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
      <div>
        <Tabs>
          <TabList>
            <Tab>Home page</Tab>
            <Tab>Product page</Tab>
          </TabList>

          <TabPanel>
            <HomeDetail
              products={products}
              pageBG={pageBG}
              price={price}
              cardBG={cardBG}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
              buttonStyle={buttonStyle}
              storefrontId={storefront?._id}
              headerColor={headerColor}
              borderColor={borderColor}
              storefront={storefront}
              reviewBackground={reviewBackground}
              hideReviews={hideReviews}
              hideDescription={hideDescription}
              selectedProduct={selectedProduct}
            />
          </TabPanel>

          <TabPanel>
            <div
              className='w-full h-full mx-auto p-10 mt-1 rounded border drop-shadow-lg'
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
                  className='p-10 border rounded mt-10 bg-inherit drop-shadow-lg max-w-6xl mx-auto'
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
                      <p
                        className='text-xl font-medium'
                        style={{ color: pageText }}
                      >
                        {selectedProduct?.item?.title}
                      </p>
                      <p
                        className='text-lg mt-1 w-full'
                        style={{ color: pageText }}
                      >
                        {selectedProduct?.item?.description}
                      </p>
                      {selectedProduct?.item?.digitalType === 'video' ? (
                        <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8 mt-2'>
                          <p>Video Course</p>
                          <MdOutlineVideoLibrary className='ml-2 text-2xl' />
                        </div>
                      ) : selectedProduct?.item?.digitalType === 'ebook' ? (
                        <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8 mt-2'>
                          <p className='text-xs'>E-Book</p>
                          <HiOutlineBookOpen className='ml-2 text-md' />
                        </div>
                      ) : selectedProduct?.item?.digitalType === 'audio' ? (
                        <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8 mt-2'>
                          <p className='text-xs'>Audio</p>
                          <BsFillMicFill className='ml-2 text-md' />
                        </div>
                      ) : selectedProduct?.item?.digitalType === 'template' ? (
                        <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8 mt-2'>
                          <p className='text-xs'>Template</p>
                          <HiOutlineTemplate className='ml-2 text-md' />
                        </div>
                      ) : selectedProduct?.item?.digitalType === 'other' ? (
                        <div className='flex items-center justify-center border-2 border-slate-800 rounded w-44 h-8 mt-2'>
                          <p className='text-xs'>Digital Media</p>
                          <MdOutlinePermMedia className='ml-2 text-md' />
                        </div>
                      ) : (
                        <div className='flex items-center justify-center border-2 border-slate-800  rounded w-44 h-8 mt-2'>
                          <p className='text-xs'>Art</p>
                          <BsPalette className='ml-2 text-md' />
                        </div>
                      )}

                      <form>
                        <div className='w-full flex items-center mt-4'>
                          <div
                            className='p-2 rounded border mr-2'
                            style={{
                              borderColor: borderColor,
                              backgroundColor: price,
                            }}
                          >
                            <p
                              className='text-xl font-medium mr-2'
                              style={{ color: pageText }}
                            >
                              $
                              {selectedProduct?.item?.payChoice
                                ? `${selectedProduct?.item?.price.toFixed(0)} +`
                                : selectedProduct?.item?.price.toFixed(0)}
                            </p>
                          </div>

                          <Rating
                            value={selectedProduct?.totalRating}
                            precision={0.5}
                            readOnly
                            size='medium'
                          />
                          <p
                            className='ml-1 text-sm'
                            style={{ color: pageText }}
                          >
                            ({selectedProduct?.reviews?.length})
                          </p>
                        </div>

                        <div className='flex justify-between w-full items-center mt-2'>
                          {selectedProduct?.item?.payChoice ? (
                            <div className='flex flex-col w-full'>
                              <p className='text-xs'>Set your price</p>
                              <div className='w-full flex mt-1'>
                                <div className='flex flex-col w-3/12'>
                                  <input
                                    type='number'
                                    className='border-2 mr-2 rounded h-10 bg-transparent p-2 outline outline-0 text-md'
                                    style={{
                                      borderColor: borderColor,
                                      WebkitAppearance: 'none',
                                      MozAppearance: 'textfield',
                                    }}
                                    placeholder={`$${selectedProduct?.item?.suggestedPrice} +`}
                                    min={selectedProduct?.item?.price}
                                    disabled
                                  />
                                </div>
                                <button
                                  type='button'
                                  disabled
                                  className='w-9/12 text-md h-10 border-2 rounded'
                                  style={{
                                    color: buttonTextColor,
                                    backgroundColor: btnStyle,
                                    borderColor: buttonColor,
                                  }}
                                >
                                  {selectedProduct?.item?.callToAction === 'buy'
                                    ? 'Buy Now'
                                    : selectedProduct?.item?.callToAction ===
                                      'want'
                                    ? 'I want this!'
                                    : 'Get Now'}
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type='button'
                              disabled
                              className='w-full text-md h-10 border-2 rounded'
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
                          <p className='text-sm' style={{ color: headerColor }}>
                            Description
                          </p>
                        </div>
                        {selectedProduct?.item?.info === '' ? (
                          <div className='w-full h-44 mt-4 rounded flex justify-center items-center bg-gray-100'>
                            <p
                              className='font-medium text-sm'
                              style={{ color: pageText }}
                            >
                              No description
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
                          <p className='text-sm' style={{ color: headerColor }}>
                            Reviews
                          </p>
                        </div>
                        {selectedProduct?.reviews?.length > 0 ? (
                          <div className='h-96 overflow-y-scroll'>
                            {selectedProduct?.reviews.map((review) => (
                              <div
                                className='flex flex-col bg-gray-200 p-4 rounded mt-2 relative'
                                style={{
                                  backgroundColor: reviewBackground,
                                }}
                              >
                                <div className='absolute right-0 mr-2'>
                                  <p
                                    style={{
                                      color: storefront?.style?.pageText,
                                    }}
                                  >
                                    {moment(review?.reviewedOn).format(
                                      'MMM D, YYYY'
                                    )}
                                  </p>
                                </div>
                                <div className='flex items-center w-72'>
                                  <p
                                    className='font-medium mr-2'
                                    style={{
                                      color: storefront?.style?.pageText,
                                    }}
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
                            ))}
                          </div>
                        ) : (
                          <div
                            style={{ backgroundColor: reviewBackground }}
                            className='w-full h-32 mt-4 rounded flex justify-center items-center'
                          >
                            <p
                              className='font-medium text-sm'
                              style={{ color: pageText }}
                            >
                              No reviews
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
                    style={{
                      borderColor: borderColor,
                      backgroundColor: cardBG,
                    }}
                  >
                    <div className='h-60'></div>
                    <p
                      className='font-medium text-sm text-stone-800'
                      style={{ color: pageText }}
                    >
                      This store is empty
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
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default DesignDetail;
