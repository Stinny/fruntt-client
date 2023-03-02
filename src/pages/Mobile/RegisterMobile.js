import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLinkedin, AiOutlineTwitter } from 'react-icons/ai';
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
  //auto scrolls to top of page
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className='container flex flex-col mx-auto w-full p-2'>
      <div className='flex flex-col w-full mt-10'>
        <h2 className='text-2xl font-medium'>Launch your first product page</h2>
        <p className='border-b-2 text-gray-400 font-medium mb-4'>
          See sample product page below
        </p>

        {error && (
          <Alert severity='error' color='error' className='mt-4 mb-4 w-full'>
            {error}
          </Alert>
        )}

        <form
          onSubmit={handleSignup}
          className='flex flex-col items-center w-full bg-gray-100 p-2 rounded border-2 border-gray-300'
        >
          <input
            type='email'
            placeholder='Email'
            className='border-2 text-sm border-gray-300 hover:border-slate-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-slate-300 w-full rounded p-2 mt-2'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            placeholder='Password'
            className='border-2 text-sm border-gray-300 focus:outline focus:outline-1 hover:border-gray-400 focus:outline-gray-400 hover:border-slate-300 w-full rounded p-2 mt-2'
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
                maxLength='25'
                type='text'
                placeholder='First name or business name'
                className='border-2 text-sm border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2'
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <input
                type='text'
                maxLength='25'
                placeholder='Last name (optional)'
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className='border-2 text-sm border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2 ml-2'
              />
            </div>
            <div className='flex flex-col'>
              <textarea
                maxLength='100'
                placeholder='A little about you, your business, or what you sell...'
                className='w-full h-20 border-2 rounded border-gray-300 hover:border-gray-400 outline outline-0 p-2 mt-2'
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
              <p className='text-sm text-right'>{bio.length}/100</p>
            </div>
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
              className='w-5/6 border-2 text-sm border-gray-300 hover:border-gray-400 focus:outline focus:outline-1 focus:outline-gray-300 w-full rounded p-2 mt-2'
              onChange={(e) => setStoreName(e.target.value)}
            />
            <p className='font-medium text-xl mt-6'>.fruntt.com</p>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='h-11 w-full border-2 border-slate-800 hover:bg-slate-800 hover:text-white text-slate-800 rounded text-xl mt-4'
          >
            Launch product page
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

      <div className='flex flex-col mt-4'>
        {storeName ? (
          <p className='text-lg font-medium mb-2'>
            https://{storeName}.fruntt.com
          </p>
        ) : (
          <p className='text-lg font-medium mb-2'>
            https://&#123;YourPageName&#125;.fruntt.com
          </p>
        )}
        <div className='w-full p-2 rounded bg-green-100 border-black border drop-shadow-xl'>
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
      </div>
    </div>
  );
};

export default RegisterMobile;
