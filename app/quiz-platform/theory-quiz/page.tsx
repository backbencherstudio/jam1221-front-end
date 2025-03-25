"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiResetRightFill } from "react-icons/ri";
import Link from 'next/link';


interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    answer: string;
}
interface SubmissionResult {
    success: boolean
    correctCount: number
    incorrectCount: number
    totalQuestions: number
    percentageScore: number
    skippedQuestions: number
    detailedResults: {
        questionNumber: number
        correctAnswer: string
        userAnswer: string
        isCorrect: boolean
    }[]
}

const TheoryQuizComponent = () => {

    const route = useRouter()

    const [showResult, setShowResult] = useState(false)
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null)
    const [percentage, setPercentage] = useState(0)


    // ✅ Fetch questions when the component mounts

    const fetchQuestions = async () => {

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
    
            // ✅ Run both API calls in parallel (better performance)
            const [questionsRes, subscriptionRes] = await Promise.all([
                fetch('http://localhost:4000/api/quiz-test/questions', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }),
                fetch('http://localhost:4000/api/payment/subscription/status', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
            ]);
    
            // ✅ Check for API success before parsing JSON
            if (!questionsRes.ok || !subscriptionRes.ok) {
                throw new Error('Failed to fetch data');
            }
    
            const [questionsData, subscriptionData] = await Promise.all([
                questionsRes.json(),
                subscriptionRes.json()
            ]);
    
            // ✅ Validate subscription status before setting questions
            if (subscriptionData?.subscription?.status) {
                setQuestions(questionsData.questions.slice(0,5) || []);
                setSelectedOptions(Array(questionsData.questions.length).fill(null));
            } else {
                setQuestions([]);
            }
    
            // ✅ Reset UI state
            setCurrentQuestionIndex(0);
            setIsAnswerSubmitted(false);
            setShowResult(false);
    
        } catch (error) {
            console.error('Error fetching questions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const allReset = () => {
        setLoading(true);
        fetchQuestions();
        // route.push("/quiz-platform/theory-quiz")
    };


    if (loading){
        return <div className='flex justify-center max-w-[250px] mx-auto items-center gap-2 bg-blue-500 rounded-md px-2 text-white text-lg font-bold py-1'><p className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></p>loading...</div>
    } 

    if (questions.length === 0) {
        return <div className='flex flex-col items-center'>
        <p className="text-center text-red-500 text-2xl font-medium">
            Access to questions requires an active subscription. Please subscribe to continue.
        </p>
        <Link href={"/subscription"} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
            Upgrade Subscription
        </Link>
    </div>
    }


    const handleOptionSelect = (option: string) => {
        if (isAnswerSubmitted) return; // Prevent changing answer after submission

        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[currentQuestionIndex] = option;
        setSelectedOptions(newSelectedOptions);
        setIsAnswerSubmitted(true);
    };



    // ✅ Handle Next Question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1 && isAnswerSubmitted) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswerSubmitted(false);
        }
    };

    // ✅ Determine Option Styling
    const getOptionStyle = (option: string) => {
        const selectedOption = selectedOptions[currentQuestionIndex];

        if (selectedOption === option) {
            return "border border-blue-500 bg-blue-100 rounded p-3";
        } else {
            return "border border-gray-300 rounded p-3 hover:bg-gray-50 cursor-pointer";
        }
    };



    // after submeting wrong and right answet style ===================

    const getResultOptionStyle = (option: string, question: QuizQuestion, index: number) => {


        if (option === submissionResult?.detailedResults?.[index].correctAnswer) {
            // Correct answer
            return "border border-blue-500 bg-blue-100 rounded p-3";
        } else if (option === submissionResult?.detailedResults?.[index].userAnswer) {
            // Wrong selected option
            return "border border-red-500 bg-red-100 rounded p-3";
        } else {
            return "border border-gray-300 rounded p-3 opacity-50";
        }
    };
    // console.log(submissionResult)




    // Function to submit answers to backend
    const submitAnswers = async () => {
        setShowResult(!showResult)
        try {
            const token = localStorage.getItem('token');
            const submissionData = {
                "answers": selectedOptions.map(answer => {
                    return answer;
                })
            };

            const response = await fetch('http://localhost:4000/api/quiz-test/submit-answers', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });
            const data = await response.json()
            setSubmissionResult(data)
            setPercentage(data?.percentageScore)
            if (data.success) {
                console.log('Answers submitted successfully!');
                setShowResult(true);
            } else {
                console.error('Error submitting answers:', await response.text());
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };



    return (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-[800px] p-6 mt-10">
            <div className={`${showResult && "hidden"}`}>
                <div className="flex justify-end mb-4">
                    <span className="text-sm text-gray-500 notranslate">
                        {currentQuestionIndex + 1} / {questions.length}
                    </span>
                </div>

                <h2 className="text-lg font-medium mb-6 text-center text-black">
                    {questions[currentQuestionIndex].question}
                </h2>

                <div className="space-y-3 mb-6 text-black font-bold">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div
                            key={index}
                            className={getOptionStyle(option)}
                            onClick={() => handleOptionSelect(option)}

                        >

                            {/* {radio button style} */}
                            <label className="flex items-center space-x-3 cursor-pointer select-none">
                                <input
                                    type="radio"
                                    name="quiz-option"
                                    className="peer hidden"
                                    checked={selectedOptions[currentQuestionIndex] === option}
                                    onChange={() => handleOptionSelect(option)}
                                    disabled={isAnswerSubmitted}
                                />

                                <div className={`h-5 w-5 rounded-full border-1 
                  flex items-center justify-center transition-all
                  ${selectedOptions[currentQuestionIndex] === option ? "border-blue-600 bg-blue-600" : "border-gray-400 bg-white"}
                  ${isAnswerSubmitted ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
              `}>
                                    {selectedOptions[currentQuestionIndex] === option && (
                                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                                    )}
                                </div>

                                <span className="text-black font-medium">{option}</span>
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    {currentQuestionIndex === (questions.length - 1) ?
                        <div
                            className={`${isAnswerSubmitted ? "bg-blue-400 hover:ring-1 cursor-pointer" : "bg-gray-300 "
                                } `}
                        >
                            {isAnswerSubmitted ? <button onClick={submitAnswers} className='text-white font-bold py-2 block cursor-pointer  px-12 rounded'>
                                Submit All Answer
                            </button> : <button className='text-white font-bold py-2 px-12 rounded cursor-not-allowed' onClick={handleNextQuestion} disabled={!isAnswerSubmitted}>
                                Next
                            </button>}


                        </div> :
                        <button
                            className={`${isAnswerSubmitted ? "bg-blue-400 hover:ring-1 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
                                } text-white font-bold py-2 px-12 rounded`}
                            onClick={handleNextQuestion}
                            disabled={!isAnswerSubmitted}
                        >
                            Next
                        </button>
                    }

                </div>
            </div>
            <div className={`${showResult ? "block" : "hidden"}`}>
                <div className="text-center my-6">
                    <h2 className="text-2xl text-black font-bold">Your Result</h2>
                    <p className="mt-2 text-black text-lg notranslate">
                        Correct Answers: {submissionResult?.correctCount} / {questions.length}
                    </p>
                    <p className="mt-2 text-black text-lg  notranslate">Score: {percentage}%</p>
                    <button onClick={allReset} className='px-3 cursor-pointer py-[6px] border border-blue-500 bg-blue-100 backdrop-blur-md  text-[#434de2b6] font-bold scale-100 hover:scale-105 duration-200 text-2xl mt-5 mx-auto rounded-md flex items-center justify-center gap-2'>
                        <span>
                            < RiResetRightFill />
                        </span>
                        <span>
                            Re Try
                        </span>
                    </button>
                </div>
                <div className='mt-15'>
                    {questions.map((qus, ind) => (
                        <div key={ind} className="mb-10">
                            <h2 className='text-lg font-medium mb-4 text-black'>{qus.question}</h2>

                            <div className="space-y-3 text-black font-bold">
                                {qus.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={getResultOptionStyle(option, qus, ind)} // ✅ Use result styling function
                                    >
                                        <label className="flex items-center space-x-3 select-none">
                                            <div className="h-5 w-5 rounded-full border-1 flex items-center justify-center">
                                                {selectedOptions[ind] === option && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-900" />
                                                )}
                                            </div>
                                            <span className="text-black font-medium">{option}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TheoryQuizComponent;