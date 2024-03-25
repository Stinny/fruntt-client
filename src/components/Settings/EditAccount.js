import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useUpdateAccountInfoMutation } from '../../api/authApiSlice';
import { Lock } from 'react-feather';
import { Link } from 'react-router-dom';
import countryToCurrency from 'country-to-currency';
import getSymbolFromCurrency from 'currency-symbol-map';

const EditAccount = ({ user, refetch, edit, setEdit }) => {
  const [country, setCountry] = useState(user?.country);
  const [email, setEmail] = useState(user?.email);
  const [currency, setCurrency] = useState(user?.currency?.code);
  const [currencySym, setCurrencySym] = useState(user?.currency?.symbol);

  const options = useMemo(() => countryList().getData(), []);

  const [updateAccountInfo, result] = useUpdateAccountInfoMutation();

  const handleSaveAccountInfo = async (e) => {
    e.preventDefault();

    try {
      const updateAccountInfoReq = await updateAccountInfo({
        email,
        country,
        currency,
        currencySym,
      }).unwrap();

      if (updateAccountInfoReq.msg === 'User updated') {
        refetch();
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
      setEdit(false);
      return;
    }
  };

  const handleCountry = (value) => {
    setCountry(value);
    setCurrency(countryToCurrency[value.value]);
    setCurrencySym(getSymbolFromCurrency(countryToCurrency[value.value]));
  };

  return (
    <div className='w-full flex-col'>
      <div className='flex items-center justify-between w-full mb-2'>
        <div className='flex flex-col items-start'>
          <p className='text-sm text-stone-800'>Edit account</p>
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

      <form className='flex items-start w-full gap-2'>
        <div className='w-3/6 flex flex-col items-start gap-2'>
          <input
            type='text'
            className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md text-sm'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Link
            to='/dashboard/password/change'
            className='flex items-center justify-center rounded-md p-1 pl-2 pr-2 hover:bg-gray-200 text-stone-800 text-xs'
          >
            Change Password
            <Lock className='ml-1' size={13} />
          </Link>
        </div>

        <div className='flex flex-col gap-2 w-3/6'>
          <Select
            options={options}
            onChange={handleCountry}
            className='w-full text-sm'
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
          <div className='flex flex-col items-start'>
            <input
              type='text'
              className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm'
              placeholder='Currency'
              disabled
              value={currency ? `${currencySym}(${currency})` : ''}
            />
            <p className='text-stone-600 text-xs'>Based on country selection</p>
          </div>
        </div>
      </form>
      {/* <div className='w-full flex justify-start'>
        <Link
          to='/dashboard/password/change'
          className='flex items-center justify-center rounded-md p-1 pl-2 pr-2 hover:bg-gray-200 text-stone-800 text-xs mt-2'
        >
          Change Password
          <Lock className='ml-1' size={13} />
        </Link>
      </div> */}
    </div>
  );
};

export default EditAccount;
