import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineLink,
  AiOutlineEdit,
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
import { toast } from 'react-toastify';

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
  const [link, setLink] = useState(user?.sellerProfile?.link);
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
        link,
        profilePicUrl,
        profilePicKey,
      }).unwrap();

      if (updateProfileReq === 'Profile updated') {
        toast.success('Profile saved!', {
          style: { color: 'rgb(28 25 23)' },
        });
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
      <div>
        {isMobile ? (
          <div className='flex justify-between items-center w-full p-2'>
            <div className='flex flex-col'>
              <p className='text-sm'>Seller profile</p>
            </div>
            <Link to='/dashboard/edit/profile'>
              <AiOutlineEdit
                onClick={openModal}
                className='text-stone-800 text-lg hover:cursor-pointer'
              />
            </Link>
          </div>
        ) : (
          <div className='flex justify-between items-center w-full'>
            <p className='text-sm text-stone-800'>Profile</p>
          </div>
        )}

        {isMobile ? (
          <div className='w-full mx-auto p-2'>
            <div className='w-full flex flex-col mx-auto'>
              <div className='flex items-center'>
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  src={user?.sellerProfile?.picture?.url}
                  className='border border-gray-200'
                />
                <div className='flex flex-col ml-2 pl-2 border-l'>
                  <p className='text-lg font-medium'>
                    {user?.name ? user?.name : '{Your Name}'}
                  </p>

                  <p className='text-sm'>
                    {user?.sellerProfile?.bio
                      ? user?.sellerProfile?.bio
                      : 'This is your bio.'}
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-between mt-4'>
                <div className='flex flex-col mt-2'>
                  <div className='flex items-center mt-4'>
                    {user?.sellerProfile?.facebook ? (
                      <a href={user?.sellerProfile?.facebook} target='_blank'>
                        <AiOutlineFacebook className='text-stone-800 text-xl' />
                      </a>
                    ) : (
                      <AiOutlineFacebook className='text-gray-200 text-xl' />
                    )}
                    {user?.sellerProfile?.instagram ? (
                      <a href={user?.sellerProfile?.instagram} target='_blank'>
                        <AiOutlineInstagram className='text-stone-800 ml-2 text-xl' />
                      </a>
                    ) : (
                      <AiOutlineInstagram className='text-gray-200 ml-2 text-xl' />
                    )}
                    {user?.sellerProfile?.twitter ? (
                      <a href={user?.sellerProfile?.twitter} target='_blank'>
                        <AiOutlineTwitter className='text-stone-800 ml-2 text-xl' />
                      </a>
                    ) : (
                      <AiOutlineTwitter className='text-gray-200 ml-2 text-xl' />
                    )}
                    {user?.sellerProfile?.linkedin ? (
                      <a href={user?.sellerProfile?.linkedin} target='_blank'>
                        <AiOutlineLinkedin className='text-stone-800 ml-2 text-xl' />
                      </a>
                    ) : (
                      <AiOutlineLinkedin className='text-gray-200 ml-2 text-xl' />
                    )}
                    {user?.sellerProfile?.youtube ? (
                      <a href={user?.sellerProfile?.youtube} target='_blank'>
                        <AiOutlineYoutube className='text-stone-800 ml-2 text-xl' />
                      </a>
                    ) : (
                      <AiOutlineYoutube className='text-gray-200 ml-2 text-xl' />
                    )}
                    {user?.sellerProfile?.tiktok ? (
                      <a href={user?.sellerProfile?.tiktok} target='_blank'>
                        <FaTiktok className='text-stone-800 ml-2 text-xl' />
                      </a>
                    ) : (
                      <FaTiktok className='text-gray-200 ml-2 text-xl' />
                    )}
                    {user?.sellerProfile?.link ? (
                      <a href={user?.sellerProfile?.tiktok} target='_blank'>
                        <AiOutlineLink className='text-stone-800 ml-2 text-xl' />
                      </a>
                    ) : (
                      <AiOutlineLink className='text-gray-200 ml-2 text-xl' />
                    )}
                  </div>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='font-medium text-xl'>
                    {user?.sellerProfile?.numberOfSales}
                  </p>
                  <p className='text-sm'>
                    {user?.sellerProfile?.numberOfSales == 1 ? 'sale' : 'sales'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full mx-auto mt-2'>
            <div className='w-full flex justify-between items-center mx-auto' />
            {user?.setup ? (
              <>
                <div className='w-2/12 flex items-center justify-center'>
                  <Avatar
                    sx={{ width: 36, height: 36 }}
                    src={user?.sellerProfile?.picture?.url}
                    className='border border-gray-200'
                  />
                </div>

                <div className='flex flex-col w-5/12'>
                  <p className='text-lg font-medium text-stone-800'>
                    {user?.name ? user?.name : '{Your Name}'}
                  </p>

                  <p className='text-stone-800 text-sm'>
                    {user?.sellerProfile?.bio
                      ? user?.sellerProfile?.bio
                      : 'This is your bio, it is empty.'}
                  </p>
                </div>

                <div className='flex flex-col items-center w-1/12'>
                  <p className='font-medium text-2xl'>
                    {user?.sellerProfile?.numberOfSales}
                  </p>
                  <p className='text-stone-800 text-sm'>
                    {user?.sellerProfile?.numberOfSales == 1 ? 'sale' : 'sales'}
                  </p>
                </div>

                <div className='flex items-center w-4/12 ml-6'>
                  {user?.sellerProfile?.facebook ? (
                    <a href={user?.sellerProfile?.facebook} target='_blank'>
                      <AiOutlineFacebook className='text-stone-800 text-2xl' />
                    </a>
                  ) : (
                    <AiOutlineFacebook className='text-gray-200 text-2xl' />
                  )}
                  {user?.sellerProfile?.instagram ? (
                    <a href={user?.sellerProfile?.instagram} target='_blank'>
                      <AiOutlineInstagram className='text-stone-800 ml-2 text-2xl' />
                    </a>
                  ) : (
                    <AiOutlineInstagram className='text-gray-200 ml-2 text-2xl' />
                  )}
                  {user?.sellerProfile?.twitter ? (
                    <a href={user?.sellerProfile?.twitter} target='_blank'>
                      <AiOutlineTwitter className='text-stone-800 ml-2 text-2xl' />
                    </a>
                  ) : (
                    <AiOutlineTwitter className='text-gray-200 ml-2 text-2xl' />
                  )}
                  {user?.sellerProfile?.linkedin ? (
                    <a href={user?.sellerProfile?.linkedin} target='_blank'>
                      <AiOutlineLinkedin className='text-stone-800 ml-2 text-2xl' />
                    </a>
                  ) : (
                    <AiOutlineLinkedin className='text-gray-200 ml-2 text-2xl' />
                  )}
                  {user?.sellerProfile?.youtube ? (
                    <a href={user?.sellerProfile?.youtube} target='_blank'>
                      <AiOutlineYoutube className='text-stone-800 ml-2 text-2xl' />
                    </a>
                  ) : (
                    <AiOutlineYoutube className='text-gray-200 ml-2 text-2xl' />
                  )}
                  {user?.sellerProfile?.tiktok ? (
                    <a href={user?.sellerProfile?.tiktok} target='_blank'>
                      <FaTiktok className='text-stone-800 ml-2 text-2xl' />
                    </a>
                  ) : (
                    <FaTiktok className='text-gray-200 ml-2 text-2xl' />
                  )}
                  {user?.sellerProfile?.link ? (
                    <a href={user?.sellerProfile?.tiktok} target='_blank'>
                      <AiOutlineLink className='text-stone-800 ml-2 text-2xl' />
                    </a>
                  ) : (
                    <AiOutlineLink className='text-gray-200 ml-2 text-2xl' />
                  )}
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center'>
                <p className='text-stone-800 text-sm'>
                  Finish your account setup in settings
                </p>
                <Link
                  to='/settings'
                  className='flex w-24 items-center justify-center p-1 rounded-md bg-gray-200 text-stone-800 text-sm mt-1'
                >
                  Finish
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SellerProfile;
