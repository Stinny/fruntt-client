import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useAddFeedbackMutation } from '../../api/feedbackApiSlice';
import Cookies from 'js-cookie';
import { BiSmile } from 'react-icons/bi';

//mui
import Alert from '@mui/material/Alert';

const Integrations = () => {
  const [content, setContent] = useState('');
  const [addFeedback, result] = useAddFeedbackMutation();
  const [givenFeedback, setGivenFeedback] = useState(false);

  useEffect(() => {
    const fb2 = localStorage.getItem('fb2')
      ? JSON.stringify(localStorage.getItem('fb2'))
      : null;

    if (fb2) setGivenFeedback(true);
  }, []);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    const addFeedbackReq = await addFeedback({
      type: 'integrations',
      content: content,
    }).unwrap();
    if (addFeedbackReq === 'Feedback submitted') {
      localStorage.setItem('fb2', true);
      setGivenFeedback(true);
    }
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>
        <Alert severity='info' className='mt-4 mb-4 w-full'>
          We understand integrations are important to merchants and they will be
          coming very soon. In the meantime, we really appreciate any feedback
          as we continue to develop our product.
        </Alert>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-medium'>Integrations coming soon!</h2>
          <p className='text-lg mt-2'>
            We would love and appreciate some feedback on integrations you think
            would be best. We want to avoid overload :) Just submit them in the
            form below!
          </p>
        </div>
        {givenFeedback ? (
          <div className='w-full mx-auto flex flex-col justify-center items-center border-2 h-32 rounded-md mt-4'>
            <BiSmile className='text-5xl' />
            <p className='text-xl'>
              Thank you, your feedback is much appreciated
            </p>
          </div>
        ) : (
          <form className='mt-4' onSubmit={handleSubmitFeedback}>
            <textarea
              type='text'
              className='border-2 border-gray-300 hover:border-gray-300 w-full h-28 focus:outline focus:outline-1 focus:outline-gray-400 rounded-lg mt-4 p-2'
              placeholder='Enter feedback here, ex. shopify, ship station, social platforms'
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className='w-full h-14 border-2 border-slate-800 rounded text-lg mt-4'
              type='submit'
            >
              Submit feedback
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Integrations;
