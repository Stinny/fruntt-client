import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import moment from 'moment';
import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { SiAliexpress } from 'react-icons/si';
import AliOptions from '../../components/AddItem/AliOptions';
import { useAddAliProductMutation } from '../../api/productsApiSlice';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';

const AliItem = () => {
  const { state } = useLocation(); //pulls out the state data
  const { product, reviews, aliRating } = state;

  const navigate = useNavigate();

  const [error, setError] = useState('');

  //form state
  const [description, setDescription] = useState(product?.item?.title);
  const [itemUrl, setItemUrl] = useState(product?.item?.itemUrl);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(product?.item?.images);
  const [shippingList, setShippingList] = useState(
    product?.delivery?.shippingList
  );
  const [shippingFrom, setShippingFrom] = useState(
    product?.delivery?.shippingFrom
  );
  const [shippingTo, setShippingTo] = useState(product?.delivery?.shippingTo);
  const [options, setOptions] = useState(product?.item?.sku?.props);
  const [numOfSales, setNumOfSales] = useState(product?.item?.sales);
  const [published, setPublished] = useState(true);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  //reviews
  const [prodReviews, setProdReviews] = useState(reviews);
  const [totalRating, setTotalRating] = useState(aliRating);

  const [addAliProduct, result] = useAddAliProductMutation();

  useEffect(() => {
    setError('');
  }, [title, description, productPrice, stock]);

  const handleAddAliItem = async (e) => {
    e.preventDefault();

    if (!title || !description || !productPrice || !stock) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const addProductReq = await addAliProduct({
        title,
        productPrice,
        description,
        shippingFrom,
        shippingTo,
        prodReviews,
        totalRating,
        numOfSales,
        stock,
        published,
        itemUrl,
        options,
        images,
        shippingPrice,
        estimatedDelivery,
      }).unwrap();

      if (addProductReq === 'Item added') {
        navigate('/dashboard/item');
      } else {
        setError('There was an error, try again');
      }
    } catch (err) {
      setError('There was a server error');
    }
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-fit'>
        <div className='w-full p-2 border-b-2 flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='text-2xl font-medium'>
              Importing product from Aliexpress
            </p>
            <p className='text-gray-400 font-medium w-10/12'>
              When importing a product from Aliexpress, keep in mind that when
              your product page recieves orders, you will have to manually
              fulfill orders on Aliexpress as well
            </p>
          </div>

          <button
            onClick={handleAddAliItem}
            className='border-2 border-slate-800 rounded w-36 h-10 text-slate-800 hover:text-white hover:bg-slate-800'
          >
            + Add product
          </button>
        </div>
        <form className='mx-auto p-2' onSubmit={handleAddAliItem}>
          {error && (
            <Alert severity='error' className='mt-2 mb-2'>
              {error}
            </Alert>
          )}
          {/* within this form inputs needed to set above state */}
          <div className='flex items-center'>
            <p className='text-xl font-medium'>Details</p>
            <Tooltip
              title={
                <p className='text-lg'>
                  All these details will be visible to customers on your product
                  page
                </p>
              }
              className='ml-2 text-lg'
              placement='bottom'
              enterTouchDelay={10}
              leaveTouchDelay={5000}
            >
              <button type='button'>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
          </div>

          <div>
            <p className='text-gray-400 mt-4'>Product Title</p>

            <input
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
              placeholder='Enter a product title'
              onChange={(e) => setTitle(e.target.value)}
            />

            <p className='text-gray-400 mt-4'>Product Description(optional)</p>
            <textarea
              type='text'
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            <div className='w-full flex justify-between'>
              <div className='flex flex-col w-2/6'>
                <p className='text-gray-400 mt-4'>Set your price</p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                  placeholder='Enter price'
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>

              <div className='flex flex-col w-2/6 ml-4'>
                <p className='text-gray-400 mt-4'>
                  How many would you like to sell?
                </p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                  onChange={(e) => setStock(e.target.value)}
                  placeholder='Enter stock'
                />
              </div>

              <div className='flex flex-col w-2/6 ml-4'>
                <p className='text-gray-400 mt-4'>
                  Number of sales(from Aliexpress)
                </p>
                <p className='flex text-3xl font-medium'>{numOfSales}</p>
              </div>
            </div>
          </div>

          <div>
            <p className='text-gray-400 mt-2'>Publish</p>
            <div className='w-10/12 flex'>
              <FormControlLabel
                label='Publish to page'
                control={
                  <Switch
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                }
              />
            </div>
          </div>

          <div>
            <p className='text-gray-400 mt-4'>Product options</p>
            <AliOptions options={options} />
          </div>

          <div className='flex items-center mt-2'>
            <p className='text-xl font-medium'>Media</p>
            <Tooltip
              title={
                <p className='text-lg'>
                  Images that are imported from Aliexpress
                </p>
              }
              className='ml-2'
              placement='bottom'
              enterTouchDelay={10}
              leaveTouchDelay={5000}
            >
              <button type='button'>
                <AiOutlineInfoCircle />
              </button>
            </Tooltip>
          </div>

          {product?.item?.images.length > 0 ? (
            <div className='flex flex-wrap w-full'>
              {product?.item?.images.map((img, index) => (
                <img src={img} className='w-32' key={index} />
              ))}
            </div>
          ) : (
            ''
          )}
          {/* {product?.item?.description?.images.length > 0 ? (
            <div className='flex flex-wrap w-full'>
              {product?.item?.description?.images.map((img) => (
                <img src={img} className='w-32' />
              ))}
            </div>
          ) : (
            ''
          )} */}

          {prodReviews.length > 0 ? (
            <>
              <p className='text-xl font-medium mt-4'>
                Reviews being imported({prodReviews.length})
              </p>
              <div className='flex items-center'>
                <p className='text-xl mr-2'>{totalRating}</p>
                <Rating
                  precision={0.1}
                  value={aliRating}
                  readOnly
                  size='large'
                />
              </div>
            </>
          ) : (
            <p className='text-xl font-medium'>Reviews being imported(0)</p>
          )}

          {prodReviews.length > 0 ? (
            <div className='flex flex-col h-48 overflow-y-scroll'>
              {prodReviews.map((review) => (
                <div className='flex flex-col bg-gray-200 p-4 rounded mt-2'>
                  <div className='flex w-full'>
                    <p>
                      {moment(review?.review?.reviewDate).format('MMM D, YYYY')}
                    </p>
                  </div>

                  <Rating
                    value={review?.review?.reviewStarts}
                    readOnly
                    size='medium'
                    className='mt-2'
                    precision={0.5}
                  />
                  <p className='md:text-xl mt-2'>
                    {review?.review?.reviewContent}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className='border-2 rounded mt-2 flex items-center justify-center h-28'>
              <p>This product has no reviews</p>
            </div>
          )}

          <div className='flex justify-between w-full mt-4'>
            <div className='flex flex-col w-3/6'>
              <p className='text-xl font-medium'>Ships from</p>
              <input
                type='text'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                value={shippingFrom}
                disabled
              />
            </div>
            <div className='flex flex-col w-3/6'>
              <p className='text-xl font-medium'>Ships to</p>
              <input
                type='text'
                className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 ml-2'
                value={shippingTo}
                disabled
              />
            </div>
          </div>

          <div className='w-full flex flex-col mt-4'>
            <div className='flex flex-col border-b p-2'>
              <p className='text-xl font-medium'>
                Set shipping price & estimated delivery
              </p>
              <p className='text-gray-400'>
                Base your price and estimated delivery on what you will pay when
                placing the order on Aliexpress. References shown below.
              </p>
            </div>

            <div className='w-full flex justify-between mt-2'>
              <div className='flex flex-col w-3/6'>
                <p className='text-gray-400'>
                  Price (keep 0 to offer free shipping)
                </p>
                <input
                  type='number'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                  value={shippingPrice}
                  onChange={(e) => setShippingPrice(e.target.value)}
                />
              </div>
              <div className='flex flex-col w-3/6 ml-2'>
                <p className='text-gray-400'>Estimated delivery</p>
                <input
                  type='date'
                  className='border-2 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0'
                  onChange={(e) => setEstimatedDelivery(e.target.value)}
                />
              </div>
            </div>
            <p className='font-medium mt-4'>What you'll pay on Aliexpress</p>
            <div className='w-full flex flex-wrap'>
              {shippingList.map((ship) => (
                <div className='w-3/12 ml-2 mt-2 bg-gray-200 p-2 flex flex-col rounded'>
                  <p className='font-medium'>Price:</p>
                  <p>${ship?.shippingFee}</p>
                  <p className='font-medium'>Estimated delivery:</p>
                  <p>
                    {moment(ship?.estimateDeliveryDate).format('MMM D, YYYY')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <Alert severity='error' className='mt-2 mb-2'>
              {error}
            </Alert>
          )}

          <div className='flex flex-col mt-4'>
            <button
              className='w-full h-14 mt-2 rounded border-slate-800 border-2 text-slate-800 hover:text-white hover:bg-slate-800'
              type='submit'
            >
              + ADD PRODUCT
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AliItem;
