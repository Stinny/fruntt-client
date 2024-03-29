import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useAddStoreMutation } from '../api/storefrontApiSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setSelectedStoreUrl } from '../redux/userRedux';

//mui
import Alert from '@mui/material/Alert';
import { isMobile } from 'react-device-detect';

const NoStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [pageName, setPageName] = useState('');
  const [addingPage, setAddingPage] = useState(false);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [addStore, result] = useAddStoreMutation();

  const handleAddPage = async (e) => {
    e.preventDefault();

    if (pageName === '') {
      setError('Please enter a page name');
      return;
    }

    setAddingPage(true);

    try {
      const addStoreReq = await addStore({ pageName }).unwrap();

      if (addStoreReq.msg === 'Page added') {
        currentUser.store = addStoreReq.storefront;
        currentUser.storeIds = addStoreReq.storeIds;
        dispatch(setSelectedStoreUrl(addStoreReq.storefront.url));

        const newUser = JSON.stringify(currentUser);
        Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
        setAddingPage(false);
        navigate('/storefront/launching');
      } else if (addStoreReq.msg === 'Already exists') {
        setAddingPage(false);
        setError('Page name already in use');
      } else if (addStoreReq.msg === 'Payment failed') {
        setAddingPage(false);
        setError('There was an error with the payment');
      } else {
        setError('There was an error, try again');
        setAddingPage(false);
      }
    } catch (err) {
      setError('There was a server error');
      setAddingPage(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto h-screen p-2'>
        {isMobile ? (
          <div className='mx-auto border bg-white drop-shadow-md rounded flex flex-col items-center p-2 w-full mt-44'>
            <p className='text-2xl font-medium text-stone-800 text-center'>
              You have no storefront!
            </p>
            <p className='text-md text-stone-800 mt-6 text-center'>
              When you are ready to sell a digital product, launch your
              storefront below. You will be ready to sell in minutes.
            </p>

            {error && (
              <Alert severity='error' className='w-8/12 mt-2'>
                {error}
              </Alert>
            )}
            <form
              className='flex flex-col mt-4 w-full'
              onSubmit={handleAddPage}
            >
              {/* <div className='flex items-center mt-6'>
                <input
                  type='text'
                  className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                  placeholder='Enter page name'
                  onChange={(e) => setPageName(e.target.value)}
                />
                <p className='font-medium text-xl'>.fruntt.com</p>
              </div> */}

              <div className='flex w-full items-center border-2 rounded mt-1 border-gray-200 hover:border-gray-300 p-2'>
                <input
                  className='bg-white outline outline-0'
                  placeholder='Enter store name'
                  onChange={(e) => setPageName(e.target.value)}
                />
                <span className='font-medium'>.fruntt.com</span>
              </div>
              <button
                type='submit'
                className=' text-md font-medium border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 h-14 mt-6 w-full'
                disabled={addingPage}
              >
                {addingPage ? 'Launching storefront...' : 'Open Storefront'}
              </button>
            </form>
          </div>
        ) : (
          <div className='mx-auto border bg-white drop-shadow-md rounded flex flex-col items-center p-10 w-8/12 mt-44'>
            <p className='text-lg font-medium text-stone-800 text-center'>
              You have no store!
            </p>
            <p className='text-md text-stone-800 mt-6 w-96 text-center'>
              When you are ready to sell a template, launch your store below.
              You will be ready to sell in minutes.
            </p>

            {error && (
              <Alert severity='error' className='w-8/12 mt-2'>
                {error}
              </Alert>
            )}
            <form
              className='flex flex-col mt-4 w-6/12'
              onSubmit={handleAddPage}
            >
              <div className='flex w-full items-center border-2 rounded mt-1 border-gray-100 bg-gray-100 hover:border-gray-200 hover:bg-gray-200 p-2'>
                <input
                  className='outline outline-0 bg-gray-100 hover:bg-gray-200'
                  placeholder='Enter store name'
                  onChange={(e) => setPageName(e.target.value)}
                />
                <span className='font-medium'>.fruntt.com</span>
              </div>
              <button
                type='submit'
                className=' text-md font-medium border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 h-14 mt-6 w-full'
                disabled={addingPage}
              >
                {addingPage ? 'Launching store...' : 'Open Store'}
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NoStore;
