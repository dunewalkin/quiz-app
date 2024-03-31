import React, { useState, useEffect } from 'react';
import './assets/styles/fonts.scss';
import './assets/styles/global.scss';
import data from '../data.json';

function App() {
   const [selectedQuiz, setSelectedQuiz] = useState(null);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [quizButtonsVisible, setQuizButtonsVisible] = useState(true);
   const [selectedOption, setSelectedOption] = useState(null);
   const [submitClicked, setSubmitClicked] = useState(false);
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [progress, setProgress] = useState(0);
   const [buttonsDisabled, setButtonsDisabled] = useState(false);
   const [resultDisplayed, setResultDisplayed] = useState(false);
   const [allResultDisplayed, setAllResultDisplayed] = useState(false);
   const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Состояние для подсчета правильных ответов
 
   useEffect(() => {
     const calculateProgress = () => {
       if (selectedQuiz) {
         const newProgress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;
         setProgress(newProgress);
       }
     };
 
     calculateProgress();
   }, [currentQuestionIndex, selectedQuiz]);
 
   const inputStyle = {
     width: `${progress}%`
   };
 
   const handleQuizSelection = (quiz) => {
     setSelectedQuiz(quiz);
     setCurrentQuestionIndex(0);
     setQuizButtonsVisible(false);
     setSelectedOption(null);
     setSubmitClicked(false);
     setShowErrorMessage(false);
     setCorrectAnswersCount(0); // Сброс количества правильных ответов при выборе нового теста
   };
 
   const handleOptionSelect = (option) => {
     setSelectedOption(option);
   };
 
   const handleNextQuestion = () => {
     if (selectedOption !== null) {
       if (!resultDisplayed) {
         setResultDisplayed(true);

         if (selectedOption === selectedQuiz.questions[currentQuestionIndex].answer) {
            setCorrectAnswersCount(prevCount => prevCount + 1); // Увеличить количество правильных ответов
            console.log(correctAnswersCount);
          }   
       }
 
       if (currentQuestionIndex === selectedQuiz.questions.length - 1) {
         setAllResultDisplayed(true); // Показать результаты теста после ответа на последний вопрос
       }
     
       setButtonsDisabled(true);
       if (!submitClicked) {
         setSubmitClicked(true);
       } else {
         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
         setButtonsDisabled(false);
         setSelectedOption(null);
         setSubmitClicked(false);
         setResultDisplayed(false);
       }
       setShowErrorMessage(false);
     } else {
       setShowErrorMessage(true);
     }
   };
 
   const handleRestartQuiz = () => {
     window.location.reload(); // Перезагрузить страницу
   };
 
   return (
     <main className="main-container">
       {quizButtonsVisible && (
         <div className="quiz-buttons">
           {data.quizzes.map((quiz, index) => (
             <button
               key={index}
               className="quiz-button"
               onClick={() => handleQuizSelection(quiz)}>
               <img src={quiz.icon} alt={quiz.title} />
               <h1 className='heading-xs'>{quiz.title}</h1>
             </button>
           ))}
         </div>
       )}
       {selectedQuiz && !allResultDisplayed && (
         <div className="quiz-buttons">
           <h2>{selectedQuiz.questions[currentQuestionIndex].question}</h2>
           {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => {
             const isActive = selectedOption === option;
             const isCorrect = resultDisplayed && isActive && option === selectedQuiz.questions[currentQuestionIndex].answer;
             const isIncorrect = resultDisplayed && isActive && option !== selectedQuiz.questions[currentQuestionIndex].answer;
 
             return (
               <button
                 className={`quiz-button ${isActive ? 'active' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'not-correct' : ''}`}
                 key={index}
                 onClick={() => handleOptionSelect(option)}
                 disabled={buttonsDisabled}
               >
                 <div className='option'>
                   <h1 className='heading-xs'>{String.fromCharCode(65 + index)}</h1>
                 </div>
                 <h1 className='heading-xs'>{option}</h1>
               </button>
             );
           })}
         </div>
       )}
 
       <div className='range-wrapper'>
         <div
           className='range-progress'
           style={inputStyle}>
         </div>
       </div>
 
       {!quizButtonsVisible && !allResultDisplayed && (
         <div>
           <button onClick={handleNextQuestion} className='submit-btn'>{submitClicked ? "Next Question" : "Submit"}</button>
           {showErrorMessage && (
             <div className='error-message'>
               <p>Please select an answer</p>
             </div>
           )}
         </div>
       )}
 
       {allResultDisplayed && (
         <div className='result-info'>
           <p>Quiz completed You scored {correctAnswersCount} out of {selectedQuiz.questions.length}.</p>
           <button onClick={handleRestartQuiz}>Play Again</button>
         </div>
       )}
 
     </main>
   );
 }
 
 export default App;