import React, { useState, useEffect } from 'react';
import FileUpload from '../../pages/Dashboard/FileUpload';
import { useNavigate, Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../api/productsApiSlice';
import Media from '../Media';
import { uploadImageRequest } from '../../api/requests';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import EditOptionsForm from '../../components/Forms/EditOptionsForm';
import { states } from '../../states';
import { BsArrowLeftShort } from 'react-icons/bs';
import OptionsForm from '../AddItem/OptionsForm';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

const EditItemForm = ({ product, productId }) => {
  const [formTitle, setFormTitle] = useState(product?.title);
  const [formDescription, setFormDescription] = useState(product?.description);
  const [formPrice, setFormPrice] = useState(product?.price);
  const [formStock, setFormStock] = useState(product?.stock);
  const [formPublished, setFormPublished] = useState(product?.published);
  const [formWeightUnit, setFormWeightUnit] = useState(product?.weightUnit);
  const [formAddress, setFormAddress] = useState(product?.shipsFrom?.address);
  const [formCountry, setFormCountry] = useState(product?.shipsFrom?.country);
  const [formState, setFormState] = useState(product?.shipsFrom?.state);
  const [formCity, setFormCity] = useState(product?.shipsFrom?.city);
  const [formZip, setFormZip] = useState(product?.shipsFrom?.zipcode);
  const [formWeight, setFormWeight] = useState(product?.weight);
  const [formOptions, setFormOptions] = useState(product?.options);
  const [formShippingPrice, setFormShippingPrice] = useState(
    product?.shippingPrice
  );

  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState('');

  //hooks from our apiSlice's
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const navigate = useNavigate();

  //info popups for the different fields
  const detailsInfo =
    'These details will be seen on your single item storefront by all your customers. Stock is for us to know when your item is still available or not.';
  const packageInfo =
    'Package weight is needed to calculate shipping rates and create labels';
  const mediaInfo =
    'Media is needed to showcase your item and can be seen by your customers on your single item storefront.';

  const handleDeleteItem = async () => {
    const deleteItemReq = await deleteProduct(productId);
    navigate('/dashboard/item');
  };

  useEffect(() => {
    setError('');
  }, [
    formTitle,
    formDescription,
    formPrice,
    formStock,
    formAddress,
    formCity,
    formState,
    formCountry,
    formShippingPrice,
    formWeight,
  ]);

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
          <button className='w-32 h-10 rounded border-slate-800 border-2 text-slate-800 hover:text-white hover:bg-slate-800'>
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
      <form className='mx-auto'>
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

        <div className='p-4'>
          <p className='text-gray-400 mt-4'>Product options</p>
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

        <div className='flex items-center'>
          <p className='text-xl font-medium'>Ships from</p>
          <Tooltip
            title={
              <p className='text-lg'>
                The address that is used on shipping labels
              </p>
            }
            className='ml-2 text-lg'
            placement='right-end'
          >
            <button>
              <AiOutlineInfoCircle />
            </button>
          </Tooltip>
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
            <select
              onChange={(e) => setFormCountry(e.target.value)}
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'
              value={formCountry}
            >
              <option value='US'>United States</option>
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

        <div className='flex justify-between'>
          <div className='w-3/6'>
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
              <div className='flex justify-between w-full'>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-gray-400'>Weight</p>
                    <input
                      type='number'
                      className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2 outline outline-0'
                      value={formWeight}
                      onChange={(e) => setFormWeight(e.target.value)}
                      step='0.1'
                    />
                  </div>
                  <div className='ml-2'>
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
            </div>
          </div>

          <div className='w-3/6'>
            <div className='flex items-center'>
              <p className='text-xl font-medium'>Shipping price</p>
              <Tooltip
                title={
                  <p className='text-lg'>
                    The price customers will pay for shipping
                  </p>
                }
                className='ml-2 text-lg'
                placement='right-end'
              >
                <button>
                  <AiOutlineInfoCircle />
                </button>
              </Tooltip>
            </div>

            <div className='p-4'>
              <div className='flex justify-between w-full'>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-gray-400'>Price</p>
                    <input
                      type='number'
                      className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2 outline outline-0'
                      value={formShippingPrice}
                      onChange={(e) => setFormShippingPrice(e.target.value)}
                      step='0.01'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditItemForm;
