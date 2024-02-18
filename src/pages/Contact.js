import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { useSubmitMessageMutation } from '../api/authApiSlice';

//flowbite
import { Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [submitMessage, result] = useSubmitMessageMutation();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const submitReq = await submitMessage({
        email: email,
        name: name,
        body: body,
      }).unwrap();

      if (submitReq === 'Submitted') {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className='h-screen overflow-hidden bg-white flex flex-col items-center justify-center'>
        {submitted ? (
          ''
        ) : (
          <>
            <p className='text-3xl text-stone-800'>Contact Us</p>
            <p className='text-sm text-stone-600'>
              Send a message to us below!
            </p>
          </>
        )}
        {submitted ? (
          <div className='border border-gray-200 rounded-md flex flex-col justify-center items-center p-4'>
            <Alert color='success' icon={MdOutlineCheckCircle}>
              Your message has been sent
            </Alert>
            <p className='text-sm text-stone-600 mt-4 text-center w-52'>
              We appreciate you contacting us and we will respond soon. Keep an
              eye on your email inbox.
            </p>
            <Link
              to='/'
              className='rounded-md flex text-sm items-center justify-center p-2 hover:bg-gray-200 text-stone-800 mt-4'
            >
              Return Home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmitForm}
            style={{ width: '450px' }}
            className='mx-auto border border-gray-200 rounded-md flex flex-col p-4 mt-2'
          >
            <p className='text-stone-800 text-sm'>Name</p>
            <input
              type='text'
              className='border text-sm border-gray-200 hover:bg-gray-200 focus:bg-gray-200 w-full rounded-md p-2 outline-none bg-gray-50 mt-1'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            />

            <p className='text-stone-800 mt-4 text-sm'>Email</p>
            <input
              type='text'
              className='border text-sm border-gray-200 focus:bg-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-50 mt-1'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className='text-stone-800 mt-4 text-sm'>Message</p>
            <textarea
              type='text'
              className='border text-sm border-gray-200 focus:bg-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-50 mt-1 h-24'
              placeholder='How can we help?'
              onChange={(e) => setBody(e.target.value)}
              maxLength={350}
            />
            <div className='w-full flex justify-end'>
              <p className='text-xs text-stone-600'>{body.length}/350</p>
            </div>
            <button
              type='submit'
              className='w-full h-12 border-2 border-stone-800 text-stone-800 text-sm font-medium hover:bg-stone-800 hover:text-white rounded-md mt-4'
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Contact;
