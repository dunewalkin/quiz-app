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
       
      {/* <div className='left-side'>
         <Welcome />
         <Questions selectedQuiz={selectedQuiz} currentQuestionIndex={currentQuestionIndex}/>
      </div>

      <div className='right-side'>
         <MainMenu handleQuizSelection={handleQuizSelection}/>
         <Options selectedQuiz={selectedQuiz} currentQuestionIndex={currentQuestionIndex} handleNextQuestion={handleNextQuestion}/>
      </div> */}
      
      
      {/* <div className="quiz-buttons">
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

      
      {selectedQuiz && (
        <div className="selected-quiz">
          <h2>{selectedQuiz.questions[currentQuestionIndex].question}</h2>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[0]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[1]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[2]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[3]}</button>
        </div>
      )}
      <button onClick={handleNextQuestion}>Submit</button> */}

      {quizButtonsVisible && (
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
      )}
      {selectedQuiz && (
        <div className="selected-quiz">
          <h2>{selectedQuiz.questions[0].question}</h2>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[0]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[1]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[2]}</button>
          <button>{selectedQuiz.questions[currentQuestionIndex].options[3]}</button>
        </div>
      )}
      
      {!quizButtonsVisible && (
        <button onClick={handleNextQuestion}>Submit</button>
      )}
      
      
    </main>   
  );
}

export default App;

