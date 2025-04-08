
"use client";
import { useAuth } from '@/app/_components/AuthProviderContext';
import React, { useEffect, useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

type QuizCategoryEndpoint = 'traffic-rules' | 'concepts' | 'traffic-safety' | 'enviroment';

interface QuestionDesignProps {
  categoryEndpoint: QuizCategoryEndpoint;
  // other props if needed...
}


const CategoryQuestionDesign: React.FC<QuestionDesignProps> = ({ categoryEndpoint }) =>  {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  // const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { token, loading } = useAuth();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const questionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${categoryEndpoint}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        const questionData = await questionResponse.json();
        console.log(questionData.questions[0])
        if (questionData.success) {
          setQuestions(questionData.questions); // Adjust based on your API response structure
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (token && !loading) {
      fetchQuestions();
    }
  }, [token, loading]);

  const handleOptionSelect = (option: string) => {
    if (selectedOption === null) {
      setSelectedOption(option)
    }
  }

  const handleNext = () => {
    // Save the user's answer
    setUserAnswers([...userAnswers, selectedOption]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setShowResults(false);
  };

  const getOptionStyle = (option: string) => {
    if (selectedOption === null) {
      return "border border-gray-300 p-3  rounded-md cursor-pointer";
    }

    if (option === currentQuestion.answer) {
      return "border border-blue-500 bg-blue-100 rounded p-3";
    }

    if (option === selectedOption && option !== currentQuestion.answer) {
      return "border border-red-500 bg-red-100 rounded p-3";
    }

    return "border border-gray-200 p-3 rounded-md opacity-70";
  };


  if (isLoading) {
    return (
      <div className="flex items-center gap-2 bg-blue-500 rounded-md px-3 text-white text-lg font-bold py-2">
        <span className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 border-solid rounded-full animate-spin"></span>
        Loading Questions...
      </div>
    );
  }

  if (!questions.length) {
    return <div>No questions available</div>;
  }

  const calculateScore = () => {
    const answers = userAnswers.filter((answer, index) => 
      answer === questions[index].answer
    ).length;
    
    return {
      correct: answers,
      total: questions.length,
      percentage: Math.round((answers / questions.length) * 100)
    };
  };

  // Results view
  if (showResults) {
    const score = calculateScore();
    
    return (
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[800px] p-6 mt-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Result</h2>
          <p className="text-lg mb-2">Correct Answers: {score.correct} / {score.total}</p>
          <p className="text-lg mb-6">Score: {score.percentage}%</p>
          
          <button 
            onClick={handleRetry}
            className="bg-blue-100 text-blue-600 font-medium py-2 px-8 rounded-md flex items-center justify-center mx-auto"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry
          </button>
        </div>
        
        {questions.map((question, qIndex) => {
          const userAnswer = userAnswers[qIndex];
          const isCorrect = userAnswer === question.answer;
          
          return (
            <div key={qIndex} className="mb-8">
              <h3 className="text-lg font-medium mb-4">{question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option, i) => {
                  let optionClass = "border p-4 my-2 rounded-md";
                  
                  if (option === question.answer) {
                    optionClass = "border border-blue-500 p-4 my-2 rounded-md bg-blue-100";
                  } else if (option === userAnswer) {
                    optionClass = "border border-red-500 p-4 my-2 rounded-md bg-red-100";
                  }
                  
                  return (
                    <div key={i} className={optionClass}>
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 border ${
                          option === userAnswer ? (isCorrect ? 'bg-blue-500 border-blue-500' : 'bg-red-500 border-red-500') :
                          option === question.answer ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                        }`}>
                          {(option === userAnswer || option === question.answer) && 
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                          }
                        </div>
                        {option}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Quiz view
  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-[800px] p-6 mt-10">
      <div>
        <h1 className="text-end my-2 text-gray-500 font-medium notranslate">
          {currentQuestionIndex + 1} / {questions.length}
        </h1>
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
          <div className="space-y-2" key={currentQuestionIndex}>
            {currentQuestion.options.map((option, i) => (
              <div
                key={i}
                className={getOptionStyle(option)}
                onClick={() => handleOptionSelect(option)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 border ${
                    selectedOption === option ? (option === currentQuestion.answer ? 'bg-blue-500 border-blue-500' : 'bg-red-500 border-red-500') :
                    selectedOption !== null && option === currentQuestion.answer ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}>
                    {(selectedOption === option || (selectedOption !== null && option === currentQuestion.answer)) && 
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                     }
                  </div>
                  {option}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`mt-6 text-white mx-auto flex font-bold py-2 px-12 rounded ${
            selectedOption === null ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'
          }`}
        >
          {isLastQuestion ? "Show Results" : "Next"}
        </button>
      </div>
    </div>
  );

};

export default CategoryQuestionDesign;