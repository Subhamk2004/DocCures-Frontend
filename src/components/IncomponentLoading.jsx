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
`;

function IncomponentLoading() {
  return (
    <>
      <style>{styles}</style>
      <div className="flex justify-center items-center h-full">
        <div className="text-primary text-2xl font-bold">
          Loading
          <span className="animate-typing">.</span>
          <span className="animate-typing animation-delay-300">.</span>
          <span className="animate-typing animation-delay-600">.</span>
        </div>
      </div>
    </>
  );
}

export default IncomponentLoading;