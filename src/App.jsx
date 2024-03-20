import React, { useState } from 'react';
import './assets/styles/fonts.scss'
import './assets/styles/global.scss'
import data from '../data.json';
import Welcome from './components/Welcome/Welcome';
import MainMenu from './components/MainMenu/MainMenu';
import Questions from './components/Questions/Questions';
import Options from './components/Options/Options';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizButtonsVisible, setQuizButtonsVisible] = useState(true);


  const handleQuizSelection = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setQuizButtonsVisible(false);
  };

  const handleNextQuestion = () => {
   setCurrentQuestionIndex(prevIndex => prevIndex + 1);
   // console.log(selectedQuiz.questions[currentQuestionIndex].answer);
  };

  return (
    <main className="main-container">
       
      <div className='left-side'>
      {quizButtonsVisible && (
         <Welcome />
      )}
         <Questions selectedQuiz={selectedQuiz} currentQuestionIndex={currentQuestionIndex}/>
      </div>

      <div className='right-side'>
         {quizButtonsVisible && (
            <MainMenu handleQuizSelection={handleQuizSelection}/>
         )}

         <Options 
         selectedQuiz={selectedQuiz} 
         currentQuestionIndex={currentQuestionIndex} 
         handleNextQuestion={handleNextQuestion}
         quizButtonsVisible={quizButtonsVisible}
         />
      </div>
           
    </main>   
  );
}

export default App;

