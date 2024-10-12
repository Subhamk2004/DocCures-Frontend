import React from 'react';

function FormImageInput({
  title,
  labelFor,
  isRequired = false,
  onChange,
  previewImage
}) {

  
  return (
    <div className='flex flex-col w-full gap-1'>
      <label htmlFor={labelFor} className='text-xl font-semibold'>
        {title}
      </label>
      <input
        type="file"
        id={labelFor}
        accept="image/*"
        onChange={onChange}
        required={isRequired}
        className='w-full p-2 border border-primary rounded-lg'
      />
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className='mt-2 max-w-full h-40 object-cover rounded-lg'
        />
      )}
      <p className='text-red-500'>*Please upload photo without background</p>
    </div>
  );
}

export default FormImageInput;