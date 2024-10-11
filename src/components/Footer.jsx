import React from 'react';
import logofull from '../assets/images/logofull.png';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer className="footer w-[100%] mt-32 flex flex-col gap-4 bg-white items-center">
      <div className="w-[80%] footer-content flex flex-row justify-between gap-4 pt-6">
        <div className='flex flex-col w-[40%] gap-4 '>
          <img src={logofull} alt="Logo" className="footer-logo w-[110px]" />
          <p className='text-textp text-justify ml-4'>
            DocCures makes healthcare simple by connecting you with trusted doctors for easy, fast appointment scheduling. Whether you need routine care or specialist advice, our platform ensures expert care is always within reach. With a seamless, user-friendly experience, managing your health has never been more convenient.
          </p>
        </div>
        <div className='flex flex-col w-[30%] items-center'>
          <h2 className='text-2xl font-semibold'>
            Company
          </h2>
          <ul className='flex flex-col text-textp mt-20'>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Contact us</Link>
          </ul>
        </div>
        <div className='flex flex-col w-[30%] items-center'>
          <h2 className='text-2xl font-semibold'>
            Support
          </h2>
          <ul className='flex flex-col text-textp mt-20'>
            <Link>+0 1234567890</Link>
            <Link>subhamrahar22@gmail.com</Link>
            <Link>@Subhamk2004 -Github</Link>
          </ul>
        </div>

      </div>
      <div className='mb-4 mt-10 w-full'>
        <p className="footer-text text-center">© 2023 DocCures. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer