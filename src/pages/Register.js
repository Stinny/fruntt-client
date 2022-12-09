import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/authApiSlice';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import { isMobile } from 'react-device-detect';
import { uploadImageRequest } from '../api/requests';
import { setStoreIds } from '../redux/userRedux';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import img from '../media/shirt.jpg';
import { BsArrow90DegDown } from 'react-icons/bs';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

//mui
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Alert from '@mui/material/Alert';
import RegisterMobile from './Mobile/RegisterMobile';
import CardForm from '../components/Forms/CardForm';
import RegisterForm from '../components/Forms/RegisterForm';

const stripeLoader = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  //component state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState([]);

  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    let profilePicUrl = '';
    let profilePicKey = '';

    if (!email || !password || !storeName || !firstName || !lastName) {
      setError('All required fields must be filled in');
      return;
    }
    try {
      //if files were added, upload to server and update profile pic url/key variables
      if (profilePic.length) {
        const image = new FormData();
        image.append('productImages', profilePic[0].file);
        const imageDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          image
        );
        profilePicUrl = imageDataReq.data[0].url;
        profilePicKey = imageDataReq.data[0].key;
      }

      const registerData = await register({
        email,
        password,
        storeName,
        firstName,
        lastName,
        bio,
        profilePicUrl,
        profilePicKey,
      }).unwrap();

      const currentUser = JSON.stringify(registerData.userInfo);
      Cookies.set('currentUser', currentUser, { sameSite: 'Lax' });
      Cookies.set('aToken', registerData.accessToken, { sameSite: 'Lax' });
      Cookies.set('rToken', registerData.refreshToken, { sameSite: 'Lax' });
      dispatch(setStoreIds(currentUser?.storeIds));

      navigate('/storefront/launching');
    } catch (err) {
      if (!err?.status) {
        setError('Server not responding');
      } else if (err.status === 400) {
        setError(err.data.error);
      } else {
        console.log(err);
        setError('Signup failed');
      }
    }
  };

  useEffect(() => {
    setError('');
  }, [email, storeName, password]);

  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = isMobile ? (
      <RegisterMobile
        error={error}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignup={handleSignup}
        setStoreName={setStoreName}
        storeName={storeName}
        bio={bio}
        setBio={setBio}
        firstName={firstName}
        lastName={lastName}
        setLastName={setLastName}
        setFirstName={setFirstName}
        isLoading={isLoading}
        profilePic={profilePic}
        setProfilePic={setProfilePic}
      />
    ) : (
      <div className='container flex justify-between mx-auto w-full'>
        <Elements stripe={stripeLoader}>
          <RegisterForm
            error={error}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSignup={handleSignup}
            setStoreName={setStoreName}
            storeName={storeName}
            bio={bio}
            setBio={setBio}
            firstName={firstName}
            lastName={lastName}
            setLastName={setLastName}
            setFirstName={setFirstName}
            isLoading={isLoading}
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
        </Elements>

        <div className='w-8/12'>
          <div className='w-full flex justify-between items-center'>
            <div className='flex items-center mt-10'>
              <p className='font-medium'>Page url:</p>
              {storeName && (
                <p className='ml-2 text-2xl font-medium'>
                  https://{storeName}.fruntt.com
                </p>
              )}
            </div>
            <div className='flex mt-10 items-center'>
              <BsArrow90DegDown />
              <p className='font-medium text-2xl'>Sample product page</p>
            </div>
          </div>

          <div className='border-2 rounded bg-blue-200'>
            <div className='flex flex-col p-2'>
              <div className='w-full border-b'>
                <p className='text-xl font-medium'>The seller</p>
              </div>
              <div className='w-full flex justify-between items-center mx-auto'>
                {profilePic.length ? (
                  <Avatar
                    sx={{ width: 62, height: 62 }}
                    src={URL.createObjectURL(profilePic[0].file)}
                  />
                ) : (
                  <Avatar sx={{ width: 62, height: 62 }} />
                )}

                <div className='flex flex-col w-72'>
                  {firstName || lastName ? (
                    <p className='text-2xl font-medium'>
                      {firstName} {lastName}
                    </p>
                  ) : (
                    <p className='text-2xl font-medium'>John Smith</p>
                  )}

                  {bio ? (
                    <p>{bio}</p>
                  ) : (
                    <p>This is your bio, try to be creative and catchy</p>
                  )}
                </div>

                <div className='flex flex-col items-center'>
                  <p className='text-sm font-medium border-b'>Seller score</p>
                  <p className='font-medium text-green-500 text-xl'>9.8/10</p>
                  <p>88 sales</p>
                </div>

                {/* <div className='flex flex-col mt-2'>
                  <p className='font-medium'>Their other pages:</p>
                  <select className='rounded border-2 bg-transparent h-8'>
                    <option value={1}>luxurywatch.fruntt.com</option>
                  </select>
                </div> */}

                <div className='flex items-center text-3xl'>
                  <a target='_blank'>
                    <AiOutlineFacebook className='text-slate-800' />
                  </a>
                  <a target='_blank'>
                    <AiOutlineInstagram className='text-slate-800 ml-2' />
                  </a>
                  <a target='_blank'>
                    <AiOutlineTwitter className='text-slate-800 ml-2' />
                  </a>
                </div>
              </div>
              <div className='w-full border-b mt-4'>
                <p className='text-xl font-medium'>What they're selling</p>
              </div>
            </div>

            <div className='flex flex-col p-4'>
              <div className='flex'>
                <img src={img} className='w-3/6' />
                <div className='w-3/6 ml-4'>
                  <p className='font-medium text-2xl'>Active Dress Shirt</p>
                  <p className='text-xl mt-4'>
                    Perfect shirt for those summer nights with friends spent out
                    by the lake
                  </p>
                  <p className='font-medium text-3xl mt-4'>$45.00</p>
                  <p className='mt-4'>Size:</p>
                  <select className='rounded border-2 bg-transparent h-8'>
                    <option value={1}>Medium</option>
                  </select>

                  <div className='flex items-center mt-4'>
                    <Rating value={4.5} precision={0.5} />
                    <p className='ml-2 '>(8) reviews</p>
                  </div>

                  <div className='flex items-center w-full mt-4'>
                    <p>Qty:</p>
                    <select className='rounded-xl border-2 bg-transparent h-8 w-20'>
                      <option value={1}>1</option>
                    </select>
                    <button className='border-2 rounded border-slate-800 w-4/6 ml-2 h-10'>
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
              <p className='font-medium text-xl'>Customer Questions</p>
              <div className='flex flex-col rounded p-2 mb-2 bg-gray-200'>
                <p>
                  <span className='font-medium'>Question:</span> This is the
                  question?
                </p>
                <p className='mt-2'>
                  <span className='font-medium'>Answer:</span> This is the
                  answer to the question
                </p>
              </div>
              <div className='flex flex-col rounded p-2 mb-2 bg-gray-200'>
                <p>
                  <span className='font-medium'>Question:</span> This is the
                  question?
                </p>
                <p className='mt-2'>
                  <span className='font-medium'>Answer:</span> This is the
                  answer to the question
                </p>
              </div>
              <p className='font-medium text-xl'>Customer Reviews (8)</p>
              <div className='w-full h-44 overflow-y-scroll'>
                <div className='flex flex-col bg-gray-200 p-4 rounded mt-2'>
                  <div className='flex w-4/12'>
                    <p className='font-medium mr-2'>John Smith</p>
                    <p>March 4th, 2022</p>
                  </div>

                  <Rating
                    value={5}
                    readOnly
                    size='medium'
                    className='mt-2'
                    precision={0.5}
                  />
                  <p className='mt-2'>This shirt is awesome</p>
                </div>
                <div className='flex flex-col bg-gray-200 p-4 rounded mt-2'>
                  <div className='flex w-4/12'>
                    <p className='font-medium mr-2'>John Smith</p>
                    <p>March 4th, 2022</p>
                  </div>

                  <Rating
                    value={5}
                    readOnly
                    size='medium'
                    className='mt-2'
                    precision={0.5}
                  />
                  <p className='mt-2'>This shirt is awesome</p>
                </div>
                <div className='flex flex-col bg-gray-200 p-4 rounded mt-2'>
                  <div className='flex w-4/12'>
                    <p className='font-medium mr-2'>John Smith</p>
                    <p>March 4th, 2022</p>
                  </div>

                  <Rating
                    value={5}
                    readOnly
                    size='medium'
                    className='mt-2'
                    precision={0.5}
                  />
                  <p className='mt-2'>This shirt is awesome</p>
                </div>
                <div className='flex flex-col bg-gray-200 p-4 rounded mt-2'>
                  <div className='flex w-4/12'>
                    <p className='font-medium mr-2'>John Smith</p>
                    <p>March 4th, 2022</p>
                  </div>

                  <Rating
                    value={5}
                    readOnly
                    size='medium'
                    className='mt-2'
                    precision={0.5}
                  />
                  <p className='mt-2'>This shirt is awesome</p>
                </div>
                <div className='flex flex-col bg-gray-200 p-4 rounded mt-2'>
                  <div className='flex w-4/12'>
                    <p className='font-medium mr-2'>John Smith</p>
                    <p>March 4th, 2022</p>
                  </div>

                  <Rating
                    value={5}
                    readOnly
                    size='medium'
                    className='mt-2'
                    precision={0.5}
                  />
                  <p className='mt-2'>This shirt is awesome</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='mx-auto max-w-8xl h-fit flex justify-center items-center'>
        {content}
      </div>
      <Footer />
    </>
  );
};

export default Register;
