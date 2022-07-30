import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FreePlan = () => {
  //need to get subscription data from server
  //create a card element using the subscriptions paymentIntent ID

  //send the priceId to update the subscription before
  //trying to confirm payment

  //form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto h-screen'>
        <div className='w-full h-full mx-auto flex justify-between items-center border'>
          <div className='w-8/12 h-72 border'>
            <form>
              <div className='w-full'>
                <div className='w-full flex justify-between'>
                  <input
                    type='text'
                    placeholder='First'
                    className='border-2 border-slate-200 hover:border-slate-300 w-3/6 rounded-lg p-2 mt-4'
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <input
                    type='text'
                    placeholder='Last'
                    className='border-2 border-slate-200 hover:border-slate-300 w-3/6 rounded-lg p-2 mt-4'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type='email'
                  placeholder='Email'
                  className='border-2 w-full border-slate-200 hover:border-slate-300 rounded-lg p-2 mt-4'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Address'
                  className='border-2 w-full border-slate-200 hover:border-slate-300 rounded-lg p-2 mt-4'
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className='w-full flex justify-between mt-4'>
                <input
                  type='text'
                  placeholder='City'
                  className='border-2 border-slate-200 hover:border-slate-300 w-2/6 rounded-lg p-2'
                  onChange={(e) => setCity(e.target.value)}
                />

                <input
                  type='text'
                  placeholder='State'
                  className='border-2 border-slate-200 hover:border-slate-300 w-2/6 rounded-lg p-2'
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Zipcode'
                  className='border-2 border-slate-200 hover:border-slate-300 w-2/6 rounded-lg p-2'
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className='w-4/12 h-72 border'>
            <button className='w-10/12 text-md bg-blue-300 text-white rounded'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreePlan;
