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
import FAQS from '../components/Landing/FAQS';
import RecentStores from '../components/Landing/RecentStores';
import { useGetFeaturedStoresQuery } from '../api/storefrontApiSlice';
import { useGetFeaturedProductsQuery } from '../api/productsApiSlice';

const Home = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const {
    data: stores,
    isLoading,
    isSuccess,
    refetch,
  } = useGetFeaturedStoresQuery();

  const {
    data: products,
    isLoading: gettingProducts,
    isSuccess: gotProducts,
  } = useGetFeaturedProductsQuery();

  if (currentUser) return <Navigate to='/dashboard' />;

  return (
    <div className='h-screen mx-auto'>
      <Navbar />

      <div className='mx-auto max-w-6xl flex flex-col'>
        <div className='w-full mx-auto flex flex-col items-center flex-grow'>
          <Hero
            products={products}
            gettingProducts={gettingProducts}
            gotProducts={gotProducts}
          />
          {/* <Email /> */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
