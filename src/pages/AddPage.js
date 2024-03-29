import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAddStoreMutation } from '../api/storefrontApiSlice';
import Cookies from 'js-cookie';
import { setSelectedStoreUrl } from '../redux/userRedux';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';

//mui
import Alert from '@mui/material/Alert';

const AddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //form state
  const [pageName, setPageName] = useState('');
  const [error, setError] = useState('');
  const [addingPage, setAddingPage] = useState(false);

  const [addStore, result] = useAddStoreMutation();

  const handleAddPage = async (e) => {
    e.preventDefault();

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
      <div className='h-screen max-w-6xl mx-auto'>
        {isMobile ? (
          <div className='flex flex-col items-center justify-center h-full p-2 bg-white border drop-shadow-md'>
            <div className='w-full mx-auto flex flex-col border-b-2 p-2'>
              <p className='font-medium text-2xl'>
                Launch another product page!
              </p>
              <div className='w-full mx-auto flex flex-col'>
                <p className='font-medium text-gray-400'>
                  Have something else to offer? Add another page to your
                  collection
                </p>
              </div>
            </div>

            <form
              className='flex flex-col mt-4 w-full mb-44'
              onSubmit={handleAddPage}
            >
              <div className='flex items-center'>
                <input
                  type='text'
                  className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                  placeholder='Enter page name'
                  onChange={(e) => setPageName(e.target.value)}
                />
                <p className='font-medium text-xl'>.fruntt.com</p>
              </div>
              <button
                type='submit'
                className=' text-lg font-medium border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 h-14 mt-4 w-full'
                disabled={addingPage}
              >
                {addingPage ? 'Launching store...' : 'Open Store'}
              </button>

              <Link
                to='/dashboard'
                className=' text-lg font-medium border-2 rounded border-gray-400 text-gray-400 hover:text-white hover:bg-gray-400 h-10 mt-4 w-full flex items-center justify-center'
              >
                Dashboard
              </Link>
            </form>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center h-full '>
            <div
              className='flex flex-col items-center h-60 bg-white border drop-shadow-md rounded p-2'
              style={{ width: '600px' }}
            >
              <div className='w-full mx-auto flex flex-col'>
                <p className='font-medium text-2xl'>
                  Launch another product page!
                </p>
                <div className='w-full mx-auto flex justify-between'>
                  <p className='font-medium text-gray-400'>
                    Have something else to offer? Add another page to your
                    collection
                  </p>
                </div>
              </div>

              {error && (
                <Alert severity='error' className='w-8/12 mt-2 mb-2'>
                  {error}
                </Alert>
              )}
              <form
                className='flex flex-col mt-4 w-8/12 mb-44'
                onSubmit={handleAddPage}
              >
                <div className='flex items-center mt-6'>
                  <input
                    type='text'
                    className='border-2 h-10 border-slate-200 hover:border-slate-300 w-full rounded p-2 outline outline-0 bg-white'
                    placeholder='Enter page name'
                    onChange={(e) => setPageName(e.target.value)}
                  />
                  <p className='font-medium text-xl'>.fruntt.com</p>
                </div>
                <button
                  type='submit'
                  className=' text-lg font-medium border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 h-14 mt-6 w-full'
                  disabled={addingPage}
                >
                  {addingPage ? 'Launching page...' : 'Launch product page'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AddPage;
