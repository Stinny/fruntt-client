import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';

//mui
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FeedbackMobile = ({ handleAddFeedBack }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [allowContact, setAllowContact] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  return (
    <div className='max-w-7xl mx-auto mt-4 h-screen'>
      <div className='flex flex-col p-2'>
        <div className='border-b-2 flex justify-between'>
          <p className='font-medium text-xl text-slate-800'>Leave feedback</p>

          <Link
            to='/dashboard'
            className='flex items-center text-gray-400 hover:text-gray-600 text-md'
          >
            Dashboard
            <BsArrowRightShort />
          </Link>
        </div>
        <p className='font-medium text-gray-400'>
          We greatly appreaciate and encourage feedback!
        </p>
      </div>

      {msg && (
        <Alert severity='info' className='w-11/12 mt-4 mb-4 mx-auto'>
          {msg}
        </Alert>
      )}
      {error && (
        <Alert severity='error' className='w-11/12 mt-4 mb-4 mx-auto'>
          {error}
        </Alert>
      )}
      <form
        className='flex flex-col w-full mx-auto p-2'
        onSubmit={handleAddFeedBack}
      >
        <p className='font-medium mb-2 text-gray-400 '>Leave feedback on:</p>
        <select
          className='w-6/12 h-10 border rounded'
          onChange={(e) => setType(e.target.value)}
        >
          <option disabled selected>
            Select feedback type
          </option>
          <option value='design'>Designing your storefront</option>
          <option value='orders'>Order management</option>
          <option value='customers'>Customer management</option>
          <option value='feature'>Request a feature</option>
          <option value='other'>Other</option>
        </select>

        <textarea
          className='h-32 w-full border-2 rounded p-2 mt-2 outline outline-0 focus:border-gray-400'
          placeholder='Enter feedback...'
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={allowContact}
              onChange={(e) => setAllowContact(e.target.checked)}
            />
          }
          label='Allow us to contact you'
        />

        <button
          type='submit'
          className='w-full h-14 border-2 border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800 rounded mt-4'
        >
          Submit feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackMobile;
