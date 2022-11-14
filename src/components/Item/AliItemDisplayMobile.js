import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaExternalLinkAlt } from 'react-icons/fa';

//mui
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const AliItemDisplayMobile = ({ product }) => {
  return (
    <div className='w-full p-2'>
      <div className='w-full flex flex-col mb-4 border-b-2 p-2'>
        <div className='flex flex-col'>
          <h2 className='text-xl font-semibold'>The product your offering</h2>
          <p>
            last edited on {moment(product.updatedOn).format('MMM D, YYYY')}
          </p>
        </div>

        <div className='flex items-center w-full'>
          <button
            disabled
            className='border-2 rounded border-gray-400 text-gray-400 h-10 w-9/12'
          >
            Imported from Aliexpress
          </button>

          <Link
            to={`/dashboard/item/edit/${product._id}`}
            className='w-3/12 ml-2'
          >
            <button className='w-full h-10 rounded border-slate-800 text-slate-800 border-2 hover:bg-slate-800 hover:text-white'>
              EDIT
            </button>
          </Link>
        </div>
      </div>

      <div className='w-full'>
        <div className='flex items-center'>
          <p className='text-xl font-medium'>Details</p>
        </div>
        <div className='w-full p-4 border-2 rounded-md mt-4 flex flex-col'>
          <p className='text-gray-400 mt-4'>Product Title</p>
          <h2 className='text-3xl mt-2'>{product?.title}</h2>
          {product?.description && (
            <div className='flex flex-col'>
              <p className='text-gray-400 mt-4'>Product Description</p>
              <p className='text-xl mt-2'>{product?.description}</p>
            </div>
          )}
          <p className='text-gray-400 mt-4'>Product Price</p>
          <p className='text-2xl mt-2'>${product?.price.toFixed(2)}</p>
          <p className='text-gray-400 mt-4'>Product Inventory</p>
          <p className='text-2xl mt-2'>{product?.stock} units left</p>
          <p className='text-gray-400 mt-4'>Product Options</p>
          {product.options.length > 0 ? (
            product.options.map((opt, optIndex) => (
              <div className='w-full flex flex-col bg-gray-100 p-2 relative mt-2'>
                <p className='text-xl'>{opt?.name}</p>
                <div className='w-full flex flex-wrap mt-2'>
                  {opt.values.map((value) => (
                    <Chip label={value.name} className='ml-2 mt-2' />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className='w-full flex flex-col items-center justify-center h-18 p-2 rounded bg-gray-100 mt-2'>
              <p className='text-lg font-medium'>No options added</p>
              <p>Add options like size or color</p>
            </div>
          )}
          <FormControlLabel
            label='Published to product page'
            control={<Switch checked={product?.published} disabled />}
            className='mt-2'
          />

          <a
            href={product?.aliUrl}
            className='w-full h-10 border-2 border-slate-800 rounded flex items-center justify-center mt-4'
            target='_blank'
          >
            View on Aliexpress <FaExternalLinkAlt className='ml-2' />
          </a>
        </div>

        <p className='text-xl font-medium mt-4'>Media</p>
        <div className='p-4 flex flex-wrap w-full border-2 rounded-md mt-2'>
          {product?.aliImages.map((img, index) => (
            <img className='w-3/12' src={img} key={index} />
          ))}
        </div>

        <div className='w-full flex flex-col'>
          <div className='flex flex-col w-full'>
            <p className='text-xl font-medium mt-4'>Shipping from</p>
            <div className='w-full flex flex-col p-2 border-2 rounded-md mt-2 h-28'>
              <p className='text-gray-400'>
                Aliexpress ships this product from
              </p>
              <p className='text-xl'>{product?.aliShipsFrom}</p>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p className='text-xl font-medium mt-4'>Shipping to</p>
            <div className='w-full flex flex-col p-2 border-2 rounded-md mt-2 h-28'>
              <p className='text-gray-400'>Aliexpress ships this product to</p>
              <p className='text-xl'>{product?.aliShipsTo}</p>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p className='text-xl font-medium mt-4'>Shipping Price</p>
            <div className='w-full flex flex-col p-2 border-2 rounded-md mt-2 h-28'>
              <p className='text-gray-400'>
                Your customers pay this for shipping
              </p>
              <p className='text-xl'>${product?.shippingPrice}</p>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p className='text-xl font-medium mt-4'>Estimated Delivery</p>
            <div className='w-full flex flex-col p-2 border-2 rounded-md mt-4 h-28'>
              <p className='text-gray-400'>
                The estimated delivery date from Aliexpress
              </p>
              <p className='text-xl'>
                {moment
                  .utc(product?.aliEstimatedDelivery)
                  .format('MMMM D, YYYY')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AliItemDisplayMobile;
