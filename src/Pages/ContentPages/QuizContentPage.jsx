import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const QuizContentPage = () => {
  const { id } = useParams();
  const [quizContent, setQuizContent] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]); // To store feedback (correct/incorrect) for each question
  const [quizCompleted, setQuizCompleted] = useState(false); // Track if the quiz is completed

  useEffect(() => {
    const fetchQuizContent = async () => {
      try {
        const response = await fetch(`/Contents/${id}.json`);  // Use the dynamic ID in the URL
        if (!response.ok) {
          throw new Error("Quiz not found!");
        }
        const data = await response.json();

        if (data) {
          setQuizContent(data);
          setCurrentQuestionIndex(0);
          setUserAnswers(new Array(data.questions.length).fill(null));
          setFeedback(new Array(data.questions.length).fill(null));
        } else {
          throw new Error("No quiz content available");
        }
      } catch (error) {
        console.log(error.message);  // Handle errors (e.g., 404, network issues)
      }
    };

    fetchQuizContent();
  }, [id]);

  const handleNextQuestion = () => {
    if (quizContent && currentQuestionIndex < quizContent.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelection = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmitAnswer = () => {
    if (quizContent) {
      const currentQuestion = quizContent.questions[currentQuestionIndex];
      const selectedAnswer = userAnswers[currentQuestionIndex];
      
      // Check if the answer is correct
      let isCorrect = false;
  
      if (currentQuestion.type === "true_false") {
        // For True/False, "A" is True, and "B" is False
        isCorrect = (selectedAnswer === "A" && currentQuestion.answer === "True") ||
                    (selectedAnswer === "B" && currentQuestion.answer === "False");
      } else {
        // For other question types (MCQ, fill-in-the-blank)
        isCorrect = selectedAnswer === currentQuestion.answer;
      }
  
      const updatedFeedback = [...feedback];
      updatedFeedback[currentQuestionIndex] = {
        isCorrect,
        correctAnswer: currentQuestion.answer,
      };
  
      setFeedback(updatedFeedback);
    }
  };
  

  const renderFeedback = (questionIndex) => {
    if (feedback[questionIndex]) {
      const { isCorrect, correctAnswer } = feedback[questionIndex];
      return (
        <div className="mt-2 text-sm">
          <span className={`text-${isCorrect ? "green" : "red"}-600`}>
            {isCorrect ? "✔ Correct!" : "❌ Incorrect!"}
          </span>
          <div className="mt-1">
            <span className="font-semibold">Correct Answer: </span>
            {correctAnswer}
          </div>
        </div>
      );
    }
    return null;
  };

  const calculateScore = () => {
    const correctAnswers = feedback.filter(
      (item) => item && item.isCorrect
    ).length;
    return (correctAnswers / quizContent.questions.length) * 100;
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true); // Mark the quiz as completed
  };

  const renderCompletionMessage = () => {
    const score = calculateScore();
    if (score >= 50) {
      return (
        <div className="bg-green-100 p-4 rounded-md mt-4">
          <h2 className="text-2xl font-semibold text-green-600">
            Congratulations!
          </h2>
          <p>You answered {score}% of the questions correctly. Well done!</p>
        </div>
      );
    } else {
      return (
        <div className="bg-red-100 p-4 rounded-md mt-4">
          <h2 className="text-2xl font-semibold text-red-600">
            Better Luck Next Time!
          </h2>
          <p>
            You answered only {score}% of the questions correctly. Don't worry,
            keep trying!
          </p>
        </div>
      );
    }
  };

  const renderAllQuestions = () => {
    return quizContent.questions.map((question, index) => {
      const selectedAnswer = userAnswers[index];
      const correctAnswer = feedback[index]?.correctAnswer;
      const isCorrect = feedback[index]?.isCorrect;

      const borderColor = isCorrect
        ? "border-green-500 bg-green-100"
        : "border-red-500 bg-red-100";

      return (
        <div key={index} className={`mb-4 p-4 border ${borderColor} rounded-md`}>
          <h3 className="font-bold">{question.question}</h3>
          <div className="mt-2">
            <span className="font-semibold">Your Answer: </span>
            {selectedAnswer || "No answer"}
          </div>
          <div className="mt-1">
            <span className="font-semibold">Correct Answer: </span>
            {correctAnswer}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full px-4 md:px-8 bg-gray-50 h-full">
      {quizContent ? (
        <div>
          {quizCompleted ? (
            <div>
              {renderCompletionMessage()} {/* Show the completion message */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
                {renderAllQuestions()} {/* Render all questions with answers */}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-l font-semibold mb-4">
                {quizContent.title[0].value}
              </h2>

              <div className="flex justify-between mb-4">
                <span className="text-sm">
                  Assessment: Question {currentQuestionIndex + 1}/
                  {quizContent.questions.length}
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-800 disabled:bg-gray-300"
                  >
                    Previous
                  </button>
                  {/* Disabled Next button until user submits the answer */}
                  <button
                    onClick={handleNextQuestion}
                    disabled={
                      currentQuestionIndex === quizContent.questions.length - 1 ||
                      feedback[currentQuestionIndex] === null // Disable Next until the answer is submitted
                    }
                    className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-800 disabled:bg-gray-300"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="question mb-8">
                <div className="text-lg font-bold mb-2">
                  <span>Question {currentQuestionIndex + 1}:</span>
                  <span className="ml-2">
                    {quizContent.questions[currentQuestionIndex].question}
                  </span>
                </div>

                {/* Render MCQ questions */}
                {quizContent.questions[currentQuestionIndex].type === "mcq" && (
                  <ul className="space-y-4 pt-4">
                    {quizContent.questions[currentQuestionIndex].options.map(
                      (option, index) => {
                        const alphabetLabel = String.fromCharCode(65 + index); // A, B, C, D...
                        const isSelected =
                          userAnswers[currentQuestionIndex] === alphabetLabel;
                        const isCorrect =
                          feedback[currentQuestionIndex] &&
                          feedback[currentQuestionIndex].isCorrect &&
                          userAnswers[currentQuestionIndex] === alphabetLabel;
                        const isIncorrect =
                          feedback[currentQuestionIndex] &&
                          !feedback[currentQuestionIndex].isCorrect &&
                          userAnswers[currentQuestionIndex] === alphabetLabel;
                        const correctAnswer =
                          feedback[currentQuestionIndex] &&
                          !feedback[currentQuestionIndex].isCorrect &&
                          feedback[currentQuestionIndex].correctAnswer ===
                            alphabetLabel;

                        return (
                          <li
                            key={index}
                            className={`flex items-center space-x-4 p-3 border border-gray-200 rounded-md cursor-pointer
                            ${
                              isSelected &&
                              feedback[currentQuestionIndex] === null
                                ? "bg-blue-100 border-blue-500 text-blue-600"
                                : ""
                            }
                            ${
                              isCorrect
                                ? "bg-green-100 border-green-500 text-green-600"
                                : ""
                            }
                            ${
                              isIncorrect
                                ? "bg-red-100 border-red-500 text-red-600"
                                : ""
                            }
                            ${
                              correctAnswer && !isSelected
                                ? "bg-green-100 border-green-500 text-green-600"
                                : ""
                            }
                          `}

                            onClick={() => handleAnswerSelection(alphabetLabel)}
                            disabled={feedback[currentQuestionIndex] !== null} // Disable selection after submission
                          >
                            <span className="w-6 h-6 flex items-center justify-center border-gray-300 bg-gray-200 rounded text-center font-medium">
                              {alphabetLabel}
                            </span>
                            <span className="ml-2">{option.value}</span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                )}

                {/* Render True/False questions as A and B (True is A, False is B) */}
                {quizContent.questions[currentQuestionIndex].type === "true_false" && (
                  <ul className="space-y-4 pt-4">
                    {["True", "False"].map((option, index) => {
                      const alphabetLabel = index === 0 ? "A" : "B"; // True = A, False = B
                      const isSelected =
                        userAnswers[currentQuestionIndex] === alphabetLabel;
                      const isCorrect =
                        feedback[currentQuestionIndex] &&
                        feedback[currentQuestionIndex].isCorrect &&
                        userAnswers[currentQuestionIndex] === alphabetLabel;
                      const isIncorrect =
                        feedback[currentQuestionIndex] &&
                        !feedback[currentQuestionIndex].isCorrect &&
                        userAnswers[currentQuestionIndex] === alphabetLabel;
                      const correctAnswer =
                        feedback[currentQuestionIndex] &&
                        !feedback[currentQuestionIndex].isCorrect &&
                        feedback[currentQuestionIndex].correctAnswer ===
                          alphabetLabel;

                      return (
                        <li
                          key={alphabetLabel}
                          className={`flex items-center space-x-4 p-3 border border-gray-200 rounded-md cursor-pointer
                          ${
                            isSelected &&
                            feedback[currentQuestionIndex] === null
                              ? "bg-blue-100 border-blue-500 text-blue-600"
                              : ""
                          }
                          ${
                            isCorrect
                              ? "bg-green-100 border-green-500 text-green-600"
                              : ""
                          }
                          ${
                            isIncorrect
                              ? "bg-red-100 border-red-500 text-red-600"
                              : ""
                          }
                          ${
                            correctAnswer && !isSelected
                              ? "bg-green-100 border-green-500 text-green-600"
                              : ""
                          }
                        `}
                          onClick={() => handleAnswerSelection(alphabetLabel)}
                          disabled={feedback[currentQuestionIndex] !== null} // Disable selection after submission
                        >
                          <span className="w-6 h-6 flex items-center justify-center border-gray-300 bg-gray-200 rounded text-center font-medium">
                            {alphabetLabel}
                          </span>
                          <span className="ml-2">{option}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* Render Fill in the Blank questions */}
                {quizContent.questions[currentQuestionIndex].type === "fillinblank" && (
                  <div className="pt-4">
                    <input
                      type="text"
                      value={userAnswers[currentQuestionIndex] || ""}
                      onChange={(e) => handleAnswerSelection(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                      disabled={feedback[currentQuestionIndex] !== null} // Disable input after submission
                    />
                    {renderFeedback(currentQuestionIndex)}
                  </div>
                )}
              </div>

              {/* Submit Answer button */}
              <div className="pt-4">
                {feedback[currentQuestionIndex] === null && (
                  <button
                    onClick={handleSubmitAnswer}
                    className="px-4 py-2 text-white bg-blue-900 rounded-md hover:bg-blue-600"
                  >
                    Submit Answer
                  </button>
                )}
              </div>

              {/* Finish Quiz button */}
              <div className="pt-4">
                {currentQuestionIndex === quizContent.questions.length - 1 && (
                  <button
                    onClick={handleFinishQuiz}
                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Finish Quiz
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Loading quiz content...</p>
      )}
    </div>
  );
};

export default QuizContentPage;
