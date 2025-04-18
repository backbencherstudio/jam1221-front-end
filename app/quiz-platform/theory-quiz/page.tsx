"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiResetRightFill } from "react-icons/ri";
// import Link from "next/link";
import { useAuth } from "@/app/_components/AuthProviderContext";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface SubmissionResult {
  success: boolean;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  percentageScore: number;
  skippedQuestions: number;
  detailedResults: {
    questionNumber: number;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

const TheoryQuizComponent = () => {

  const router = useRouter();
  const { isAuthenticated, loading,token } = useAuth();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(true); // NEW


  useEffect(() => {
    const fetchQuestions = async () => {

      try {
        setLoadingQuestions(true); // start loading
        const questionsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz-test/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      
        if (!questionsRes.ok) {
          throw new Error("Failed to fetch questions");
        }
      
        const questionsData = await questionsRes.json();
        
        const quizQuestions = questionsData.questions || [];
        setQuestions(quizQuestions);
        setSelectedOptions(Array(quizQuestions.length).fill(null));



    
        setCurrentQuestionIndex(0);
        setIsAnswerSubmitted(false);
        setShowResult(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoadingQuestions(false); // stop loading
      }
    };
    
    if (!loading && isAuthenticated) {
      fetchQuestions();
    }
  }, [loading, isAuthenticated]);


  if (loadingQuestions) {
    return (
      <div className="flex items-center gap-2 bg-blue-500 rounded-md px-3 text-white text-lg font-bold py-2">
        <span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></span>
        Loading Questions...
      </div>
    );
  }
  

  const handleOptionSelect = (option: string) => {
    if (isAnswerSubmitted) return;
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1 && isAnswerSubmitted) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerSubmitted(false);
    }
  };

  const getOptionStyle = (option: string) => {
    const selected = selectedOptions[currentQuestionIndex];
    return selected === option
      ? "border border-blue-500 bg-blue-100 rounded p-3"
      : "border border-gray-300 rounded p-3 hover:bg-gray-50 cursor-pointer";
  };

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


  const submitAnswers = async () => {
    setShowResult(true);
    try {
      // const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz-test/submit-answers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: selectedOptions }),
      });
      const data = await response.json();
      setSubmissionResult(data);
      setPercentage(data?.percentageScore || 0);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const allReset = () => {
    router.replace("/quiz-platform");
  };





  return (
    <span className="bg-white rounded-lg shadow-lg w-full max-w-[800px] p-6 mt-10">
      {!showResult ? (
        <>
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
                <label className="flex items-center space-x-3 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="quiz-option"
                    className="peer hidden"
                    checked={selectedOptions[currentQuestionIndex] === option}
                    onChange={() => handleOptionSelect(option)}
                    disabled={isAnswerSubmitted}
                  />
                  <div
                    className={`h-5 w-5 rounded-full border-1 flex items-center justify-center transition-all ${
                      selectedOptions[currentQuestionIndex] === option
                        ? "border-blue-600 bg-blue-600"
                        : "border-gray-400 bg-white"
                    } ${isAnswerSubmitted ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
                  >
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
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={submitAnswers}
                className={`${
                  isAnswerSubmitted
                    ? "bg-blue-400 hover:ring-1 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold py-2 px-12 rounded`}
                disabled={!isAnswerSubmitted}
              >
                Submit All Answers
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className={`${
                  isAnswerSubmitted
                    ? "bg-blue-400 hover:ring-1 cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                } text-white font-bold py-2 px-12 rounded`}
                disabled={!isAnswerSubmitted}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-center my-6">
            <h2 className="text-2xl text-black font-bold">Your Result</h2>
            <p className="mt-2 text-black text-lg notranslate">
              Correct Answers: {submissionResult?.correctCount} / {questions.length}
            </p>
            <p className="mt-2 text-black text-lg notranslate">Score: {percentage}%</p>
            <button
              onClick={allReset}
              className="px-3 py-2 border border-blue-500 bg-blue-100 text-[#434de2b6] font-bold text-2xl mt-5 mx-auto rounded-md flex items-center justify-center gap-2 hover:scale-105 duration-200"
            >
              <RiResetRightFill /> Re Try
            </button>
          </div>

          <div className="mt-15">
            {questions.map((qus, ind) => (
              <div key={ind} className="mb-10">
                <h2 className="text-lg font-medium mb-4 text-black">{qus.question}</h2>
                <div className="space-y-3 text-black font-bold">
                  {qus.options.map((option, index) => (
                    <div
                      key={index}
                      className={getResultOptionStyle(option,qus, ind)}
                    >
                      <label className="flex items-center space-x-3 select-none">
                        <div className="h-5 w-5 bg-white border-blue-500  rounded-full border-2 flex items-center justify-center">
                          {selectedOptions[ind] === option && (
                            <div className="h-4 w-4 border-2 border-white  rounded-full bg-blue-900" />
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
        </>
      )}
    </span>
  );
};

export default TheoryQuizComponent;