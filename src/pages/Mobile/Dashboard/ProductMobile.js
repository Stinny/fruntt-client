import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AliItemDisplayMobile from '../../../components/Item/AliItemDisplayMobile';

//mui
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const ProductMobile = ({ product }) => {
  const noItem = (
    <div className='h-screen mx-auto border-2 border-gray-200 rounded w-11/12 flex flex-col justify-center items-center mt-4'>
      <h2 className='text-xl font-medium'>You have not added a product yet!</h2>
      <p className='text-gray-400 text-lg w-10/12 mt-4 text-center'>
        Pick what kind of product you want to offer on your product page
      </p>
      <div className='flex flex-col w-10/12 mt-4 mx-auto'>
        <Link to='/dashboard/item/add' className='w-full'>
          <div className='flex flex-col border-2 rounded border-slate-800 p-2 h-28 hover:bg-slate-800 hover:text-white'>
            <p className='font-medium'>+ Physical product</p>
            <p>Something that would require shipping on your end</p>
          </div>
        </Link>
        <Link to='/dashboard/item/import' className='w-full mt-2'>
          <div className='flex flex-col border-2 rounded border-slate-800 p-2 h-28 hover:bg-slate-800 hover:text-white'>
            <p className='font-medium'>+ Import a product</p>
            <p>Import a product from Aliexpress</p>
          </div>
        </Link>

        <div className='w-full mt-2 flex flex-col border-2 rounded border-slate-800 p-2 h-28 hover:bg-slate-800 hover:text-white'>
          <p className='font-medium'>+ Digital product</p>
          <p>This will be available soon!</p>
        </div>
      </div>
    </div>
  );

  return product ? (
    product.ali ? (
      <AliItemDisplayMobile product={product} />
    ) : (
      <div className='w-full'>
        <div className='w-full flex justify-between items-center mb-10 border-b-2 p-2'>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold'>Your product</h2>
            <p>
              last edited on {moment(product.updatedOn).format('MMM D, YYYY')}
            </p>
          </div>

          <Link to={`/dashboard/item/edit/${product._id}`}>
            <button className='w-20 h-10 rounded border-slate-800 text-slate-800 border-2 hover:bg-slate-800 hover:text-white'>
              EDIT
            </button>
          </Link>
        </div>

        <div className='w-11/12 mx-auto'>
          <div className='flex items-center'>
            <p className='text-xl font-medium'>Details</p>
          </div>
          <div className='w-full p-4 border-2 rounded-md'>
            <p className='text-gray-400 mt-4'>Product Title</p>
            <h2 className='text-2xl'>{product?.title}</h2>
            {product.description && (
              <div className='flex flex-col'>
                <p className='text-gray-400 mt-4'>Product Description</p>
                <p className='text-lg'>{product?.description}</p>
              </div>
            )}
            <p className='text-gray-400 mt-4'>Product Price</p>
            <p className='text-xl'>${product?.price.toFixed(2)}</p>
            <p className='text-gray-400 mt-4'>Product Inventory</p>
            <p className='text-xl'>{product?.stock} units left</p>
            <p className='text-gray-400 mt-4'>Product Options</p>
            {product.options.length > 0 ? (
              product.options.map((opt, optIndex) => (
                <div className='w-full flex flex-col bg-gray-100 p-2 relative mt-2'>
                  <p className='text-lg'>{opt?.name}</p>
                  <div className='w-full flex flex-wrap'>
                    {opt.values.map((value) => (
                      <Chip label={value} className='ml-2' />
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
              label='Published to storefront'
              control={<Switch checked={product?.published} disabled />}
              className='mt-2'
            />
          </div>

          <p className='text-xl font-medium mt-4'>Media</p>
          <div className='p-4 flex flex-wrap w-full border-2 rounded-md'>
            {product?.images.map((img, index) => (
              <img className='w-3/12' src={img.url} key={index} />
            ))}
          </div>

          <div className='w-full flex justify-between'>
            <div className='flex flex-col w-6/12'>
              <p className='text-xl font-medium mt-4'>Package</p>
              <div className='w-full flex justify-between p-4 border-2 rounded-md h-28'>
                <div className='flex flex-col'>
                  <p className='text-gray-400'>Package Weight</p>
                  <p className='text-lg'>
                    {product?.weight}
                    <span>
                      {' '}
                      {product?.weightUnit === 'pound' ? 'Lbs' : 'Ounces'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-6/12 ml-2'>
              <p className='text-lg font-medium mt-4'>Shipping</p>
              <div className='w-full flex flex-col p-4 border-2 rounded-md h-28'>
                <p className='text-gray-400'>Customers pay</p>
                <p className='text-lg'>${product?.shippingPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p className='text-lg font-medium mt-4'>Ships from</p>
            <div className='w-full flex flex-col p-4 border-2 rounded-md h-32'>
              <p className='text-xl'>{product?.shipsFrom?.address}</p>
              <p className='text-xl'>
                {product?.shipsFrom?.city}, {product?.shipsFrom?.state}{' '}
                {product?.shipsFrom?.zipcode}
              </p>
              <p className='text-xl'>{product?.shipsFrom?.country}</p>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    noItem
  );
};

export default ProductMobile;
