import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AliOptions from '../../components/AddItem/AliOptions';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useUpdateAliProductMutation } from '../../api/productsApiSlice';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import moment from 'moment';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

const EditAliItemMobile = ({ product, handleDeleteItem }) => {
  const navigate = useNavigate();

  const [updateAliProduct, result] = useUpdateAliProductMutation();

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
  const [formEstimatedDelivery, setFormEstimatedDelivery] = useState(
    product?.aliEstimatedDelivery
  );

  const [error, setError] = useState('');

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
        className='flex items-center text-lg text-gray-400 hover:text-gray-600 w-8/12'
      >
        {' '}
        <BsArrowLeftShort />
        Back to product
      </Link>
      <div className='mb-4 flex justify-between items-center p-2 border-b-2'>
        <div className='flex flex-col'>
          <h2 className='text-4xl font-medium'>Edit your product</h2>
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
      <form className='mx-auto p-2' onSubmit={handleSaveEdit}>
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

        <div>
          <p className='text-gray-400'>Product Title</p>

          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded mt-2 p-2 outline outline-0'
            placeholder='Title'
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />

          <p className='text-gray-400 mt-4'>Product Description(optional)</p>
          <textarea
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded mt-2 p-2 outline outline-0 h-32'
            placeholder='Description'
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />

          <div className='w-full flex justify-between'>
            <div className='flex flex-col w-3/6'>
              <p className='text-gray-400 mt-4'>Product Price</p>
              <div className='flex items-center'>
                <p className='text-xl mt-2 font-medium mr-2'>$</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded mt-2 p-2 outline outline-0'
                  placeholder='Price'
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </div>
            </div>

            <div className='flex flex-col w-3/6 ml-4'>
              <p className='text-gray-400 mt-4'>Product Stock</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded mt-2 p-2 outline outline-0'
                placeholder='Stock'
                value={formStock}
                onChange={(e) => setFormStock(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <p className='text-gray-400 mt-2'>Publish</p>
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

        <p className='text-gray-400 mt-2'>Options</p>
        <AliOptions options={product.options} />

        <div className='flex items-center mt-2'>
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
              <img src={img} className='w-3/12' key={index} />
            ))}
          </div>
        ) : (
          ''
        )}

        <div className='flex flex-col w-full mt-4'>
          <div className='w-full flex flex-col'>
            <p className='text-xl font-medium'>Change shipping price</p>
            <div className='flex items-center w-full'>
              <p className='font-medium text-lg mr-2'>$</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                value={formShippingPrice}
                onChange={(e) => setFormShippingPrice(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full flex flex-col mt-4'>
            <p className='text-xl font-medium'>Change estimated delivery</p>
            <p className='text-gray-400'>This is copied from Aliexpress</p>
            <input
              type='date'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
              value={moment.utc(formEstimatedDelivery).format('YYYY-MM-DD')}
              onChange={(e) => setFormEstimatedDelivery(e.target.value)}
            />
            <a
              className='border-slate-800 border-2 rounded flex items-center justify-center text-slate-800 w-full mt-2 hover:text-white hover:bg-slate-800'
              href={product?.aliUrl}
              target='_blank'
            >
              View on Aliexpress
            </a>
          </div>
        </div>

        <div className='w-full flex flex-col'>
          <div className='flex flex-col w-full'>
            <p className='text-xl font-medium mt-4'>Shipping from</p>
            <div className='w-full flex flex-col p-4 border-2 rounded-md mt-2 h-24'>
              <p className='text-gray-400'>
                Aliexpress ships this product from
              </p>
              <p className='text-xl'>{product?.aliShipsFrom}</p>
            </div>
          </div>

          <div className='flex flex-col w-full'>
            <p className='text-xl font-medium mt-4'>Shipping to</p>
            <div className='w-full flex flex-col p-4 border-2 rounded-md mt-2 h-24'>
              <p className='text-gray-400'>Aliexpress ships this product to</p>
              <p className='text-xl'>{product?.aliShipsTo}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-4'>
          <button
            className='w-full h-10 rounded border-red-400 border-2 text-red-400 hover:bg-red-400 hover:text-white mr-2'
            onClick={handleDeleteItem}
          >
            DELETE
          </button>
          <button
            className='w-full h-14 mt-2 rounded border-slate-800 border-2 text-slate-800 hover:text-white hover:bg-slate-800'
            onClick={handleSaveEdit}
          >
            SAVE
          </button>
        </div>
      </form>
    </>
  );
};

export default EditAliItemMobile;
