import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import {
  useGetProductsQuery,
  useLazyGetAliProductQuery,
} from '../../api/productsApiSlice';
import Spinner from '../../components/Spinner';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import ProductMobile from '../Mobile/Dashboard/ProductMobile';
import Cookies from 'js-cookie';
import {
  MdOutlineFileDownload,
  MdOutlineVideoLibrary,
  MdLocalPrintshop,
  MdOutlinePermMedia,
} from 'react-icons/md';
import { HiOutlineBookOpen, HiOutlineTemplate } from 'react-icons/hi';
import { BsFillMicFill, BsPalette } from 'react-icons/bs';
import 'react-quill/dist/quill.bubble.css';
import ProductsDesktop from './ProductsDesktop';

const Products = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProductsQuery({ storeId: currentUser?.store?._id });

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <ProductMobile product={product} />
    ) : (
      <ProductsDesktop product={product} />
    );
  }

  const styles = isMobile
    ? 'w-full mx-auto h-screen bg-white mt-16'
    : 'w-full mx-auto h-screen bg-white ml-2';

  return (
    <>
      <Navbar />
      <div className='flex mx-auto max-w-6xl'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
