import React from 'react';
import './results-summary.scss';
import icons from '../../imageImports';

const  ResultsSummary = ({ correctAnswersCount, selectedQuiz, backgroundClasses }) => {
   
   const handleRestartQuiz = () => {
      window.location.reload();
   };

   return (
      <div className='results-summary'>
         <div className='results-main-wrapper'>
            <div className='current-quiz'>
               <div className={`quiz-logo-wrapper ${backgroundClasses[selectedQuiz.title]}`}>
                  <div className='quiz-logo'>
                     <img src={icons[selectedQuiz.title.toLowerCase()]} alt={selectedQuiz.title} />
                  </div>
               </div>
               <h1 className='heading-xs'>{selectedQuiz.title}</h1>
            </div>
            <div className='results-score'>
               <h1 className='heading-xl'>{correctAnswersCount}</h1>
               <p>out of {selectedQuiz.questions.length}</p>
            </div>
         </div>
         
         <button 
            className='submit-btn' 
            onClick={handleRestartQuiz}>
                  <h1 className='heading-xs'>Play Again</h1>
         </button>
      </div>
   )
}

export default  ResultsSummary