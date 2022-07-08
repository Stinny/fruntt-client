import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductQuery,
  useUpdateProductMutation,
  selectProductById,
} from '../../api/productsApiSlice';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import FileUpload from '../Dashboard/FileUpload';
import { productSlice } from '../../redux/productRedux';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Spinner from '../../components/Spinner';

const EditProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = React.useState({});
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  const [images, setImages] = React.useState([]); //gets filled with product image data{url, key}
  const [updated, setUpdated] = React.useState(false);
  const [published, setPublished] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);
  const dispatch = useDispatch();

  // const { data: product, isLoading, isSuccess, refetch } = useGetProductQuery({
  //   productId,
  // });
  // const product = useSelector((state) => selectProductById(state, productId));

  const handleUpdateProduct = () => {};

  // useEffect(() => {
  //   refetch();
  // }, []);

  // //sets the state so the form can be pre-filled
  // useEffect(() => {
  //   setTitle(product.title);
  //   setDescription(product.description);
  //   setPrice(product.price);
  //   setImages(product.images);
  //   setPublished(product.published);
  //   setStock(product.stock);
  // }, [isSuccess]);

  // const handleSaveEdit = (e) => {
  //   e.preventDefault();
  //   editProduct({ title, description, price }, productId, dispatch);
  //   setUpdated(true);
  // };

  let content;
  if (true) {
    content = <Spinner />;
  } else if (false) {
    // setProductData(product);

    content = (
      <div>
        <form
          className='flex flex-col items-center'
          onSubmit={handleUpdateProduct}
        >
          {/* within this form inputs needed to set above state */}

          <input
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-3/6 rounded-lg mt-4 p-2'
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <textarea
            type='text'
            className='border-2 border-slate-200 hover:border-slate-300 w-3/6 rounded-lg mt-4 p-2'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <input
            type='number'
            className='border-2 border-slate-200 hover:border-slate-300 w-3/6 rounded-lg mt-4 p-2'
            placeholder='Price'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />

          <input
            type='number'
            className='border-2 border-slate-200 hover:border-slate-300 w-3/6 rounded-lg mt-4 p-2'
            placeholder='Stock'
            onChange={(e) => setStock(e.target.value)}
            value={stock}
          />

          <div className='w-3/6 flex mt-4'>
            <FormControlLabel
              control={<Switch onChange={(e) => setPublished(!published)} />}
              label='Publish to store'
            />
          </div>

          <div className='w-3/6 mt-4 mb-4'>
            <FileUpload fileList={fileList} setFileList={setFileList} />
          </div>

          <button
            type='submit'
            className='h-12 w-3/6 border-2 border-stone-800 hover:text-white hover:bg-stone-800 font-medium text-stone-800 rounded-lg text-sm flex justify-center items-center'
          >
            Add Product +
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>{content}</div>
      <Footer />
    </>
  );
};

export default EditProduct;
