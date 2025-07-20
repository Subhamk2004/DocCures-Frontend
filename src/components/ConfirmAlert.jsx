import React from 'react';

function ConfirmAlert({
    confirmMessage = '',
    confirmType = 'warning',
    confirm
}) {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center fixed top-0 left-0 bg-black bg-opacity-50 z-50'>
            {confirmType === 'warning' && (
                <div className='p-3 border border-black rounded-lg bg-white shadow-[#747474] shadow-lg flex flex-col items-center gap-3 px-7'>
                    <p className='text-lg font-semibold'>{confirmMessage}</p>
                    <div className='w-full flex flex-row items-center justify-evenly gap-4'>
                        <button 
                            className='px-3 py-2 bg-[#f03c3c] rounded-lg text-white font-semibold hover:bg-[red]'
                            onClick={() => confirm(true)}
                        >
                            Yes
                        </button>
                        <button 
                            className='px-[13px] py-2 bg-[#3dc41b] rounded-lg text-white font-semibold hover:bg-[green]'
                            onClick={() => confirm(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ConfirmAlert;