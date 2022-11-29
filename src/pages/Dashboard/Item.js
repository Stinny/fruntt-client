import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import {
  useGetProductsQuery,
  useLazyGetAliProductQuery,
} from '../../api/productsApiSlice';
import Spinner from '../../components/Spinner';
import img from '../../media/noProducts.svg';
import EditItemForm from '../../components/Forms/EditItemForm';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BiPackage } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import AliItemDisplay from '../../components/Item/AliItemDisplay';
import ProductMobile from '../Mobile/Dashboard/ProductMobile';
import Cookies from 'js-cookie';

//mui
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

const Item = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);
  const currentUser = JSON.parse(Cookies.get('currentUser'));

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProductsQuery({ storeId: currentStoreID });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

  const noItem = (
    <div className='h-screen border-2 border-gray-200 rounded w-full flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl font-medium'>
        You have not added a product yet!
      </h2>
      <p className='text-gray-400 text-xl w-8/12 mt-4 text-center font-medium'>
        Pick what kind of product you want to offer on your product page
      </p>
      <div className='flex justify-center w-6/12 mt-4'>
        <Link to='/dashboard/item/add' className='w-2/6'>
          <div className='flex flex-col border-2 rounded border-slate-800 p-2 h-28 hover:bg-slate-800 hover:text-white'>
            <p className='font-medium'>+ Physical product</p>
            <p>Something that would require shipping on your end</p>
          </div>
        </Link>
        <Link to='/dashboard/item/import' className='w-2/6 ml-2 h-32'>
          <div className='flex flex-col border-2 rounded border-slate-800 p-2 h-28 hover:bg-slate-800 hover:text-white'>
            <p className='font-medium'>+ Import a product</p>
            <p>Import a product from Aliexpress</p>
          </div>
        </Link>

        <div className='w-2/6 ml-2 flex flex-col border-2 rounded border-slate-800 p-2 h-28 hover:bg-slate-800 hover:text-white'>
          <p className='font-medium'>+ Digital product</p>
          <p>This will be available soon!</p>
        </div>
      </div>
    </div>
  );

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <ProductMobile product={product[0]} />
    ) : product.length ? (
      product[0].ali ? (
        <AliItemDisplay product={product[0]} />
      ) : (
        <div className='w-full'>
          <div className='w-full flex justify-between items-center mb-10 border-b-2 p-2'>
            <div className='flex flex-col'>
              <h2 className='text-3xl font-semibold'>Your product</h2>
              <p>
                last edited on{' '}
                {moment.utc(product[0].updatedOn).format('MMM D, YYYY')}
              </p>
            </div>

            <Link to={`/dashboard/item/edit/${product[0]._id}`}>
              <button className='w-40 h-10 rounded border-slate-800 text-slate-800 border-2 hover:bg-slate-800 hover:text-white'>
                EDIT PRODUCT
              </button>
            </Link>
          </div>

          <div className='w-full'>
            <div className='flex items-center'>
              <p className='text-xl font-medium'>Details</p>
            </div>
            <div className='w-full p-4 border-2 rounded-md mt-4'>
              <p className='text-gray-400 mt-4'>Product Title</p>
              <h2 className='text-3xl mt-4'>{product[0]?.title}</h2>
              {product[0].description && (
                <div className='flex flex-col'>
                  <p className='text-gray-400 mt-4'>Product Description</p>
                  <p className='text-xl mt-4'>{product[0]?.description}</p>
                </div>
              )}
              <p className='text-gray-400 mt-4'>Product Price</p>
              <p className='text-2xl mt-4'>${product[0]?.price.toFixed(2)}</p>
              <p className='text-gray-400 mt-4'>Product Inventory</p>
              <p className='text-2xl mt-4'>{product[0]?.stock} units left</p>
              <p className='text-gray-400 mt-4'>Product Options</p>
              {product[0].options.length > 0 ? (
                product[0].options.map((opt, optIndex) => (
                  <div className='w-full flex flex-col bg-gray-100 p-2 relative mt-2'>
                    <p className='text-xl'>{opt?.name}</p>
                    <div className='w-full flex flex-wrap mt-2'>
                      {opt.values.map((value) => (
                        <Chip label={value} className='ml-2 mt-2' />
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
                control={<Switch checked={product[0]?.published} disabled />}
                className='mt-2'
              />
            </div>

            <p className='text-xl font-medium mt-4'>Media</p>
            <div className='p-4 flex flex-wrap w-full border-2 rounded-md mt-2'>
              {product[0]?.images.map((img, index) => (
                <img className='w-32' src={img.url} key={index} />
              ))}
            </div>

            <div className='w-full flex justify-between'>
              <div className='flex flex-col w-4/12'>
                <p className='text-xl font-medium mt-4'>Package</p>
                <div className='w-full flex justify-between p-4 border-2 rounded-md mt-4 h-32'>
                  <div className='flex flex-col'>
                    <p className='text-gray-400'>Package Weight</p>
                    <p className='text-xl'>
                      {product[0]?.weight}
                      <span>
                        {' '}
                        {product[0]?.weightUnit === 'pound' ? 'Lbs' : 'Ounces'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className='flex flex-col w-4/12 ml-2'>
                <p className='text-xl font-medium mt-4'>Shipping</p>
                <div className='w-full flex flex-col p-4 border-2 rounded-md mt-4 h-32'>
                  <p className='text-gray-400'>
                    Price customers will pay for shipping
                  </p>
                  <p className='text-xl'>${product[0]?.shippingPrice}</p>
                </div>
              </div>

              <div className='flex flex-col w-4/12 ml-2'>
                <p className='text-xl font-medium mt-4'>Ships from</p>
                <div className='w-full flex flex-col p-4 border-2 rounded-md mt-4 h-32'>
                  <p className='text-xl'>{product[0]?.shipsFrom?.address}</p>
                  <p className='text-xl'>
                    {product[0]?.shipsFrom?.city},{' '}
                    {product[0]?.shipsFrom?.state}{' '}
                    {product[0]?.shipsFrom?.zipcode}
                  </p>
                  <p className='text-xl'>{product[0]?.shipsFrom?.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    ) : (
      noItem
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-fit mb-32'>{content}</div>
      <Footer />
    </>
  );
};

export default Item;
