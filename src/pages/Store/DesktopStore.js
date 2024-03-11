import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineLink,
  AiOutlineEdit,
} from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ReactPaginate from 'react-paginate';

const DesktopStore = ({ storeAndItems }) => {
  //stuff for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = storeAndItems?.products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(storeAndItems?.products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % storeAndItems?.products.length;
    setItemOffset(newOffset);
  };
  //end of pagination stuff

  return (
    <div className='max-w-6xl mx-auto flex flex-col'>
      <div className='w-full border border-gray-200 bg-white rounded-md flex justify-between items-center p-4'>
        <div className='flex items-center gap-4'>
          <div className=''>
            <Avatar
              src={storeAndItems?.sellerProfile?.profilePic}
              sx={{ width: 32, height: 32 }}
            />
          </div>

          <div className='flex flex-col items-start'>
            <p className='text-stone-800 text-md'>
              {storeAndItems?.sellerProfile?.name}
            </p>
            <p className='text-stone-600 text-sm mt-1 w-72'>
              {storeAndItems?.sellerProfile?.bio}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-center'>
            <p className='text-stone-800 text-lg'>
              {storeAndItems?.sellerProfile?.numberOfSales}
            </p>
            <p className='text-sm text-stone-600'>sales</p>
          </div>

          <div className='flex items-center'>
            {storeAndItems?.sellerProfile?.facebook ? (
              <a href={storeAndItems?.sellerProfile?.facebook} target='_blank'>
                <AiOutlineFacebook className='text-stone-800 text-2xl' />
              </a>
            ) : (
              ''
            )}
            {storeAndItems?.sellerProfile?.instagram ? (
              <a href={storeAndItems?.sellerProfile?.instagram} target='_blank'>
                <AiOutlineInstagram className='text-stone-800 ml-2 text-2xl' />
              </a>
            ) : (
              ''
            )}
            {storeAndItems?.sellerProfile?.twitter ? (
              <a href={storeAndItems?.sellerProfile?.twitter} target='_blank'>
                <FaXTwitter className='text-stone-800 ml-2 text-xl' />
              </a>
            ) : (
              <AiOutlineTwitter className='text-gray-200 ml-2 text-2xl' />
            )}
            {storeAndItems?.sellerProfile?.linkedin ? (
              <a href={storeAndItems?.sellerProfile?.linkedin} target='_blank'>
                <AiOutlineLinkedin className='text-stone-800 ml-2 text-2xl' />
              </a>
            ) : (
              ''
            )}
            {storeAndItems?.sellerProfile?.youtube ? (
              <a href={storeAndItems?.sellerProfile?.youtube} target='_blank'>
                <AiOutlineYoutube className='text-stone-800 ml-2 text-2xl' />
              </a>
            ) : (
              ''
            )}
            {storeAndItems?.sellerProfile?.tiktok ? (
              <a href={storeAndItems?.sellerProfile?.tiktok} target='_blank'>
                <FaTiktok className='text-stone-800 ml-2 text-2xl' />
              </a>
            ) : (
              ''
            )}
            {storeAndItems?.sellerProfile?.link ? (
              <a href={storeAndItems?.sellerProfile?.tiktok} target='_blank'>
                <AiOutlineLink className='text-stone-800 ml-2 text-2xl' />
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      {storeAndItems?.products.length > 0 ? (
        <>
          <div className='w-full flex justify-start'>
            <p className='text-stone-600 text-sm mt-2 mb-2'>
              {storeAndItems?.products.length} templates
            </p>
          </div>
          <div className='w-full grid grid-cols-4 gap-4'>
            {currentItems.map((product) => (
              <Link to={`/t/${product?.url}`} className='w-full'>
                <div
                  className='border border-gray-200 flex w-full mb-4 rounded-md relative bg-white'
                  style={{ height: '300px' }}
                >
                  <div className='absolute bottom-0 right-0 bg-gray-200 mb-1 mr-1 rounded-md p-1 pl-2 pr-2'>
                    <p className='text-sm'>
                      {product?.free
                        ? 'FREE'
                        : product?.payChoice
                        ? `$ ${product?.price?.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })} +`
                        : `$${product?.price?.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}`}
                    </p>
                  </div>

                  <div className='w-full flex-col p-2'>
                    <div className='w-full h-32 pb-2'>
                      <img
                        src={product?.coverImage?.url}
                        className='object-fill w-full h-full rounded-md'
                      />
                    </div>

                    <p className='text-sm mb-1 text-stone-800'>
                      {product?.title}
                    </p>
                    <p className='text-sm text-stone-600'>
                      {product?.description}
                    </p>
                  </div>

                  {/* <div className='absolute bottom-0 ml-2 mb-2'>
                <Rating
                  value={product?.totalRating}
                  readOnly
                  precision={0.5}
                  size='medium'
                />
                <p>{product.numberOfSales} sales</p>
              </div> */}

                  {/* <div className='w-3/12 flex items-center justify-center p-4'>
          <img className='rounded' src={product?.item?.coverImage?.url} />
        </div> */}
                </div>
              </Link>
            ))}
          </div>
          {storeAndItems?.products.length > 8 ? (
            <div className='w-full flex justify-end mt-2'>
              <div className=''>
                <ReactPaginate
                  breakLabel='...'
                  nextLabel='Next'
                  onPageChange={handlePageClick}
                  marginPagesDisplayed={0} // Set to 0 to hide margin pages
                  pageRangeDisplayed={0}
                  pageCount={pageCount}
                  previousLabel='Prev'
                  renderOnZeroPageCount={null}
                  className='flex items-center'
                  activeLinkClassName='activePage'
                  pageLinkClassName='notActivePage'
                  breakLinkClassName='breakLink'
                  disabledClassName='disabled'
                />
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <div className='w-full bg-white h-96 border border-gray-200 rounded-md flex items-center justify-center mt-4'>
          <p className='text-stone-800 text-sm'>No templates available</p>
        </div>
      )}
    </div>
  );
};

export default DesktopStore;
