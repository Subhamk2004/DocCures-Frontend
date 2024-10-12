import React from 'react'

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center fixed min-h-screen bg-gradient-to-r from-[#5c68d3] to-primary w-screen h-screen">
            <div className="relative">
                <div className="w-24 h-24 border-t-4 border-b-4 border-white rounded-full animate-spin"></div>
                <div className="w-24 h-24 border-t-4 border-b-4 border-purple-300 rounded-full animate-ping absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-3xl font-bold text-white">Help is on the way....</p>
        </div>
    )
}

export default Loading