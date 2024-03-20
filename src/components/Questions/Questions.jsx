import React from 'react'

const Questions = ({ selectedQuiz, currentQuestionIndex }) => {
  return (
    <div>
      {selectedQuiz && (
         <h2>{selectedQuiz.questions[currentQuestionIndex].question}</h2>
      )}
    </div>
  )
}

export default Questions