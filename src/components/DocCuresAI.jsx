import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, SendHorizonalIcon, SendIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import AlertDisplay from './AlertDisplay';

function DocCuresAI() {

    let { isAuthenticated, name, phone, email, address } = useSelector(state => state.user);
    let DocCuresAIAPIKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(DocCuresAIAPIKey);
    let [generatedResult, setGeneratedResult] = useState(null);
    let [generatedResultarray, setGeneratedResultArray] = useState([]);
    let [promptArray, setPromptArray] = useState([]);
    let [prompt, setPrompt] = useState('');
    let [error, setError] = useState();
    let [isLoading, setIsLoading] = useState(false);

    let generateContent = async (prompt) => {
        console.log(prompt);

        let previousPrompt = ''
        let previousResult = ''
        if (promptArray.length > 0) {
            previousPrompt = promptArray[promptArray.length - 1];
        }
        if(generatedResultarray.length > 0) {
            previousResult = generatedResultarray[generatedResultarray.length - 1];
        }

        let tosSendPrompt = `Hey gemini, I am Subham Kumar Admin of the website in which you are integrated, the website's name is "DocCures", currently you are conversing with the user whose name is ${name}, email is ${email}, phone number is ${phone} and address is ${address} and user's authentication status is ${isAuthenticated}. So first things first greet user with their name, for the first time or if the previousQuestion was ${previousPrompt}. Now let me tell about the website: DocCures is an online Doctor appointment booking system where you can browse lot of doctors based on their specialisation.If the user asks how to book an appointment, firstly check is user is authenticated or not only if the user is not authenticated then only tell the user  to login else don't talk about their authentication status, so if the user haven't logged in then tell them to login first, before continue booking, if User is authenticated then tell them to click on the Book Appointment which is on the home page or click All Doctors button in the navbar, which will redirect the user to all doctors's list, from there user has to select a doctor and then click on book appointment button, which will redirect them to the doctor profile from where they have to select date and time and then confirm booking, and then their appointment will be booked. Apart from that only answer the question if user asks about health related things, and about something on the website and nothing else. If user asks where they can view all their appointments, then tell them to visit the profile section via navbar, where they has to click All Appointments button which will view all their appointments. If a user asks something health related, then please just suggest them some first aids, and then ask if they want to book an appointment Ok Gemini now I am done, for your reference user's previous question was: ${previousPrompt}, and your answer to the user's previous question was: ${previousResult} so please follow up on that. Now the user's question is: ${prompt}. PLease NOTE!!: Don't include your previous response or user's previous prompt in the current response just take reference from the previous ones for continiuity of conversation. And yes finally when you reply or answer, answer to the user and not me and yes don't tell the user their authnetication status if they are authenticated in any case, if the user asks you who you are tell them you are DocCures healtcare AI assistant, if a user is frustrated or having trouble while navigating to appointment booking, then your reply should only be "Navigating you to appointment booking page". And if a user is having trouble while fetching or seeing or viewing all their upcoming or previous appointments then you reply should be "Navigating you to all appointments page.`;

        setPromptArray([...promptArray, prompt]);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            setIsLoading(true)
            const result = await model.generateContent(tosSendPrompt);
            setGeneratedResult(result.response.text());
            setGeneratedResultArray([...generatedResultarray, result.response.text()]);
        } catch (error) {
            if (error.message.includes('Candidate was blocked due to SAFETY')) {
                setGeneratedResult('Sorry, I cannot answer this question, as it violates the safety guidelines and is not related to help with health or website');
                setGeneratedResultArray([...generatedResultarray, 'Sorry, I cannot answer this question, as it violates the safety guidelines and is not related to help with health or website']);
            } else {
                console.error("An error occurred:", error);
                setError('An error occurred with the input stream, please ask again');
                setTimeout(() => {
                    setError(false);
                }, 7000);
            }
        }
        finally {
            setIsLoading(false);
        }
        setPrompt('');
        tosSendPrompt = '';


    }
    return (
        <div className='w-full h-full flex flex-col p-4 justify-between gap-4 overflow-scroll no-scrollbar'>
            {
                generatedResultarray.map((result, index) => {
                    return (
                        <div className='w-full flex flex-col items-start gap-[5px] text-textp p-4 rounded-2xl bg-softGray shadow-md shadow-darkGray'>
                            <p className='text-primary font-semibold'># {promptArray[index]}</p>
                            <p className='text-textp mt-5'>
                                {result}
                            </p>
                        </div>
                    )
                })
            }
            {
                generatedResult ?
                    null
                    :
                    <div className='w-full flex flex-col items-start gap-[5px] text-textp p-4 rounded-2xl bg-softGray shadow-md shadow-darkGray'>
                        <p className='text-primary font-semibold'># Welcome to DocCures! 👋👨‍⚕️</p>
                        <p className='text-textp mt-5'>
                            I'm your friendly AI assistant, here to help
                        </p>
                        <p className='text-textp mt-5 mb-7'>
                            How can I assist you today?
                        </p>
                        <button
                            onClick={() => {
                                generateContent('Help me book an appointment')
                            }}>
                            1. 📅 Book an appointment
                        </button>
                        <button>
                            2. 👨‍⚕️ Find a specialist
                        </button>
                        <button>
                            3. ℹ️ Get information about our services
                        </button>
                        <button>
                            4. 🏥 Learn about our facilities
                        </button>
                        <button>
                            5. 💬 Chat about your health concerns
                        </button>
                        <p className='mt-6'>
                            Just type a number or ask your question
                        </p>
                    </div>
            }
            {
                error &&
                <AlertDisplay alertType='error' alertMessage={error} />
            }
            <div className='w-full flex flex-row justify-between gap-4'>
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className='rounded-3xl px-6 py-3 bg-secondary text-[#444444] lg:text-xl lg:font-semibold shadow-md shadow-[#c5c5c5] outline-none w-[75%] focus:bg-[#d3d3ff]'
                />
                <button className='rounded-3xl px-6 py-3 text-black hover:text-black lg:text-xl lg:font-semibold bg-secondary hover:bg-[#d3d3ff]'
                    onClick={() => {
                        generateContent(prompt)
                    }}
                    disabled={isLoading}
                >
                    <SendHorizonalIcon className='text-primary' />
                </button>
            </div>
        </div>
    )
}

export default DocCuresAI