import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { useUpdateAliProductMutation } from '../../api/productsApiSlice';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import AliOptions from '../AddItem/AliOptions';

const EditAliItem = ({ product, handleDeleteItem }) => {
  const navigate = useNavigate();

  const [formTitle, setFormTitle] = useState(product?.title);
  const [formDescription, setFormDescription] = useState(product?.description);
  const [formPrice, setFormPrice] = useState(product?.price);
  const [formStock, setFormStock] = useState(product?.stock);
  const [formPublished, setFormPublished] = useState(product?.published);
  const [shippingPrice, setShippingPrice] = useState(product?.shippingPrice);
  const [formOptions, setFormOptions] = useState(product?.options);
  const [formShippingPrice, setFormShippingPrice] = useState(
    product?.shippingPrice
  );
  const [formFreeShipping, setFormFreeShipping] = useState(
    product?.freeShipping
  );

  const [error, setError] = useState('');

  const [updateAliProduct, result] = useUpdateAliProductMutation();

  const handleSaveEdit = async (e) => {
    console.log('trying to save');
    e.preventDefault();

    try {
      const updateItemReq = await updateAliProduct({
        productId: product._id,
        formTitle,
        formDescription,
        formPrice,
        formStock,
        formPublished,
        formShippingPrice,
        formFreeShipping,
      }).unwrap();

      if (updateItemReq === 'Item updated') {
        navigate('/dashboard/item');
      } else {
        setError('There was an error, try again later');
        return;
      }
    } catch (err) {
      setError(err.message);
      return;
    }
  };

  return (
    <>
      <Link
        to='/dashboard/item'
        className='flex items-center text-lg text-gray-400 hover:text-gray-600 w-2/12'
      >
        {' '}
        <BsArrowLeftShort />
        Back to product
      </Link>
      <div className='mb-10 flex justify-between items-center p-2 border-b-2'>
        <div className='flex flex-col'>
          <h2 className='text-4xl font-medium'>Edit your product</h2>
        </div>

        <div className='flex justify-between'>
          <button
            className='w-32 h-10 rounded border-red-400 border-2 text-red-400 hover:bg-red-400 hover:text-white mr-2'
            onClick={handleDeleteItem}
          >
            DELETE
          </button>
          <button
            className='w-32 h-10 rounded border-slate-800 border-2 text-slate-800 hover:text-white hover:bg-slate-800'
            onClick={handleSaveEdit}
          >
            SAVE
          </button>
        </div>
      </div>
      {error && (
        <Alert
          severity='error'
          color='error'
          className='mt-4 mb-4 mx-auto w-full'
        >
          {error}
        </Alert>
      )}
      <form className='mx-auto' onSubmit={handleSaveEdit}>
        {/* within this form inputs needed to set above state */}
        <div className='flex items-center'>
          <p className='text-xl font-medium'>Details</p>
          <Tooltip
            title={<p className='text-lg'></p>}
            className='ml-2 text-lg'
            placement='right-end'
          >
            <button>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>

        <div className='p-4'>
          <p className='text-gray-400'>Product Title</p>

          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2 outline outline-0'
            placeholder='Title'
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />

          <p className='text-gray-400 mt-4'>Product Description(optional)</p>
          <textarea
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2 outline outline-0'
            placeholder='Description'
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />

          <div className='w-full flex justify-between'>
            <div className='flex flex-col w-3/6'>
              <p className='text-gray-400 mt-4'>Product Price</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2 outline outline-0'
                placeholder='Price'
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
              />
            </div>

            <div className='flex flex-col w-3/6 ml-4'>
              <p className='text-gray-400 mt-4'>Product Stock</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2 outline outline-0'
                placeholder='Stock'
                value={formStock}
                onChange={(e) => setFormStock(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='p-4'>
          <p className='text-gray-400'>Publish</p>
          <div className='w-10/12 flex mt-2'>
            <FormControlLabel
              label='Publish to store'
              control={
                <Switch
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                />
              }
            />
          </div>
        </div>

        <AliOptions options={product.options} />

        <div className='flex items-center'>
          <p className='text-xl font-medium'>Media</p>
          <Tooltip
            title={<p className='text-lg'></p>}
            className='ml-2'
            placement='right-end'
          >
            <button>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>

        {product?.aliImages.length > 0 ? (
          <div className='flex flex-wrap w-full'>
            {product?.aliImages.map((img, index) => (
              <img src={img} className='w-32' key={index} />
            ))}
          </div>
        ) : (
          ''
        )}

        <div className='w-full flex flex-col'>
          <p className='text-xl font-medium'>Change shipping price</p>
          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-8/12 rounded p-2 outline outline-0'
            value={shippingPrice}
          />
          <p className='font-medium mt-2 text-xl'>OR</p>
          <FormControlLabel
            control={
              <Checkbox
                checked={formFreeShipping}
                onChange={(e) => setFormFreeShipping(e.target.checked)}
              />
            }
            label='Offer free shipping on this product'
          />
        </div>

        <div className='w-full flex justify-between'>
          <div className='flex flex-col w-6/12'>
            <p className='text-xl font-medium mt-4'>Shipping from</p>
            <div className='w-full flex flex-col p-4 border-2 rounded-md mt-4 h-32'>
              <p className='text-gray-400'>
                Aliexpress ships this product from
              </p>
              <p className='text-xl'>{product?.aliShipsFrom}</p>
            </div>
          </div>

          <div className='flex flex-col w-6/12 ml-2'>
            <p className='text-xl font-medium mt-4'>Shipping to</p>
            <div className='w-full flex flex-col p-4 border-2 rounded-md mt-4 h-32'>
              <p className='text-gray-400'>Aliexpress ships this product to</p>
              <p className='text-xl'>{product?.aliShipsTo}</p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditAliItem;
