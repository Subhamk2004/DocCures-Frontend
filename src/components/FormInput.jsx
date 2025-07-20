import React from 'react'

function FormInput({
    title,
    labelFor,
    placeholder,
    type,
    isRequired = false,
    isSelect = false,
    value,
    onChange
}) {
    return (
        <div className='flex flex-col w-full gap-1'>
            <label htmlFor={labelFor} className=' text-xl font-semibold '>
                {title}
            </label>
            {
                isSelect ?
                    <select
                        id={labelFor}
                        required={isRequired}
                        onChange={onChange}
                        className='w-full h-10 border-[1px] border-primary rounded-lg p-2 text-primary text-lg outline-none focus:bg-[#e7ebff]'
                    >
                        <option value='General Physician'>General Physician</option>
                        <option value='Gynecologist'>Gynecologist</option>
                        <option value='Dermatologist'>Dermatologist</option>
                        <option value='Pediatricians'>Pediatricians</option>
                        <option value='Neurologist'>Neurologist</option>
                        <option value='Gastroenterologist'>Gastroenterologist</option>
                    </select> :
                    <input
                        placeholder={placeholder}
                        id={labelFor}
                        type={type}
                        onChange={onChange}
                        value={value}
                        required={isRequired}
                        className='w-full h-10 border-[1px] border-primary rounded-lg p-2 text-primary text-lg outline-none focus:bg-[#e7ebff]'
                    />
            }

        </div>
    )
}

export default FormInput