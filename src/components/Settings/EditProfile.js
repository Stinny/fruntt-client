import React, { useState } from 'react';
import { useUpdateSellerProfileMutation } from '../../api/authApiSlice';
import { uploadImageRequest } from '../../api/requests';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FilePond, registerPlugin } from 'react-filepond';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineLink,
  AiOutlineEdit,
} from 'react-icons/ai';
import { FaMediumM, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Instagram, Link, Youtube } from 'react-feather';
import { FileInput } from 'flowbite-react';
import { Avatar } from '@mui/material';

const EditProfile = ({ user, setEditPro, editPro, refetch }) => {
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
  const [medium, setMedium] = useState(user?.sellerProfile?.medium);
  const [profilePic, setProfilePic] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [updateSellerProfile, result] = useUpdateSellerProfileMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(e.target.files);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    let profilePicUrl = user?.sellerProfile?.picture?.url;
    let profilePicKey = user?.sellerProfile?.picture?.key;

    try {
      //if files were added, upload to server and update profile pic url/key variables
      if (profilePic.length) {
        const image = new FormData();
        image.append('productImages', profilePic[0]);
        const imageDataReq = await uploadImageRequest.post(
          '/products/imageupload',
          image
        );
        console.log(imageDataReq);
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
        medium,
        profilePicUrl,
        profilePicKey,
      }).unwrap();

      if (updateProfileReq === 'Profile updated') {
        toast.success('Profile saved!', {
          style: { color: 'rgb(28 25 23)' },
        });
        refetch();
        setEditPro(false);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center justify-between w-full mb-2'>
        <p className='text-sm text-stone-800'>Edit profile</p>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
            onClick={(e) => setEditPro(!editPro)}
          >
            Cancel
          </button>
          <button
            type='button'
            className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
            onClick={handleUpdateProfile}
          >
            Save
          </button>
        </div>
      </div>
      <form className='flex flex-col gap-2'>
        <div className='w-full flex gap-2'>
          <div className='flex flex-col gap-2 items-start w-3/6'>
            <input
              type='text'
              className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div className='flex items-center gap-2'>
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={
                  selectedImage
                    ? selectedImage
                    : user?.sellerProfile?.picture?.url
                }
                className='border border-gray-200'
              />
              <FileInput
                className='focus:border-gray-200 focus:ring-gray-200 hover:border-gray-200'
                onChange={handleImageChange}
                sizing='sm'
              />
            </div>
          </div>
          <div className='flex flex-col w-3/6'>
            <textarea
              placeholder='Bio'
              className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm resize-none h-18'
              value={bio}
              maxLength={100}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className='w-full flex justify-end'>
              <p className='text-xs text-stone-600'>{bio.length}/100</p>
            </div>
          </div>
        </div>

        <div className='flex w-full'>
          <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center justify-center p-1 pl-2 pr-2'>
            <FaXTwitter className='text-md' />
          </div>
          <input
            type='text'
            className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 flex-1'
            placeholder='https://www.x.com/account'
            onChange={(e) => setTwitter(e.target.value)}
            value={twitter}
          />
        </div>

        <div className='flex w-full'>
          <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center justify-center p-1 pl-2 pr-2'>
            <Instagram size={17} />
          </div>
          <input
            type='text'
            className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 flex-1'
            placeholder='https://instagram.com/account'
            onChange={(e) => setInstagram(e.target.value)}
            value={instagram}
          />
        </div>

        <div className='flex w-full'>
          <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center justify-center p-1 pl-2 pr-2'>
            <Youtube size={17} />
          </div>
          <input
            type='text'
            className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 flex-1'
            placeholder='https://youtube.com/youraccount'
            onChange={(e) => setYoutube(e.target.value)}
            value={youtube}
          />
        </div>

        <div className='flex w-full'>
          <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center justify-center p-1 pl-2 pr-2'>
            <FaMediumM className='text-md' />
          </div>
          <input
            type='text'
            className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 flex-1'
            placeholder='https://medium.com/@account'
            onChange={(e) => setMedium(e.target.value)}
            value={medium}
          />
        </div>

        <div className='flex w-full'>
          <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center justify-center p-1 pl-2 pr-2'>
            <Link size={17} />
          </div>
          <input
            type='text'
            className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 flex-1'
            placeholder='https://yourlink.com'
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
