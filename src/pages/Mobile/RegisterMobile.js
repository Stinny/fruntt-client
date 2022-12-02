import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import img from '../../media/shirt.jpg';
import { BsArrow90DegDown } from 'react-icons/bs';

//mui
import Alert from '@mui/material/Alert';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const RegisterMobile = ({
  error,
  setEmail,
  setPassword,
  setFirstName,
  setLastName,
  setBio,
  bio,
  firstName,
  lastName,
  handleSignup,
  setStoreName,
  profilePic,
  setProfilePic,
  storeName,
  isLoading,
}) => {
  return (
    <div className='container flex flex-col mx-auto w-full p-2'>
      <div className='flex flex-col w-full mt-10'>
        <h2 className='text-2xl font-medium'>Launch your first product page</h2>
        <p className='border-b-2 text-gray-400 font-medium mb-4 text-lg'>
          Launch a product page and explore the platform for FREE for 7 days
        </p>

        {error && (
          <Alert severity='error' color='error' className='mt-4 mb-4 w-full'>
            {error}
          </Alert>
        )}

        <form
          onSubmit={handleSignup}
          className='flex flex-col items-center w-full bg-gray-100 p-2 rounded'
        >
          <input
            type='email'
            placeholder='Email'
            className='border-2 border-gray-300 hover:border-slate-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded p-2 mt-2'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            className='border-2 border-gray-300 focus:outline focus:outline-1 hover:border-gray-400 focus:outline-gray-400 hover:border-slate-300 w-full rounded p-2 mt-2'
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='w-full flex-col mt-2'>
            <div className='flex flex-col border-b mb-2'>
              <p className='font-medium'>Seller profile</p>
              <p className='text-gray-400 font-medium'>
                This appears at the top of all your product pages
              </p>
            </div>

            <div className='flex justify-between w-full'>
              <input
                type='text'
                placeholder='First name or business name'
                className='border-2 border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <input
                type='text'
                placeholder='Last name (optional)'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className='border-2 border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2 ml-2'
              />
            </div>
            <textarea
              placeholder='A little about you, your business, or what you sell...'
              className='w-full h-20 border-2 rounded border-gray-300 hover:border-gray-400 outline outline-0 p-2 mt-2'
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
            <p className='text-gray-400 font-medium mt-2'>
              + add profile picture
            </p>
            <FilePond
              file={profilePic}
              imageResizeTargetWidth={200}
              allowReorder={true}
              name='productImages'
              onupdatefiles={(file) => setProfilePic(file)}
            />
          </div>

          <div className='w-full mt-2'>
            <p className='font-medium border-b'>
              Give your product page a name
            </p>
          </div>

          <div className='flex w-full'>
            <input
              type='text'
              placeholder='Page name & url'
              className='w-5/6 border-2 border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2 mt-2'
              onChange={(e) => setStoreName(e.target.value)}
            />
            <p className='font-medium text-xl mt-6'>.fruntt.com</p>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='h-11 w-full border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 rounded text-xl mt-4'
          >
            Start your trial - $0
          </button>
          <div className='mt-2 flex w-full'>
            <Link to='/login'>
              <p className='text-sm self-start text-slate-400 hover:text-slate-800 font-medium'>
                Already have a page? Login here.
              </p>
            </Link>
          </div>
        </form>
      </div>

      <div className=' w-full'>
        <div className='w-full flex flex-col'>
          <div className='flex flex-col mt-10 w-full'>
            <p className='font-medium'>Page url:</p>

            {storeName && (
              <p className='text-xl font-medium break-words'>
                https://{storeName}.fruntt.com
              </p>
            )}
          </div>
          <div className='flex mt-10 items-center'>
            <BsArrow90DegDown />
            <p className='font-medium text-xl'>Sample product page</p>
          </div>
        </div>

        <div className='border-2 rounded'>
          <div className='flex flex-col p-2'>
            <div className='w-full border-b'>
              <p className='text-xl font-medium'>The seller</p>
            </div>
            <div className='w-full flex flex-col mx-auto'>
              <div className='w-full flex justify-between mt-2'>
                {profilePic.length ? (
                  <Avatar
                    sx={{ width: 62, height: 62 }}
                    src={URL.createObjectURL(profilePic[0].file)}
                  />
                ) : (
                  <Avatar sx={{ width: 62, height: 62 }} />
                )}
                <div className='flex flex-col items-center'>
                  <p className='text-sm font-medium border-b'>Seller score</p>
                  <p className='font-medium text-green-500 text-lg'>9.8/10</p>
                  <p>88 sales</p>
                </div>
              </div>

              <div className='flex flex-col w-full'>
                {firstName || lastName ? (
                  <p className='text-xl font-medium'>
                    {firstName} {lastName}
                  </p>
                ) : (
                  ''
                )}

                {bio ? <p>{bio}</p> : ''}
              </div>

              {/* <div className='flex flex-col mt-2'>
                  <p className='font-medium'>Their other pages:</p>
                  <select className='rounded border-2 bg-transparent h-8'>
                    <option value={1}>luxurywatch.fruntt.com</option>
                  </select>
                </div> */}

              <div className='flex items-center text-3xl mt-2'>
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

          <div className='flex flex-col p-2'>
            <div className='flex flex-col'>
              <img src={img} className='w-full' />
              <div className='w-full'>
                <p className='font-medium text-2xl'>Active Dress Shirt</p>
                <p className='text-xl mt-2'>
                  Perfect shirt for those summer nights with friends spent out
                  by the lake
                </p>
                <p className='font-medium text-3xl mt-2'>$45.00</p>
                <p className='mt-4'>Size:</p>
                <select className='rounded border-2 bg-transparent h-8 w-4/12'>
                  <option value={1}>Medium</option>
                </select>

                <div className='flex items-center mt-2'>
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
                <span className='font-medium'>Question:</span> What is the
                material of the shirt?
              </p>
              <p className='mt-2'>
                <span className='font-medium'>Answer:</span> The shirt is mostly
                polyester and flex wear
              </p>
            </div>
            <div className='flex flex-col rounded p-2 mb-2 bg-gray-200'>
              <p>
                <span className='font-medium'>Question:</span> Does it come with
                extra buttons?
              </p>
              <p className='mt-2'>
                <span className='font-medium'>Answer:</span> Yes! The shirt
                comes with two extra buttons.
              </p>
            </div>
            <p className='font-medium text-xl'>Customer Reviews (8)</p>
            <div className='w-full h-44 overflow-y-scroll'>
              <div className='flex flex-col bg-gray-200 p-4 rounded mt-2'>
                <div className='flex w-full'>
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
                <div className='flex w-full'>
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
                <div className='flex w-full'>
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
                <div className='flex w-full'>
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
                <div className='flex w-full'>
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
};

export default RegisterMobile;
