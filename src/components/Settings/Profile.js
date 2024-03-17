import React, { useState, useMemo } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useUpdateAccountInfoMutation } from '../../api/authApiSlice';
import { isMobile } from 'react-device-detect';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { BsPersonLock } from 'react-icons/bs';
import { AiFillLock } from 'react-icons/ai';
import { Instagram, Lock, Youtube, Link as FLink } from 'react-feather';
import EditAccount from './EditAccount';
import { Spinner } from 'flowbite-react';
import EditProfile from './EditProfile';
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

  const [updateAccountInfo, result] = useUpdateAccountInfoMutation();

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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
                  value={user?.country?.label}
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
                      <AiOutlineTwitter className='text-gray-200 text-md' />
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

  //   return (
  //     <>
  //       {/* <Modal
  //         isOpen={modalIsOpen}
  //         onRequestClose={closeModal}
  //         style={modalStyles}
  //       >
  //         <form onSubmit={handleSaveAccountInfo}>
  //           <p className='text-xl font-medium mb-4 border-b'>Account Details</p>
  //           <p className='text-md font-medium mt-2'>Email</p>

  //           <input
  //             type='text'
  //             className='border-2 border-gray-200 hover:border-gray-300 outline outline-0 focus:border-gray-300 w-full rounded p-2'
  //             placeholder='Last name'
  //             onChange={(e) => setEmail(e.target.value)}
  //             value={email}
  //           />

  //           <p className='text-md font-medium mt-2'>Country</p>
  //           <Select
  //             options={options}
  //             onChange={handleCountry}
  //             className='w-full h-10 text-sm'
  //             value={country}
  //             styles={{
  //               control: (baseStyles, state) => ({
  //                 ...baseStyles,
  //                 borderColor: 'rgb(229 231 235)',
  //                 '&:hover': {
  //                   borderColor: 'rgb(209 213 219)', // Keep the same border color on hover
  //                 },
  //                 boxShadow: 'none',
  //                 borderWidth: 2,
  //                 zIndex: 99999,
  //                 position: 'relative',
  //               }),
  //               menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  //             }}
  //           />

  //           <p className='text-md font-medium mt-2'>Zipcode</p>

  //           <input
  //             type='text'
  //             className='border-2 text-sm border-gray-200 hover:border-gray-300 outline outline-0 focus:border-gray-300 w-full rounded p-2'
  //             placeholder='ZIP'
  //             onChange={(e) => setZip(e.target.value)}
  //             value={zip}
  //           />

  //           <button
  //             type='button'
  //             onClick={closeModal}
  //             className='w-full h-10 border-2 border-red-500 text-red-400 rounded mt-4 hover:text-white hover:bg-red-400'
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             type='submit'
  //             className='w-full h-14 border-2 border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 rounded mt-4'
  //           >
  //             Save
  //           </button>
  //         </form>
  //       </Modal> */}
  //       {/*
  //       {isMobile ? (
  //         <div className='flex justify-between items-center w-full border-b p-2'>
  //           <p className='text-lg font-medium'>Account Details</p>
  //           <button
  //             className='border-2 rounded w-16 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
  //             onClick={openModal}
  //           >
  //             Edit
  //           </button>
  //         </div>
  //       ) : (
  //         <div className='flex justify-between items-center w-full border-b p-2'>
  //           <p className='text-lg font-medium'>Account Details</p>
  //           <div className='flex items-center'>
  //             <Link
  //               to='/dashboard/password/change'
  //               className='flex items-center justify-center rounded w-44 bg-stone-800 text-white h-8 mr-1'
  //             >
  //               Change Password//mui
  // import Avatar from '@mui/material/Avatar';
  //             </Link>
  //             <button
  //               className='border-2 rounded w-20 h-8 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white'
  //               onClick={openModal}
  //             >
  //               Edit
  //             </button>
  //           </div>
  //         </div>
  //       )} */}

  //       {/* {isMobile ? (
  //         <div className='w-11/12 mx-auto flex flex-col p-2'>
  //           <p className='text-lg font-medium mt-2 text-gray-400'>
  //             Account email
  //           </p>
  //           <p className='text-xl mt-2'>{user?.email}</p>
  //         </div>
  //       ) : (
  //         <>
  //           <div className='flex flex-col pl-4'>
  //             <p className='text-sm font-medium mt-2'>Account</p>
  //             <p className='text-lg'>{user?._id}</p>
  //             <p className='text-sm font-medium mt-2'>Account email</p>
  //             <p className='text-lg'>{user?.email}</p>
  //           </div>
  //           {user?.zipcode ? (
  //             <div className='flex flex-col pl-4'>
  //               <p className='text-sm font-medium mt-2'>Location</p>

  //               <div className='flex items-center'>
  //                 <ReactCountryFlag
  //                   countryCode={user?.country?.value}
  //                   className='mr-1'
  //                 />
  //                 <p className='text-lg'>{user?.country?.label}</p>
  //               </div>
  //               <p className='text-lg'>{user?.zipcode}</p>
  //             </div>
  //           ) : (
  //             <div className='rounded h-32 flex flex-col bg-gray-100 w-11/12 items-center justify-center mx-auto mt-4'>
  //               <p className='text-sm'>Finish adding account details</p>
  //               <button
  //                 className='border-2 rounded w-16 h-8 mt-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white text-sm'
  //                 onClick={openModal}
  //               >
  //                 Add
  //               </button>
  //             </div>
  //           )}
  //         </>
  //       )} */}
  //     </>
  //   );
};

export default Profile;
