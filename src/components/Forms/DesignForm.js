import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useEditStylesMutation } from '../../api/storefrontApiSlice';
import { useNavigate, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setPageBckGrnd } from '../../redux/design';

//mui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DesignPreview from '../../pages/DesignPreview';

const DesignForm = ({ storefront }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navbarBG, setNavbarBG] = useState(storefront?.style?.navbarBackground);
  const [pageBG, setPageBG] = useState(storefront?.style?.pageBackground);

  const [buttonBG, setButtonBG] = useState(storefront?.style?.buttonBackground);
  const [buttonTextColor, setButtonTextColor] = useState(
    storefront?.style?.buttonTextColor
  );
  const [pageText, setPageText] = useState(storefront?.style?.pageText);
  const [footerBG, setFooterBG] = useState(storefront?.style?.footerBackground);

  //for changing between the edit/preview view
  const [view, setView] = useState('edit');

  const [editStyles, result] = useEditStylesMutation();

  const handleView = (e) => {
    setView(e.target.value);
  };

  const handleSaveStyles = async (e) => {
    e.preventDefault();

    const editStylesReq = await editStyles({
      storeId: storefront._id,
      navbarBG,
      pageBG,
      pageText,
      buttonBG,
      buttonTextColor,
      footerBG,
    }).unwrap();
    if (editStylesReq === 'Styles saved') navigate('/dashboard/design');
  };

  const designForm = () => {
    return (
      <form className='w-full mx-auto' onSubmit={handleSaveStyles}>
        <div className='p-4 w-11/12 mx-auto'>
          <p className='text-gray-400 font-medium mt-4'>Page Styles</p>
          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Page background</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={pageBG}
                  onChange={setPageBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={pageBG}
                onChange={setPageBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Navbar background</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={navbarBG}
                  onChange={setNavbarBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={navbarBG}
                onChange={setNavbarBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Footer background</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={footerBG}
                  onChange={setFooterBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={footerBG}
                onChange={setFooterBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Page text</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={pageText}
                  onChange={setPageText}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={pageText}
                onChange={setPageText}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <p className='text-gray-400 font-medium mt-4'>Button Styles</p>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Button background:</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={buttonBG}
                  onChange={setButtonBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={buttonBG}
                onChange={setButtonBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Button text:</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={buttonTextColor}
                  onChange={setButtonTextColor}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={buttonTextColor}
                onChange={setButtonTextColor}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='w-full h-20 border-2 border-slate-800 text-slate-800 rounded text-xl'
        >
          SAVE STYLES
        </button>
      </form>
    );
  };

  return (
    <div className='w-full mx-auto'>
      <div className='mb-10 flex justify-between items-center border-b-2 p-2'>
        <h2 className='text-3xl font-medium'>Design your storefront</h2>

        <div>
          <ToggleButtonGroup value={view} exclusive onChange={handleView}>
            <ToggleButton value='edit'>Edit</ToggleButton>
            <ToggleButton value='preview'>Preview</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <button
          onClick={handleSaveStyles}
          className='w-32 h-10 rounded border-slate-800 border-2'
        >
          SAVE
        </button>
      </div>
      {view === 'edit' ? (
        designForm()
      ) : (
        <DesignPreview
          pageBG={pageBG}
          navbarBG={navbarBG}
          buttonBG={buttonBG}
          buttonTextColor={buttonTextColor}
          pageText={pageText}
          footerBG={footerBG}
          storefrontId={storefront._id}
        />
      )}
    </div>
  );
};

export default DesignForm;
