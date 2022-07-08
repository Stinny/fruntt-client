import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  return (
    <>
      <Navbar />
      <div className='mx-auto max-w-7xl h-screen'>
        <div className='w-8/12 h-full mx-auto flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-medium mb-10'>Pricing</h1>

          <div className='w-full flex justify-between'>
            <div className='border-2 rounded w-96 p-4'>
              <p className='text-3xl'>Free</p>
              <p className='text-4xl font-medium mt-4'>$0/Month</p>
              <div className='w-full h-10 flex justify-center mt-4 mb-4'>
                <button className='rounded bg-blue-300 hover:bg-blue-400 text-white w-10/12'>
                  Start Now
                </button>
              </div>
              <div>
                <p className='text-xl font-medium'>plan includes:</p>
                <ul className='text-lg mt-4 leading-loose'>
                  <li>Storefront</li>
                  <li>Storefront customization</li>
                  <li>Up to 10 products</li>
                  <li>Physical products</li>
                </ul>
              </div>
            </div>

            <div className='border-2 rounded w-96 p-4'>
              <p className='text-3xl'>Paid</p>
              <p className='text-4xl font-medium mt-4'>$32/Month</p>
              <div className='w-full h-10 flex justify-center mt-4 mb-4'>
                <button className='rounded text-white bg-blue-300 w-10/12 hover:bg-blue-400'>
                  Start Now
                </button>
              </div>
              <div>
                <p className='text-xl font-medium'>plan includes:</p>
                <ul className='text-lg mt-4 leading-loose'>
                  <li>Everything in free</li>
                  <li>Unlimited products</li>
                  <li>Physical & digital goods</li>
                  <li>Offer subscriptions</li>
                  <li>Connect own domain</li>
                  <li>Email marketing</li>
                  <li>SEO</li>
                  <li>Integrations</li>
                  <li>24/7 email support</li>
                  <li>Remove Kretey branding</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
