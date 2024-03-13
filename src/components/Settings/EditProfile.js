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
    } catch (err) {}
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
        <input
          type='text'
          className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <div className='flex flex-col relative'>
          <textarea
            placeholder='Bio'
            className='border border-gray-200 w-full bg-gray-50 hover:border-gray-200 focus:bg-gray-200 hover:bg-gray-200 focus:border-gray-200 rounded-md p-2 text-sm resize-none h-24'
            value={bio}
            maxLength={100}
            onChange={(e) => setBio(e.target.value)}
          />
          <div className='w-full flex justify-end'>
            <p className='text-xs text-stone-600'>{bio.length}/100</p>
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
      {/* <div className='w-full h-full drop-shadow-lg bg-white rounded mt-4'>
        <form className='flex flex-col w-6/12 p-2'>
          <p className='font-medium'>Name</p>

          <div className='flex items-center w-full mt-1'>
            <input
              type='text'
              className='border-2 border-gray-100 hover:border-gray-200 bg-gray-100 hover:bg-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Name'
              maxLength={35}
            />
          </div>
          <div className='w-full flex justify-end'>
            <p className='text-sm text-gray-400'>{name.length}/35</p>
          </div>
          <p className='font-medium mt-2'>Bio</p>
          <textarea
            placeholder='What do you create'
            className='w-full h-24 border-2 bg-gray-100 border-gray-100 hover:border-gray-200 hover:bg-gray-200 rounded-md focus:bg-gray-200 focus:border-gray-200 outline outline-0 p-2 mt-1'
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            maxLength={100}
          />
          <div className='w-full flex justify-end'>
            <p className='text-sm text-gray-400'>{bio.length}/100</p>
          </div>
          <p className='text-stone-800 mt-2'>New profile image</p>
          <FilePond
            file={profilePic}
            imageResizeTargetWidth={200}
            allowReorder={true}
            name='productImages'
            onupdatefiles={(file) => setProfilePic(file)}
          />
          <p className='font-medium mt-2 text-stone-800'>Links</p>

          <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center'>
              <AiOutlineFacebook className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-10/12 rounded-md p-2'
                placeholder='https://www.facebook.com/youraccount'
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineInstagram className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-100 hover:bg-gray-200 bg-gray-100 hover:border-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-10/12 rounded-md p-2'
                placeholder='https://www.instagram.com/youraccount'
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineYoutube className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-100 hover:bg-gray-200 bg-gray-100 hover:border-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-10/12 rounded-md p-2'
                placeholder='https://www.youtube.com/youraccount'
                onChange={(e) => setYoutube(e.target.value)}
                value={youtube}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineTwitter className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-100 hover:bg-gray-200 bg-gray-100 hover:border-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-10/12 rounded-md p-2'
                placeholder='https://www.twitter.com/youraccount'
                onChange={(e) => setTwitter(e.target.value)}
                value={twitter}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineLinkedin className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-100 hover:bg-gray-200 bg-gray-100 hover:border-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-10/12 rounded-md p-2'
                placeholder='https://www.linkedin.com/youraccount'
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <FaTiktok className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-100 hover:bg-gray-200 bg-gray-100 hover:border-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-10/12 rounded-md p-2'
                placeholder='https://www.tiktok.com/youraccount'
                onChange={(e) => setTiktok(e.target.value)}
                value={tiktok}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineLink className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 outline outline-0 focus:bg-gray-200 focus:border-gray-200 w-10/12 rounded-md p-2'
                placeholder='https://www.YourLink.com/'
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
            </div>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default EditProfile;
