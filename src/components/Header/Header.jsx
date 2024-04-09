import React from 'react';
import './header.scss';
import iconSunLight from '../../assets/images/icon-sun-light.svg';
import iconSunDark from '../../assets/images/icon-sun-dark.svg';
import iconMoonLight from '../../assets/images/icon-moon-light.svg';
import iconMoonDark from '../../assets/images/icon-moon-dark.svg';
import icons from '../../imageImports';

const Header = ({ toggleTheme, theme, selectedQuiz, backgroundClasses, quizButtonsVisible }) => {

   return (
      <div className={`header-wrapper ${!quizButtonsVisible ? 'header-quiz-active' : ''}`}>

         {!quizButtonsVisible && (
         <div className='current-quiz'>
            <div className={`quiz-logo-wrapper ${backgroundClasses[selectedQuiz.title]}`}>
               <div className='quiz-logo'>
                  <img src={icons[quiz.title.toLowerCase()]} alt={quiz.title} />
               </div>
            </div>
            <h1 className='heading-xs'>{selectedQuiz.title}</h1>
         </div>
         )}
         

         <div className='toggle-wrapper'>  
            <div className='icon-sun-wrapper'>
               <img src={theme === 'light' ? iconSunDark : iconSunLight} alt={`Icon Sun ${theme === 'light' ? 'Dark' : 'Light'}`} />            
            </div>       
            <button 
               className={`toggle-btn ${theme === 'dark' ? 'toggle-active' : ''}`}
               onClick={toggleTheme}
            ></button>
            <div className='icon-moon-wrapper'>
               <img src={theme === 'light' ? iconMoonDark : iconMoonLight} alt={`Icon Moon ${theme === 'light' ? 'Dark' : 'Light'}`} />
            </div>             
         </div>
      </div>
   )
}

export default Header;

