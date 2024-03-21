import React from 'react'

const Questions = ({ selectedQuiz, currentQuestionIndex }) => {
  return (
    <div>
      {selectedQuiz && (
         <h1 className='heading-s'>{selectedQuiz.questions[currentQuestionIndex].question}</h1>
      )}
    </div>
  )
}

export default Questions