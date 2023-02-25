import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import Hero from '../components/Landing/Hero';
import SectionOne from '../components/Landing/SectionOne';
import SectionTwo from '../components/Landing/SectionTwo';
import SectionThree from '../components/Landing/SectionThree';
import SectionFour from '../components/Landing/SectionFour';
import PHunt from '../components/Landing/PHunt';
import Email from '../components/Landing/Email';
import Banner from '../components/Home/Banner';
import HowSell from '../components/Landing/HowSell';
import Fee from '../components/Landing/Fee';

const Home = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  if (currentUser) return <Navigate to='/dashboard' />;

  return (
    <>
      <Navbar />

      <div className='mx-auto h-fit max-w-8xl'>
        <div className='w-full mx-auto h-full flex flex-col items-center'>
          <Hero />
          <Banner />
          <HowSell />
          <Fee />
          <PHunt />
          <Email />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
