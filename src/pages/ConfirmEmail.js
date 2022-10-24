import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useParams, Link } from 'react-router-dom';
import { useConfirmEmailMutation } from '../api/authApiSlice';
import { BsArrowRightShort } from 'react-icons/bs';
import img from '../media/check.svg';
import { useLazyGetUpdatedUserQuery } from '../api/authApiSlice';
import Cookies from 'js-cookie';

const ConfirmEmail = () => {
  const { userId } = useParams();
  const [confirmed, setConfirmed] = useState(false);

  const [
    getUpdatedUser,
    { isLoading, isSuccess },
  ] = useLazyGetUpdatedUserQuery();
  const [confirmEmail, result] = useConfirmEmailMutation();

  useEffect(() => {
    const confirm = async () => {
      try {
        const confirmEmailReq = await confirmEmail(userId).unwrap();
        if (confirmEmailReq === 'User updated') {
          const user = await getUpdatedUser().unwrap();
          const updatedUser = JSON.stringify(user);
          Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
          setConfirmed(true);
        }
      } catch (err) {
        setConfirmed(false);
      }
    };
    confirm();
  }, []);

  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto h-screen'>
        <div className='w-full p-4 border-2 rounded mt-20 flex flex-col items-center justify-center'>
          {confirmed ? (
            <>
              <img src={img} className='w-3/12' />
              <p className='text-3xl font-medium'>
                Your email has been confirmed!
              </p>
              <Link
                to='/dashboard'
                className='mt-2 flex items-center text-gray-400 hover:text-gray-600'
              >
                Return to dashboard
                <BsArrowRightShort className='ml-2' />
              </Link>
            </>
          ) : (
            <p className='text-3xl font-medium'>
              Your email cannot be confirmed.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmEmail;
