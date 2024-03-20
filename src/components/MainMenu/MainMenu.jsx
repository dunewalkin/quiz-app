import React from 'react';
import data from '../../../data.json';
import './main-menu.scss';

const MainMenu = ( {handleQuizSelection} ) => {
   return (
      <div className="quiz-buttons">
         {data.quizzes.map((quiz, index) => (
            <button 
               key={index} 
               className="quiz-button" 
               onClick={() => handleQuizSelection(quiz)}>
               <img src={quiz.icon} alt={quiz.title} />
               <h1 className='heading-xs'>{quiz.title}</h1>
            </button>
         ))}
      </div>
   )
}

export default MainMenu