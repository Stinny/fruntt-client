import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileUpload from './FileUpload';
import { uploadImageRequest } from '../../api/requests';
import { useNavigate, Link } from 'react-router-dom';
import { useAddProductMutation } from '../../api/productsApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { BsArrowRightShort } from 'react-icons/bs';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';

const AddProduct = () => {
  //component state
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  const [published, setPublished] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !stock || !fileList) {
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
        imageData: imagesDataReq.data,
      }).unwrap();

      navigate('/dashboard/item');
    } catch (err) {
      setError('There was an error');
      return;
    }

    // //image data(urls, keys) returned from server
    // const imagesData = imagesDataReq.data;

    // console.log(imagesData);

    // addProduct(
    //   { title, description, price, stock, published, imagesData },
    //   dispatch
    // );
  };

  useEffect(() => {
    setError('');
  }, [title, description, price, stock, fileList]);

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>
        <div className='w-10/12 mx-auto flex justify-between items-center'>
          <h2 className='text-xl font-medium'>Add your item</h2>
          <Link
            to='/dashboard/item'
            className='flex justify-center items-center text-gray-400 hover:text-gray-500'
          >
            <p>item</p> <BsArrowRightShort className='text-xl' />
          </Link>
        </div>
        <div className='mx-auto w-full'>
          {error && (
            <Alert
              severity='error'
              color='error'
              className='mt-4 mb-4 mx-auto w-10/12'
            >
              {error}
            </Alert>
          )}
          <form
            className='flex flex-col justify-center mx-auto items-center'
            onSubmit={handleAddProduct}
          >
            {/* within this form inputs needed to set above state */}

            <input
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-10/12 rounded-lg mt-4 p-2'
              placeholder='Title'
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-10/12 rounded-lg mt-4 p-2'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type='number'
              className='border-2 border-slate-200 hover:border-slate-300 w-10/12 rounded-lg mt-4 p-2'
              placeholder='Price'
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type='number'
              className='border-2 border-slate-200 hover:border-slate-300 w-10/12 rounded-lg mt-4 p-2'
              placeholder='Stock'
              onChange={(e) => setStock(e.target.value)}
            />

            <div className='w-10/12 flex mt-4'>
              <FormControlLabel
                control={<Switch onChange={(e) => setPublished(!published)} />}
                label='Publish to store'
              />
            </div>

            <div className='w-10/12 mt-4 mb-4'>
              <FileUpload fileList={fileList} setFileList={setFileList} />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='h-12 w-10/12 border-2 border-stone-800 hover:text-white hover:bg-stone-800 font-medium text-stone-800 rounded-lg text-sm flex justify-center items-center'
            >
              Add Item +
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
