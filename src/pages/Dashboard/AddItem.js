import React, { useState } from 'react';
import FileUpload from './FileUpload';
import Topbar from '../../components/Topbar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import { useAddProductMutation } from '../../api/productsApiSlice';
import { uploadImageRequest } from '../../api/requests';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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

  const [addProduct, { isLoading }] = useAddProductMutation();

  //handle adding the item to the server
  const handleAddItem = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !weight ||
      !height ||
      !length ||
      !width ||
      !fileList
    ) {
      setError('All feilds must be filled in');
      return;
    }

    const images = new FormData();

    for (let i = 0; i < fileList.files.length; i++) {
      images.append('productImages', fileList.files[i]); //appends actual file object to form data
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
        weightUnit,
        sizeUnit,
        weight,
        length,
        width,
        height,
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

          <button
            className='w-40 h-30 rounded border-slate-800 border-2'
            onClick={handleAddItem}
          >
            ADD ITEM +
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
        <form className='mx-auto' onSubmit={handleAddItem}>
          {/* within this form inputs needed to set above state */}
          <p className='text-xl font-medium'>Details</p>
          <div className='p-4'>
            <p className='text-gray-400'>Title</p>
            <input
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Short Description</p>
            <textarea
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className='w-full flex justify-between'>
              <div className='flex flex-col w-3/6'>
                <p className='text-gray-400 mt-4'>Price</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
                  placeholder='Price'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className='flex flex-col w-3/6 ml-4'>
                <p className='text-gray-400 mt-4'>Stock</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
                  placeholder='Stock'
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
          </div>
          <p className='text-gray-400 p-4'>Publish</p>
          <div className='w-10/12 flex p-4'>
            <FormControlLabel
              label='Publish to store'
              control={
                <Switch
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
              }
            />
          </div>

          <p className='text-xl font-medium'>Package</p>

          <div className='p-4'>
            <div className='flex justify-between w-6/12'>
              <div>
                <p className='text-gray-400'>Weight</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div>
                <p className='text-gray-400'>Unit</p>
                <select
                  className='rounded-md border-2 w-32 h-12'
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value)}
                >
                  <option value='pound'>Pounds</option>
                  <option value='ounce'>Ounces</option>
                </select>
              </div>
            </div>
          </div>

          <div className='p-4 flex justify-between'>
            <div>
              <p className='text-gray-400'>Height</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Width</p>
              <input
                type='number'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-md p-2'
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>

            <div>
              <p className='text-gray-400'>Length</p>
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
          </div>

          <p className='text-xl font-medium mt-4'>Media</p>
          {/* <Media productId={productId} /> */}

          <div className='p-4 mt-4'>
            <p>+ Add images</p>
            <FileUpload fileList={fileList} setFileList={setFileList} />
          </div>

          <button
            className='w-full text-xl border-2 border-slate-800 hover:border-slate-600 h-10 rounded'
            type='submit'
          >
            ADD ITEM +
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddItem;
