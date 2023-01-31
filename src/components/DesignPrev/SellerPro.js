import React from 'react';
import { isMobile } from 'react-device-detect';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import Cookies from 'js-cookie';

//mui
import Avatar from '@mui/material/Avatar';

const SellerPro = ({ pageBG, pageText, borderColor, headers }) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return isMobile ? (
    <div className='w-full mx-auto p-2'>
      <div
        className='w-full mx-auto'
        style={{
          backgroundColor: pageBG,
        }}
      >
        <div
          className='max-w-6xl mx-auto border-b-2'
          style={{ borderColor: borderColor }}
        >
          <p
            className='font-medium text-xl mb-2'
            style={{
              color: headers,
            }}
          >
            The seller
          </p>
        </div>
      </div>
      <div className='max-w-6xl flex flex-col mx-auto'>
        <div className='flex justify-between mt-2'>
          <Avatar
            sx={{ width: 62, height: 62 }}
            src={
              currentUser?.sellerProfile?.picture?.url
                ? currentUser?.sellerProfile?.picture?.url
                : ''
            }
          />
          <div className='flex flex-col items-center'>
            <p
              className='font-medium text-3xl'
              style={{
                color: pageText,
              }}
            >
              {currentUser?.sellerProfile?.numberOfSales > 0
                ? currentUser?.sellerProfile.numberOfSales
                : '0'}{' '}
            </p>
            <p
              style={{
                color: pageText,
              }}
            >
              sales
            </p>
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='text-2xl font-medium' style={{ color: pageText }}>
            {currentUser?.firstName ? currentUser?.firstName : 'First name'}{' '}
            {currentUser?.lastName ? currentUser?.lastName : 'Last name'}
          </p>

          <p
            style={{
              color: pageText,
            }}
          >
            {currentUser?.sellerProfile?.bio
              ? currentUser?.sellerProfile?.bio
              : 'This is your bio'}
          </p>
        </div>

        <div className='flex items-center text-3xl mt-4'>
          {currentUser?.sellerProfile?.facebook && (
            <a href={currentUser?.sellerProfile?.facebook} target='_blank'>
              <AiOutlineFacebook style={{ color: pageText }} />
            </a>
          )}
          {currentUser?.sellerProfile?.instagram && (
            <a href={currentUser?.sellerProfile?.instagram} target='_blank'>
              <AiOutlineInstagram
                style={{ color: pageText }}
                className=' ml-2'
              />
            </a>
          )}
          {currentUser?.sellerProfile?.twitter && (
            <a href={currentUser?.sellerProfile?.twitter} target='_blank'>
              <AiOutlineTwitter style={{ color: pageText }} className='ml-2' />
            </a>
          )}
          {currentUser?.sellerProfile?.youtube && (
            <a href={currentUser?.sellerProfile?.youtube} target='_blank'>
              <AiOutlineYoutube
                style={{ color: pageText }}
                className='text-gray-400 hover:text-blue-400 ml-2'
              />
            </a>
          )}
          {currentUser?.sellerProfile?.tiktok && (
            <a href={currentUser?.sellerProfile?.tiktok} target='_blank'>
              <FaTiktok
                style={{ color: pageText }}
                className='text-gray-400 hover:text-blue-400 ml-2'
              />
            </a>
          )}
        </div>

        <div className='flex flex-col mt-4'>
          <p
            className='font-medium text-lg'
            style={{
              color: pageText,
            }}
          >
            Their other pages:
          </p>
          <select
            className='rounded border-2 bg-transparent h-8'
            style={{
              color: pageText,
              borderColor: borderColor,
            }}
          >
            <option>{currentUser?.store?.url}</option>
          </select>
        </div>
      </div>
      <div
        className='w-full mx-auto'
        style={{
          backgroundColor: pageBG,
        }}
      >
        <div
          className='mx-auto border-b-2 mt-4'
          style={{ borderColor: borderColor }}
        >
          <p className='font-medium text-xl mb-2' style={{ color: headers }}>
            What they're selling
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className='w-full mx-auto p-2'>
      <div
        className='max-w-6xl mx-auto'
        style={{
          backgroundColor: pageBG,
        }}
      >
        <div
          className='max-w-6xl mx-auto border-b-2 p-2'
          style={{ borderColor: borderColor }}
        >
          <p className='font-medium text-xl mb-2' style={{ color: headers }}>
            The seller
          </p>
        </div>
      </div>
      <div className='max-w-6xl flex justify-between mx-auto pl-8 pr-8 pt-2'>
        <Avatar
          sx={{ width: 48, height: 48 }}
          src={
            currentUser?.sellerProfile?.picture?.url
              ? currentUser?.sellerProfile?.picture?.url
              : ''
          }
        />

        <div className='flex flex-col w-64'>
          <p
            className='text-xl font-medium'
            style={{
              color: pageText,
            }}
          >
            {currentUser?.firstName ? currentUser?.firstName : 'First name'}{' '}
            {currentUser?.lastName ? currentUser?.lastName : 'Last name'}
          </p>

          <p
            style={{
              color: pageText,
            }}
          >
            {currentUser?.sellerProfile?.bio
              ? currentUser?.sellerProfile?.bio
              : 'This is your bio'}
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <p className='font-medium text-3xl'>
            {currentUser?.sellerProfile?.numberOfSales > 0
              ? currentUser?.sellerProfile.numberOfSales
              : '0'}{' '}
          </p>
          <p>sales</p>
        </div>

        <div className='flex flex-col mt-2'>
          <p className='font-medium' style={{ color: pageText }}>
            Their other pages:
          </p>
          <select
            className='rounded border-2 bg-transparent h-8'
            disabled
            style={{
              color: pageText,
              borderColor: borderColor,
            }}
          >
            <option>{currentUser?.store?.url}</option>
          </select>
        </div>

        <div className='flex items-center text-3xl'>
          {currentUser?.sellerProfile?.facebook && (
            <a href={currentUser?.sellerProfile?.facebook} target='_blank'>
              <AiOutlineFacebook style={{ color: pageText }} />
            </a>
          )}
          {currentUser?.sellerProfile?.instagram && (
            <a href={currentUser?.sellerProfile?.instagram} target='_blank'>
              <AiOutlineInstagram
                style={{ color: pageText }}
                className=' ml-2'
              />
            </a>
          )}
          {currentUser?.sellerProfile?.twitter && (
            <a href={currentUser?.sellerProfile?.twitter} target='_blank'>
              <AiOutlineTwitter style={{ color: pageText }} className='ml-2' />
            </a>
          )}
          {currentUser?.sellerProfile?.youtube && (
            <a href={currentUser?.sellerProfile?.youtube} target='_blank'>
              <AiOutlineYoutube
                style={{ color: pageText }}
                className='text-gray-400 hover:text-blue-400 ml-2'
              />
            </a>
          )}
          {currentUser?.sellerProfile?.tiktok && (
            <a href={currentUser?.sellerProfile?.tiktok} target='_blank'>
              <FaTiktok
                style={{ color: pageText }}
                className='text-gray-400 hover:text-blue-400 ml-2'
              />
            </a>
          )}
        </div>
      </div>
      <div
        className='w-full mx-auto'
        style={{
          backgroundColor: pageBG,
        }}
      >
        <div
          className='mx-auto border-b-2 p-2'
          style={{ borderColor: borderColor }}
        >
          <p
            className='font-medium text-xl mb-2'
            style={{
              color: headers,
            }}
          >
            What they're selling
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerPro;
