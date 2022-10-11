import React, { useState, useEffect } from 'react';
import FileUpload from '../../pages/Dashboard/FileUpload';
import { useNavigate } from 'react-router-dom';
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../api/productsApiSlice';
import Media from '../Media';
import { uploadImageRequest } from '../../api/requests';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import EditOptionsForm from '../../components/Forms/EditOptionsForm';
import { states } from '../../states';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import OptionsForm from '../AddItem/OptionsForm';

const EditItemForm = ({
  itemId,
  title,
  description,
  price,
  stock,
  published,
  images,
  productId,
  weightUnit,
  address,
  country,
  state,
  city,
  zipcode,
  weight,
  options,
  refetch,
}) => {
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
  const [formPrice, setFormPrice] = useState(price);
  const [formStock, setFormStock] = useState(stock);
  const [formPublished, setFormPublished] = useState(published);
  const [formWeightUnit, setFormWeightUnit] = useState(weightUnit);
  const [formAddress, setFormAddress] = useState(address);
  const [formCountry, setFormCountry] = useState(country);
  const [formState, setFormState] = useState(state);
  const [formCity, setFormCity] = useState(city);
  const [formZip, setFormZip] = useState(zipcode);
  const [formWeight, setFormWeight] = useState(weight);
  const [formOptions, setFormOptions] = useState(options);

  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState('');

  //hooks from our apiSlice's
  const [updateProduct, result] = useUpdateProductMutation();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const navigate = useNavigate();

  //info popups for the different fields
  const detailsInfo =
    'Item details. These details will be seen on your single item storefront by all your customers. Stock is for us to know when your item is still available or not.';
  const packageInfo =
    'Package details. These details allow us to calculate proper shipping rates and generate shipping labels for your orders';
  const mediaInfo =
    'Media is needed to showcase your item and can be seen by your customers on your single item storefront.';

  const handleDeleteItem = async () => {
    const deleteItemReq = await deleteProduct(itemId);
    navigate('/dashboard/item');
  };

  const handleSaveEdit = async (e) => {
    console.log('trying to save');
    e.preventDefault();

    try {
      let imagesDataReq;

      if (fileList?.length) {
        const images = new FormData();

        for (let i = 0; i < fileList.length; i++) {
          images.append('productImages', fileList[i]); //appends actual file object to form data
        }

        imagesDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          images
        );
      }

      const updateItemReq = await updateProduct({
        productId,
        formTitle,
        formDescription,
        formPrice,
        formStock,
        formPublished,
        formWeight,
        formWeightUnit,
        formAddress,
        formCountry,
        formCity,
        formState,
        formZip,
        formOptions,
        imageData: imagesDataReq ? imagesDataReq.data : [],
      }).unwrap();

      navigate('/dashboard/item');
    } catch (err) {
      setError(err.message);
      return;
    }
  };

  useEffect(() => {
    setError('');
  }, [
    formTitle,
    formDescription,
    formPrice,
    formPublished,
    formWeight,
    formWeightUnit,
    formStock,
    options,
    fileList,
  ]);

  return (
    <>
      <div className='mb-10 flex justify-between p-2 border-b-2'>
        <h2 className='text-3xl font-medium'>Edit Your Item</h2>

        <div className='flex justify-between'>
          <button
            className='w-32 h-10 rounded border-red-400 border-2 text-red-400 mr-2'
            onClick={handleDeleteItem}
          >
            DELETE
          </button>
          <button
            className='w-32 h-10 rounded border-slate-800 border-2'
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
            title={<p className='text-lg'>{detailsInfo}</p>}
            className='ml-2 text-lg'
            placement='right-end'
          >
            <button>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>

        <div className='p-4'>
          <p className='text-gray-400'>Title</p>

          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
            placeholder='Title'
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />

          <p className='text-gray-400 mt-4'>Description</p>
          <textarea
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
            placeholder='Description'
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />

          <div className='w-full flex justify-between'>
            <div className='flex flex-col w-3/6'>
              <p className='text-gray-400 mt-4'>Price</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
                placeholder='Price'
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
              />
            </div>

            <div className='flex flex-col w-3/6 ml-4'>
              <p className='text-gray-400 mt-4'>Stock</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
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

        <div className='p-4'>
          <p className='text-gray-400 mt-4'>Item options</p>
          <EditOptionsForm
            formOptions={formOptions}
            setFormOptions={setFormOptions}
          />
        </div>

        <div className='flex items-center'>
          <p className='text-xl font-medium'>Media</p>
          <Tooltip
            title={<p className='text-lg'>{mediaInfo}</p>}
            className='ml-2'
            placement='right-end'
          >
            <button>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>
        <Media productId={productId} />

        <div className='p-4'>
          <p>+ Add new images</p>
          <FileUpload fileList={fileList} setFileList={setFileList} />
        </div>

        <div className='flex items-center mt-4'>
          <p className='text-xl font-medium'>Ships from</p>
        </div>

        <div className='w-full p-4'>
          <p className='text-gray-400'>Address</p>
          <input
            className='w-full border-2 border-slate-200 hover:border-slate-300 rounded-lg p-2 mt-2 outline outline-0'
            type='text'
            placeholder='Address'
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
          />
        </div>

        <div className='w-full flex justify-between mb-2 p-4'>
          <div className='flex flex-col w-3/12'>
            <p className='text-gray-400'>Country</p>
            <select className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'>
              <option>United States</option>
            </select>
          </div>

          <div className='flex flex-col w-3/12 ml-2'>
            <p className='text-gray-400'>State</p>
            <select
              onChange={(e) => setFormState(e.target.value)}
              value={formState}
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'
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
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0'
              onChange={(e) => setFormCity(e.target.value)}
              value={formCity}
            />
          </div>

          <div className='flex flex-col w-3/12 ml-2'>
            <p className='text-gray-400'>Zipcode</p>
            <input
              type='text'
              placeholder='Zipcode'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0'
              onChange={(e) => setFormZip(e.target.value)}
              value={formZip}
            />
          </div>
        </div>

        <div className='flex items-center'>
          <p className='text-xl font-medium'>Package</p>
          <Tooltip
            title={<p className='text-lg'>{packageInfo}</p>}
            className='ml-2 text-lg'
            placement='right-end'
          >
            <button>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
        </div>

        <div className='p-4'>
          <div className='flex justify-between w-6/12'>
            <div>
              <p className='text-gray-400'>Weight</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                value={formWeight}
                onChange={(e) => setFormWeight(e.target.value)}
              />
            </div>
            <div>
              <p className='text-gray-400'>Unit</p>
              <select
                className='rounded-md border-2 w-32 h-12'
                value={formWeightUnit}
                onChange={(e) => setFormWeightUnit(e.target.value)}
              >
                <option value='pound'>Pounds</option>
                <option value='ounce'>Ounces</option>
              </select>
            </div>
          </div>
        </div>

        <div className='w-full p-4'>
          <button
            className='w-full h-14 text-xl border-2 border-slate-800 hover:border-slate-600 rounded'
            type='submit'
          >
            SAVE ITEM
          </button>
        </div>
      </form>
    </>
  );
};

export default EditItemForm;
