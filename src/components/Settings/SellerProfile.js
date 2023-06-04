import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import { uploadImageRequest } from '../../api/requests';
import { useUpdateSellerProfileMutation } from '../../api/authApiSlice';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Avatar from '@mui/material/Avatar';

const SellerProfile = ({ user, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  //form
  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [bio, setBio] = useState(user?.sellerProfile?.bio);
  const [image, setImage] = useState('');
  const [facebook, setFacebook] = useState(user?.sellerProfile?.facebook);
  const [youtube, setYoutube] = useState(user?.sellerProfile?.youtube);
  const [twitter, setTwitter] = useState(user?.sellerProfile?.twitter);
  const [instagram, setInstagram] = useState(user?.sellerProfile?.instagram);
  const [tiktok, setTiktok] = useState(user?.sellerProfile?.tiktok);
  const [linkedin, setLinkedin] = useState(user?.sellerProfile?.linkedin);
  const [profilePic, setProfilePic] = useState([]);

  const [updateSellerProfile, result] = useUpdateSellerProfileMutation();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    let profilePicUrl = user?.sellerProfile?.picture?.url;
    let profilePicKey = user?.sellerProfile?.picture?.key;

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

      //update profile request goes here
      const updateProfileReq = await updateSellerProfile({
        name,
        bio,
        facebook,
        youtube,
        twitter,
        instagram,
        linkedin,
        tiktok,
        profilePicUrl,
        profilePicKey,
      }).unwrap();

      if (updateProfileReq === 'Profile updated') {
        refetch();
        closeModal();
      } else {
        refetch();
        return;
      }
    } catch (err) {
      closeModal();
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const modalStyles = isMobile
    ? {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: '95%',
        },
      }
    : {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
        },
      };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <form className='flex flex-col' onSubmit={handleUpdateProfile}>
          <p className='text-xl font-medium text-slate-800'>
            Edit seller profile
          </p>
          <p className=' font-medium text-gray-400 mb-4 border-b'>
            This appears at the top of all your product pages
          </p>
          <p className='text-lg font-medium mt-2 mb-2'>about you</p>

          <div className='flex items-center w-full'>
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded p-2'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Name'
            />
          </div>
          <textarea
            placeholder='A little about you, your brand, or what you sell...'
            className='w-full h-24 border-2 border-gray-300 hover:border-gray-400 rounded outline outline-0 p-2 mt-2'
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            maxLength={100}
          />
          <p className='text-gray-400 mt-2'>Upload new profile image</p>
          <FilePond
            file={profilePic}
            imageResizeTargetWidth={200}
            allowReorder={true}
            name='productImages'
            onupdatefiles={(file) => setProfilePic(file)}
          />
          <p className='text-lg font-medium mt-2 mb-2'>Social links</p>

          <div className='w-full flex justify-between items-center'>
            <AiOutlineFacebook className='text-4xl' />
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded p-2'
              placeholder='https://www.facebook.com/youraccount'
              onChange={(e) => setFacebook(e.target.value)}
              value={facebook}
            />
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <AiOutlineInstagram className='text-4xl' />
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded p-2'
              placeholder='https://www.instagram.com/youraccount'
              onChange={(e) => setInstagram(e.target.value)}
              value={instagram}
            />
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <AiOutlineYoutube className='text-4xl' />
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded p-2'
              placeholder='https://www.youtube.com/youraccount'
              onChange={(e) => setYoutube(e.target.value)}
              value={youtube}
            />
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <AiOutlineTwitter className='text-4xl' />
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded p-2'
              placeholder='https://www.twitter.com/youraccount'
              onChange={(e) => setTwitter(e.target.value)}
              value={twitter}
            />
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <AiOutlineLinkedin className='text-4xl' />
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded p-2'
              placeholder='https://www.linkedin.com/youraccount'
              onChange={(e) => setLinkedin(e.target.value)}
              value={linkedin}
            />
          </div>

          <div className='w-full flex justify-between items-center mt-2'>
            <FaTiktok className='text-4xl' />
            <input
              type='text'
              className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded p-2'
              placeholder='https://www.tiktok.com/youraccount'
              onChange={(e) => setTiktok(e.target.value)}
              value={tiktok}
            />
          </div>
          <button
            type='button'
            onClick={closeModal}
            className='w-full h-10 border-2 border-red-500 text-red-400 rounded mt-4 hover:text-white hover:bg-red-400'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='w-full h-14 border-2 border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800 rounded mt-4'
          >
            Save
          </button>
        </form>
      </Modal>
      <div>
        {isMobile ? (
          <div className='flex justify-between items-center w-full border-b p-2'>
            <div className='flex flex-col'>
              <p className='text-xlg font-medium'>Seller profile</p>
            </div>
            <button
              className='border-2 rounded w-16 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
              onClick={openModal}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className='flex justify-between items-center w-full border-b p-2'>
            <div className='flex flex-col'>
              <p className='text-xlg font-medium'>Seller profile</p>
              <p className='text-gray-400'>
                Your seller profile appears at the top of all your product pages
                for customers to see
              </p>
            </div>

            <button
              className='border-2 rounded w-20 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
              onClick={openModal}
            >
              Edit
            </button>
          </div>
        )}

        {isMobile ? (
          <div className='w-full mx-auto p-2'>
            <div className='max-w-6xl flex flex-col mx-auto'>
              <div className='flex justify-between mt-2'>
                <Avatar
                  sx={{ width: 62, height: 62 }}
                  src={user?.sellerProfile?.picture?.url}
                  className='border border-stone-800'
                />
                <div className='flex flex-col items-center'>
                  <p className='font-medium text-4xl'>
                    {user?.sellerProfile?.numberOfSales}
                  </p>
                  <p>sales</p>
                </div>
              </div>

              <div className='flex flex-col'>
                <p className='text-2xl font-medium'>
                  {user?.name ? user?.name : '{Your Name}'}
                </p>

                <p>
                  {user?.sellerProfile?.bio
                    ? user?.sellerProfile?.bio
                    : 'This is your bio.'}
                </p>
              </div>

              <div className='flex flex-col mt-2'>
                <p className='font-medium'>Your other pages:</p>
                <select className='rounded border-2 bg-transparent h-8'>
                  <option value={1}>luxurywatch.fruntt.com</option>
                </select>
              </div>
              <div className='flex items-center mt-4'>
                {user?.sellerProfile?.facebook ? (
                  <a href={user?.sellerProfile?.facebook} target='_blank'>
                    <AiOutlineFacebook className='text-stone-800 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineFacebook className='text-gray-200 text-3xl' />
                )}
                {user?.sellerProfile?.instagram ? (
                  <a href={user?.sellerProfile?.instagram} target='_blank'>
                    <AiOutlineInstagram className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineInstagram className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.twitter ? (
                  <a href={user?.sellerProfile?.twitter} target='_blank'>
                    <AiOutlineTwitter className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineTwitter className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.linkedin ? (
                  <a href={user?.sellerProfile?.linkedin} target='_blank'>
                    <AiOutlineLinkedin className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineLinkedin className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.youtube ? (
                  <a href={user?.sellerProfile?.youtube} target='_blank'>
                    <AiOutlineYoutube className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineYoutube className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.tiktok ? (
                  <a href={user?.sellerProfile?.tiktok} target='_blank'>
                    <FaTiktok className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <FaTiktok className='text-gray-200 ml-2 text-3xl' />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full mx-auto'>
            <div className='max-w-6xl flex justify-between mx-auto p-8'>
              <Avatar
                sx={{ width: 62, height: 62 }}
                src={user?.sellerProfile?.picture?.url}
                className='border border-stone-800'
              />

              <div className='flex flex-col w-96'>
                <p className='text-2xl font-medium'>
                  {user?.name ? user?.name : '{Your Name}'}
                </p>

                <p>
                  {user?.sellerProfile?.bio
                    ? user?.sellerProfile?.bio
                    : 'This is your bio, it is empty.'}
                </p>
              </div>

              <div className='flex flex-col items-center'>
                <p className='font-medium text-4xl'>
                  {user?.sellerProfile?.numberOfSales}
                </p>
                <p>sales</p>
              </div>

              <div className='flex items-center'>
                {user?.sellerProfile?.facebook ? (
                  <a href={user?.sellerProfile?.facebook} target='_blank'>
                    <AiOutlineFacebook className='text-stone-800 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineFacebook className='text-gray-200 text-3xl' />
                )}
                {user?.sellerProfile?.instagram ? (
                  <a href={user?.sellerProfile?.instagram} target='_blank'>
                    <AiOutlineInstagram className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineInstagram className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.twitter ? (
                  <a href={user?.sellerProfile?.twitter} target='_blank'>
                    <AiOutlineTwitter className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineTwitter className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.linkedin ? (
                  <a href={user?.sellerProfile?.linkedin} target='_blank'>
                    <AiOutlineLinkedin className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineLinkedin className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.youtube ? (
                  <a href={user?.sellerProfile?.youtube} target='_blank'>
                    <AiOutlineYoutube className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <AiOutlineYoutube className='text-gray-200 ml-2 text-3xl' />
                )}
                {user?.sellerProfile?.tiktok ? (
                  <a href={user?.sellerProfile?.tiktok} target='_blank'>
                    <FaTiktok className='text-stone-800 ml-2 text-3xl' />
                  </a>
                ) : (
                  <FaTiktok className='text-gray-200 ml-2 text-3xl' />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SellerProfile;
