import React, { useState, useMemo } from 'react';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { HiOutlineTemplate } from 'react-icons/hi';
import { RiBankFill } from 'react-icons/ri';
import { states } from '../states';
import { months } from '../months';
import { days } from '../days';
import { years } from '../years';

//mui
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const AddBank = () => {
  const [type, setType] = useState('individual');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [ssn, setSsn] = useState('');
  const [same, setSame] = useState(false);

  //for business's
  const [busName, setBusName] = useState('');
  const [busType, setBusType] = useState('');
  const [busPhone, setBusPhone] = useState('');
  const [busAddress, setBusAddress] = useState('');
  const [busCity, setBusCity] = useState('');
  const [busState, setBusState] = useState('');
  const [busZip, setBusZip] = useState('');
  const [busCountry, setBusCountry] = useState('');
  const [EIN, setEIN] = useState('');

  //for country select
  const options = useMemo(() => countryList().getData(), []);

  //options for business type
  const busTypes = [
    { value: 'company', label: 'LLC' },
    { value: 'company', label: 'Partnership' },
    { value: 'company', label: 'Sole Proprietorship' },
    { value: 'company', label: 'Corporation' },
    { value: 'non_profit', label: 'Non Profit' },
  ];

  const handleType = (newType) => {
    setType(newType);
  };

  const handleCountry = (value) => {
    setCountry(value);
  };

  const handleBusCountry = (value) => {
    setBusCountry(value);
  };

  const handleBusState = (value) => {
    setBusState(value);
  };

  const handleBusType = (value) => {
    setBusType(value.value);
  };

  const handleState = (value) => {
    setState(value.value);
  };

  const handleMonth = (value) => {
    setMonth(value.value);
  };

  const handleDay = (value) => {
    setDay(value.value);
  };

  const handleYear = (value) => {
    setYear(value.value);
  };

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />

        <div className='w-10/12  pt-10 pb-10 pl-44 pr-44 mx-auto bg-gray-50 overflow-y-scroll'>
          <div className='flex'>
            <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
              <RiBankFill className='text-white text-xl' />
              <p className='text-sm text-white ml-2'>Add Bank</p>
            </div>
          </div>

          <div className='w-full h-full bg-white border rounded drop-shadow-lg mt-2 p-2 flex flex-col'>
            <form className='w-full'>
              <div className='flex space-x-4'>
                <button
                  type='button'
                  className={`rounded-md h-24 w-3/6 flex justify-center items-center text-stone-800 ${
                    type === 'individual' ? 'bg-gray-200' : 'bg-gray-100'
                  }`}
                  onClick={() => handleType('individual')}
                >
                  <div className='flex flex-col'>
                    <p className='font-bold'>Individual</p>
                    <p className='text-sm'>You are selling as yourself</p>
                  </div>
                </button>
                <button
                  type='button'
                  className={`rounded-md h-24 w-3/6 flex items-center justify-center text-stone-800 ${
                    type === 'business' ? 'bg-gray-200' : 'bg-gray-100'
                  }`}
                  onClick={() => handleType('business')}
                >
                  <div className='flex flex-col'>
                    <p className='font-bold'>Business</p>
                    <p className='text-sm'>You are selling as a business</p>
                  </div>
                </button>
              </div>

              <div className='w-full flex'>
                <div className='flex flex-col w-3/6'>
                  <p className='text-stone-800 mt-4 text-sm'>Routing number</p>
                  <input
                    type='text'
                    className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='Routing number'
                    onChange={(e) => setRouting(e.target.value)}
                  />
                </div>

                <div className='flex flex-col w-3/6 ml-2'>
                  <p className='text-stone-800 mt-4 text-sm'>Account number</p>
                  <input
                    type='text'
                    className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='Account number'
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>
              </div>

              <p className='text-stone-800 mt-4 text-sm'>Account holder</p>
              <input
                type='text'
                className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                placeholder='Account holder'
                onChange={(e) => setAccountName(e.target.value)}
              />

              {type === 'business' ? (
                <>
                  <div className='w-full flex'>
                    <div className='flex flex-col w-3/6'>
                      <p className='text-stone-800 mt-4 text-sm'>
                        Legal business name
                      </p>
                      <input
                        type='text'
                        className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                        placeholder='Legal business name'
                        onChange={(e) => setBusName(e.target.value)}
                      />
                    </div>

                    <div className='flex flex-col w-3/6 ml-2'>
                      <p className='text-stone-800 mt-4 text-sm'>Type</p>
                      <Select
                        options={busTypes}
                        onChange={handleBusType}
                        placeholder='Type'
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        isSearchable={false}
                        className='text-sm'
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: 'rgb(243 244 246)',
                            borderRadius: 6,
                            borderWidth: 2,
                            '&:hover': {
                              borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                              backgroundColor: 'rgb(229 231 235)',
                            },
                            backgroundColor: 'rgb(243 244 246)',
                            boxShadow: 'none',
                            zIndex: 99999,
                            position: 'relative',
                          }),
                          menuPortal: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                          }),
                        }}
                      />
                    </div>
                  </div>
                  <p className='text-stone-800 mt-4 text-sm'>Address</p>
                  <input
                    type='text'
                    className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='Address'
                    onChange={(e) => setBusAddress(e.target.value)}
                  />

                  <div className='w-full flex'>
                    <div className='flex flex-col w-3/6'>
                      <p className='text-stone-800 mt-4 text-sm'>City</p>
                      <input
                        type='text'
                        className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                        placeholder='City'
                        onChange={(e) => setBusCity(e.target.value)}
                      />
                    </div>

                    <div className='flex flex-col w-3/6 ml-2'>
                      <p className='text-stone-800 mt-4 text-sm'>State</p>
                      <Select
                        options={states}
                        onChange={handleBusState}
                        placeholder='State'
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        isSearchable={false}
                        className='text-sm mt-1'
                        styles={{
                          control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: 'rgb(243 244 246)',
                            borderRadius: 6,
                            borderWidth: 2,
                            '&:hover': {
                              borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                              backgroundColor: 'rgb(229 231 235)',
                            },
                            backgroundColor: 'rgb(243 244 246)',
                            boxShadow: 'none',
                            zIndex: 99999,
                            position: 'relative',
                          }),
                          menuPortal: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                          }),
                        }}
                      />
                    </div>

                    <div className='flex flex-col w-3/6 ml-2'>
                      <p className='text-stone-800 mt-4 text-sm'>ZIP code</p>
                      <input
                        type='text'
                        className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                        placeholder='12345'
                        onChange={(e) => setBusZip(e.target.value)}
                      />
                    </div>
                  </div>

                  <p className='text-stone-800 mt-4 mb-1 text-sm'>Country</p>
                  <Select
                    options={options}
                    onChange={handleBusCountry}
                    className='text-sm'
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'rgb(243 244 246)',
                        borderRadius: 6,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          backgroundColor: 'rgb(229 231 235)',
                        },
                        backgroundColor: 'rgb(243 244 246)',
                        boxShadow: 'none',
                        zIndex: 99999,
                        position: 'relative',
                      }),
                      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                  />
                  <p className='text-stone-800 mt-4 text-sm'>
                    Business phone number
                  </p>
                  <input
                    type='text'
                    className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='Phone number'
                    onChange={(e) => setBusPhone(e.target.value)}
                  />
                  <p className='text-stone-800 mt-4 text-sm'>Business tax ID</p>
                  <input
                    type='text'
                    className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1 mb-2'
                    placeholder='Busines tax ID'
                    onChange={(e) => setEIN(e.target.value)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={same}
                        onChange={(e) => setSame(e.target.checked)}
                      />
                    }
                    label='Same as business'
                  />
                </>
              ) : (
                ''
              )}

              <div className='w-full flex'>
                <div className='flex flex-col w-3/6'>
                  <p className='text-stone-800 mt-4 text-sm'>First name</p>
                  <input
                    type='text'
                    className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='First name'
                    onChange={(e) => setFirst(e.target.value)}
                  />
                </div>

                <div className='flex flex-col w-3/6 ml-2'>
                  <p className='text-stone-800 mt-4 text-sm'>Last name</p>
                  <input
                    type='text'
                    className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='Last name'
                    onChange={(e) => setLast(e.target.value)}
                  />
                </div>
              </div>
              <p className='text-stone-800 mt-4 text-sm'>Address</p>
              <input
                type='text'
                className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                placeholder='Address'
                onChange={(e) => setAddress(e.target.value)}
              />

              <div className='w-full flex'>
                <div className='flex flex-col w-3/6'>
                  <p className='text-stone-800 mt-4 text-sm'>City</p>
                  <input
                    type='text'
                    className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='City'
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className='flex flex-col w-3/6 ml-2'>
                  <p className='text-stone-800 mt-4 text-sm'>State</p>
                  <Select
                    options={states}
                    onChange={handleState}
                    placeholder='State'
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                    isSearchable={false}
                    className='text-sm mt-1'
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'rgb(243 244 246)',
                        borderRadius: 6,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          backgroundColor: 'rgb(229 231 235)',
                        },
                        backgroundColor: 'rgb(243 244 246)',
                        boxShadow: 'none',
                        zIndex: 99999,
                        position: 'relative',
                      }),
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                    }}
                  />
                </div>

                <div className='flex flex-col w-3/6 ml-2'>
                  <p className='text-stone-800 mt-4 text-sm'>ZIP code</p>
                  <input
                    type='text'
                    className='border-2 border-gray-100 text-sm hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                    placeholder='ZIP'
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>

              <p className='text-stone-800 mt-4 mb-1 text-sm'>Country</p>
              <Select
                options={options}
                onChange={handleCountry}
                className='text-sm'
                value={country}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: 'rgb(243 244 246)',
                    borderRadius: 6,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                      backgroundColor: 'rgb(229 231 235)',
                    },
                    backgroundColor: 'rgb(243 244 246)',
                    boxShadow: 'none',
                    zIndex: 99999,
                    position: 'relative',
                  }),
                  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
              />
              <p className='text-stone-800 mt-4 text-sm'>Phone number</p>
              <input
                type='text'
                className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                placeholder='Phone number'
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className='text-stone-800 mt-4 mb-1 text-sm'>Date of birth</p>
              <div className='w-full flex items-center'>
                <div className='flex flex-col w-2/6'>
                  <Select
                    options={months}
                    onChange={handleMonth}
                    placeholder='Month'
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                    isSearchable={false}
                    className='text-sm'
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'rgb(243 244 246)',
                        borderRadius: 6,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          backgroundColor: 'rgb(229 231 235)',
                        },
                        backgroundColor: 'rgb(243 244 246)',
                        boxShadow: 'none',
                        zIndex: 99999,
                        position: 'relative',
                      }),
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                    }}
                  />
                </div>

                <div className='flex flex-col w-2/6 ml-2'>
                  <Select
                    options={days}
                    onChange={handleDay}
                    placeholder='Day'
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                    isSearchable={false}
                    className='text-sm'
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'rgb(243 244 246)',
                        borderRadius: 6,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          backgroundColor: 'rgb(229 231 235)',
                        },
                        backgroundColor: 'rgb(243 244 246)',
                        boxShadow: 'none',
                        zIndex: 99999,
                        position: 'relative',
                      }),
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                    }}
                  />
                </div>

                <div className='flex flex-col w-2/6 ml-2'>
                  <Select
                    options={years}
                    onChange={handleYear}
                    placeholder='Year'
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                    isSearchable={false}
                    className='text-sm'
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: 'rgb(243 244 246)',
                        borderRadius: 6,
                        borderWidth: 2,
                        '&:hover': {
                          borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          backgroundColor: 'rgb(229 231 235)',
                        },
                        backgroundColor: 'rgb(243 244 246)',
                        boxShadow: 'none',
                        zIndex: 99999,
                        position: 'relative',
                      }),
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                    }}
                  />
                </div>
              </div>

              <p className='text-stone-800 mt-4 text-sm'>Last 4 of SSN</p>
              <input
                type='text'
                className='border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-100 mt-1'
                placeholder='1234'
                onChange={(e) => setSsn(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddBank;
