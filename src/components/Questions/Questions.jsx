import React, { useState, useEffect } from 'react';
import './questions.scss';

const Questions = ({ selectedQuiz, currentQuestionIndex }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
   const calculateProgress = () => {
     if (selectedQuiz) {
       const newProgress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;
       setProgress(newProgress);
     }
   };
 
   calculateProgress();
 }, [currentQuestionIndex, selectedQuiz]);

  return (
    <div>
      {selectedQuiz && (
        <div className='question-section'>
            <p className='body-s'>{`Question ${currentQuestionIndex + 1} of ${selectedQuiz.questions.length}`}</p>
            <h1 className='heading-s'>{selectedQuiz.questions[currentQuestionIndex].question}</h1>

            <div className='range-wrapper'>
               <div 
                  className='range-progress'
                  style={{width: `${progress}%`}}>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default Questions;