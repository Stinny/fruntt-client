import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useAddFeedbackMutation } from '../../api/feedbackApiSlice';
import Cookies from 'js-cookie';
import { BiSmile } from 'react-icons/bi';

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
      <div className='max-w-6xl mx-auto h-screen p-2 bg-white drop-shadow-lg border rounded flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-medium mb-4'>You have no customers</h2>

        <p className='text-stone-800 mt-4'>
          Everytime a customer makes a purchase, their details will be seen
          here.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Integrations;
