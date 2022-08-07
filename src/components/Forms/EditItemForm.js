import React, { useState, useEffect } from 'react';
import FileUpload from '../../pages/Dashboard/FileUpload';
import { useNavigate } from 'react-router-dom';
import { useUpdateProductMutation } from '../../api/productsApiSlice';
import Media from '../Media';
import { uploadImageRequest } from '../../api/requests';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

const EditItemForm = ({
  title,
  description,
  price,
  stock,
  published,
  images,
  productId,
  weightUnit,
  sizeUnit,
  weight,
  height,
  length,
  width,
  refetch,
}) => {
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
  const [formPrice, setFormPrice] = useState(price);
  const [formStock, setFormStock] = useState(stock);
  const [formPublished, setFormPublished] = useState(published);
  const [formWeightUnit, setFormWeightUnit] = useState(weightUnit);
  const [formSizeUnit, setFormSizeUnit] = useState(sizeUnit);
  const [formWeight, setFormWeight] = useState(weight);
  const [formLength, setFormLength] = useState(length);
  const [formHeight, setFormHeight] = useState(height);
  const [formWidth, setFormWidth] = useState(width);

  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState('');

  //hooks from our apiSlice's
  const [updateProduct, result] = useUpdateProductMutation();

  const navigate = useNavigate();

  //info popups for the different fields
  const detailsInfo =
    'Item details. These details will be seen on your single item storefront by all your customers. Stock is for us to know when your item is still available or not.';
  const packageInfo =
    'Package details. These details allow us to calculate proper shipping rates and generate shipping labels for your orders';
  const mediaInfo =
    'Media is needed to showcase your item and can be seen by your customers on your single item storefront.';

  const handleSaveEdit = async (e) => {
    console.log('trying to save');
    e.preventDefault();

    try {
      let imagesDataReq;

      if (fileList?.files?.length) {
        const images = new FormData();

        for (let i = 0; i < fileList.files.length; i++) {
          images.append('productImages', fileList.files[i]); //appends actual file object to form data
        }

        imagesDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          images
        );
      }

      // console.log(imagesDataReq.data);

      const updateItemReq = await updateProduct({
        productId,
        formTitle,
        formDescription,
        formPrice,
        formStock,
        formPublished,
        formWeightUnit,
        formSizeUnit,
        formWeight,
        formHeight,
        formLength,
        formWidth,
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
    formHeight,
    formLength,
    formWidth,
    formWeightUnit,
    formSizeUnit,
    formStock,
    fileList,
  ]);

  return (
    <>
      <div className='mb-10 flex justify-between'>
        <h2 className='text-3xl font-medium'>Edit Your Item</h2>

        <button
          className='w-32 h-30 rounded border-slate-800 border-2'
          onClick={handleSaveEdit}
        >
          SAVE
        </button>
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
        <p className='text-gray-400 p-4'>Publish</p>
        <div className='w-10/12 flex mt-4 p-2'>
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

          <div className=' flex justify-between'>
            <div>
              <p className='text-gray-400'>Height</p>
              <input
                type='number'
                value={formHeight}
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                onChange={(e) => setFormHeight(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Width</p>
              <input
                type='number'
                value={formWidth}
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                onChange={(e) => setFormWidth(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Length</p>
              <input
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                type='number'
                value={formLength}
                onChange={(e) => setFormLength(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Unit</p>
              <select
                className='rounded-md border-2 w-32 h-12'
                value={formSizeUnit}
                onChange={(e) => setFormSizeUnit(e.target.value)}
              >
                <option value='inches'>Inches</option>
                <option value='centimeters'>Centimeters</option>
              </select>
            </div>
          </div>
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

        <button
          className='w-full text-xl border-2 border-slate-800 hover:border-slate-600 h-10 rounded'
          type='submit'
        >
          Save
        </button>
      </form>
    </>
  );
};

export default EditItemForm;
