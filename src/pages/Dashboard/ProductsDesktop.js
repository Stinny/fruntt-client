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
import { BiPackage } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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

    window.scroll(0, 0);
  };
  //end of pagination stuff

  const noItem = (
    <div
      className='flex flex-col border-gray-200 items-center justify-center rounded-md w-full border bg-white'
      style={{ height: '600px' }}
    >
      <p className='text-stone-800'>No templates</p>
      <p className='text-stone-600 text-xs mt-1'>
        Add, save, and publish templates you want to sell
      </p>
      <Link
        to='/dashboard/new/template'
        className='flex items-center justify-center bg-gray-200 text-xs text-stone-800 rounded-md pt-1 pb-1 pl-2 pr-2 mt-2'
      >
        Add Template
      </Link>
    </div>
  );

  return product.length ? (
    <div className='w-full'>
      <div className='w-full flex justify-between items-end'>
        <div className='flex flex-col justify-center bg-white rounded-md border border-gray-200 p-2'>
          <p className='text-md text-stone-800 font-bold'>Templates</p>
          <p className='text-sm text-stone-600'>View all templates</p>
        </div>

        <div className='flex items-center'>
          <p className='text-stone-800 text-sm'>
            {product.length == 1
              ? `${product.length} template`
              : `${product.length} templates`}
          </p>
          <Link
            className='rounded-lg h-8 w-8 text-stone-800 flex items-center justify-center text-lg ml-4 font-medium bg-gray-200'
            to='/dashboard/new/template'
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>

      <div
        className='flex flex-col'
        // style={{ height: '500px' }}
      >
        {currentItems.map((prod) => (
          <div className='border border-gray-200 rounded-md bg-white relative flex mt-2'>
            <div className='w-2/12 h-full p-2'>
              <img
                src={
                  prod?.coverImages.length
                    ? prod?.coverImages[0]?.url
                    : prod?.coverImage?.url
                }
                className='rounded-md w-full h-20 object-cover'
              />
            </div>

            <div className='w-10/12 pl-4 flex flex-col p-2'>
              <p className='text-stone-800 mb-1'>
                {prod?.title} - {}
                {prod?.free
                  ? 'FREE'
                  : prod?.payChoice
                  ? `$ ${prod?.price}+`
                  : `$${prod?.price}`}
              </p>

              <div className='flex items-center'>
                <FormControlLabel
                  control={
                    <Checkbox
                      size='xsmall'
                      checked={prod?.published}
                      disabled
                    />
                  }
                  label={
                    <span className='text-sm text-stone-600'>Published</span>
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      size='xsmall'
                      checked={prod?.payChoice}
                      disabled
                    />
                  }
                  label={
                    <span className='text-sm text-stone-600'>
                      Pay what you want
                    </span>
                  }
                />
              </div>

              <a
                href={`http://localhost:3000/t/${prod?.url}`}
                className='text-sm underline underline-offset-2 text-stone-600 mb-1'
                target='_blank'
              >
                {`https://fruntt.com/t/${prod?.url}`}
              </a>

              <div className='absolute bottom-0 right-0 mt-1 mr-1 text-xs p-2'>
                <p>
                  {prod.numberOfSales == 1
                    ? `${prod.numberOfSales} sale`
                    : `${prod.numberOfSales} sales`}{' '}
                </p>
              </div>
            </div>

            <Link to={`/dashboard/item/edit/${prod?._id}`}>
              <button className='absolute pl-2 pr-2 p-1 text-xs bg-gray-200 text-stone-800 rounded-md right-0 top-0 mt-2 mr-2'>
                Edit
              </button>
            </Link>
          </div>
        ))}
      </div>
      {product.length > 5 ? (
        <div className='w-full flex justify-end mx-auto mt-2'>
          <div className=''>
            <ReactPaginate
              breakLabel='...'
              nextLabel='Next'
              onPageChange={handlePageClick}
              marginPagesDisplayed={0}
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
    </div>
  ) : (
    <div className='h-'>{noItem}</div>
  );
};

export default ProductsDesktop;
