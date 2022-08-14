import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useConfirmEmailMutation } from '../api/authApiSlice';

const ConfirmEmail = () => {
  const { userId } = useParams();
  const [confirmed, setConfirmed] = useState(false);

  const [confirmEmail, result] = useConfirmEmailMutation();

  useEffect(() => {
    const confirm = async () => {
      const confirmEmailReq = await confirmEmail(userId).unwrap();
      if (confirmEmailReq === 'User updated') setConfirmed(true);
    };
    confirm();
  }, []);

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto h-screen'>
        <div className='w-full h-28 border-2 rounded mt-20'>
          {confirmed ? (
            <p className='text-3xl'>Your email has been confirmed!</p>
          ) : (
            <p className='text-3xl'>Your email cannot be confirmed.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmEmail;
