import React from 'react';
import logofull from '../assets/images/logofull.png';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer className="footer w-[80%] mt-32 flex flex-col gap-4">
      <div className="footer-content flex flex-row w-full justify-between gap-4">
        <div className='flex flex-col w-[33%] gap-4 '>
          <img src={logofull} alt="Logo" className="footer-logo w-[110px] " />
          <p className='text-textp text-justify ml-4'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className='flex flex-col w-[33%] items-center'>
          <h2 className='text-2xl font-semibold'>
            Company
          </h2>
          <ul className='flex flex-col text-textp mt-20'>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Contact us</Link>
          </ul>
        </div>
        <div className='flex flex-col w-[33%] items-center'>
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