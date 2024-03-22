import React from 'react';
import iconError from '../../assets/images/icon-error.svg';
import './options.scss';

const Options = ({ selectedQuiz, currentQuestionIndex, handleNextQuestion, quizButtonsVisible, handleOptionSelect, submitClicked, showErrorMessage }) => {
  return (
   <div className='options-section'>
      {selectedQuiz && (
         <div className="quiz-buttons">
            {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => (
            <button className='quiz-button'
               key={index} 
               onClick={() => handleOptionSelect(option)}
            > 
               <div className='option'>
                  <h1 className='heading-xs'>{String.fromCharCode(65 + index)}</h1>
               </div>
               <h1 className='heading-xs'>{option}</h1>
            </button>
         ))}
         </div>
      )}
      {!quizButtonsVisible && (
         <button 
            className='submit-btn'
            onClick={handleNextQuestion}>
            <h1 className='heading-xs'>{submitClicked ? "Next Question" : "Submit Answer"}</h1>
         </button>
      )}

      {showErrorMessage && (
         <div className='error-message'>
            <img src={iconError} alt="Error icon" />
            <p>Please select an answer</p>
         </div> 
      )}
      
      
   </div>
  )
}

export default Options
