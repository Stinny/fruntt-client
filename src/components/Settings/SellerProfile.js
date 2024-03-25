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
import { FaXTwitter } from 'react-icons/fa6';
import { Instagram, Youtube, Link as FLink } from 'react-feather';
import { FaMediumM, FaTiktok } from 'react-icons/fa';
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

const SellerProfile = ({ user }) => {
  return (
    <>
      <div>
        {isMobile ? (
          <div className='flex justify-between items-center w-full p-2'>
            <div className='flex flex-col'>
              <p className='text-sm'>Profile</p>
            </div>
          </div>
        ) : (
          <div className='flex justify-between items-center w-full'>
            <p className='text-xs text-stone-600'>Profile</p>
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
                <div className='flex flex-col items-start'>
                  <p className='text-sm text-stone-800'>{user?.name}</p>
                  <p className='text-xs text-stone-600'>
                    {user?.sellerProfile?.bio}
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
          <div className='w-full'>
            <div className='w-full h-full flex items-center mx-auto' />
            {user?.setup ? (
              <div className='flex items-center gap-8 h-full mt-1'>
                <Avatar
                  sx={{ width: 36, height: 36 }}
                  src={user?.sellerProfile?.picture?.url}
                  className='border border-gray-200'
                />

                <div className='flex flex-col items-start'>
                  <p className='text-sm text-stone-800'>{user?.name}</p>

                  <p className='text-stone-600 text-xs w-56'>
                    {user?.sellerProfile?.bio}
                  </p>
                </div>

                <div className='flex flex-col items-center'>
                  <p className='text-stone-800 text-sm'>
                    {user?.sellerProfile?.numberOfSales}
                  </p>
                  <p className='text-stone-600 text-xs'>
                    {user?.sellerProfile?.numberOfSales == 1
                      ? 'total sale'
                      : 'total sales'}
                  </p>
                </div>

                <div className='flex items-center gap-4'>
                  {user?.sellerProfile?.twitter ? (
                    <a href={user?.sellerProfile?.twitter} target='_blank'>
                      <FaXTwitter className='text-stone-800 text-md' />
                    </a>
                  ) : (
                    <FaXTwitter className='text-gray-200 text-md' />
                  )}

                  {user?.sellerProfile?.instagram ? (
                    <a href={user?.sellerProfile?.instagram} target='_blank'>
                      <Instagram size={17} className='text-stone-800' />
                    </a>
                  ) : (
                    <Instagram size={17} className='text-gray-200' />
                  )}

                  {user?.sellerProfile?.youtube ? (
                    <a href={user?.sellerProfile?.youtube} target='_blank'>
                      <Youtube size={17} className='text-stone-800' />
                    </a>
                  ) : (
                    <Youtube size={17} className='text-gray-200' />
                  )}

                  {user?.sellerProfile?.medium ? (
                    <a href={user?.sellerProfile?.medium} target='_blank'>
                      <FaMediumM className='text-stone-800 text-md' />
                    </a>
                  ) : (
                    <FaMediumM className='text-gray-200 text-md' />
                  )}

                  {user?.sellerProfile?.link ? (
                    <a href={user?.sellerProfile?.tiktok} target='_blank'>
                      <FLink size={17} className='text-stone-800' />
                    </a>
                  ) : (
                    <FLink size={17} className='text-gray-200' />
                  )}
                </div>
              </div>
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
