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
import { AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import img from '../media/shirt.jpg';
import { BsArrow90DegDown } from 'react-icons/bs';

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

    if (!email || !password || !storeName || !firstName) {
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

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

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
      <div className='flex justify-between items-center mx-auto w-full h-full'>
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

        <div className='h-full flex flex-col justify-center w-7/12 border-l-2 border-black'>
          {storeName ? (
            <p className='text-xl font-medium ml-56 mb-2'>
              https://{storeName}.fruntt.com
            </p>
          ) : (
            <p className='text-xl font-medium ml-56 mb-2'>
              https://&#123;YourPageName&#125;.fruntt.com
            </p>
          )}
          <div className='w-7/12 h-5/6 p-2 rounded bg-green-100 border-black border drop-shadow-xl ml-56'>
            <div className='border-t border-b w-full h-16 border-black flex items-center'>
              <div className='w-1/12'>
                {profilePic.length ? (
                  <Avatar src={URL.createObjectURL(profilePic[0].file)} />
                ) : (
                  <Avatar>J</Avatar>
                )}
              </div>

              <div className='flex flex-col w-44 ml-4 w-4/12'>
                <div className='flex'>
                  <div className='w-6/12 h-2 bg-gray-200'></div>
                  <div className='w-6/12 h-2 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex mt-2'>
                  <div className='w-9/12 h-2 bg-gray-200'></div>
                  <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex mt-2'>
                  <div className='w-9/12 h-2 bg-gray-200'></div>
                  <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
                </div>
              </div>

              <div className='flex flex-col items-center ml-2 w-2/12'>
                <p className='font-medium'>78</p>
                <p className='font-medium text-xs'>Sales</p>
              </div>

              <div className='flex flex-col ml-2 w-3/12'>
                <p className='font-medium text-xs'>My other pages:</p>
                <select className='h-6 rounded bg-gray-200'></select>
              </div>

              <div className='flex items-center justify-around w-2/12'>
                <a href='https://linkedin.com/company/fruntt' target='_blank'>
                  <AiOutlineLinkedin className='text-black hover:text-slate-800 text-2xl' />
                </a>

                <a href='https://twitter.com/fruntt_' target='_blank'>
                  <AiOutlineTwitter className='text-black hover:text-slate-800 text-2xl' />
                </a>
              </div>
            </div>

            <div className='flex justify-between w-full mt-2'>
              <div className='w-6/12 bg-pink-100 rounded h-52'></div>

              <div className='flex flex-col w-6/12 ml-4'>
                <div className='flex'>
                  <div className='w-6/12 h-6 bg-gray-200'></div>
                  <div className='w-6/12 h-6 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex mt-4'>
                  <div className='w-9/12 h-2 bg-gray-200'></div>
                  <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex mt-2'>
                  <div className='w-4/12 h-2 bg-gray-200'></div>
                  <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex mt-2'>
                  <div className='w-5/12 h-2 bg-gray-200'></div>
                  <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex mt-2'>
                  <div className='w-10/12 h-2 bg-gray-200'></div>
                  <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex mt-2'>
                  <div className='w-4/12 h-2 bg-gray-200'></div>
                  <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
                </div>

                <div className='flex items-center mt-4'>
                  <p className='font-semibold text-2xl mr-4'>$19.99</p>
                  <p className='text-sm'>(12) reviews</p>
                </div>

                <button
                  type='button'
                  className='w-full bg-white text-black rounded h-8 text-sm mt-2 border border-stone-800'
                >
                  BUY NOW
                </button>
              </div>
            </div>

            <p className='text-black text-sm mt-2 font-medium'>
              About this product
            </p>
            <div className='bg-gray-300 h-32 w-full rounded p-2'>
              <div className='flex'>
                <div className='w-9/12 h-2 bg-gray-200'></div>
                <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
              </div>

              <div className='flex mt-2'>
                <div className='w-4/12 h-2 bg-gray-200'></div>
                <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
              </div>

              <div className='flex mt-2'>
                <div className='w-5/12 h-2 bg-gray-200'></div>
                <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
              </div>

              <div className='flex mt-2'>
                <div className='w-10/12 h-2 bg-gray-200'></div>
                <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
              </div>
            </div>

            <p className='text-black text-sm mt-2 font-medium'>
              Customer questions
            </p>
            <div className='bg-gray-300 h-28 w-full rounded p-2'>
              <div className='flex'>
                <div className='w-9/12 h-2 bg-gray-200'></div>
                <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
              </div>

              <div className='flex mt-2'>
                <div className='w-4/12 h-2 bg-gray-200'></div>
                <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
              </div>

              <div className='flex mt-2'>
                <div className='w-5/12 h-2 bg-gray-200'></div>
                <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
              </div>
            </div>

            <p className='text-black text-sm mt-2 font-medium'>
              Customer reviews (12)
            </p>
            <div className='bg-gray-300 h-24 w-full rounded p-2'>
              <div className='flex mt-2'>
                <div className='w-5/12 h-2 bg-gray-200'></div>
                <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
              </div>

              <div className='flex mt-2'>
                <div className='w-10/12 h-2 bg-gray-200'></div>
                <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
              </div>
            </div>
          </div>
          {/* <div className='w-8/12'>
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
                    <p className='font-medium text-2xl'>208</p>
                    <p className='text-lg'>sales</p>
                  </div>

                  <div className='flex flex-col mt-2'>
                    <p className='font-medium'>Their other pages:</p>
                    <select className='rounded border-2 h-8 w-56'>
                      <option value={1}>shirt.fruntt.com</option>
                    </select>
                  </div>

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
                      Perfect shirt for those summer nights with friends spent
                      out by the lake
                    </p>
                    <p className='font-medium text-3xl mt-4'>$45.00</p>
                    <p className='mt-4'>Size:</p>
                    <select className='rounded border-2 w-32 h-8'>
                      <option value={1}>Medium</option>
                    </select>

                    <div className='flex items-center mt-4'>
                      <Rating value={4.5} precision={0.5} />
                      <p className='ml-2 '>(8) reviews</p>
                    </div>

                    <div className='flex items-center w-full mt-4'>
                      <p>Qty:</p>
                      <select className='rounded border-2 h-8 w-20'>
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
                    <span className='font-medium'>Question:</span> Does this
                    shirt come with extra buttons?
                  </p>
                  <p className='mt-2'>
                    <span className='font-medium'>Answer:</span> Yes! This shirt
                    comes with 4 extra buttons if one falls off.
                  </p>
                </div>
                <div className='flex flex-col rounded p-2 mb-2 bg-gray-200'>
                  <p>
                    <span className='font-medium'>Question:</span> What material
                    is this shirt?
                  </p>
                  <p className='mt-2'>
                    <span className='font-medium'>Answer:</span> This shirt is
                    80% cotton and 20% polyester.
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
          </div> */}
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
