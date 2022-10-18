import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useEditStylesMutation } from '../../api/storefrontApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import DesignPreview from '../../pages/DesignPreview';

//mui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Switch from '@mui/material/Switch';

const DesignForm = ({ storefront }) => {
  const navigate = useNavigate();

  const [navbarBG, setNavbarBG] = useState(storefront?.style?.navbarBackground);
  const [pageBG, setPageBG] = useState(storefront?.style?.pageBackground);

  const [buttonColor, setButtonColor] = useState(
    storefront?.style?.buttonColor
  );
  const [buttonTextColor, setButtonTextColor] = useState(
    storefront?.style?.buttonTextColor
  );
  const [pageText, setPageText] = useState(storefront?.style?.pageText);
  const [footerBG, setFooterBG] = useState(storefront?.style?.footerBackground);
  const [buttonStyle, setButtonStyle] = useState(
    storefront?.style?.buttonStyle
  );
  const [socialIcons, setSocialIcons] = useState(
    storefront?.style?.socialIcons
  );
  const [hideNav, setHideNav] = useState(storefront?.style?.hideNav);
  const [hideFooter, setHideFooter] = useState(storefront?.style?.hideFooter);

  //for changing between the edit/preview view
  const [view, setView] = useState('edit');

  const [editStyles, result] = useEditStylesMutation();

  const handleView = (e) => {
    setView(e.target.value);
  };

  const handleBtnStyle = (e) => {
    setButtonStyle(e.target.value);
  };
  console.log(storefront);
  const handleSaveStyles = async (e) => {
    e.preventDefault();

    const editStylesReq = await editStyles({
      storeId: storefront._id,
      navbarBG,
      pageBG,
      pageText,
      buttonColor,
      buttonTextColor,
      footerBG,
      buttonStyle,
      hideNav,
      hideFooter,
      socialIcons,
    }).unwrap();
    if (editStylesReq === 'Styles saved') navigate('/dashboard/design');
  };

  const handleCancel = () => {
    navigate('/dashboard/design');
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
                  className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
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
                <div className='flex justify-between items-center mr-10'>
                  <p className='text-gray-400 mr-2'>Hide navbar</p>
                  <Switch
                    checked={hideNav}
                    onChange={(e) => setHideNav(e.target.checked)}
                  />
                </div>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={navbarBG}
                  onChange={setNavbarBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
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
                <div className='flex justify-between items-center mr-10'>
                  <p className='text-gray-400 mr-2'>Hide footer</p>
                  <Switch
                    checked={hideFooter}
                    onChange={(e) => setHideFooter(e.target.checked)}
                  />
                </div>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={footerBG}
                  onChange={setFooterBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
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
                  className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
                />
              </div>
              <HexColorPicker
                color={pageText}
                onChange={setPageText}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Social icons</p>

            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={socialIcons}
                  onChange={setSocialIcons}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
                />
              </div>
              <HexColorPicker
                color={socialIcons}
                onChange={setSocialIcons}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <p className='text-gray-400 font-medium mt-4'>Button Styles</p>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Button style:</p>

            <ToggleButtonGroup
              value={buttonStyle}
              exclusive
              onChange={handleBtnStyle}
            >
              <ToggleButton value='filled'>Filled</ToggleButton>
              <ToggleButton value='outlined'>Outlined</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Button color:</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={buttonColor}
                  onChange={setButtonColor}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
                />
              </div>
              <HexColorPicker
                color={buttonColor}
                onChange={setButtonColor}
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
                  className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
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
        <button
          onClick={handleCancel}
          className='w-full h-10 rounded border-red-400 text-red-400 border-2 mt-2'
        >
          CANCEL
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

        <div className='flex'>
          <button
            onClick={handleCancel}
            className='w-32 h-10 rounded border-red-400 text-red-400 hover:bg-red-400 hover:text-white border-2'
          >
            CANCEL
          </button>
          <button
            onClick={handleSaveStyles}
            className='w-32 h-10 rounded text-slate-800 border-slate-800 border-2 ml-2 hover:bg-slate-800 hover:text-white'
          >
            SAVE
          </button>
        </div>
      </div>
      {view === 'edit' ? (
        designForm()
      ) : (
        <DesignPreview
          pageBG={pageBG}
          navbarBG={navbarBG}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
          buttonStyle={buttonStyle}
          pageText={pageText}
          footerBG={footerBG}
          storefrontId={storefront._id}
          hideNav={hideNav}
          socialIcons={socialIcons}
          hideFooter={hideFooter}
          storefront={storefront}
        />
      )}
    </div>
  );
};

export default DesignForm;
