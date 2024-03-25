import React, { useState, useMemo } from 'react';
import Cookies from 'js-cookie';
import { FileInput, Spinner } from 'flowbite-react';
import { Avatar } from '@mui/material';
import countryList from 'react-select-country-list';
import Select from 'react-select';
import countryToCurrency from 'country-to-currency';
import getSymbolFromCurrency from 'currency-symbol-map';
import { uploadImageRequest } from '../../api/requests';
import { useAccountSetupMutation } from '../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';

const Setup = ({ refetch }) => {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  //form state
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [country, setCountry] = useState({});
  const [currency, setCurrency] = useState('');
  const [currencySym, setCurrencySym] = useState('');

  //account setup hook
  const [accountSetup, { isLoading }] = useAccountSetupMutation();

  //country options
  const options = useMemo(() => countryList().getData(), []);

  const handleCancelEdit = () => {
    setEdit(false);
  };

  const handleAccountSetup = async (e) => {
    e.preventDefault();
    let profilePicUrl = '';
    let profilePicKey = '';

    try {
      //if files were added, upload to server and update profile pic url/key variables
      if (profilePic.length) {
        const image = new FormData();
        image.append('productImages', profilePic[0]);
        const imageDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          image
        );
        console.log(imageDataReq);
        profilePicUrl = imageDataReq.data[0].url;
        profilePicKey = imageDataReq.data[0].key;
      }

      const setupReq = await accountSetup({
        name: name,
        bio: bio,
        country: country,
        currency: currency,
        currencySym: currencySym,
        profilePicUrl: profilePicUrl,
        profilePicKey: profilePicKey,
      }).unwrap();

      if (setupReq === 'Account setup') {
        refetch();
        navigate('/settings');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCountry = (value) => {
    setCountry(value);
    setCurrency(countryToCurrency[value.value]);
    setCurrencySym(getSymbolFromCurrency(countryToCurrency[value.value]));
  };

  return isLoading ? (
    <div className='flex items-center justify-center border border-gray-200 w-full rounded-md h-96'>
      <Spinner />
    </div>
  ) : (
    <>
      {edit ? (
        <div className='flex flex-col items-start p-4 border border-gray-200 w-full rounded-md gap-4'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col'>
              <p className='text-sm text-stone-800'>Setup account</p>
              <p className='text-xs text-stone-600'>
                Finish setting up your account below
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                type='button'
                className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={handleAccountSetup}
              >
                Save
              </button>
            </div>
          </div>
          <div className='flex items-start gap-4 w-full'>
            <div className='flex flex-col gap-4 items-start w-3/6'>
              <div className='flex flex-col w-full items-start'>
                <p className='text-stone-600 text-xs'>Name</p>
                <input
                  type='text'
                  className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm'
                  placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  maxLength={50}
                />
              </div>

              <div className='flex flex-col items-start w-full'>
                <p className='text-stone-600 text-xs'>About you</p>
                <textarea
                  placeholder='Bio'
                  className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm resize-none h-18'
                  value={bio}
                  maxLength={100}
                  onChange={(e) => setBio(e.target.value)}
                />
                <div className='w-full flex justify-end'>
                  <p className='text-xs text-stone-600'>{bio.length}/100</p>
                </div>
              </div>
              <div className='flex flex-col items-start w-full'>
                <p className='text-stone-600 text-xs'>Profile picture</p>
                <div className='flex items-center gap-2'>
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={selectedImage ? selectedImage : ''}
                    className='border border-gray-200'
                  />
                  <FileInput
                    className='focus:border-gray-200 focus:ring-gray-200 hover:border-gray-200 bg-gray-50'
                    onChange={handleImageChange}
                    sizing='sm'
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4 items-start w-3/6'>
              <div className='flex flex-col w-full'>
                <p className='text-stone-600 text-xs'>Country</p>
                <Select
                  options={options}
                  onChange={handleCountry}
                  className='text-sm'
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: 'rgb(229 231 235)',
                      backgroundColor: 'rgb(249 250 251)',
                      borderWidth: 1,
                      '&:hover': {
                        backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                      },
                      '&:focus': {
                        backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                      },
                      borderRadius: '.375rem',
                      boxShadow: 'none',
                      zIndex: 99999,
                      position: 'relative',
                    }),
                    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                />
              </div>

              <div className='flex flex-col w-full items-start'>
                <p className='text-stone-600 text-xs'>
                  Currency(based on country selection)
                </p>
                <input
                  type='text'
                  className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm'
                  placeholder='Currency'
                  disabled
                  value={currency ? `${currencySym}(${currency})` : ''}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='flex flex-col items-center justify-center border border-gray-200 w-full rounded-md gap-2'
          style={{ height: '600px' }}
        >
          <p className='text-stone-600 text-xs text-center w-80'>
            Finish your account setup so you can connect a payout option and
            submit templates
          </p>
          <button
            type='button'
            className='flex items-center justify-center bg-gray-200 text-xs text-stone-800 rounded-md pt-1 pb-1 pl-2 pr-2'
            onClick={(e) => setEdit(!edit)}
          >
            Finish account setup
          </button>
        </div>
      )}
    </>
  );
};

export default Setup;
