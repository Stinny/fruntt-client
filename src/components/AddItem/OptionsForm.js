import React, { useState } from 'react';
import Modal from 'react-modal';

//mui
import Chip from '@mui/material/Chip';

const OptionsForm = ({
  setOptionName,
  setOptionVals,
  setOptions,
  optionName,
  optionVals,
  options,
}) => {
  const [optionVal, setOptionVal] = useState('');
  //adds one option to the optionVals
  const handleAddOptionVal = (e) => {
    setOptionVals([...optionVals, optionVal]);
    setOptionVal('');
  };

  //adds option(name and vals) to the array of options
  const handleAddOption = () => {
    const newOpt = {
      name: optionName,
      values: optionVals,
    };

    //add the new option to the array of options
    setOptions([...options, newOpt]);
    setOptionVals([]);
    setOptionName('');
    console.log(options);
  };

  //stuff for modal
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modalStyles = {
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

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='flex flex-col'>
          <p className='mb-4'>Adding option to item</p>
          <input
            id='optionName'
            type='text'
            onChange={(e) => setOptionName(e.target.value)}
            value={optionName}
            className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2'
            placeholder='Enter option name (ex. Size)'
          />

          <div className='flex items-center'>
            <input
              id='optionVal'
              type='text'
              value={optionVal}
              placeholder='Enter option values (ex. small, medium, large) one by one'
              onChange={(e) => setOptionVal(e.target.value)}
              className='border-2 border-slate-200 hover:border-slate-300 w-11/12 rounded-lg p-2 mt-4'
            />

            <button
              type='submit'
              onClick={handleAddOptionVal}
              className='h-10 border-2 border-slate-800 mt-4 w-1/12 rounded'
            >
              +
            </button>
          </div>

          <div className='w-full flex-flex-wrap'>
            {optionVals.map((opt) => (
              <Chip label={opt} />
            ))}
          </div>

          <button
            onClick={handleAddOption}
            className='w-full h-14 border-2 rounded border-slate-800 text-slate-800 mt-4'
          >
            Add Option
          </button>
        </div>
      </Modal>

      {options.length > 0 ? (
        options.map((opt) => <p>{opt.optionName}</p>)
      ) : (
        <div className='w-full flex items-center justify-center'>
          <p>Not options added</p>
        </div>
      )}

      <button
        className='w-full h-16 border-2 rounded border-slate-800 text-slate-800 mt-4 font-medium'
        onClick={openModal}
      >
        + Add option
      </button>
    </div>
  );
};

export default OptionsForm;
