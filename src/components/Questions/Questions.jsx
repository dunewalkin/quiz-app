import React from 'react';
import './questions.scss'

const Questions = ({ selectedQuiz, currentQuestionIndex }) => {
  return (
    <div>
      {selectedQuiz && (
         <div className='question-section'>
            <p className='body-s '>{`Question ${currentQuestionIndex + 1} of ${selectedQuiz.questions.length}`}</p>
            <h1 className='heading-s'>{selectedQuiz.questions[currentQuestionIndex].question}</h1>

            <input 
            type="range" 
            min="1" 
            max={selectedQuiz.questions.length} 
            value={currentQuestionIndex + 1} 
          />
         </div>       
      )}
    </div>
  )
}

export default Questions