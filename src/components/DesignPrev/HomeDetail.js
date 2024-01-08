import React, { useState } from 'react';
import SellerPro from './SellerPro';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

//mui
import Rating from '@mui/material/Rating';

const HomeDetail = ({
  products,
  pageBG,
  cardBG,
  price,
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
  selectedProduct,
  handleSelectedProduct,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentProducts = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;

    setItemOffset(newOffset);
  };
  return (
    <div
      className='w-full h-fit mx-auto border p-10 rounded mt-1 drop-shadow-lg'
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

      {products.length ? (
        <>
          {' '}
          <div
            className='mx-auto max-w-6xl h-12 mb-2 mt-2 border rounded flex justify-between items-center drop-shadow-lg p-4'
            style={{
              backgroundColor: cardBG,
              borderColor: borderColor,
            }}
          >
            <p className='font-medium text-md'>My Templates</p>
            <p className='text-sm'>
              {products.length == 1
                ? `${products.length} template`
                : `${products.length} templates`}
            </p>
          </div>
          <div className='mx-auto max-w-6xl grid grid-cols-3 gap-4'>
            {currentProducts.map((product) => (
              <div
                className='border drop-shadow-lg flex w-full mb-4 rounded-md relative'
                style={{
                  backgroundColor: cardBG,
                  borderColor: borderColor,
                  height: '350px',
                }}
              >
                <div
                  className='absolute bottom-0 right-0 mr-1 mb-1 rounded-br-md p-2'
                  style={{ backgroundColor: price }}
                >
                  <p className='font-medium text-lg'>
                    $
                    {product?.item?.payChoice
                      ? `${product?.item?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })} +`
                      : product?.item?.price?.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                  </p>
                </div>

                <div className='w-full flex-col p-4'>
                  <div className='w-full h-40 pb-2'>
                    <img
                      src={product?.item?.coverImage?.url}
                      className='object-cover w-full h-full rounded-md'
                    />
                  </div>

                  <p className='font-bold text-lg mb-1'>
                    {product?.item?.title}
                  </p>
                  <p className='text-md mb-2'>{product?.item?.description}</p>
                </div>

                <div className='absolute bottom-0 ml-2'>
                  <Rating
                    value={product?.totalRating}
                    readOnly
                    precision={0.5}
                    size='medium'
                  />
                </div>
              </div>
            ))}
          </div>
          <div className='max-w-6xl flex justify-end mx-auto mt-2'>
            <div className=''>
              <ReactPaginate
                breakLabel='...'
                nextLabel='Next'
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel='Prev'
                renderOnZeroPageCount={null}
                className='flex items-center'
                activeLinkClassName='activePage'
                pageLinkClassName='notActivePage'
                breakLinkClassName='breakLink'
              />
            </div>
          </div>
        </>
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
              className='font-medium text-md text-stone-800'
              style={{ color: pageText }}
            >
              Your store is empty
            </p>
            <Link
              to='/dashboard/item/digital'
              className='border-2 text-sm rounded border-stone-800 text-stone-800 w-36 h-8 hover:bg-stone-800 hover:text-white mt-6 flex items-center justify-center'
            >
              + Add template
            </Link>
            <div className='h-60'></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeDetail;
