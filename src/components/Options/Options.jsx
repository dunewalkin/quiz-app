import React, { useEffect, useRef } from 'react';
import iconError from '../../assets/images/icon-error.svg';
import './options.scss';
import correctIcon from '../../assets/images/icon-correct.svg'
import notCorrectIcon from '../../assets/images/icon-error.svg';

const Options = ({ selectedQuiz, currentQuestionIndex, handleNextQuestion, quizButtonsVisible, handleOptionSelect, submitClicked, showErrorMessage, selectedOption, buttonsDisabled, resultDisplayed,correctOptionIndex, allResultDisplayed }) => {

   const errorMessageRef = useRef(null);

   useEffect(() => {
      if (showErrorMessage && errorMessageRef.current) {
         errorMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
   }, [showErrorMessage]);


  return (
    <div className='options-section'>
      {selectedQuiz && !allResultDisplayed && (
        <div className="quiz-buttons">
          {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => {
            const isActive = selectedOption === option;
            const isCorrect = resultDisplayed && isActive && option === selectedQuiz.questions[currentQuestionIndex].answer;
            const isIncorrect = resultDisplayed && isActive && option !== selectedQuiz.questions[currentQuestionIndex].answer;

            return (
              <button
                className={`quiz-button ${isActive ? 'active' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'not-correct' : ''} ${index === correctOptionIndex ? 'show-correct-answer' : ''}`}
                key={index}
                onClick={() => handleOptionSelect(option)}
                disabled={buttonsDisabled}
              >

               <div className='option-wrapper'>
                  <div className='option'>
                     <h1 className='heading-xs'>{String.fromCharCode(65 + index)}</h1>
                  </div>
                  <h1 className='heading-xs'>{option}</h1>
               </div>
               <div className='correct-icon'>
                  <img src={correctIcon} alt="Correct Icon" />
               </div>
               <div className='not-correct-icon'>
                  <img src={notCorrectIcon} alt="Not correct Icon" />
               </div>

              </button>
            );
          })}
        </div>
      )}
      {!quizButtonsVisible && !allResultDisplayed && (
        <button
          className='submit-btn'
          onClick={handleNextQuestion}>
          <h1 className='heading-xs'>{submitClicked ? (currentQuestionIndex === selectedQuiz.questions.length - 1 ? "Show Results" : "Next Question") : "Submit Answer"}</h1>
        </button>
      )}

      {showErrorMessage && (
        <div className='error-message' ref={errorMessageRef}>
          <img src={iconError} alt="Error icon" />
          <p>Please select an answer</p>
        </div>
      )}

    </div>
  )
}

export default Options;
