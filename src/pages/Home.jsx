import React, { useEffect, useState } from 'react'
import HomeIntro from '../components/HomeIntro'
import HorizontalList from '../components/HorizontalList'
import DocList from '../components/DocList'
import { Link } from 'react-router-dom'
import doc1C from '../assets/images/doc1.png'
import DocCuresAI from '../components/DocCuresAI'
import Ai from '../assets/images/Ai.png'
import { useSelector } from 'react-redux'
import AlertDisplay from '../components/AlertDisplay'

function Home() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let { isAuthenticated } = useSelector(state => state.user);
  let [showChatBot, setShowChatBot] = useState(false);
  let [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  let handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('https://doc-cures-user.vercel.app/')
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 7000)
    } catch (error) {
      console.error('Failed to copy text: ', err);
    }
  }


  return (
    <div className='w-full h-full p-2 md:p-4 flex flex-col items-center overflow-scroll relative'>
      <HomeIntro windowWidth={windowWidth} />
      {
        isCopied && <AlertDisplay alertType='success' alertMessage='Link copied to clipboard' />
      }

      <div className="z-10 fixed right-3 bottom-12 md:right-12 shadow-lg shadow-[gray] rounded-full group cursor-pointer flex justify-center items-center">
        {
          showChatBot ?
            null :
            <p className="text-sm md:text-base absolute bottom-full mb-2 text-textp right-0 bg-white p-4 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out w-[320px] md:w-[350px] gap-1 inline-block">
              👋 Hi there! I'm <span className='text-primary font-semibold'>DocCures' AI assistant</span>, Need help booking a doctor? ready to help!
            </p>
        }
        <button onClick={() => {
          setShowChatBot(!showChatBot)
        }}>
          <img src={Ai} alt="AI Assistant" className="rounded-full w-[50px] md:w-[65px]" />
        </button>
      </div>
      {
        showChatBot &&
        <div className="fixed bottom-32 h-[600px] right-[15px] md:right-10 w-[330px] md:w-[380px] lg:w-[500px] md:h-[600px] lg:h-[750px] bg-white shadow-lg shadow-[gray] rounded-3xl overflow-hidden z-20">
          <DocCuresAI />
        </div>
      }

      <div className=' w-[70%] flex flex-col items-center'>
        <h2 className='text-[#272727] text-xl md:text-3xl font-semibold mt-8'>
          Get your Specialist
        </h2>
        <p className='mt-4 md:w-[60%] text-sm md:text-base lg:w-[45%] text-center text-textp'>
          Effortlessly explore our wide range of trusted doctors and book your appointment with ease.
        </p>

        <HorizontalList />
      </div>

      <div className='mt-32 w-full flex flex-col items-center'>
        <h2 className='text-[#272727] text-xl md:text-3xl font-semibold md:mt-8'>
          Top Doctors to Book
        </h2>
        {
          windowWidth > 768 ?
            <DocList isHomePage={true} isMobile={false} />
            :
            <DocList isHomePage={true} isMobile={true} />
        }
      </div>

      <div className='md:w-[75%] lg:w-[70%] h-[250px] md:h-[400px] lg:h-[550px] rounded-3xl bg-primary flex flex-row'>
        <div className='w-[70%] lg:w[55%] h-full  p-10 flex flex-col gap-4 justify-center'>
          <span className='md:text-4xl lg:text-5xl font-bold text-white md:leading-[45px] lg:leading-[60px]'>
            Book Appointment with 100+ Trusted Doctors
          </span>

          {
            isAuthenticated ?
              <button className='text-sm w-[145px] md:text-base md:w-auto  rounded-3xl px-6 py-3 bg-softGray hover:bg-white text-textp hover:text-black lg:text-xl lg:font-semibold'
                onClick={handleCopy}
              >
                Spread Health
              </button>
              :
              <Link to="/signup">
                <button className='text-sm w-[145px] md:text-base md:w-auto  rounded-3xl px-6 py-3 bg-softGray hover:bg-white text-textp hover:text-black lg:text-xl lg:font-semibold'>
                  Create Account
                </button>
              </Link>
          }


        </div>

        <div className='w-[40%] lg:w-[45%] h-[100%] flex items-end overflow-hidden rounded-3xl'>
          <img src={doc1C} className='w-[90%] max-w-[500px] lg:mt-10' />
        </div>
      </div>
    </div>
  )
}

export default Home