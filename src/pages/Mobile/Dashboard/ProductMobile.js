import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiPackage } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { AiOutlineEdit } from 'react-icons/ai';

//mui
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { HiOutlineTemplate } from 'react-icons/hi';

const ProductMobile = ({ product }) => {
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  //stuff for pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = product.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(product.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % product.length;

    setItemOffset(newOffset);
  };
  //end of pagination stuff

  const noItem = (
    <div className='h-screen mx-auto border drop-shadow-md bg-white rounded w-11/12 flex flex-col justify-center items-center mt-4'>
      <p className='text-md font-medium'>No templates</p>

      <Link
        to='/dashboard/item/digital'
        className='border-2 text-sm rounded border-stone-800 text-stone-800 w-36 h-8 hover:bg-stone-800 hover:text-white mt-6 flex items-center justify-center'
      >
        + Add template
      </Link>
    </div>
  );

  return product.length ? (
    <div className='w-full p-2'>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center justify-center bg-stone-800 rounded p-2'>
          <HiOutlineTemplate className='text-white text-xl' />
          <p className='text-sm text-white ml-2'>Templates</p>
        </div>

        <p className='text-stone-800 font-medium text-sm'>
          {product.length == 1
            ? `${product.length} template`
            : `${product.length} templates`}
        </p>
      </div>

      <div className='flex flex-col'>
        {currentItems.map((prod) => (
          <div className='border rounded-md bg-white drop-shadow-md relative flex mt-2'>
            <div className='w-full border-l flex flex-col p-2'>
              <p className='text-md font-medium mb-2'>{prod?.title}</p>

              <p className='mb-2'>
                {' '}
                {prod?.free
                  ? 'FREE'
                  : prod?.payChoice
                  ? `$${prod?.price}+`
                  : `$${prod?.price}`}
              </p>
              <a
                href={`${currentStoreUrl}/${prod?.url}`}
                className='text-sm underline underline-offset-2 text-stone-800 mb-2'
                target='_blank'
              >
                {`${currentStoreUrl}/${prod?.url}`}
              </a>
            </div>

            <Link
              to={`/dashboard/item/edit/${prod?._id}`}
              className='absolute top-0 right-0 mt-2 mr-2'
            >
              {/* <button className='absolute border-2 h-8 w-16 text-sm border-stone-800 text-stone-800 rounded right-0 bottom-0 mb-2 mr-2 hover:text-white hover:bg-stone-800'>
                Edit
              </button> */}
              <AiOutlineEdit className=' text-stone-800' />
            </Link>

            <div className='absolute bottom-0 right-0 mb-2 mr-2 rounded bg-gray-100 text-xs p-1'>
              <p>
                {prod.numberOfSales == 1
                  ? `${prod.numberOfSales} sale`
                  : `${prod.numberOfSales} sales`}{' '}
              </p>
            </div>
          </div>
        ))}
      </div>

      {product.length > 10 ? (
        <div className='w-full flex justify-end mx-auto mt-6'>
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
    noItem
  );
};

export default ProductMobile;
