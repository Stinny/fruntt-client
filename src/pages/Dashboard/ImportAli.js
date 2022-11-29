import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useLazyGetAliProductQuery } from '../../api/productsApiSlice';
import { isMobile } from 'react-device-detect';

//mui
import Alert from '@mui/material/Alert';

const ImportAli = () => {
  const navigate = useNavigate();
  const [aliProductId, setAliProductId] = useState('');
  const [error, setError] = useState('');
  const [importing, setImporting] = useState(false);

  const [getAliProduct, result] = useLazyGetAliProductQuery();

  useEffect(() => {
    setError('');
  }, [aliProductId]);

  const handleGetProduct = async (e) => {
    e.preventDefault();

    setImporting(true);

    if (!aliProductId) {
      setError('Please enter Aliexpress product ID');
      setImporting(false);
      return;
    }

    try {
      const aliProductReq = await getAliProduct({
        productId: aliProductId,
      }).unwrap();

      if (aliProductReq.success) {
        console.log(aliProductReq.product);
        setImporting(false);
        navigate(`/dashboard/item/add/ali`, {
          state: {
            product: aliProductReq.product,
            reviews: aliProductReq?.reviews,
            aliRating: aliProductReq?.aliRating,
          },
        });
      } else {
        setImporting(false);
        setError(aliProductReq?.msg);
      }
    } catch (err) {
      console.log(err);
      setImporting(false);
      setError('There was a server error');
    }
  };

  return (
    <>
      <Navbar />
      <Topbar />

      <div className='h-screen max-w-6xl mx-auto border-2 border-gray-200 rounded w-full flex flex-col justify-center items-center mt-4'>
        {isMobile ? (
          <>
            <Alert severity='info' className='mx-auto mt-2 mb-2 w-10/12'>
              <span className='font-medium'>IMPORTANT:</span> when importing and
              offering products from Aliexpress, you will have to manually place
              orders on Aliexpress as your product page recieves orders.
            </Alert>
            {error && (
              <Alert severity='error' className='mx-auto mt-2 mb-2 w-7/12'>
                {error}
              </Alert>
            )}
            <div className='flex flex-col w-10/12 mt-2 mx-auto'>
              <input
                type='text'
                className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                placeholder='Enter Aliexpress product ID'
                onChange={(e) => setAliProductId(e.target.value)}
              />
              <button
                type='button'
                onClick={handleGetProduct}
                className='h-10 w-full border-2 border-slate-800 rounded hover:text-white hover:bg-slate-800 mt-2'
                disabled={importing}
              >
                {importing ? 'Importing...' : 'Import from Aliexpress'}
              </button>
            </div>
            <div className='w-10/12'>
              <button
                type='button'
                className='text-gray-400 mx-auto text-sm hover:text-gray-600'
              >
                Can find the product ID?
              </button>
            </div>
          </>
        ) : (
          <>
            <Alert severity='info' className='mx-auto mt-2 mb-2 w-7/12'>
              <span className='font-medium'>IMPORTANT:</span> when importing and
              offering products from Aliexpress, you will have to manually place
              orders on Aliexpress as your product page recieves orders.
            </Alert>
            {error && (
              <Alert severity='error' className='mx-auto mt-2 mb-2 w-7/12'>
                {error}
              </Alert>
            )}
            <div className='flex items-center w-7/12 mt-2'>
              <input
                type='text'
                className='border-2 h-10 border-slate-200 hover:border-slate-300 w-10/12 rounded p-2 outline outline-0 bg-white'
                placeholder='Enter Aliexpress product ID'
                onChange={(e) => setAliProductId(e.target.value)}
              />
              <button
                type='button'
                onClick={handleGetProduct}
                className='h-10 w-60 border-2 border-slate-800 rounded ml-2 hover:text-white hover:bg-slate-800'
                disabled={importing}
              >
                {importing ? 'Importing...' : 'Import from Aliexpress'}
              </button>
            </div>
            <div className='w-7/12'>
              <button
                type='button'
                className='text-gray-400 mx-auto text-sm hover:text-gray-600'
              >
                Can find the product ID?
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ImportAli;
