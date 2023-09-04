import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ProductsDesktop = ({ product }) => {
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  //stuff for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = product.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(product.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % product.length;

    setItemOffset(newOffset);
  };
  //end of pagination stuff

  const noItem = (
    <div className='h-screen border border-gray-200 rounded bg-white drop-shadow-md w-full flex flex-col justify-center items-center mt-4'>
      <h2 className='text-xl font-medium text-stone-800'>
        You have no products!
      </h2>

      <div className='flex w-11/12 mt-6 items-center'>
        <Link to='/dashboard/item/digital' className='w-full mx-auto'>
          <div className='w-52 mx-auto flex justify-center items-center border-2 rounded border-stone-800 p-2 h-10 hover:bg-stone-800 hover:text-white pl-8 pr-8 mt-2'>
            <p className='font-medium text-md text-center'>+ Add</p>
          </div>
        </Link>
      </div>
    </div>
  );

  return product.length ? (
    <div className='w-full'>
      <div className='w-full flex justify-between items-center'>
        <p className='text-3xl font-medium'>Your products</p>

        <div className='flex items-center'>
          <p className='text-stone-800 font-medium text-lg'>
            {product.length > 1
              ? `${product.length} products`
              : `${product.length} product`}
          </p>
          <Link
            className='rounded-lg h-8 w-8 text-stone-800 border-stone-800 border-2 flex items-center justify-center text-xl ml-4 font-medium hover:text-white hover:bg-stone-800 pb-1'
            to='/dashboard/item/digital'
          >
            +
          </Link>
        </div>
      </div>

      <div
        className='flex flex-col'
        // style={{ height: '500px' }}
      >
        {currentItems.map((prod) => (
          <div className='border rounded bg-white drop-shadow-md relative flex mt-4'>
            <img
              src={prod?.coverImage?.url}
              className='rounded-tl rounded-bl w-2/12 h-32'
            />

            <div className='w-10/12 border-l pl-4 flex flex-col p-2'>
              <p className='text-xl font-medium mb-4'>
                {prod?.title} - $
                {prod?.payChoice ? `${prod?.price}+` : prod?.price}
              </p>

              <a
                href={`${currentStoreUrl}/${prod?.url}`}
                className='text-sm underline underline-offset-2 text-stone-800 mb-2'
                target='_blank'
              >
                {`${currentStoreUrl}/${prod?.url}`}
              </a>

              {prod?.digitalType === 'video' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                  <p className='text-sm'>Video Course</p>
                  <MdOutlineVideoLibrary className='ml-2 text-md' />
                </div>
              ) : prod?.digitalType === 'ebook' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                  <p className='text-sm'>E-Book</p>
                  <HiOutlineBookOpen className='ml-2 text-md' />
                </div>
              ) : prod?.digitalType === 'audio' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                  <p className='text-sm'>Audio</p>
                  <BsFillMicFill className='ml-2 text-md' />
                </div>
              ) : prod?.digitalType === 'template' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                  <p className='text-sm'>Template</p>
                  <HiOutlineTemplate className='ml-2 text-md' />
                </div>
              ) : prod?.digitalType === 'other' ? (
                <div className='flex items-center justify-center border-2 border-slate-800 rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                  <p className='text-sm'>Digital Media</p>
                  <MdOutlinePermMedia className='ml-2 text-md' />
                </div>
              ) : (
                <div className='flex items-center justify-center border-2 border-slate-800  rounded w-36 h-8 absolute top-0 right-0 mr-2 mt-2'>
                  <p className='text-sm'>Art</p>
                  <BsPalette className='ml-2 text-md' />
                </div>
              )}
              <div className='flex mt-4'>
                <FormControlLabel
                  label='Published'
                  control={
                    <Switch checked={prod?.published} disabled size='small' />
                  }
                />
                <FormControlLabel
                  label='Marketplace'
                  control={
                    <Switch
                      checked={prod?.marketplace}
                      disabled
                      size='small'
                      className='ml-2'
                    />
                  }
                />
                <FormControlLabel
                  label='Pay what you want'
                  control={
                    <Switch
                      checked={prod?.payChoice}
                      disabled
                      size='small'
                      className='ml-2'
                    />
                  }
                />
              </div>
            </div>

            <Link to={`/dashboard/item/edit/${prod?._id}`}>
              <button className='absolute border-2 h-8 w-16 text-sm border-stone-800 text-stone-800 rounded right-0 bottom-0 mb-2 mr-2 hover:text-white hover:bg-stone-800'>
                Edit
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div className='w-full flex justify-end mx-auto mt-2'>
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
    </div>
  ) : (
    noItem
  );
};

export default ProductsDesktop;
