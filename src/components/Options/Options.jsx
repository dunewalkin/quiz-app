import React from 'react'

const Options = ({ selectedQuiz, currentQuestionIndex, handleNextQuestion }) => {
  return (
   <div>
      {selectedQuiz && (
        <div className="selected-quiz">
          <h2>{selectedQuiz.questions[currentQuestionIndex].question}</h2>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[0]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[1]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[2]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[3]}</button>
        </div>
      )}
      <button onClick={handleNextQuestion}>Submit</button>
   </div>
  )
}

export default Options