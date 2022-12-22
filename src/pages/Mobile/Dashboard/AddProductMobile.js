import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import OptionsForm from '../../../components/AddItem/OptionsForm';
import FileUpload from '../../Dashboard/FileUpload';
import { states } from '../../../states.js';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

const AddProductMobile = ({
  error,
  setTitle,
  setDescription,
  setPrice,
  setStock,
  setState,
  setZip,
  setCity,
  setAddress,
  setShippingPrice,
  setWeight,
  setWeightUnit,
  setOptionName,
  setOptionVals,
  setOptions,
  optionName,
  optionVals,
  handleCancel,
  handleAddItem,
  published,
  setPublished,
  options,
  fileList,
  setFileList,
}) => {
  //info popups for the different fields
  const detailsInfo =
    'Item details. These details will be seen on your single item storefront by all your customers. Stock is for us to know when your item is still available or not.';
  const packageInfo =
    'Package details. These details allow us to calculate proper shipping rates and generate shipping labels for your orders';
  const mediaInfo =
    'Media can be better to showcase your item and its use cases to your customers.';
  const optionsInfo = 'Add options to your item like size, color, etc.';
  const inventoryInfo =
    'This address is needed to properly generate shipping labels.';

  return (
    <div className='w-full mx-auto p-2'>
      <div className='mb-10 flex justify-between border-b-2'>
        <h2 className='text-xl font-medium'>Add a product</h2>

        <div className='flex'>
          <button
            className='w-20 h-10 text-sm rounded border-red-400 text-red-400 border-2 mr-2 hover:text-white hover:bg-red-400'
            onClick={handleCancel}
            type='button'
          >
            CANCEL
          </button>
          <button
            className='w-20 h-10 text-sm rounded border-slate-800 border-2 hover:text-white hover:bg-slate-800'
            onClick={handleAddItem}
            type='button'
          >
            + ADD
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
      <form className='mx-auto' onSubmit={handleAddItem}>
        <div className='flex items-center'>
          <p className='text-xl font-medium'>Details</p>
          <Tooltip
            title={<p className='text-lg'>{detailsInfo}</p>}
            className='ml-2 text-lg'
            placement='bottom'
            enterTouchDelay={10}
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>
        <div>
          <p className='text-gray-400'>Product Title</p>
          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />

          <p className='text-gray-400 mt-4'>Product Description(optional)</p>
          <textarea
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className='w-full flex justify-between'>
            <div className='flex flex-col w-3/6'>
              <p className='text-gray-400 mt-4'>Product Price</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                placeholder='Price'
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className='flex flex-col w-3/6 ml-4'>
              <p className='text-gray-400 mt-4'>Product Stock</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                placeholder='Stock'
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
        </div>
        <p className='text-gray-400 pl-2'>Publish</p>
        <div className='w-10/12 flex p-2 pl-2'>
          <FormControlLabel
            label='Publish to storefront'
            control={
              <Switch
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
            }
          />
        </div>

        <div className='flex items-center'>
          <p className='text-xl font-medium'>Options</p>
          <Tooltip
            title={<p className='text-lg'>{optionsInfo}</p>}
            className='ml-2 text-lg'
            placement='bottom'
            enterTouchDelay={10}
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>

        <OptionsForm
          options={options}
          setOptions={setOptions}
          setOptionName={setOptionName}
          setOptionVals={setOptionVals}
          optionName={optionName}
          optionVals={optionVals}
        />

        <div className='flex items-center mt-4'>
          <p className='text-xl font-medium'>Media</p>
          <Tooltip
            title={<p className='text-lg'>{mediaInfo}</p>}
            className='ml-2 text-lg'
            placement='bottom'
            enterTouchDelay={10}
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>
        {/* <Media productId={productId} /> */}

        <div className='p-2 mt-2'>
          <p>+ Add images</p>
          <FileUpload fileList={fileList} setFileList={setFileList} />
        </div>

        <div className='flex items-center mt-4'>
          <p className='text-xl font-medium'>Ships from</p>

          <Tooltip
            title={<p className='text-lg'>{inventoryInfo}</p>}
            className='ml-2 text-lg'
            placement='bottom'
            enterTouchDelay={10}
          >
            <button type='button' disabled>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>

        <div className='w-full'>
          <p className='text-gray-400'>Address</p>
          <input
            className='w-full border-2 border-slate-200 hover:border-slate-300 rounded p-2 mt-2 outline outline-0'
            type='text'
            placeholder='Address'
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className='w-full flex justify-between mb-2'>
          <div className='flex flex-col w-3/12'>
            <p className='text-gray-400'>Country</p>
            <select className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'>
              <option>United States</option>
            </select>
          </div>

          <div className='flex flex-col w-3/12 ml-2'>
            <p className='text-gray-400'>State</p>
            <select
              onChange={(e) => setState(e.target.value)}
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
            >
              <option disabled selected hidden className='text-gray-400'>
                State
              </option>
              {states.map((state, index) => (
                <option key={index}>{state}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col w-3/12 ml-2'>
            <p className='text-gray-400'>City</p>
            <input
              type='text'
              placeholder='City'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className='flex flex-col w-3/12 ml-2'>
            <p className='text-gray-400'>Zipcode</p>
            <input
              type='text'
              placeholder='Zipcode'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
        </div>

        <div className='flex flex-col justify-between'>
          <div className='w-full'>
            <div className='flex items-center'>
              <p className='text-xl font-medium'>Package</p>
              <Tooltip
                title={<p className='text-lg'>{packageInfo}</p>}
                className='ml-2 text-lg'
                placement='bottom'
                enterTouchDelay={10}
              >
                <button type='button' disabled>
                  <AiOutlineInfoCircle />
                </button>
              </Tooltip>
            </div>

            <div>
              <div className='flex justify-between w-full'>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-gray-400'>Weight</p>
                    <input
                      type='number'
                      className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                      onChange={(e) => setWeight(e.target.value)}
                      step='0.1'
                    />
                  </div>
                  <div className='ml-2'>
                    <p className='text-gray-400'>Unit</p>
                    <select
                      className='rounded-md border-2 w-32 h-12'
                      onChange={(e) => setWeightUnit(e.target.value)}
                    >
                      <option value='pound'>Pounds</option>
                      <option value='ounce'>Ounces</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <div className='flex items-center'>
              <p className='text-xl font-medium'>Shipping price</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    The price customers will pay for shipping
                  </p>
                }
                className='ml-2 text-lg'
                placement='bottom'
                enterTouchDelay={10}
              >
                <button type='button' disabled>
                  <AiOutlineInfoCircle />
                </button>
              </Tooltip>
            </div>

            <div>
              <div>
                <p className='text-gray-400'>Price</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                  onChange={(e) => setShippingPrice(e.target.value)}
                  step='0.01'
                />
              </div>
            </div>
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
        <button
          className='w-full h-14 border-2 rounded border-slate-800 mt-4'
          type='submit'
        >
          + Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductMobile;
