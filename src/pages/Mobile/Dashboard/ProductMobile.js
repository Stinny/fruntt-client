import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiPackage } from 'react-icons/bi';
import DigitalProductMobile from '../../../components/DigitalProd/DigitalProductMobile';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

//mui
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ProductMobile = ({ product }) => {
  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const noItem = (
    <div className='h-screen mx-auto border drop-shadow-md bg-white rounded w-11/12 flex flex-col justify-center items-center mt-4'>
      <p className='text-xl font-medium'>You have not added a product yet!</p>
      <p className='text-gray-400 text-lg w-full mt-4 text-center'>
        Add any kind of files and digital content
      </p>
      <div className='flex w-11/12 mt-4 items-center'>
        <Link to='/dashboard/item/digital' className='w-full mx-auto'>
          <div className='w-52 mx-auto flex justify-center items-center border-2 rounded border-stone-800 p-2 h-14 hover:bg-stone-800 hover:text-white pl-8 pr-8 mt-2'>
            <p className='font-medium text-lg text-center'>+ Add product</p>
          </div>
        </Link>
      </div>
    </div>
  );

  return product ? (
    <div className='w-full'>
      <div className='w-full flex justify-between items-center p-2'>
        <h2 className='text-xl font-semibold'>Your products</h2>

        {/* <Link to={`/dashboard/item/edit/${product[0]._id}`}>
            <button className='w-40 h-10 rounded border-stone-800 text-stone-800 border-2 hover:bg-stone-800 hover:text-white'>
              EDIT PRODUCT
            </button>
          </Link> */}
        <div className='flex items-center'>
          {/* <p className='text-stone-800 font-medium text-lg'>
            {product.length > 1
              ? `${product.length} products created`
              : `${product.length} product created`}
          </p> */}
          <Link
            className='rounded-lg h-8 w-8 text-stone-800 border-stone-800 border-2 flex items-center justify-center text-xl ml-4 font-medium hover:text-white hover:bg-stone-800 pb-1'
            to='/dashboard/item/digital'
          >
            +
          </Link>
        </div>
      </div>

      <div
        className='flex flex-col overflow-y-scroll h-screen bg-gray-50 p-2 rounded'
        // style={{ height: '500px' }}
      >
        {product.map((prod) => (
          <div className='border rounded bg-white drop-shadow-md relative flex mt-4'>
            <div className='w-full border-l pl-4 flex flex-col p-2'>
              <p className='text-lg font-medium mb-4'>
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
    </div>
  ) : (
    noItem
  );
};

export default ProductMobile;
