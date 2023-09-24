import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  useGetDigitalOrderQuery,
  useAddProductReviewMutation,
  useMarkAsViewedMutation,
} from '../api/ordersApiSlice';
import Spinner from '../components/Spinner';
import { isMobile } from 'react-device-detect';
import MobileDownload from './Mobile/MobileDownload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import Cookies from 'js-cookie';

//mui
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import DesktopDownload from './DesktopDownload';

const Download = () => {
  const { orderId } = useParams();

  const [open, setOpen] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');

  //get order, as long as it is paid for
  const {
    data: orderAndStore,
    isLoading,
    isSuccess,
    refetch,
  } = useGetDigitalOrderQuery({
    orderId,
  });

  const [addProductReview, result] = useAddProductReviewMutation();

  useEffect(() => {
    refetch();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const addReviewReq = await addProductReview({
        review: review,
        rating: rating,
        orderId: orderAndStore?.order?._id,
        email: orderAndStore?.order?.email,
        name: name,
      }).unwrap();

      if (addReviewReq === 'Review added') {
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <MobileDownload
        orderAndStore={orderAndStore}
        setReview={setReview}
        setRating={setRating}
        handleSubmitReview={handleSubmitReview}
        open={open}
        setOpen={setOpen}
        setName={setName}
      />
    ) : (
      <DesktopDownload
        orderAndStore={orderAndStore}
        setReview={setReview}
        setRating={setRating}
        handleSubmitReview={handleSubmitReview}
        open={open}
        setOpen={setOpen}
        setName={setName}
      />
    );
  }
  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto'>{content}</div>
      <Footer />
    </>
  );
};

export default Download;
