import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../api/productsApiSlice';
import Spinner from '../../components/Spinner';
import img from '../../media/noProducts.svg';
import EditItemForm from '../../components/Forms/EditItemForm';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BiPackage } from 'react-icons/bi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import moment from 'moment';

const Item = () => {
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProductsQuery();

  const [deleteProduct, result] = useDeleteProductMutation();

  const handleDeleteItem = async () => {
    const deleteItemReq = await deleteProduct(product[0]._id);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  const noItem = (
    <div className='border-2 border-gray-200 rounded w-full h-5/6 flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl font-medium'>You have not added an item yet!</h2>
      <Link
        to='/dashboard/item/add/buynow'
        className='w-full flex justify-center'
      >
        <div className='w-5/12 h-32 border-2 rounded mt-4 flex flex-col justify-center items-center hover:border-4'>
          <HiOutlineShoppingBag className='text-2xl' />
          <h2 className='text-xl font-medium'>Add Buy Now Item</h2>
          <p>Offer your customers an item to buy now</p>
        </div>
      </Link>
      <Link to='/' className='w-full flex justify-center'>
        <div className='w-5/12 h-32 border-2 rounded mt-4 flex flex-col justify-center items-center hover:border-4'>
          <BiPackage className='text-2xl' />
          <h2 className='text-xl font-medium'>Add Subscription Item</h2>
          <p>Offer your customers an item on a subscription basis</p>
        </div>
      </Link>
      {/* <Link to='/dashboard/item/add'>
        <button className='border-2 w-36 h-8 rounded-md border-gray-200 hover:border-gray-400 hover:text-slate-400 text-slate-200 font-semibold mt-4'>
          Add item +
        </button>
      </Link> */}
    </div>
  );

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = product.length ? (
      <div className='w-full'>
        <div className='w-full flex justify-between items-center mb-10 border-b-2 p-2'>
          <div className='flex flex-col'>
            <h2 className='text-3xl font-semibold'>Your Item</h2>
            <p>
              last edited on{' '}
              {moment(product[0].updatedOn).format('MMM D, YYYY')}
            </p>
          </div>

          <div className='flex w-72 justify-between items-center'>
            <button
              className='w-32 h-30 rounded border-red-500 border-2 text-red-500'
              onClick={handleDeleteItem}
            >
              DELETE
            </button>
            <Link to={`/dashboard/item/edit/${product[0]._id}`}>
              <button className='w-32 h-30 rounded border-slate-800 border-2'>
                EDIT
              </button>
            </Link>
          </div>
        </div>

        <div className='w-full'>
          <div className='flex items-center'>
            <p className='text-xl font-medium'>Details</p>
          </div>
          <div className='w-full p-4 border-2 rounded-md mt-4'>
            <p className='text-gray-400 mt-4'>Item Title</p>
            <h2 className='text-3xl mt-4'>{product[0]?.title}</h2>
            <p className='text-gray-400 mt-4'>Item Description</p>
            <p className='text-xl mt-4'>{product[0]?.description}</p>
            <p className='text-gray-400 mt-4'>Item Price</p>
            <p className='text-2xl mt-4'>${product[0]?.price.toFixed(2)}</p>
            <p className='text-gray-400 mt-4'>Item Stock</p>
            <p className='text-2xl mt-4'>{product[0]?.stock} units</p>
          </div>

          <p className='text-xl font-medium mt-4'>Package</p>
          <div className='w-full flex justify-between p-4 border-2 rounded-md mt-4'>
            <div className='flex flex-col'>
              <p className='text-gray-400'>Package Weight</p>
              <p className='text-xl'>
                {product[0]?.weight}
                <span>
                  {' '}
                  {product[0]?.weightUnit === 'pound' ? 'Lbs' : 'Oz'}
                </span>
              </p>
            </div>

            <div className='flex flex-col'>
              <p className='text-gray-400'>Package Height</p>
              <p className='text-xl'>
                {product[0]?.height}
                <span> {product[0]?.sizeUnit === 'inches' ? 'In' : 'Cm'}</span>
              </p>
            </div>

            <div className='flex flex-col'>
              <p className='text-gray-400'>Package Width</p>
              <p className='text-xl'>
                {product[0]?.width}
                <span> {product[0]?.sizeUnit === 'inches' ? 'In' : 'Cm'}</span>
              </p>
            </div>

            <div className='flex flex-col'>
              <p className='text-gray-400'>Package Length</p>
              <p className='text-xl'>
                {product[0]?.length}
                <span> {product[0]?.sizeUnit === 'inches' ? 'In' : 'Cm'}</span>
              </p>
            </div>
          </div>

          <p className='text-xl font-medium mt-4'>Media</p>
          <div className='p-4 flex flex-wrap w-full border-2 rounded-md mt-2'>
            {product[0]?.images.map((img, index) => (
              <img className='w-32' src={img.url} key={index} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      noItem
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen mb-32'>{content}</div>
      <Footer />
    </>
  );
};

export default Item;
