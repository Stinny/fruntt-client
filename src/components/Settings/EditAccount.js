import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useUpdateAccountInfoMutation } from '../../api/authApiSlice';
import { Lock } from 'react-feather';
import { Link } from 'react-router-dom';

const EditAccount = ({ user, refetch, edit, setEdit }) => {
  const [country, setCountry] = useState(user?.country);
  const [zip, setZip] = useState(user?.zipcode);
  const [email, setEmail] = useState(user?.email);

  const options = useMemo(() => countryList().getData(), []);

  const [updateAccountInfo, result] = useUpdateAccountInfoMutation();

  const handleSaveAccountInfo = async (e) => {
    e.preventDefault();

    try {
      const updateAccountInfoReq = await updateAccountInfo({
        email,
        country,
      }).unwrap();

      if (updateAccountInfoReq.msg === 'User updated') {
        refetch();
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCountry = (value) => {
    setCountry(value);
  };

  return (
    <div className='w-full flex-col'>
      <div className='flex items-center justify-between w-full mb-2'>
        <div className='flex flex-col items-start'>
          <p className='text-sm text-stone-800'>Edit ccount</p>
          <p className='text-xs text-stone-600'>{`ID: ${user?._id}`}</p>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
            onClick={(e) => setEdit(!edit)}
          >
            Cancel
          </button>
          <button
            type='button'
            className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
            onClick={handleSaveAccountInfo}
          >
            Save
          </button>
        </div>
      </div>

      <form className='flex items-center w-full gap-2'>
        <input
          type='text'
          className='border border-gray-200 w-3/6 bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md text-sm'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Select
          options={options}
          onChange={handleCountry}
          className='w-3/6 text-sm'
          value={country}
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
      </form>
      <div className='w-full flex justify-start'>
        <Link
          to='/dashboard/password/change'
          className='flex items-center justify-center rounded-md p-1 pl-2 pr-2 hover:bg-gray-200 text-stone-800 text-xs mt-2'
        >
          Change Password
          <Lock className='ml-1' size={13} />
        </Link>
      </div>
    </div>
  );
};

export default EditAccount;
