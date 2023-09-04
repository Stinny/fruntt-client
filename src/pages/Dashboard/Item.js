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

const Item = () => {
  const currentStoreID = useSelector((state) => state.user.selectedStore);

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProductsQuery({ storeId: currentStoreID });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentStoreID]);

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

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen mb-32'>{content}</div>
      <Footer />
    </>
  );
};

export default Item;
