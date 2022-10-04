import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { useAddProductMutation } from '../../api/productsApiSlice';
import { uploadImageRequest } from '../../api/requests';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { states } from '../../states.js';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import OptionsForm from '../../components/AddItem/OptionsForm';

const AddItem = () => {
  //hooks
  const navigate = useNavigate();

  //component state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [published, setPublished] = useState(false);
  const [weightUnit, setWeightUnit] = useState('pound');
  const [sizeUnit, setSizeUnit] = useState('inches');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [error, setError] = useState('');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');

  //for adding item options
  const [options, setOptions] = useState([]);
  const [optionName, setOptionName] = useState('');
  const [optionVals, setOptionVals] = useState([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

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

  const handleCancel = () => {
    navigate('/dashboard/item');
  };

  //handle adding the item to the server
  const handleAddItem = async (e) => {
    e.preventDefault();

    console.log(fileList.length);
    if (!title || !price || !stock || !weight || fileList?.length < 1) {
      setError('All feilds must be filled in');
      return;
    }

    const images = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      images.append('productImages', fileList[i]); //appends actual file object to form data
    }

    //api request for uploading the images to our s3 bucket
    try {
      const imagesDataReq = await uploadImageRequest.post(
        '/products/imageupload',
        images
      );

      const addProductReq = await addProduct({
        title,
        description,
        price,
        stock,
        published,
        city,
        state,
        country,
        zip,
        address,
        weightUnit,
        sizeUnit,
        weight,
        length,
        width,
        height,
        options,
        imageData: imagesDataReq.data,
      }).unwrap();

      navigate('/dashboard/item');
    } catch (err) {
      setError('There was an error');
      return;
    }
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto'>
        <div className='mb-10 flex justify-between border-b-2 p-2'>
          <h2 className='text-3xl font-medium'>Add Your Item</h2>

          <div className='flex'>
            <button
              className='w-32 h-10 rounded border-red-400 text-red-400 border-2 mr-2'
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button
              className='w-32 h-10 rounded border-slate-800 border-2'
              onClick={handleAddItem}
            >
              ADD ITEM +
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
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
          </div>
          <div className='p-4'>
            <p className='text-gray-400'>Item Title</p>
            <input
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Item Description(optional)</p>
            <textarea
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className='w-full flex justify-between'>
              <div className='flex flex-col w-3/6'>
                <p className='text-gray-400 mt-4'>Item Price</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'
                  placeholder='Price'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className='flex flex-col w-3/6 ml-4'>
                <p className='text-gray-400 mt-4'>Item Stock</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0 bg-white'
                  placeholder='Stock'
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <p className='text-gray-400 pl-4'>Publish</p>
          <div className='w-10/12 flex p-2 pl-4'>
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
              placement='right-end'
            >
              <button>
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
              placement='right-end'
            >
              <button>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
          </div>
          {/* <Media productId={productId} /> */}

          <div className='p-4 mt-4'>
            <p>+ Add images</p>
            <FileUpload fileList={fileList} setFileList={setFileList} />
          </div>

          <div className='flex items-center mt-4'>
            <p className='text-xl font-medium'>Ships from</p>

            <Tooltip
              title={<p className='text-lg'>{inventoryInfo}</p>}
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
              onChange={(e) => setAddress(e.target.value)}
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
                onChange={(e) => setState(e.target.value)}
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
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className='flex flex-col w-3/12 ml-2'>
              <p className='text-gray-400'>Zipcode</p>
              <input
                type='text'
                placeholder='Zipcode'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg p-2 outline outline-0'
                onChange={(e) => setZip(e.target.value)}
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
              <div className='w-10/12'>
                <p className='text-gray-400'>Package Weight</p>
                <input
                  type='number'
                  step='0.1'
                  className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className='w-2/12'>
                <p className='text-gray-400'>Unit</p>
                <select
                  className='rounded-md border-2 w-full h-10 ml-2'
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                >
                  <option value='pound'>Pounds</option>
                  <option value='ounce'>Ounces</option>
                </select>
              </div>
            </div>
          </div>

          {/* <div className='p-4 flex justify-between'>
            <div>
              <p className='text-gray-400'>Package Height</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Package Width</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Package Length</p>
              <input
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                type='number'
                onChange={(e) => setLength(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Unit</p>
              <select
                className='rounded-md border-2 w-32 h-12'
                value={sizeUnit}
                onChange={(e) => setSizeUnit(e.target.value)}
              >
                <option value='inches'>Inches</option>
                <option value='centimeters'>Centimeters</option>
              </select>
            </div>
          </div> */}

          <button
            className='w-full h-14 text-xl border-2 border-slate-800 hover:border-slate-600 rounded'
            type='submit'
          >
            ADD ITEM +
          </button>

          <button
            className='w-full text-xl border-2 border-red-400 hover:border-red-400 text-red-400 h-10 rounded mt-2'
            type='button'
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddItem;
