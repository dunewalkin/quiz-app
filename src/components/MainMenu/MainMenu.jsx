import React from 'react';
import data from '../../data.json';
import './main-menu.scss';
import icons from '../../imageImports';

const MainMenu = ({ handleQuizSelection, backgroundClasses }) => {

   return (
      <div className="quiz-buttons">
         {data.quizzes.map((quiz, index) => (
            <button 
               key={index} 
               className="quiz-button" 
               onClick={() => handleQuizSelection(quiz)}
            >
               <div className={`quiz-logo-wrapper ${backgroundClasses[quiz.title]}`}>
                  <div className='quiz-logo'>
                     <img src={icons[quiz.title.toLowerCase()]} alt={`Icon ${selectedQuiz.title}`} />
                  </div>
               </div>
               <h1 className='heading-xs'>{quiz.title}</h1>
            </button>
         ))}
      </div>
   )
}

export default MainMenu



