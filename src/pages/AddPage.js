import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAddStoreMutation } from '../api/storefrontApiSlice';
import Cookies from 'js-cookie';
import { setSelectedStoreUrl } from '../redux/userRedux';
import { useNavigate } from 'react-router-dom';

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
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='w-5/12 mx-auto text-center border-b-2 p-2'>
            <p className='font-medium text-3xl'>Launch another product page!</p>
          </div>
          <form
            className='flex flex-col mt-4 w-5/12 mb-44'
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
              className=' text-lg font-medium border-2 rounded border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800 h-14 mt-4 w-full'
              disabled={addingPage}
            >
              Launch product page - $5
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddPage;
