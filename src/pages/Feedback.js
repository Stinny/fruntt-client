import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useAddFeedbackMutation } from '../api/feedbackApiSlice';
import { BsArrowRightShort } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';

//mui
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FeedbackMobile from './Mobile/FeedbackMobile';
import Topbar from '../components/Topbar';

const Feedback = () => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [allowContact, setAllowContact] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const [addFeedback, result] = useAddFeedbackMutation();

  useEffect(() => {
    setError('');
  }, [content, type]);

  const handleAddFeedBack = async (e) => {
    e.preventDefault();

    if (!content || !type) {
      setError('Please fill all fields');
      return;
    }
    try {
      const addFeedbackReq = await addFeedback({
        type: type,
        content: content,
        allowContact: allowContact,
      }).unwrap();
      if (addFeedbackReq === 'Feedback submitted') {
        setMsg(
          'Your feedback was submitted and will be reviewed, thank you so much!'
        );
        setContent('');
        setType('');
      }
    } catch (err) {
      setError('There was a server error');
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        {isMobile ? (
          <FeedbackMobile handleAddFeedBack={handleAddFeedBack} />
        ) : (
          <div className='w-9/12 mx-auto h-screen p-10 bg-gray-50'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <p className='font-medium text-3xl text-slate-800'>
                  Leave feedback
                </p>
                <p className='font-medium text-stone-800'>
                  We listen closely to all feedback!
                </p>
              </div>
            </div>

            {msg && (
              <Alert severity='info' className='w-full mt-4 mb-4 mx-auto'>
                {msg}
              </Alert>
            )}
            {error && (
              <Alert severity='error' className='w-full mt-4 mb-4 mx-auto'>
                {error}
              </Alert>
            )}
            <form
              className='flex flex-col w-full mx-auto border rounded bg-white p-2 drop-shadow-md mt-2'
              onSubmit={handleAddFeedBack}
            >
              <p className='font-medium mb-2 text-gray-400'>
                Leave feedback on:
              </p>
              <select
                className='w-6/12 h-10 border rounded p-2'
                onChange={(e) => setType(e.target.value)}
              >
                <option disabled selected>
                  Select feedback type
                </option>
                <option value='design'>Designing your store</option>
                <option value='orders'>Orders</option>
                <option value='customers'>Reviews</option>
                <option value='feature'>Request a feature</option>
                <option value='pricing'>Pricing</option>
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
                className='w-full h-14 border-2 border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 rounded mt-4'
              >
                Submit feedback
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Feedback;
