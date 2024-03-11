import React, { useMemo, useState } from 'react';
import { useUpdateOrderMutation } from '../../api/ordersApiSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Alert, Spinner } from 'flowbite-react';
import { AlertCircle, ChevronLeft } from 'react-feather';
import countryList from 'react-select-country-list';
import Select from 'react-select';

const NoPayForm = ({ order, error, setError, handleResetCheckout }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  const [updateOrder, result] = useUpdateOrderMutation();
  const navigate = useNavigate();

  //for country select
  const options = useMemo(() => countryList().getData(), []);

  const handleCountry = (value) => {
    setCountry(value);
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    //make sure all fields are filled out
    if (!email || !name || !country) {
      setError('All feilds must be filled out');
      return;
    }

    try {
      setPlacingOrder(true);

      const updatedOrderReq = await updateOrder({
        orderId: order._id,
        email: email,
        name: name,
      }).unwrap();

      //update the order on the server
      if (updatedOrderReq.msg === 'Order updated') {
        setPlacingOrder(false);
        Cookies.remove('orderId');
        navigate(`/order/${order?._id}`);
      } else {
        setPlacingOrder(false);
        setError('There was an error');
        return;
      }
    } catch (err) {
      setPlacingOrder(false);
      setError('There was an error');
      return;
    }
  };

  return (
    <form className='flex flex-col' onSubmit={handleConfirmOrder}>
      {' '}
      {error ? (
        <Alert color='failure' rounded icon={AlertCircle}>
          {error}
        </Alert>
      ) : (
        ''
      )}
      <p className='text-stone-800 text-sm'>Customer</p>
      <input
        type='email'
        placeholder='Email'
        className='border text-sm border-gray-200 bg-gray-50 ring-0 focus:border-transparent hover:bg-gray-200 focus:bg-gray-200 0 w-full outline outline-0 rounded-md p-2 mt-1'
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className='flex items-center mt-2'>
        <input
          type='text'
          placeholder='Name'
          className='border text-sm border-gray-200 bg-gray-50 ring-0 focus:border-transparent hover:bg-gray-200 focus:bg-gray-200 0 w-3/6 outline outline-0 rounded-md p-2 mr-2'
          onChange={(e) => setName(e.target.value)}
        />
        <div className='w-3/6'>
          <Select
            options={options}
            onChange={handleCountry}
            className='text-sm'
            value={country}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: 'rgb(229 231 235)',
                borderRadius: 6,
                borderWidth: 1,
                '&:hover': {
                  borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
                  backgroundColor: 'rgb(229 231 235)',
                },
                backgroundColor: 'rgb(249 250 251)',
                boxShadow: 'none',
                zIndex: 9999,
                position: 'relative',
              }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </div>
      </div>
      <div className='w-full flex items-center mt-2'>
        <button
          type='button'
          disabled={placingOrder}
          onClick={handleResetCheckout}
          className='w-3/12 h-10 text-sm text-stone-800 bg-gray-200 rounded-md mr-2 flex items-center justify-center'
        >
          <ChevronLeft size={16} />
        </button>
        <button
          disabled={placingOrder}
          type='submit'
          className='w-9/12 h-10 bg-gray-200 text-stone-800 text-sm rounded-md'
        >
          {placingOrder ? <Spinner /> : 'Get Now'}
        </button>
      </div>
    </form>
  );
};

export default NoPayForm;
