import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import img from '../media/shoppingImg.svg';
import imgTwo from '../media/shopping2img.svg';
import OfferSection from '../components/Home/OfferSection';
import SignupStripe from '../components/Home/SignupStripe';
import Cookies from 'js-cookie';

const Home = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  if (currentUser) return <Navigate to='/dashboard' />;

  return (
    <>
      <Navbar />
      <div className='mx-auto max-w-7xl h-screen'>
        <div className='w-full h-full flex justify-between items-center'>
          <div className='flex flex-col w-6/12'>
            <p className='text-5xl font-medium mt-4'>
              Super Simple Storefronts.
            </p>
            <p className='text-4xl mt-4'>
              All your eCommerce needs in one simple solution.
            </p>
            <Link to='/signup'>
              <button className='rounded text-white bg-blue-300 w-5/12 h-10 text-xl mt-4 hover:bg-blue-500 flex items-center justify-center'>
                Start free trial
              </button>
            </Link>
          </div>

          <img className='w-6/12' src={imgTwo} />
        </div>
      </div>
      <OfferSection />
      <SignupStripe />
      <Footer />
    </>
  );
};

export default Home;
