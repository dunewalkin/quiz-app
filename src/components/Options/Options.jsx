import React from 'react'

const Options = ({ selectedQuiz, currentQuestionIndex, handleNextQuestion, quizButtonsVisible }) => {
  return (
   <div>
      {selectedQuiz && (
         <div className="quiz-buttons">
            <button className='quiz-button'>
               <div className='option'>
                  <h1 className='heading-xs'>A</h1>
               </div>
               <h1 className='heading-xs'>{selectedQuiz.questions[currentQuestionIndex].options[0]}</h1>
            </button>

            <button className='quiz-button'>
               <div className='option'>
                  <h1 className='heading-xs'>B</h1>
               </div>
               <h1 className='heading-xs'>{selectedQuiz.questions[currentQuestionIndex].options[1]}</h1>
            </button>

            <button className='quiz-button'>
               <div className='option'>
                  <h1 className='heading-xs'>C</h1>
               </div>
               <h1 className='heading-xs'>{selectedQuiz.questions[currentQuestionIndex].options[2]}</h1>
            </button>

            <button className='quiz-button'>
               <div className='option'>
                  <h1 className='heading-xs'>D</h1>
               </div>
               <h1 className='heading-xs'>{selectedQuiz.questions[currentQuestionIndex].options[3]}</h1>
            </button>
         </div>
      )}
      {!quizButtonsVisible && (
        <button 
        className='submit-btn'
        onClick={handleNextQuestion}>
         <h1 className='heading-xs'>Submit</h1>
         </button>
      )}
   </div>
  )
}

export default Options