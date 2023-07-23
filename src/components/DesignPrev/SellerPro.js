import React from 'react';
import { isMobile } from 'react-device-detect';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineLink,
} from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import Cookies from 'js-cookie';

//mui
import Avatar from '@mui/material/Avatar';

const SellerPro = ({ pageBG, cardBG, pageText, borderColor }) => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return isMobile ? (
    <div className='w-full mx-auto'>
      <div
        className='max-w-6xl flex flex-col mx-auto border rounded bg-inherit drop-shadow-md p-2'
        style={{
          borderColor: borderColor,
          backgroundColor: cardBG,
        }}
      >
        <div className='flex justify-between items-center mt-2'>
          <Avatar
            sx={{ width: 62, height: 62 }}
            src={
              currentUser?.sellerProfile?.picture?.url
                ? currentUser?.sellerProfile?.picture?.url
                : ''
            }
            className='border'
            style={{ borderColor: borderColor }}
          />
          <div
            className='flex flex-col ml-2 border-l p-2'
            style={{
              borderColor: borderColor,
            }}
          >
            <p className='text-2xl font-medium' style={{ color: pageText }}>
              {currentUser?.name ? currentUser?.name : '{Your Name}'}{' '}
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
        </div>
        <div className='flex justify-between items-center mt-2'>
          <div className='flex flex-col'>
            <div className='flex flex-col w-full'>
              <p
                className='font-medium'
                style={{
                  color: pageText,
                }}
              >
                My other products:
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
              <div className='flex items-center text-2xl mt-4'>
                {currentUser?.sellerProfile?.facebook && (
                  <a
                    href={currentUser?.sellerProfile?.facebook}
                    target='_blank'
                  >
                    <AiOutlineFacebook style={{ color: pageText }} />
                  </a>
                )}
                {currentUser?.sellerProfile?.instagram && (
                  <a
                    href={currentUser?.sellerProfile?.instagram}
                    target='_blank'
                  >
                    <AiOutlineInstagram
                      style={{ color: pageText }}
                      className=' ml-2'
                    />
                  </a>
                )}
                {currentUser?.sellerProfile?.twitter && (
                  <a href={currentUser?.sellerProfile?.twitter} target='_blank'>
                    <AiOutlineTwitter
                      style={{ color: pageText }}
                      className='ml-2'
                    />
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
                {currentUser?.sellerProfile?.linkedin && (
                  <a
                    href={currentUser?.sellerProfile?.linkedin}
                    target='_blank'
                  >
                    <AiOutlineLinkedin
                      style={{ color: pageText }}
                      className='text-stone-800 hover:text-blue-400 ml-2'
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
                {currentUser?.sellerProfile?.link && (
                  <a href={currentUser?.sellerProfile?.link} target='_blank'>
                    <AiOutlineLink
                      style={{ color: pageText }}
                      className='text-gray-400 hover:text-blue-400 ml-2'
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-center mr-2'>
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
              Total sales
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='w-full mx-auto'>
      <div
        className='max-w-6xl flex justify-between items-center border rounded mx-auto pl-8 pr-8 p-2 bg-inherit drop-shadow-lg'
        style={{ borderColor: borderColor, backgroundColor: cardBG }}
      >
        <div className='w-1/12'>
          <Avatar
            sx={{ width: 52, height: 52 }}
            src={
              currentUser?.sellerProfile?.picture?.url
                ? currentUser?.sellerProfile?.picture?.url
                : ''
            }
            className='border'
            style={{ borderColor: borderColor }}
          />
        </div>

        <div
          className='flex flex-col w-4/12 border-l-2 pl-2'
          style={{ borderColor: borderColor }}
        >
          <p
            className='text-xl font-medium'
            style={{
              color: pageText,
            }}
          >
            {currentUser?.name ? currentUser?.name : '{Your Name}'}
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

        <div className='flex flex-col items-center w-1/12'>
          <p className='font-medium text-3xl'>
            {currentUser?.sellerProfile?.numberOfSales > 0
              ? currentUser?.sellerProfile.numberOfSales
              : '0'}{' '}
          </p>
          <p>sales</p>
        </div>

        <div className='flex flex-col w-3/12'>
          <p className='font-medium' style={{ color: pageText }}>
            My other products:
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

        <div className='flex items-center justify-end text-2xl w-3/12'>
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
          {currentUser?.sellerProfile?.linkedin && (
            <a href={currentUser?.sellerProfile?.linkedin} target='_blank'>
              <AiOutlineLinkedin
                style={{ color: pageText }}
                className='text-gray-400 hover:text-blue-400 ml-2'
              />
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
          {currentUser?.sellerProfile?.link && (
            <a href={currentUser?.sellerProfile?.link} target='_blank'>
              <AiOutlineLink
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
      ></div>
    </div>
  );
};

export default SellerPro;
