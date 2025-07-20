import React from 'react';

const styles = `
@keyframes typing {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

.animate-typing {
  animation: typing 1.5s infinite;
  display: inline-block;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}

.animation-delay-1200 {
  animation-delay: 1.2s;
}
`;

function IncomponentLoading({
  isShort = false
}) {
  return (
    <>
      <style>{styles}</style>
      <div className="flex justify-center items-center h-full">
        <div className="text-primary text-2xl font-bold flex flex-row justify-center items-center
        ">
          {
            isShort ?
              <div className='flex flex-row gap-1 justify-center items-center'>
                <span className=" text-white text-4xl font-bold animate-typing">.</span>
                <span className=" text-white text-4xl font-bold animate-typing animation-delay-300">.</span>
                <span className=" text-white text-4xl font-bold animate-typing animation-delay-600">.</span>
                <span className=" text-white text-4xl font-bold animate-typing animation-delay-900">.</span>
                <span className=" text-white text-4xl font-bold animate-typing animation-delay-1200">.</span>
              </div>
              :
              <div className='gap-1 flex flex-row items-center justify-center'>
                <p>Loading</p>
                <span className=" text-4xl font-bold animate-typing">.</span>
                <span className="text-4xl font-bold animate-typing animation-delay-300">.</span>
                <span className=" text-4xl font-bold animate-typing animation-delay-600">.</span>
              </div>
          }
        </div>
      </div>
    </>
  );
}

export default IncomponentLoading;