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
    <div className='h-full border rounded bg-white drop-shadow-lg w-full flex flex-col justify-center items-center'>
      <p className='text-md font-medium text-stone-800'>No templates</p>

      <Link
        to='/dashboard/item/digital'
        className='border-2 text-sm rounded border-stone-800 text-stone-800 w-36 h-8 hover:bg-stone-800 hover:text-white mt-6 flex items-center justify-center'
      >
        + Add template
      </Link>
    </div>
  );

  return product.length ? (
    <div className='w-full'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
          <HiOutlineTemplate className='text-white text-xl' />
          <p className='text-md text-white ml-2'>Templates</p>
        </div>

        <div className='flex items-center'>
          <p className='text-stone-800 font-medium text-lg'>
            {product.length == 1
              ? `${product.length} template`
              : `${product.length} templates`}
          </p>
          <Link
            className='rounded-lg h-8 w-8 text-stone-800 border-stone-800 border-2 flex items-center justify-center text-lg ml-4 font-medium hover:text-white hover:bg-stone-800'
            to='/dashboard/item/digital'
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
          <div className='border rounded-md bg-white drop-shadow-md relative flex mt-4'>
            <div className='w-2/12 h-full p-2'>
              <img
                src={
                  prod?.coverImages.length
                    ? prod?.coverImages[0]?.url
                    : prod?.coverImage?.url
                }
                className='rounded-md w-full h-32 object-cover'
              />
            </div>

            <div className='w-10/12 pl-4 flex flex-col p-2'>
              <p className='text-xl font-medium mb-4'>
                {prod?.title} - {}
                {prod?.free
                  ? 'FREE'
                  : prod?.payChoice
                  ? `$ ${prod?.price}+`
                  : `$${prod?.price}`}
              </p>

              <a
                href={`${currentStoreUrl}/${prod?.url}`}
                className='text-sm underline underline-offset-2 text-stone-800 mb-2'
                target='_blank'
              >
                {`${currentStoreUrl}/${prod?.url}`}
              </a>
              <div className='absolute bottom-0 right-0 mb-2 mr-2 rounded bg-gray-100 text-sm p-2'>
                <p>
                  {prod.numberOfSales == 1
                    ? `${prod.numberOfSales} sale`
                    : `${prod.numberOfSales} sales`}{' '}
                </p>
              </div>

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
              <button className='absolute border-2 h-8 w-16 text-sm border-stone-800 text-stone-800 rounded right-0 top-0 mt-2 mr-2 hover:text-white hover:bg-stone-800'>
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
      ) : (
        ''
      )}
    </div>
  ) : (
    <div className='h-full'>{noItem}</div>
  );
};

export default ProductsDesktop;
