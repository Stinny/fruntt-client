import React, { useState, useMemo } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useUpdateAccountInfoMutation } from '../../api/authApiSlice';
import { isMobile } from 'react-device-detect';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { Instagram, Lock, Youtube, Link as FLink } from 'react-feather';
import EditAccount from './EditAccount';
import { Spinner } from 'flowbite-react';
import EditProfile from './EditProfile';
import { FaMediumM, FaTiktok } from 'react-icons/fa';

//mui
import Avatar from '@mui/material/Avatar';
import { FaXTwitter } from 'react-icons/fa6';
import DeleteAccount from './DeleteAccount';

const Profile = ({ user, refetch, isFetching }) => {
  const [country, setCountry] = useState(user?.country);
  const [zip, setZip] = useState(user?.zipcode);
  const [email, setEmail] = useState(user?.email);

  const [edit, setEdit] = useState(false);
  const [editPro, setEditPro] = useState(false);
  const [deleteAcc, setDeleteAcc] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  return isFetching ? (
    <div className='w-full h-96 flex items-center justify-center'>
      <Spinner />
    </div>
  ) : (
    <div className='w-full flex flex-col items-start gap-8 border border-gray-200 rounded-md bg-white p-4'>
      <div className='flex flex-col items-start w-full'>
        {edit ? (
          <>
            <EditAccount
              user={user}
              edit={edit}
              setEdit={setEdit}
              refetch={refetch}
            />
          </>
        ) : (
          <>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col items-start'>
                <p className='text-sm text-stone-800'>Account</p>
                <p className='text-xs text-stone-600'>{`ID: ${user?._id}`}</p>
              </div>

              <button
                type='button'
                className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={(e) => setEdit(!edit)}
              >
                Edit
              </button>
            </div>

            <div className='flex items-center w-full gap-2 mt-2'>
              <input
                type='text'
                value={user?.email}
                className='w-3/6 bg-gray-50 rounded-md text-sm border-gray-50'
                disabled
              />

              <div className='flex w-3/6'>
                <input
                  type='text'
                  className='border text-sm bg-gray-50 border-gray-50 rounded-tl-md rounded-bl-md p-2 flex-1'
                  value={`${user?.country?.label} - ${user?.currency?.symbol}(${user?.currency?.code})`}
                  disabled
                />
                <div className='rounded-tr-md rounded-br-md bg-gray-50 border border-l-0 border-gray-50 flex items-center justify-center p-1 pr-2'>
                  <ReactCountryFlag countryCode={user?.country?.value} />
                </div>
              </div>
            </div>
            <Link
              to='/dashboard/password/change'
              className='flex items-center justify-center rounded-md p-1 pl-2 pr-2 hover:bg-gray-200 text-stone-800 text-xs mt-2'
            >
              Change Password
              <Lock className='ml-1' size={13} />
            </Link>
          </>
        )}
      </div>

      <div className='flex flex-col items-start w-full'>
        {editPro ? (
          <EditProfile
            user={user}
            refetch={refetch}
            setEditPro={setEditPro}
            editPro={editPro}
          />
        ) : (
          <>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col'>
                <p className='text-sm text-stone-800'>Profile</p>
                <p className='text-xs text-stone-600'>
                  This is visible to customers who visit your page
                </p>
              </div>

              <button
                type='button'
                className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={(e) => setEditPro(!editPro)}
              >
                Edit
              </button>
            </div>

            <div className='w-full flex gap-2 mt-2'>
              <div className='flex flex-col w-3/6'>
                <input
                  type='text'
                  value={user?.name}
                  className='w-full bg-gray-50 rounded-md text-sm border-gray-50'
                  disabled
                />
                <div className='w-full flex items-center gap-2 mt-4'>
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={user?.sellerProfile?.picture?.url}
                    className='border border-gray-200'
                  />
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
              </div>

              <div className='w-3/6'>
                <textarea
                  placeholder='Bio'
                  className='w-full h-24 bg-gray-50 border-gray-50 rounded-md text-sm resize-none'
                  value={user?.sellerProfile?.bio}
                  disabled
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className='flex flex-col'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex flex-col items-start'>
            <p className='text-sm text-stone-800'>Delete account</p>
            <p className='text-xs text-stone-600'>
              Deleting your account will remove all data from our servers
            </p>
            {deleteAcc ? (
              <DeleteAccount
                setDeleteAcc={setDeleteAcc}
                deleteAcc={deleteAcc}
              />
            ) : (
              <button
                type='button'
                onClick={(e) => setDeleteAcc(!deleteAcc)}
                className='text-stone-800 bg-red-200 rounded-md p-1 pl-2 pr-2 text-xs mt-2'
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
