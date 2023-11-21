import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useAddLogoMutation } from '../api/storefrontApiSlice';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedStoreUrl } from '../redux/userRedux';

//mui
import Alert from '@mui/material/Alert';

const NameChange = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(currentUser?.store?.name);
  const [error, setError] = useState('');
  const [changingName, setChangingName] = useState(false);

  const [addLogo, result] = useAddLogoMutation();

  const handleChangeName = async (e) => {
    e.preventDefault();

    try {
      setChangingName(true);
      const addLogoReq = await addLogo({
        storeId: currentUser?.store?._id,
        name: name,
      }).unwrap();

      if (addLogoReq?.msg === 'Name changed') {
        setChangingName(false);
        dispatch(setSelectedStoreUrl(`https://${name}.fruntt.com`));
        currentUser.store.name = name;
        currentUser.store.url = `https://${name}.fruntt.com`;
        const newUser = JSON.stringify(currentUser);
        Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
        toast.success('Store name updated!', {
          style: { color: 'rgb(28 25 23)' },
        });
        navigate('/settings');
      } else if (addLogoReq?.msg === 'Name in use') {
        setChangingName(false);
        setError('Sorry that name is taken!');
      } else {
        setChangingName(false);
        return;
      }
    } catch (err) {
      setChangingName(false);
      setError('There was a server error');
    }
  };
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />

        <div className='w-9/12 p-10 mx-auto h-screen bg-gray-50'>
          <div className='flex justify-between'>
            <p className='text-3xl font-medium'>Change Store Name</p>
          </div>
          <div className='w-full h-full bg-white border rounded drop-shadow-lg mt-2 p-2 flex flex-col'>
            <p className='text-stone-800 text-md'>
              Use the form below to change the name of your Fruntt store.
            </p>
            <form onSubmit={handleChangeName} className='w-96 mt-2'>
              {error ? <Alert severity='error'>{error}</Alert> : ''}
              <div className='flex items-center border-2 rounded mt-1 h-12 border-gray-200 hover:border-gray-300 p-2'>
                <input
                  className='bg-white outline outline-0'
                  placeholder='Storefront name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span className='font-medium'>.fruntt.com</span>
              </div>

              <button
                type='submit'
                className='w-full h-10 border-2 border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 rounded mt-4'
                disabled={changingName}
              >
                {changingName ? 'Changing name...' : 'Change Name'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NameChange;
