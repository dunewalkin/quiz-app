import React, { useState } from 'react';
import './assets/styles/fonts.scss'
import './assets/styles/global.scss'
import Welcome from './components/Welcome/Welcome';
import MainMenu from './components/MainMenu/MainMenu';
import Questions from './components/Questions/Questions';
import Options from './components/Options/Options';

function App() {
   const [selectedQuiz, setSelectedQuiz] = useState(null);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [quizButtonsVisible, setQuizButtonsVisible] = useState(true);
   const [selectedOption, setSelectedOption] = useState(null); // Состояние для хранения выбранной пользователем опции
   const [submitClicked, setSubmitClicked] = useState(false); // Состояние для отслеживания нажатия на кнопку "Submit"

   const handleQuizSelection = (quiz) => {
      setSelectedQuiz(quiz);
      setCurrentQuestionIndex(0);
      setQuizButtonsVisible(false);
      setSelectedOption(null); // Сброс выбранной опции при выборе нового теста
      setSubmitClicked(false); // Сброс состояния нажатия на кнопку "Submit" при выборе нового теста
   };

   const handleOptionSelect = (option) => {
      setSelectedOption(option);
   };

   const handleNextQuestion = () => {
      // Проверка, выбрана ли какая-либо опция перед переходом к следующему вопросу
      if (selectedOption !== null) {
         // Проверка ответа и вывод сообщения в консоль
         if (selectedOption === selectedQuiz.questions[currentQuestionIndex].answer) {
         console.log("Ответ правильный");
         } else {
         console.log("Ответ неправильный");
         }
         // Если кнопка "Submit" еще не была нажата, меняем ее текст на "Next Question"
         if (!submitClicked) {
         setSubmitClicked(true);
         } else {
         // Если кнопка "Submit" уже была нажата, переходим к следующему вопросу
         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
         // Сброс состояния выбранной опции и состояния нажатия на кнопку "Submit"
         setSelectedOption(null);
         setSubmitClicked(false);
         }
      } else {
         // Если пользователь не выбрал ответ, вы можете вывести сообщение или предпринять другие действия
         console.log("Выберите ответ перед переходом к следующему вопросу");
      }
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

