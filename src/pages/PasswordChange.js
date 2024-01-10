import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { BsArrowRightShort } from 'react-icons/bs';
import { useChangePasswordMutation } from '../api/authApiSlice';
import { toast } from 'react-toastify';

const PasswordChange = () => {
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const [changePassword, result] = useChangePasswordMutation();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setChangingPassword(true);
    try {
      const changePassReq = await changePassword({
        newPassword: newPass,
        oldPassword: oldPass,
      }).unwrap();

      console.log(changePassReq);

      if (changePassReq === 'Password changed') {
        toast.success('Password changed!', {
          style: { color: 'rgb(28 25 23)' },
        });
        setChangingPassword(false);
        navigate('/settings');
      } else if (changePassReq === 'Invalid password') {
        toast.error('Password invalid!', {
          style: { color: 'rgb(28 25 23)' },
        });
        setChangingPassword(false);
      }
    } catch (err) {
      console.log(err);
      setChangingPassword(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        <div className='w-9/12 mx-auto p-10'>
          <div className='flex flex-col w-full'>
            <p className='text-3xl font-medium'>Change Password</p>

            <div className='rounded w-full drop-shadow-lg bg-white border h-screen mt-2 p-2'>
              <p className='text-stone-800 text-md'>
                Use the form below to change your password for your Fruntt
                account.
              </p>
              <form
                className='flex flex-col mt-2'
                onSubmit={handleChangePassword}
              >
                <input
                  type='password'
                  className='w-72 border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 bg-gray-100 outline outline-0  rounded p-2'
                  placeholder='Old password'
                  onChange={(e) => setOldPass(e.target.value)}
                  value={oldPass}
                />

                <input
                  type='password'
                  className='w-72 border-2 text-sm border-gray-100 hover:border-gray-200 hover:bg-gray-200 bg-gray-100 outline outline-0 rounded p-2 mt-2'
                  placeholder='New password'
                  onChange={(e) => setNewPass(e.target.value)}
                  value={newPass}
                />
                <button
                  type='submit'
                  disabled={changingPassword}
                  className='w-72 h-10 border-2 border-stone-800 text-stone-800 text-sm hover:text-white hover:bg-stone-800 rounded mt-2'
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasswordChange;
