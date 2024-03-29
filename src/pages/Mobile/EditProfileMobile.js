import React, { useState } from 'react';
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
import { useUpdateSellerProfileMutation } from '../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FilePond, registerPlugin } from 'react-filepond';
import { uploadImageRequest } from '../../api/requests';

const EditProfileMobile = ({ user }) => {
  const navigate = useNavigate();

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
        navigate('/dashboard');
      } else {
        return;
      }
    } catch (err) {}
  };

  return (
    <div className='h-full'>
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between w-full'>
          <p className='text-2xl font-medium'>Edit Seller Profile</p>
        </div>
        <div className='w-full h-full drop-shadow-lg bg-white rounded mt-4'>
          <form className='flex flex-col w-full p-2'>
            <p className='text-stone-800 text-sm'>Name</p>

            <div className='flex items-center w-full mt-1'>
              <input
                type='text'
                className='border-2 border-gray-100 bg-gray-100 text-sm outline outline-0 focus:border-gray-200 focus:bg-gray-200 w-full rounded-md p-2'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Name'
              />
            </div>
            <p className='text-stone-800 text-sm mt-2'>Bio</p>
            <textarea
              placeholder='A little about you, your brand, or what you sell...'
              className='w-full h-24 border-2 border-gray-100 bg-gray-100 text-sm rounded-md outline outline-0 p-2 mt-1'
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              maxLength={100}
            />
            <div className='w-full flex justify-end'>
              <p className='text-sm text-gray-400'>{bio.length}/100</p>
            </div>
            <p className='text-stone-800 mt-2 text-sm'>New profile image</p>
            <FilePond
              file={profilePic}
              imageResizeTargetWidth={200}
              allowReorder={true}
              name='productImages'
              onupdatefiles={(file) => setProfilePic(file)}
            />
            <p className='text-sm mt-2 text-stone-800'>Links</p>

            <div className='flex flex-col'>
              <div className='w-full flex justify-between items-center'>
                <AiOutlineFacebook className='text-2xl' />
                <input
                  type='text'
                  className='border-2 border-gray-100 bg-gray-100 outline outline-0 w-10/12 rounded-md p-2 text-sm'
                  placeholder='https://www.facebook.com/youraccount'
                  onChange={(e) => setFacebook(e.target.value)}
                  value={facebook}
                />
              </div>

              <div className='w-full flex justify-between items-center mt-2'>
                <AiOutlineInstagram className='text-2xl' />
                <input
                  type='text'
                  className='border-2 border-gray-100 bg-gray-100 outline outline-0 w-10/12 rounded-md p-2 text-sm'
                  placeholder='https://www.instagram.com/youraccount'
                  onChange={(e) => setInstagram(e.target.value)}
                  value={instagram}
                />
              </div>

              <div className='w-full flex justify-between items-center mt-2'>
                <AiOutlineYoutube className='text-2xl' />
                <input
                  type='text'
                  className='border-2 border-gray-100 bg-gray-100 outline outline-0 w-10/12 rounded-md p-2 text-sm'
                  placeholder='https://www.youtube.com/youraccount'
                  onChange={(e) => setYoutube(e.target.value)}
                  value={youtube}
                />
              </div>

              <div className='w-full flex justify-between items-center mt-2'>
                <AiOutlineTwitter className='text-2xl' />
                <input
                  type='text'
                  className='border-2 border-gray-100 bg-gray-100 outline outline-0 w-10/12 rounded-md p-2 text-sm'
                  placeholder='https://www.twitter.com/youraccount'
                  onChange={(e) => setTwitter(e.target.value)}
                  value={twitter}
                />
              </div>

              <div className='w-full flex justify-between items-center mt-2'>
                <AiOutlineLinkedin className='text-2xl' />
                <input
                  type='text'
                  className='border-2 border-gray-100 bg-gray-100 outline outline-0 w-10/12 rounded-md p-2 text-sm'
                  placeholder='https://www.linkedin.com/youraccount'
                  onChange={(e) => setLinkedin(e.target.value)}
                  value={linkedin}
                />
              </div>

              <div className='w-full flex justify-between items-center mt-2'>
                <FaTiktok className='text-2xl' />
                <input
                  type='text'
                  className='border-2 border-gray-100 bg-gray-100 outline outline-0  w-10/12 rounded-md p-2 text-sm'
                  placeholder='https://www.tiktok.com/youraccount'
                  onChange={(e) => setTiktok(e.target.value)}
                  value={tiktok}
                />
              </div>

              <div className='w-full flex justify-between items-center mt-2'>
                <AiOutlineLink className='text-2xl' />
                <input
                  type='text'
                  className='border-2 border-gray-100 bg-gray-100 outline outline-0 w-10/12 rounded-md p-2 text-sm'
                  placeholder='https://www.YourLink.com/'
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='flex flex-col w-full bg-white drop-shadow-md mt-2 p-2'>
        <button
          className='w-full h-12 rounded border-stone-800 border-2 hover:text-white hover:bg-stone-800 text-stone-800 text-sm'
          onClick={handleUpdateProfile}
          type='button'
        >
          SAVE
        </button>
        <button
          className='w-full h-8 rounded border-red-400 text-red-400 border-2 mr-2 hover:text-white hover:bg-red-400 text-sm mt-2'
          onClick={() => navigate('/dashboard')}
          type='button'
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default EditProfileMobile;
