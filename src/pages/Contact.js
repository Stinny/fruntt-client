import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { useSubmitMessageMutation } from '../api/authApiSlice';
import { HiInformationCircle } from 'react-icons/hi';

//flowbite
import { Alert } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [blank, setBlank] = useState({});

  const [submitMessage, result] = useSubmitMessageMutation();

  useEffect(() => {
    setBlank((prev) => ({ ...prev, name: false }));
  }, [name]);

  useEffect(() => {
    setBlank((prev) => ({ ...prev, email: false }));
  }, [email]);

  useEffect(() => {
    setBlank((prev) => ({ ...prev, body: false }));
  }, [body]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    let blanks = {};
    if (!name.trim()) blanks.name = true;
    if (!email.trim()) blanks.email = true;
    if (!body.trim()) blanks.body = true;

    setBlank(blanks);

    if (Object.keys(blanks).length === 0) {
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
        setError('There was a server error');
        console.log(err);
      }
    } else {
      setSubmitting(false);
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className='h-screen overflow-hidden bg-white flex flex-col items-center'>
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
          <>
            <form
              onSubmit={handleSubmitForm}
              style={{ width: '450px' }}
              className='mx-auto border border-gray-200 rounded-md flex flex-col p-4 mt-2'
            >
              {error ? (
                <Alert color='failure' rounded icon={HiInformationCircle}>
                  {error}
                </Alert>
              ) : (
                ''
              )}
              <p className='text-stone-800 text-sm'>Name</p>
              <input
                type='text'
                className={`border text-sm ${
                  blank.name ? 'border-red-400' : 'border-gray-200'
                } hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2 outline-none bg-gray-50 mt-1`}
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              />

              <p className='text-stone-800 mt-4 text-sm'>Email</p>
              <input
                type='text'
                className={`border text-sm ${
                  blank.email ? 'border-red-400' : 'border-gray-200'
                } focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-50 mt-1`}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />

              <p className='text-stone-800 mt-4 text-sm'>Message</p>
              <textarea
                type='text'
                className={`border text-sm ${
                  blank.body ? 'border-red-400' : 'border-gray-200'
                } focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2 outline outline-0 bg-gray-50 mt-1 h-24`}
                placeholder='How can we help?'
                onChange={(e) => setBody(e.target.value)}
                maxLength={350}
              />
              <div className='w-full flex justify-end'>
                <p className='text-xs text-stone-600'>{body.length}/350</p>
              </div>
              <button
                type='submit'
                className='w-full h-10 border border-stone-800 text-stone-800 text-sm font-medium hover:bg-stone-800 hover:text-white rounded-md mt-4'
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
            <div
              style={{ width: '450px' }}
              className='flex justify-start text-left w-full mt-1'
            >
              <p className='text-sm text-stone-600'>
                Or email the creator:{' '}
                <span className='font-bold'>justin@fruntt.com</span>
              </p>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Contact;
