import React from 'react'

const  ResultsSummary = ({ correctAnswersCount, selectedQuiz }) => {
   
   const handleRestartQuiz = () => {
      window.location.reload(); // Перезагрузить страницу
   };

   return (
      <div>
         <p>{correctAnswersCount} out of {selectedQuiz.questions.length}.</p>
            <button onClick={handleRestartQuiz}>Play Again</button>
      </div>
   )
}

export default  ResultsSummary